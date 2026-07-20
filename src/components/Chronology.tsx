import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { timeline, type TimelineItem } from '../data/chronology';
import { bibleConnections, connectionTypeLabels, type ConnectionType } from '../data/bible-connections';
import { categories } from '../data/books';
import type { BookCategoryId } from '../data/types';

type ViewMode = 'timeline' | 'pure';

// Category color palette (same as Library)
const CAT_COLORS: Record<string, string> = {
  canonicos:     '#c9a84c',
  pseudepigrafos: '#b8885a',
  gnosticos:     '#6db36d',
  patristica:    '#d4a574',
  kabbalah:      '#b080d0',
  swedenborg:    '#7ab8d4',
};

const CAT_BG: Record<string, string> = {
  canonicos:     'rgba(201,168,76,0.12)',
  pseudepigrafos: 'rgba(184,136,90,0.12)',
  gnosticos:     'rgba(109,179,109,0.12)',
  patristica:    'rgba(212,165,116,0.12)',
  kabbalah:      'rgba(176,128,208,0.12)',
  swedenborg:    'rgba(122,184,212,0.12)',
};

// Era colors
const ERA_COLORS = [
  { bg: 'from-[#1a1a2e] to-[#2a2a4e]', text: '#f5e6c8', accent: '#c9a84c' },
  { bg: 'from-[#1a2f1a] to-[#2a4f2a]', text: '#e0f0e0', accent: '#6db36d' },
  { bg: 'from-[#2d1b29] to-[#4d2b39]', text: '#f0e0c8', accent: '#b8885a' },
  { bg: 'from-[#1e1e3a] to-[#3e3e5a]', text: '#e8ddf5', accent: '#b080d0' },
  { bg: 'from-[#2c1810] to-[#4c2820]', text: '#f0e6d8', accent: '#d4a574' },
  { bg: 'from-[#1a2e3a] to-[#2a4e5a]', text: '#d8eef5', accent: '#7ab8d4' },
];

const CONNECTION_ERA_COLORS: Record<ConnectionType, { bg: string; accent: string; text: string }> = {
  biblical_core:    { bg: 'from-[#1a1a2e] to-[#2a2a4e]', accent: '#c9a84c', text: '#f5e6c8' },
  cited_in_bible:   { bg: 'from-[#2d1b29] to-[#4d2b39]', accent: '#e8c4a0', text: '#f0e0c8' },
  biblical_ms:      { bg: 'from-[#2c1810] to-[#4c2820]', accent: '#d4a574', text: '#f0e6d8' },
  apostolic_claim:  { bg: 'from-[#1a2f1a] to-[#2a4f2a]', accent: '#6db36d', text: '#e0f0e0' },
  parallel_text:    { bg: 'from-[#1e1e3a] to-[#3e3e5a]', accent: '#b080d0', text: '#e8ddf5' },
  historical_witness: { bg: 'from-[#1a2e3a] to-[#2a4e5a]', accent: '#7ab8d4', text: '#d8eef5' },
  preserve_quotes:  { bg: 'from-[#2a2a1a] to-[#4a4a2a]', accent: '#b8b86d', text: '#f0f0e0' },
};

// Group timeline items by era
function groupByEra(items: TimelineItem[]) {
  const groups: { era?: TimelineItem; items: TimelineItem[] }[] = [];
  let current: { era?: TimelineItem; items: TimelineItem[] } = { items: [] };

  for (const item of items) {
    if (item.type === 'era') {
      if (current.items.length > 0 || current.era) {
        groups.push(current);
      }
      current = { era: item, items: [] };
    } else {
      current.items.push(item);
    }
  }
  if (current.items.length > 0 || current.era) groups.push(current);
  return groups;
}

// Group pure connections by type
function groupByConnectionType() {
  const groups: { type: ConnectionType; label: string; books: typeof bibleConnections }[] = [];
  const order: ConnectionType[] = ['biblical_core', 'cited_in_bible', 'biblical_ms', 'apostolic_claim', 'parallel_text', 'historical_witness', 'preserve_quotes'];

  for (const t of order) {
    const books = bibleConnections.filter(b => b.connectionType === t);
    if (books.length > 0) {
      groups.push({ type: t, label: connectionTypeLabels[t], books });
    }
  }
  return groups;
}

const connectionGrouped = groupByConnectionType();

// ─── Timeline Card ──────────────────────────────────────────
function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const catColor = item.categoryId ? CAT_COLORS[item.categoryId] : undefined;
  const catBg = item.categoryId ? CAT_BG[item.categoryId] : undefined;
  const leftSide = index % 2 === 0;
  const isEvent = item.type === 'event';
  const yearStr = item.yearLabel
    ? (item.endYearLabel ? `${item.yearLabel} — ${item.endYearLabel}` : item.yearLabel)
    : '';

  if (isEvent) {
    return (
      <div className="group relative flex items-start gap-4 md:gap-8 py-4">
        <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-6 z-10">
          <div className="w-[14px] h-[14px] rounded-full border-2 border-parchment-500 bg-parchment-200 shadow" />
        </div>
        <div className="ml-8 md:ml-0 md:w-1/2 md:mx-auto">
          <div className="bg-parchment-50/90 backdrop-blur-sm border border-parchment-400 rounded-lg px-4 py-3 max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm">{item.icon}</span>
              <span className="text-[11px] font-mono text-parchment-500">{yearStr}</span>
            </div>
            <p className="text-sm font-bold text-parchment-800">{item.title}</p>
            {item.description && (
              <p className="text-xs text-parchment-600 mt-1 leading-relaxed">{item.description}</p>
            )}
          </div>
        </div>
        <div className="hidden md:block md:w-1/2" />
      </div>
    );
  }

  return (
    <div className={`group relative flex items-start gap-4 md:gap-8 py-3 md:py-4 ${leftSide ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-6 z-10">
        <div className="w-[14px] h-[14px] rounded-full border-2 shadow"
          style={{ borderColor: catColor || '#888', backgroundColor: catColor || '#999' }}
        />
      </div>
      <div className={`ml-8 md:ml-0 md:w-[calc(50%-32px)] ${leftSide ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'}`}>
        <Link to={item.bookId ? `/libro/${item.bookId}` : '#'} className="block group/card">
          <div className="rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            style={{ borderColor: catColor || '#ccc', backgroundColor: catBg || '#fefcf8' }}>
            {catColor && <div className="h-1" style={{ backgroundColor: catColor }} />}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded"
                  style={{ backgroundColor: catColor ? `${catColor}22` : '#eee', color: catColor || '#666' }}>
                  {yearStr}
                </span>
                {item.categoryId && (
                  <span className="text-[10px] uppercase tracking-wider opacity-60" style={{ color: catColor || '#888' }}>
                    {categories.find(c => c.id === item.categoryId)?.name || item.categoryId}
                  </span>
                )}
                {item.icon && <span className="text-sm ml-auto">{item.icon}</span>}
              </div>
              <h3 className="text-sm font-bold text-parchment-900 leading-tight mb-0.5 group-hover/card:underline decoration-parchment-500/50">
                {item.title}
              </h3>
              {item.subtitle && <p className="text-[11px] italic text-parchment-500 mb-1.5">{item.subtitle}</p>}
              <p className="text-xs text-parchment-700 leading-relaxed line-clamp-3">{item.description}</p>
              {item.significance && (
                <p className="text-[11px] mt-2 italic leading-relaxed pl-2 border-l-2"
                  style={{ borderColor: catColor || '#ccc', color: catColor || '#666' }}>
                  {item.significance}
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

// ─── Pure Connection Card ────────────────────────────────────
function PureConnectionCard({ conn }: { conn: typeof bibleConnections[number] }) {
  const catColor = CAT_COLORS[conn.categoryId];
  return (
    <Link to={`/libro/${conn.bookId}`} className="block group/card">
      <div className="rounded-xl border-2 overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
        style={{ borderColor: catColor || '#ccc', backgroundColor: CAT_BG[conn.categoryId] || '#fefcf8' }}>
        {/* Evidence header */}
        <div className="bg-parchment-800/5 border-b border-parchment-300/50 px-5 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ backgroundColor: `${catColor}22`, color: catColor }}>
              {categories.find(c => c.id === conn.categoryId)?.name || conn.categoryId}
            </span>
          </div>
          <h3 className="text-base font-bold text-parchment-900 leading-tight group-hover/card:underline decoration-parchment-500/50">
            {conn.title}
          </h3>
          {conn.subtitle && <p className="text-xs italic text-parchment-500 mt-0.5">{conn.subtitle}</p>}
        </div>

        <div className="p-5 space-y-3">
          {/* Bible references */}
          <div className="flex flex-wrap gap-1.5">
            {conn.bibleLinks.map((ref, i) => (
              <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-parchment-200/80 text-parchment-700 border border-parchment-300">
                {ref}
              </span>
            ))}
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-green-100 text-green-800 border border-green-300">
              ✅ {connectionTypeLabels[conn.connectionType]}
            </span>
          </div>

          {/* Evidence — the actual textual proof */}
          <div className="bg-amber-50/80 border-l-3 border-parchment-400 rounded-r px-4 py-3 text-xs text-parchment-800 leading-relaxed"
            style={{ borderLeft: '3px solid', borderColor: catColor || '#c9a84c' }}>
            <span className="font-bold text-[10px] uppercase tracking-wider text-parchment-600 block mb-1">EVIDENCIA TEXTUAL</span>
            {conn.evidence}
          </div>

          {/* Detail */}
          <p className="text-xs text-parchment-700 leading-relaxed">
            {conn.detail}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function Chronology() {
  const [viewMode, setViewMode] = useState<ViewMode>('pure');
  const [filterCat, setFilterCat] = useState<BookCategoryId | 'all'>('all');

  const filteredTimeline = useMemo(() => {
    if (filterCat === 'all') return timeline;
    return timeline.filter(t => t.type === 'era' || (t as any).categoryId === filterCat);
  }, [filterCat]);

  const groups = useMemo(() => groupByEra(filteredTimeline), [filteredTimeline]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5e6c8' }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-parchment-900 mb-1" style={{ fontFamily: "'Georgia', serif" }}>
            Línea de Tiempo
          </h1>
          <p className="text-parchment-500 italic text-sm max-w-3xl mx-auto">
            {viewMode === 'timeline'
              ? 'Cronología completa desde las tradiciones orales hasta los descubrimientos modernos — cada texto en su contexto histórico.'
              : 'Libros con conexión textual DIRECTA y verificable con la Biblia. No interpretación. No opinión. Evidencia textual pura.'}
          </p>
        </div>

        {/* View mode tabs */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="inline-flex bg-parchment-200 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setViewMode('pure')}
              className={`px-5 py-2 rounded-md text-xs font-medium transition-all ${
                viewMode === 'pure'
                  ? 'bg-parchment-700 text-parchment-50 shadow-md'
                  : 'text-parchment-600 hover:text-parchment-800'
              }`}
            >
              📖 Conexión Bíblica Pura
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-5 py-2 rounded-md text-xs font-medium transition-all ${
                viewMode === 'timeline'
                  ? 'bg-parchment-700 text-parchment-50 shadow-md'
                  : 'text-parchment-600 hover:text-parchment-800'
              }`}
            >
              📜 Cronología Completa
            </button>
          </div>
        </div>

        {/* Category filter (timeline mode only) */}
        {viewMode === 'timeline' && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button onClick={() => setFilterCat('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filterCat === 'all' ? 'bg-parchment-800 text-parchment-50 shadow-md' : 'bg-parchment-200 text-parchment-700 hover:bg-parchment-300'
              }`}>
              Todo
            </button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setFilterCat(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterCat === cat.id ? 'bg-parchment-800 text-parchment-50 shadow-md' : 'bg-parchment-200 text-parchment-700 hover:bg-parchment-300'
                }`}>
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* ═══════ CONEXIÓN BÍBLICA PURA VIEW ═══════ */}
        {viewMode === 'pure' && (
          <div className="space-y-10">
            {/* Hero explanation */}
            <div className="bg-parchment-50/90 border-2 border-parchment-400 rounded-xl p-5 text-center max-w-3xl mx-auto">
              <p className="text-sm text-parchment-700 leading-relaxed">
                <strong className="text-parchment-900">¿Qué hace que un libro tenga "Conexión Bíblica Pura"?</strong>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-left text-xs text-parchment-600">
                {([
                  ['ES el texto bíblico', 'La Torah, LXX, NT y Peshitta en sus idiomas originales. No es "conexión" — es el texto mismo.', '#c9a84c'],
                  ['Citado en la Biblia', 'Libros que la Biblia menciona EXPLÍCITAMENTE (Jasher, Enoc, Asunción de Moisés). La Biblia misma los cita.', '#b8885a'],
                  ['Manuscrito bíblico', 'Encontrados entre los manuscritos de Qumrán o la LXX. Fueron considerados Escritura por comunidades judías/cristianas primitivas.', '#d4a574'],
                  ['Reclama ser Escritura', 'Textos que afirman ser enseñanzas de Jesús, los apóstoles, o revelación divina. No son "opinión" — reclaman autoridad.', '#6db36d'],
                  ['Paralelo bíblico directo', 'Sincronizan EXACTAMENTE con la narrativa bíblica. Revelan lo que la Biblia "omitió" o la tradición perdió.', '#b080d0'],
                  ['Testigo histórico externo', 'Historiador no-bíblico que CORROBORA los eventos del NT. Josefo menciona a Jesús, Juan Bautista, Santiago.', '#7ab8d4'],
                  ['Preserva citas bíblicas', 'Padres de la Iglesia que CITAN textos bíblicos perdidos o preservan tradiciones textuales antiguas.', '#b8b86d'],
                ] as const).map(([title, desc, color]) => (
                  <div key={title} className="flex items-start gap-2 bg-parchment-100/80 rounded-lg p-3">
                    <span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: color }} />
                    <div>
                      <strong className="text-parchment-800 block mb-0.5">{title}</strong>
                      <p className="text-parchment-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-parchment-500 mt-4 italic">
                {bibleConnections.length} libros con conexión bíblica directa verificable. Cero interpretación.
              </p>
            </div>

            {/* Books grouped by connection type */}
            {connectionGrouped.map(group => {
              const colors = CONNECTION_ERA_COLORS[group.type];
              return (
                <section key={group.type}>
                  {/* Type header */}
                  <div className={`bg-gradient-to-r ${colors.bg} rounded-xl px-5 py-4 mb-5 shadow-lg`}>
                    <h2 className="text-lg font-bold" style={{ color: colors.text, fontFamily: "'Georgia', serif" }}>
                      {group.label}
                    </h2>
                    <p className="text-xs mt-1" style={{ color: `${colors.text}99` }}>
                      {group.books.length} texto{group.books.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Book cards */}
                  <div className="space-y-4">
                    {group.books.map(conn => (
                      <PureConnectionCard key={conn.bookId} conn={conn} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Summary */}
            <div className="text-center py-6 border-t border-parchment-300 mt-6">
              <p className="text-xs text-parchment-500 italic max-w-2xl mx-auto">
                <strong>Nota:</strong> Esta sección excluye intencionalmente textos de Kabbalah, Swedenborg, Waite, Reuchlin,
                y comentarios modernos — no porque no tengan valor, sino porque representan <em>interpretación</em> posterior,
                no conexión textual directa con la Biblia. El criterio aquí es evidencia textual verificable.
              </p>
            </div>
          </div>
        )}

        {/* ═══════ TIMELINE VIEW ═══════ */}
        {viewMode === 'timeline' && (
          <div className="relative">
            {groups.map((group, gi) => {
              const eraStyle = ERA_COLORS[gi % ERA_COLORS.length];
              return (
                <div key={gi} className="relative mb-8">
                  {/* Era header */}
                  {group.era && (
                    <div className={`bg-gradient-to-r ${eraStyle.bg} rounded-xl px-6 py-4 mb-6 relative z-10 shadow-lg`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{group.era.icon}</span>
                        <div>
                          <h2 className="text-xl font-bold" style={{ color: eraStyle.text, fontFamily: "'Georgia', serif" }}>
                            {group.era.title}
                          </h2>
                          <p className="text-sm italic" style={{ color: `${eraStyle.text}cc` }}>
                            {group.era.subtitle}
                          </p>
                          <p className="text-xs mt-1" style={{ color: `${eraStyle.text}99` }}>
                            {group.era.description}
                          </p>
                        </div>
                        <div className="ml-auto text-right shrink-0">
                        {group.era.yearLabel && (
                          <span className="text-xs font-mono" style={{ color: eraStyle.accent }}>
                            {group.era.yearLabel}
                            {group.era.endYearLabel && <> — {group.era.endYearLabel}</>}
                          </span>
                        )}
                        <div className="text-[10px]" style={{ color: `${eraStyle.text}77` }}>
                          {group.items.length} textos
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <div className="relative">
                    <div className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-parchment-400 via-parchment-300 to-transparent" />
                    <div className="space-y-1">
                      {group.items.map((item, i) => (
                        <TimelineCard key={item.id} item={item} index={i} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
