import { useEffect, useState, useRef, useMemo } from 'react';
import { getBookText, hasTextFile } from '../data/texts';

interface Props {
  bookId: string;
  title: string;
  archiveUrl?: string;
}

// Books whose PDFs are scanned images (no extractable text)
const SCANNED_BOOKS = new Set([
  'enoc2_morfill', 'ireneo_keble', 'apocalipsis_revelado', 'reuchlin', 'cristianismo_verdadero',
]);

export default function BookReader({ bookId, title, archiveUrl }: Props) {
  const [textData, setTextData] = useState<Awaited<ReturnType<typeof getBookText>>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<'scan' | 'missing' | 'load' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ page: number; context: string }[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSearchQuery('');
    setSearchResults([]);
    setSearchActive(false);

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
      if (!cancelled) {
        setError('load');
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [bookId]);

  // Combine all pages into continuous text (with page markers)
  const fullText = useMemo(() => {
    if (!textData) return '';
    return textData.pages
      .map(p => p.text.trim())
      .filter(Boolean)
      .join('\n\n');
  }, [textData]);

  // Search within text
  const handleSearch = () => {
    if (!searchQuery.trim() || !textData) {
      setSearchResults([]);
      setSearchActive(false);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results: { page: number; context: string }[] = [];
    for (const page of textData.pages) {
      const text = page.text;
      const idx = text.toLowerCase().indexOf(q);
      if (idx !== -1) {
        const start = Math.max(0, idx - 60);
        const end = Math.min(text.length, idx + q.length + 60);
        let context = text.slice(start, end).replace(/\s+/g, ' ');
        if (start > 0) context = '…' + context;
        if (end < text.length) context = context + '…';
        results.push({ page: page.num, context });
      }
    }
    setSearchResults(results);
    setSearchActive(true);
  };

  // Loading state
  if (loading) {
    return (
      <ReaderShell title={title} archiveUrl={archiveUrl}>
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

  // Scanned book — no extractable text
  if (error === 'scan') {
    return (
      <ReaderShell title={title} archiveUrl={archiveUrl}>
        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
          <div className="text-5xl mb-4 text-parchment-400">📖</div>
          <h3 className="text-lg font-bold text-parchment-700 mb-2">Libro escaneado</h3>
          <p className="text-sm text-parchment-500 max-w-md mb-6">
            Este libro está compuesto por imágenes escaneadas (no tiene texto seleccionable).
            Puedes descargar el PDF original para leerlo.
          </p>
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

  // Missing text file
  if (error === 'missing') {
    return (
      <ReaderShell title={title} archiveUrl={archiveUrl}>
        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
          <div className="text-5xl mb-4 text-parchment-400">?</div>
          <h3 className="text-lg font-bold text-parchment-700 mb-2">Texto no disponible</h3>
          <p className="text-sm text-parchment-500 max-w-md">
            El texto de este libro aún no está disponible en la biblioteca.
          </p>
        </div>
      </ReaderShell>
    );
  }

  // Load error
  if (error === 'load') {
    return (
      <ReaderShell title={title} archiveUrl={archiveUrl}>
        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
          <div className="text-5xl mb-4 text-parchment-400">⚠️</div>
          <h3 className="text-lg font-bold text-parchment-700 mb-2">Error al cargar</h3>
          <p className="text-sm text-parchment-500 max-w-md mb-6">
            No se pudo cargar el texto. Intenta de nuevo o descarga el PDF original.
          </p>
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

  // === NORMAL TEXT DISPLAY ===
  // Split text into paragraphs for rendering
  const paragraphs = fullText.split('\n\n').filter(Boolean);

  return (
    <ReaderShell title={title} archiveUrl={archiveUrl}>
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

      {/* Search results overlay */}
      {searchActive && searchResults.length > 0 && (
        <div className="px-4 py-3 border-b border-parchment-300 bg-amber-50/80">
          <p className="text-xs text-parchment-500 mb-2">
            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para «{searchQuery}»
          </p>
          <div className="max-h-40 overflow-y-auto space-y-1.5">
            {searchResults.map((r, i) => (
              <button key={i} onClick={() => {
                setSearchActive(false);
                // Scroll to the paragraph containing this result
                const el = document.getElementById(`page-${r.page}`);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        </div>
      )}

      {searchActive && searchResults.length === 0 && (
        <div className="px-4 py-3 border-b border-parchment-300 bg-amber-50/80">
          <p className="text-xs text-parchment-500">Sin resultados para «{searchQuery}»</p>
        </div>
      )}

      {/* Text content */}
      <div ref={contentRef} className="p-6 md:p-10 max-w-3xl mx-auto">
        <div className="space-y-3 leading-relaxed font-serif text-parchment-900 text-[15px] md:text-base">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-justify indent-0">
              {para.split('\n').map((line, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* Page info */}
      {textData && (
        <div className="px-6 pb-6 text-center text-xs text-parchment-400">
          {textData.totalPages} páginas · {fullText.split(/\s+/).filter(Boolean).toLocaleString()} palabras
        </div>
      )}
    </ReaderShell>
  );
}

// Shared shell — title bar + download link
function ReaderShell({ title, archiveUrl, children }: { title: string; archiveUrl?: string; children: React.ReactNode }) {
  return (
    <div className="bg-parchment-100 border-2 border-parchment-300 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-parchment-300 bg-parchment-200/70">
        <div className="flex items-center gap-2 text-xs text-parchment-700 min-w-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
          <span className="font-medium truncate">{title}</span>
        </div>
        {archiveUrl && (
          <a href={archiveUrl} target="_blank" rel="noopener noreferrer"
             className="shrink-0 px-2 py-1 text-xs rounded bg-parchment-700 hover:bg-parchment-800 text-parchment-50 border border-parchment-700 transition-colors"
             title="Descargar PDF">
            ↓ PDF
          </a>
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
