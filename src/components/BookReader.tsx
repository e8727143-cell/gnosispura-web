import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { getBookText, hasTextFile } from '../data/texts';

interface Props {
  bookId: string;
  title: string;
  archiveUrl?: string;
}

const SCANNED_BOOKS = new Set([
  'enoc2_morfill', 'ireneo_keble', 'apocalipsis_revelado', 'reuchlin', 'cristianismo_verdadero',
]);

// ─── Text Processing Pipeline ─────────────────────────────

/** Patterns that indicate a chapter/section heading */
const CHAPTER_PATTERNS = [
  /^CAP[ÍI]TULO\s+[IVXLCDM\d]+[\.\s:-]*$/im,
  /^Cap[ií]tulo\s+[IVXLCDM\d]+[\.\s:-]*$/im,
  /^CHAPTER\s+[IVXLCDM\d]+[\.\s:-]*$/im,
  /^LIBRO\s+[IVXLCDM\d]+[\.\s:-]*$/im,
  /^BOOK\s+[IVXLCDM\d]+[\.\s:-]*$/im,
  /^PART(E)?\s+[IVXLCDM\d]+[\.\s:-]*$/im,
  /^SECCI[ÓO]N\s+[IVXLCDM\d]+[\.\s:-]*$/im,
  /^SECTION\s+[IVXLCDM\d]+[\.\s:-]*$/im,
  /^PSALM\s+\d+/im,
  /^SALMO\s+\d+/im,
  /^\d+\.\s+(?:Y|And|The|En|El|La|Los|Las|Por|De|Del)\s+/m,
  /^[IVXLCDM]+\.\s+(?:THE|OF|THE|LA|EL|LOS)\s+/m,
];

/** Patterns for ALL-CAPS lines that might be section headers */
const ALL_CAPS_HEADER = /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s\-]{10,}$/m;
const ALL_CAPS_SHORT = /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s\-]{15,}$/m;

/** Patterns that indicate metadata/front matter lines to skip from content */
const FRONT_MATTER = [
  /^descargado\s+de/i,
  /^ebook\s+(descargado|gratis)/i,
  /^www\./i,
  /^http/i,
  /^copyright|©|todos los derechos|all rights/i,
  /^(traducción|translation|edition|edición|versión)\s+(de|by|from|del)/i,
  /^isbn/i,
  /^\d+\s+edition/i,
  /^\d+ª?\s*edición/i,
  /^publicado|published/i,
  /^impreso|printed/i,
  /^maquetaci[óo]n/i,
  /^colección/i,
  /^índice\s+(general|de\s+contenidos)/i,
  /^table\s+of\s+contents/i,
];

interface Chapter {
  num: number;
  title: string;
  pageIndex: number;     // page num in original data
  paragraphIndex: number; // global paragraph index
}

interface ProcessedPage {
  num: number;
  paragraphs: string[];
  hasContent: boolean;
}

function cleanLine(line: string): string {
  return line
    .replace(/\s+/g, ' ')
    .replace(/\b\s+\b/g, ' ')  // collapse mid-word spacing like "h e b r e w"
    .replace(/\u00A0/g, ' ')    // nbsp → space
    .replace(/[\u2000-\u200F]/g, '')  // various unicode spaces
    .replace(/\u2028/g, '\n')   // line separator → newline
    .replace(/\u2029/g, '\n')   // paragraph separator → newline
    .replace(/[•●]/g, '·')      // bullet chars
    .replace(/[""''""]/g, '"')  // normalize quotes
    .trim();
}

function isFrontMatter(line: string): boolean {
  return FRONT_MATTER.some(p => p.test(line));
}

function isChapterHeader(line: string): boolean {
  return CHAPTER_PATTERNS.some(p => p.test(line.trim()));
}

function isPossibleHeader(line: string): boolean {
  const l = line.trim();
  if (l.length < 10 || l.length > 120) return false;
  if (l.endsWith('.') && l.length < 60) return false; // short sentence
  // All caps with some length
  if (ALL_CAPS_HEADER.test(l) && l.split(/\s+/).length <= 12) return true;
  if (ALL_CAPS_SHORT.test(l)) return true;
  return false;
}

function processPageText(rawText: string, pageNum: number): ProcessedPage {
  // Split by newlines first to find structure
  const rawLines = rawText.split('\n');
  const cleanedLines = rawLines.map(cleanLine).filter(l => l.length > 0);

  if (cleanedLines.length === 0) return { num: pageNum, paragraphs: [], hasContent: false };

  // Build paragraphs: honor blank lines as paragraph breaks
  // But also join lines that seem to continue a paragraph (no period end, not a header)
  const paragraphs: string[] = [];
  let current = '';

  for (let i = 0; i < cleanedLines.length; i++) {
    const line = cleanedLines[i];
    const nextLine = i < cleanedLines.length - 1 ? cleanedLines[i + 1] : '';

    // Chapter headers are always their own paragraph
    if (isChapterHeader(line)) {
      if (current) { paragraphs.push(current.trim()); current = ''; }
      paragraphs.push(`__CHAPTER__${line}`);
      continue;
    }

    // Detect verse numbers like 1:1, v.1, (1)
    const verseMatch = line.match(/^(\d+:\d+|v{0,2}\.\s*\d+)\s+/);
    if (verseMatch && current.length > 200) {
      if (current) { paragraphs.push(current.trim()); current = ''; }
      current = line;
      continue;
    }

    // If line is ALL CAPS and next line starts with lowercase, it's a header
    if (isPossibleHeader(line)) {
      // Check if it's actually just a short text in all caps (e.g., "THIS IS A SENTENCE.")
      const words = line.split(/\s+/);
      const looksLikeHeader = words.length <= 10 && (!line.endsWith('.') || words.length <= 6);
      if (looksLikeHeader) {
        if (current) { paragraphs.push(current.trim()); current = ''; }
        paragraphs.push(`__HEADER__${line}`);
        continue;
      }
    }

    // If line ends with period/question/exclamation and next line doesn't start lowercase → paragraph break
    if (current) {
      const endsWithPunct = /[.?!:;]$/.test(current);
      const nextStartsUpper = nextLine && /^[A-ZÁÉÍÓÚÑ"'(]/.test(nextLine);
      const thisIsUpper = /^[A-ZÁÉÍÓÚÑ]/.test(line);
      const currentLength = current.length;

      if (endsWithPunct && nextStartsUpper && thisIsUpper && currentLength > 60) {
        paragraphs.push(current.trim());
        current = line;
      } else {
        current += ' ' + line;
      }
    } else {
      current = line;
    }
  }

  if (current) paragraphs.push(current.trim());

  // Filter out empty and front matter
  const filtered = paragraphs.filter(p => {
    const stripped = p.replace(/^__(CHAPTER|HEADER)__/, '');
    return stripped.length > 5 && !isFrontMatter(stripped);
  });

  return {
    num: pageNum,
    paragraphs: filtered,
    hasContent: filtered.length > 0,
  };
}

function buildChapters(processedPages: ProcessedPage[]): { chapters: Chapter[]; allParagraphs: string[] } {
  const chapters: Chapter[] = [];
  const allParagraphs: string[] = [];
  let globalParaIndex = 0;
  let chapterCount = 0;

  for (const pp of processedPages) {
    for (const para of pp.paragraphs) {
      if (para.startsWith('__CHAPTER__')) {
        const title = para.replace('__CHAPTER__', '').trim();
        chapterCount++;
        chapters.push({
          num: chapterCount,
          title,
          pageIndex: pp.num,
          paragraphIndex: globalParaIndex,
        });
      } else if (para.startsWith('__HEADER__')) {
        const title = para.replace('__HEADER__', '').trim();
        chapterCount++;
        chapters.push({
          num: chapterCount,
          title,
          pageIndex: pp.num,
          paragraphIndex: globalParaIndex,
        });
      } else {
        allParagraphs.push(para);
      }
      globalParaIndex++;
    }
  }

  return { chapters, allParagraphs };
}

// ─── BookReader Component ─────────────────────────────────

export default function BookReader({ bookId, title, archiveUrl }: Props) {
  const [textData, setTextData] = useState<Awaited<ReturnType<typeof getBookText>>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<'scan' | 'missing' | 'load' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ page: number; context: string }[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [sidebarOpen, setSidebarOpen] = useState<'toc' | 'pages' | null>(null);
  const [currentPage, setCurrentPage] = useState(-1);
  const [showAllText, setShowAllText] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSearchQuery('');
    setSearchResults([]);
    setSearchActive(false);
    setCurrentPage(-1);
    setShowAllText(true);

    if (SCANNED_BOOKS.has(bookId)) {
      setLoading(false);
      setError('scan');
      return;
    }

    if (!hasTextFile(bookId)) {
      setLoading(false);
      setError('missing');
      return;
    }

    getBookText(bookId).then(data => {
      if (cancelled) return;
      if (!data || !data.pages || data.pages.length === 0) {
        setError('missing');
      } else {
        const textPageCount = data.pages.filter(p => p.text.trim().length > 20).length;
        if (textPageCount === 0) {
          setError('scan');
        } else {
          setTextData(data);
        }
      }
      setLoading(false);
    }).catch(() => {
      if (!cancelled) { setError('load'); setLoading(false); }
    });

    return () => { cancelled = true; };
  }, [bookId]);

  // Process all pages through the pipeline
  const { processedPages, chapters, allParagraphs, totalWords } = useMemo(() => {
    if (!textData) return { processedPages: [] as ProcessedPage[], chapters: [] as Chapter[], allParagraphs: [] as string[], totalWords: 0 };

    const processed = textData.pages.map(p => processPageText(p.text, p.num));
    const { chapters: ch, allParagraphs: paras } = buildChapters(processed);

    // Find where actual content starts: skip first pages that are mostly front matter / cover
    let contentStart = 0;
    for (let i = 0; i < Math.min(paras.length, 30); i++) {
      const para = paras[i];
      if (para.length > 60 && /[a-zA-Záéíóúñ]{4,}/.test(para)) {
        contentStart = Math.max(0, i - 2);
        break;
      }
    }

    const words = paras.reduce((s, p) => s + p.split(/\s+/).length, 0);

    return {
      processedPages: processed,
      chapters: ch,
      allParagraphs: paras.slice(contentStart),
      totalWords: words,
    };
  }, [textData]);

  // Scroll to paragraph
  const scrollToParagraph = useCallback((paraIndex: number) => {
    const el = document.getElementById(`para-${paraIndex}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Jump to page
  const scrollToPage = useCallback((pageNum: number) => {
    setCurrentPage(pageNum);
    setShowAllText(false);
    const el = document.getElementById(`page-start-${pageNum}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Show all text
  const showAll = useCallback(() => {
    setCurrentPage(-1);
    setShowAllText(true);
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Search within text
  const handleSearch = () => {
    if (!searchQuery.trim() || !allParagraphs.length) {
      setSearchResults([]);
      setSearchActive(false);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results: { page: number; context: string }[] = [];
    for (const pp of processedPages) {
      const text = pp.paragraphs.filter(p => !p.startsWith('__')).join(' ');
      const idx = text.toLowerCase().indexOf(q);
      if (idx !== -1) {
        const start = Math.max(0, idx - 80);
        const end = Math.min(text.length, idx + q.length + 80);
        let context = text.slice(start, end).replace(/\s+/g, ' ');
        if (start > 0) context = '…' + context;
        if (end < text.length) context = context + '…';
        results.push({ page: pp.num, context });
      }
    }
    setSearchResults(results);
    setSearchActive(true);
  };

  // ─── Render: Loading / Error States ─────────────────────

  if (loading) {
    return (
      <ReaderShell title={title} archiveUrl={archiveUrl} sidebar={null} sidebarOpen={false} onToggleSidebar={()=>{}}>
        <div className="flex items-center justify-center py-20 text-parchment-500 text-sm italic">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Cargando texto…
        </div>
      </ReaderShell>
    );
  }

  if (error === 'scan') {
    return (
      <ReaderShell title={title} archiveUrl={archiveUrl} sidebar={null} sidebarOpen={false} onToggleSidebar={()=>{}}>
        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
          <div className="text-5xl mb-4 text-parchment-400">📖</div>
          <h3 className="text-lg font-bold text-parchment-700 mb-2">Libro escaneado</h3>
          <p className="text-sm text-parchment-500 max-w-md mb-6">Este libro está compuesto por imágenes escaneadas. Puedes descargar el PDF original.</p>
          {archiveUrl && (
            <a href={archiveUrl} target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 text-sm rounded-lg bg-parchment-700 hover:bg-parchment-800 text-parchment-50 transition-colors">
              Descargar PDF completo
            </a>
          )}
        </div>
      </ReaderShell>
    );
  }

  if (error === 'missing') {
    return (
      <ReaderShell title={title} archiveUrl={archiveUrl} sidebar={null} sidebarOpen={false} onToggleSidebar={()=>{}}>
        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
          <div className="text-5xl mb-4 text-parchment-400">?</div>
          <h3 className="text-lg font-bold text-parchment-700 mb-2">Texto no disponible</h3>
          <p className="text-sm text-parchment-500 max-w-md">El texto de este libro aún no está disponible.</p>
        </div>
      </ReaderShell>
    );
  }

  if (error === 'load') {
    return (
      <ReaderShell title={title} archiveUrl={archiveUrl} sidebar={null} sidebarOpen={false} onToggleSidebar={()=>{}}>
        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
          <div className="text-5xl mb-4 text-parchment-400">⚠️</div>
          <h3 className="text-lg font-bold text-parchment-700 mb-2">Error al cargar</h3>
          <p className="text-sm text-parchment-500 max-w-md mb-6">No se pudo cargar el texto. Intenta de nuevo.</p>
          {archiveUrl && (
            <a href={archiveUrl} target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 text-sm rounded-lg bg-parchment-700 hover:bg-parchment-800 text-parchment-50 transition-colors">
              Descargar PDF
            </a>
          )}
        </div>
      </ReaderShell>
    );
  }

  // ─── Build Sidebar Content ─────────────────────────────

  const sidebarContent = sidebarOpen === 'toc' ? (
    <div className="p-3">
      <h3 className="text-xs font-bold text-parchment-700 mb-3 uppercase tracking-wider">Capítulos</h3>
      {chapters.length === 0 && (
        <p className="text-xs text-parchment-500 italic">No se detectaron capítulos en este texto.</p>
      )}
      <nav className="space-y-0.5 max-h-[70vh] overflow-y-auto">
        {chapters.map(ch => (
          <button
            key={ch.num}
            onClick={() => { scrollToParagraph(ch.paragraphIndex); setSidebarOpen(null); }}
            className="block w-full text-left text-xs text-parchment-700 hover:text-parchment-900 hover:bg-parchment-200/60 rounded px-2 py-1.5 transition-colors leading-tight"
          >
            <span className="font-mono text-[10px] text-parchment-500 mr-1.5">{ch.num}.</span>
            {ch.title.replace(/^(CAP[ÍI]TULO|CHAPTER|LIBRO|BOOK|PART|SECTION)\s*/i, '').trim()}
          </button>
        ))}
        <button
          onClick={showAll}
          className="block w-full text-left text-xs text-parchment-500 hover:text-parchment-700 hover:bg-parchment-200/60 rounded px-2 py-1.5 transition-colors mt-2 italic"
        >
          📖 Ver texto completo
        </button>
      </nav>
    </div>
  ) : sidebarOpen === 'pages' ? (
    <div className="p-3">
      <h3 className="text-xs font-bold text-parchment-700 mb-3 uppercase tracking-wider">Páginas</h3>
      <p className="text-xs text-parchment-500 mb-3">{processedPages.length} páginas con texto</p>
      <div className="flex flex-wrap gap-1 max-h-[70vh] overflow-y-auto">
        {processedPages.filter(p => p.hasContent).map(pp => (
          <button
            key={pp.num}
            onClick={() => { scrollToPage(pp.num); setSidebarOpen(null); }}
            className={`text-[10px] font-mono w-9 h-9 rounded border transition-colors
              ${currentPage === pp.num
                ? 'bg-parchment-700 text-parchment-50 border-parchment-700'
                : 'bg-parchment-50 text-parchment-600 border-parchment-300 hover:bg-parchment-200'}`}
          >
            {pp.num}
          </button>
        ))}
      </div>
    </div>
  ) : null;

  // Group paragraphs by original page for page-navigation mode
  const pageParaMap = useMemo(() => {
    const map = new Map<number, { startIndex: number; count: number }>();
    let globalIdx = 0;
    for (const pp of processedPages) {
      const startIndex = globalIdx;
      const count = pp.paragraphs.length;
      map.set(pp.num, { startIndex, count });
      globalIdx += count;
    }
    return map;
  }, [processedPages]);

  const visibleParagraphs = useMemo(() => {
    if (showAllText) return allParagraphs;
    const info = pageParaMap.get(currentPage);
    if (!info) return allParagraphs;
    // Map from global to allParagraphs (which is already content-stripped)
    // We need to find the range in allParagraphs
    const contentParas: string[] = [];
    let paraCount = 0;
    let started = false;
    let ended = false;
    for (const pp of processedPages) {
      for (const para of pp.paragraphs) {
        if (para.startsWith('__')) { paraCount++; continue; }
        if (pp.num === currentPage) {
          started = true;
          contentParas.push(para);
        } else if (started && !ended) {
          // Stop at next page
          ended = true;
          break;
        }
        paraCount++;
      }
      if (ended) break;
    }
    return contentParas.length > 0 ? contentParas : allParagraphs;
  }, [showAllText, currentPage, allParagraphs, processedPages, pageParaMap]);

  return (
    <ReaderShell
      title={title}
      archiveUrl={archiveUrl}
      sidebar={sidebarContent}
      sidebarOpen={sidebarOpen !== null}
      onToggleSidebar={(type: 'toc' | 'pages') => setSidebarOpen(sidebarOpen === type ? null : type)}
    >
      {/* Search bar */}
      <div className="px-4 py-2 border-b border-parchment-300 bg-parchment-200/40">
        <div className="flex gap-2">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="Buscar en el texto…"
            className="flex-1 px-3 py-1.5 text-xs rounded border border-parchment-300 bg-parchment-50 text-parchment-800 placeholder-parchment-400 focus:outline-none focus:ring-2 focus:ring-parchment-400"
          />
          <button onClick={handleSearch}
            className="px-3 py-1.5 text-xs rounded bg-parchment-300 hover:bg-parchment-400 text-parchment-800 border border-parchment-400 transition-colors">
            Buscar
          </button>
          {searchActive && (
            <button onClick={() => { setSearchActive(false); setSearchQuery(''); }}
              className="px-3 py-1.5 text-xs rounded bg-parchment-100 hover:bg-parchment-300 text-parchment-600 border border-parchment-300 transition-colors">
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Search results */}
      {searchActive && (
        <div className="px-4 py-3 border-b border-parchment-300 bg-amber-50/80">
          {searchResults.length > 0 ? (
            <>
              <p className="text-xs text-parchment-500 mb-2">
                {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para «{searchQuery}»
              </p>
              <div className="max-h-40 overflow-y-auto space-y-1.5">
                {searchResults.map((r, i) => (
                  <button key={i} onClick={() => {
                    setSearchActive(false);
                    setShowAllText(true);
                    setCurrentPage(r.page);
                    setTimeout(() => {
                      const el = document.getElementById(`page-start-${r.page}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                    className="block w-full text-left text-xs text-parchment-700 bg-parchment-50 rounded p-2 hover:bg-parchment-100 border border-parchment-200 transition-colors">
                    <span className="font-medium text-parchment-500">p.{r.page} </span>
                    <span dangerouslySetInnerHTML={{
                      __html: r.context.replace(
                        new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                        '<mark class="bg-amber-300/60 px-0.5 rounded">$1</mark>'
                      )
                    }} />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xs text-parchment-500">Sin resultados para «{searchQuery}»</p>
          )}
        </div>
      )}

      {/* Font size controls */}
      <div className="flex items-center justify-end gap-2 px-4 py-1.5 border-b border-parchment-200 bg-parchment-100/50">
        <button onClick={() => setFontSize(s => Math.max(12, s - 1))}
          className="text-xs text-parchment-500 hover:text-parchment-700 w-6 h-6 rounded hover:bg-parchment-200 flex items-center justify-center">A−</button>
        <span className="text-[10px] text-parchment-400 font-mono w-8 text-center">{fontSize}</span>
        <button onClick={() => setFontSize(s => Math.min(28, s + 1))}
          className="text-xs text-parchment-500 hover:text-parchment-700 w-6 h-6 rounded hover:bg-parchment-200 flex items-center justify-center">A+</button>
        {!showAllText && (
          <button onClick={showAll}
            className="ml-2 text-[10px] text-parchment-500 hover:text-parchment-700 underline">
            Volver a texto completo
          </button>
        )}
      </div>

      {/* Text content */}
      <div ref={contentRef} className="px-6 md:px-10 py-6 md:py-8 max-w-4xl mx-auto">
        {/* Page badges */}
        {!showAllText && currentPage > 0 && (
          <div className="text-center mb-6">
            <span className="inline-block text-[10px] font-mono px-2 py-1 rounded bg-parchment-200 text-parchment-600">
              Página {currentPage}
            </span>
          </div>
        )}

        {/* Chapter heading */}
        {chapters.length > 0 && (
          <div className="mb-6 text-center">
            <div className="w-16 h-[2px] bg-parchment-400 mx-auto mb-4" />
            <h1 className="text-xl md:text-2xl font-bold text-parchment-900 leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}>
              {title}
            </h1>
            <p className="text-xs text-parchment-500 mt-2">{chapters.length} capítulos · {totalWords.toLocaleString()} palabras</p>
            <div className="w-16 h-[2px] bg-parchment-400 mx-auto mt-4" />
          </div>
        )}

        {/* Paragraphs */}
        <div className="space-y-3 leading-relaxed font-serif text-parchment-900"
             style={{ fontSize: `${fontSize}px`, lineHeight: '1.75' }}>
          {visibleParagraphs.map((para, i) => {
            const isChapter = chapters.some(ch => ch.paragraphIndex === i + allParagraphs.indexOf(para));
            return (
              <p key={i} id={`para-${i}`}
                className={`text-justify ${i === 0 ? 'first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-0.5' : ''} ${isChapter ? 'mt-10 pt-2 border-t border-parchment-200/60' : ''}`}
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.75' }}>
                {para}
              </p>
            );
          })}
        </div>

        {/* End marker */}
        <div className="text-center mt-12 mb-6">
          <div className="w-12 h-[2px] bg-parchment-300 mx-auto" />
          <p className="text-[10px] text-parchment-400 mt-2 italic">Fin del texto</p>
        </div>
      </div>
    </ReaderShell>
  );
}

// ─── Reader Shell ─────────────────────────────────────────

function ReaderShell({
  title, archiveUrl, sidebar, sidebarOpen, onToggleSidebar, children,
}: {
  title: string;
  archiveUrl?: string;
  sidebar: React.ReactNode | null;
  sidebarOpen: boolean;
  onToggleSidebar: (type: 'toc' | 'pages') => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-parchment-100 border-2 border-parchment-300 rounded-xl overflow-hidden relative">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-parchment-300 bg-parchment-200/70">
        <div className="flex items-center gap-1.5 text-xs text-parchment-700 min-w-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
          <span className="font-medium truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          {(sidebar !== null) && (
            <>
              <button
                onClick={() => onToggleSidebar('toc')}
                className={`px-2 py-1 text-[10px] rounded border transition-colors
                  ${sidebarOpen ? 'bg-parchment-700 text-parchment-50 border-parchment-700' : 'bg-parchment-50 text-parchment-600 border-parchment-300 hover:bg-parchment-200'}`}
                title="Tabla de contenidos"
              >
                ☰ Capítulos
              </button>
              <button
                onClick={() => onToggleSidebar('pages')}
                className={`px-2 py-1 text-[10px] rounded border transition-colors
                  ${sidebarOpen ? 'bg-parchment-700 text-parchment-50 border-parchment-700' : 'bg-parchment-50 text-parchment-600 border-parchment-300 hover:bg-parchment-200'}`}
                title="Páginas"
              >
                📄 Páginas
              </button>
            </>
          )}
          {archiveUrl && (
            <a href={archiveUrl} target="_blank" rel="noopener noreferrer"
              className="shrink-0 px-2 py-1 text-[10px] rounded bg-parchment-700 hover:bg-parchment-800 text-parchment-50 border border-parchment-700 transition-colors"
              title="Descargar PDF">
              ↓ PDF
            </a>
          )}
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && sidebar && (
        <div className="absolute top-[42px] left-0 w-64 max-w-[80vw] bg-parchment-50 border-r-2 border-b-2 border-parchment-300 rounded-br-xl shadow-xl z-20 max-h-[80vh] overflow-auto">
          {sidebar}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
}
