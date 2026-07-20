import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  allEvidence,
  categoryLabels,
  type EvidenceCategory,
  type EvidenceItem,
} from '../data/yaldabaoth-evidence';

// ─── Icons per category ─────────────────────────────────────
const CAT_ICON: Record<EvidenceCategory, string> = {
  gnosis_direct: '📜',
  ot_as_demiurge: '📖',
  nt_distinction: '✝️',
  patristic_witness: '📚',
  kabbalah: '✡️',
  true_god: '✨',
};

const CAT_COLORS: Record<EvidenceCategory, string> = {
  gnosis_direct: '#6db36d',
  ot_as_demiurge: '#c9a84c',
  nt_distinction: '#c0392b',
  patristic_witness: '#d4a574',
  kabbalah: '#b080d0',
  true_god: '#3498db',
};

const CAT_BG: Record<EvidenceCategory, string> = {
  gnosis_direct: 'rgba(109,179,109,0.10)',
  ot_as_demiurge: 'rgba(201,168,76,0.10)',
  nt_distinction: 'rgba(192,57,43,0.08)',
  patristic_witness: 'rgba(212,165,116,0.10)',
  kabbalah: 'rgba(176,128,208,0.10)',
  true_god: 'rgba(52,152,219,0.10)',
};

const STRENGTH_COLORS: Record<string, string> = {
  irrefutable: '#c0392b',
  solida: '#d4a017',
  fuerte: '#2980b9',
  convergente: '#7f8c8d',
};

type MainTab = 'yaldabaoth' | 'truegod';

// ─── Evidence Card ──────────────────────────────────────────
function EvidenceCard({ item, allItems }: { item: EvidenceItem; allItems: EvidenceItem[] }) {
  const color = CAT_COLORS[item.category];
  const bg = CAT_BG[item.category];
  const [expanded, setExpanded] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

  const related = item.relatedItems
    ? item.relatedItems.map(id => allItems.find(i => i.id === id)).filter(Boolean) as EvidenceItem[]
    : [];

  const strengthLabel = item.strength === 'irrefutable' ? '🔴 Irrefutable'
    : item.strength === 'solida' ? '🟡 Sólida'
    : item.strength === 'fuerte' ? '🔵 Fuerte'
    : '⚪ Convergente';

  return (
    <div className="rounded-xl border-2 overflow-hidden transition-all duration-200 hover:shadow-lg"
      style={{ borderColor: `${color}44`, backgroundColor: '#fefcf8' }}
    >
      {/* Bar */}
      <div className="h-1" style={{ backgroundColor: color }} />

      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl shrink-0 mt-0.5">{CAT_ICON[item.category]}</span>
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-bold text-parchment-900 leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}>
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-xs italic text-parchment-600 mt-0.5">{item.subtitle}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: bg, color }}>
                {item.source}
              </span>
              {item.bookId && (
                <Link to={`/libro/${item.bookId}`}
                  className="text-[10px] underline decoration-dotted opacity-70 hover:opacity-100" style={{ color }}>
                  Ir al libro →
                </Link>
              )}
            </div>
          </div>
          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0"
            style={{ backgroundColor: `${STRENGTH_COLORS[item.strength]}18`, color: STRENGTH_COLORS[item.strength] }}>
            {strengthLabel}
          </span>
        </div>

        {/* Quotes */}
        <div className="space-y-2 mb-3">
          {item.quotes.map((q, i) => (
            <div key={i} className="bg-amber-50/80 border-l-3 rounded-r px-4 py-2.5"
              style={{ borderLeft: '3px solid', borderColor: color }}>
              <p className="text-xs text-parchment-800 leading-relaxed italic">
                {q.translation || q.text}
              </p>
              <p className="text-[10px] text-parchment-500 mt-1 font-mono">
                — {q.reference}
              </p>
            </div>
          ))}
        </div>

        {/* Argument (collapsible) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-bold mb-1 transition-colors"
          style={{ color }}
        >
          <span className="transition-transform duration-200" style={{ transform: expanded ? 'rotate(90deg)' : '' }}>
            ▶
          </span>
          {expanded ? 'Ocultar argumento' : 'Ver argumento completo'}
        </button>

        {expanded && (
          <div className="bg-parchment-100/80 rounded-lg px-4 py-3 mb-3 border border-parchment-300">
            <p className="text-xs text-parchment-800 leading-relaxed">{item.argument}</p>
            {item.note && (
              <div className="mt-3 pt-3 border-t border-parchment-300">
                <p className="text-[11px] text-parchment-600 italic leading-relaxed">
                  <strong>📝 Nota:</strong> {item.note}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Related connections */}
        {related.length > 0 && (
          <>
            <button
              onClick={() => setShowRelated(!showRelated)}
              className="text-[11px] font-medium underline decoration-dotted opacity-60 hover:opacity-100 transition-opacity"
            >
              {showRelated ? '− Ocultar conexiones' : `+ ${related.length} conexión${related.length > 1 ? 'es' : ''}`}
            </button>
            {showRelated && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {related.map(r => {
                  const rc = CAT_COLORS[r.category];
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        document.getElementById(`evidence-${r.id}`)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[10px] px-2 py-1 rounded-full border transition-all hover:shadow-sm"
                      style={{ borderColor: `${rc}44`, backgroundColor: `${rc}10`, color: rc }}
                    >
                      {CAT_ICON[r.category]} {r.title.slice(0, 40)}…
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Category Section ───────────────────────────────────────
function CategorySection({ category, items, allItems, collapsed }: {
  category: EvidenceCategory;
  items: EvidenceItem[];
  allItems: EvidenceItem[];
  collapsed: boolean;
}) {
  const color = CAT_COLORS[category];
  const label = categoryLabels[category];
  const [isOpen, setIsOpen] = useState(!collapsed);

  if (items.length === 0) return null;

  return (
    <section>
      {/* Category header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md mb-4"
        style={{ border: `1px solid ${color}44` }}
      >
        <div className="p-4" style={{ backgroundColor: `${color}08` }}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl shrink-0">{CAT_ICON[category]}</span>
              <div>
                <h2 className="text-base font-bold leading-tight" style={{ color, fontFamily: "'Georgia', serif" }}>
                  {label.label}
                </h2>
                <p className="text-[11px] text-parchment-600 mt-0.5">{label.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}18`, color }}>
                {items.length} evidencia{items.length !== 1 ? 's' : ''}
              </span>
              <span className="text-lg transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : '' }}>
                ▼
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* Evidence items */}
      {isOpen && (
        <div className="space-y-4 mb-6">
          {items.map(item => (
            <div key={item.id} id={`evidence-${item.id}`}>
              <EvidenceCard item={item} allItems={allItems} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Summary Section ────────────────────────────────────────
function SummarySection() {
  return (
    <div className="bg-amber-50/90 border-2 border-amber-400/60 rounded-xl p-5 md:p-8">
      <h2 className="text-xl font-bold text-parchment-900 mb-3 text-center" style={{ fontFamily: "'Georgia', serif" }}>
        Conclusión: La evidencia es abrumadora
      </h2>
      <div className="max-w-3xl mx-auto space-y-3 text-xs text-parchment-700 leading-relaxed">
        <p>
          <strong>La tesis de que Yaldabaoth es el Dios creador de este mundo, identificado con Yahvé del Antiguo Testamento,</strong>
          {' '}no es una interpretación forzada ni una especulación moderna. Está apoyada por:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Textos gnósticos directos</strong> (Apócrifo de Juan, Hipostasis, Origen del Mundo) que describen a Yaldabaoth creando el mundo material, declarándose el único Dios por ignorancia, y cuyos siete nombres son los nombres de Dios en el AT: Yahvé, Sabaoth, Adonai, Elohim.</li>
          <li><strong>El Antiguo Testamento mismo</strong>, que revela a Yahvé como un dios tribal, celoso, violento, que se arrepiente de crear, que ordena genocidios, y que compite con otros dioses — exactamente como los gnósticos describen a Yaldabaoth.</li>
          <li><strong>Jesús y el Nuevo Testamento</strong>, que distinguen sistemáticamente al Padre (Dios de amor universal) del "príncipe de este mundo" / "dios de este siglo" — un ser inferior que gobierna el cosmos material.</li>
          <li><strong>Los Padres de la Iglesia</strong>, que documentan que los gnósticos del siglo II identificaban a Yaldabaoth con el Dios de los judíos y usaban pasajes del AT (Isaías 45:5, etc.) como prueba.</li>
          <li><strong>La convergencia kabbalística</strong>, donde la tradición judía independientemente distingue entre Ein Sof (el Infinito incognoscible) y el Creador manifestado.</li>
        </ul>

        <div className="bg-parchment-100 border border-parchment-300 rounded-lg p-4 mt-4">
          <p className="text-xs text-parchment-700 leading-relaxed">
            <strong>La evidencia es convergente</strong>: múltiples fuentes independientes, de distintas culturas, idiomas y épocas, apuntan en la misma dirección. No hay una sola línea de evidencia — hay cinco líneas independientes que se cruzan y confirman mutuamente. Irrefutable no significa "aceptada por todos" — en teología nada lo es. Pero significa que la posición está tan sólidamente apoyada por las fuentes que negarla requiere ignorar o reinterpretar violentamente los textos.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {([
            ['📜', 'Textos gnósticos', gnosticCount()],
            ['📖', 'Evidencia del AT', otEvCount()],
            ['✝️', 'Evidencia del NT', ntEvCount()],
            ['📚', 'Testigos patrísticos', patrCount()],
            ['✡️', 'Convergencia kabbalística', kabCount()],
            ['✨', 'Sobre el Dios verdadero', trueGodCount()],
          ] as const).map(([icon, label, count]) => (
            <div key={label} className="bg-parchment-50 border border-parchment-300 rounded-lg px-3 py-2 text-center">
              <span className="text-lg block">{icon}</span>
              <p className="text-[10px] font-bold text-parchment-700">{label}</p>
              <p className="text-[10px] text-parchment-500">{count} evidencias</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function gnosticCount() { return allEvidence.filter(e => e.category === 'gnosis_direct').length; }
function otEvCount() { return allEvidence.filter(e => e.category === 'ot_as_demiurge').length; }
function ntEvCount() { return allEvidence.filter(e => e.category === 'nt_distinction').length; }
function patrCount() { return allEvidence.filter(e => e.category === 'patristic_witness').length; }
function kabCount() { return allEvidence.filter(e => e.category === 'kabbalah').length; }
function trueGodCount() { return allEvidence.filter(e => e.category === 'true_god').length; }

// ─── Hero Section ───────────────────────────────────────────
function YHero() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-parchment-900 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
        Pruebas irrefutables
      </h1>
      <p className="text-base font-bold text-parchment-700 mb-4 italic">
        Yaldabaoth es el Dios Creador de este mundo = Yahvé del Antiguo Testamento
      </p>
      <p className="text-xs text-parchment-600 leading-relaxed max-w-3xl mx-auto">
        <strong className="text-parchment-800">{allEvidence.length} piezas de evidencia</strong> organizadas en 5 categorías + el Dios Verdadero.
        Cada pieza incluye fuente, cita textual, contexto y argumento lógico.
        No hay interpretación forzada — solo los textos hablando por sí mismos.
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function YaldabaothEvidence() {
  const [activeTab, setActiveTab] = useState<MainTab>('yaldabaoth');
  const [filterStr, setFilterStr] = useState('');

  const yaldabaothCats: EvidenceCategory[] = ['gnosis_direct', 'ot_as_demiurge', 'nt_distinction', 'patristic_witness', 'kabbalah'];
  const trueGodCats: EvidenceCategory[] = ['true_god'];

  const filteredEvidence = useMemo(() => {
    if (!filterStr.trim()) return allEvidence;
    const q = filterStr.toLowerCase();
    return allEvidence.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.subtitle?.toLowerCase().includes(q) ||
      e.source.toLowerCase().includes(q) ||
      e.argument.toLowerCase().includes(q) ||
      e.quotes.some(qt => (qt.translation || qt.text).toLowerCase().includes(q))
    );
  }, [filterStr]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5e6c8' }}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <YHero />

        {/* Search */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Buscar en toda la evidencia..."
            value={filterStr}
            onChange={e => setFilterStr(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-parchment-400 bg-parchment-50 text-sm text-parchment-800 placeholder:text-parchment-400 focus:outline-none focus:border-parchment-600 transition-colors"
          />
        </div>

        {/* Main tabs */}
        <div className="flex justify-center">
          <div className="inline-flex bg-parchment-200 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => { setActiveTab('yaldabaoth'); setFilterStr(''); }}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
                activeTab === 'yaldabaoth'
                  ? 'bg-parchment-700 text-parchment-50 shadow-md'
                  : 'text-parchment-600 hover:text-parchment-800'
              }`}
            >
              🐉 Yaldabaoth = Creador = Yahvé
            </button>
            <button
              onClick={() => { setActiveTab('truegod'); setFilterStr(''); }}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
                activeTab === 'truegod'
                  ? 'bg-parchment-700 text-parchment-50 shadow-md'
                  : 'text-parchment-600 hover:text-parchment-800'
              }`}
            >
              ✨ El Verdadero Dios (Pleroma/Ein Sof)
            </button>
          </div>
        </div>

        {/* Filtered view */}
        {filterStr.trim() && (
          <div className="space-y-4">
            <p className="text-xs text-parchment-500 text-center">
              {filteredEvidence.length} resultado{filteredEvidence.length !== 1 ? 's' : ''} para "{filterStr}"
            </p>
            {filteredEvidence.length > 0 ? (
              filteredEvidence.map(item => (
                <EvidenceCard key={item.id} item={item} allItems={allEvidence} />
              ))
            ) : (
              <p className="text-sm text-parchment-500 text-center py-8">Sin resultados.</p>
            )}
          </div>
        )}

        {/* ════════ YALDABAOTH TAB ════════ */}
        {!filterStr.trim() && activeTab === 'yaldabaoth' && (
          <div className="space-y-6">
            {/* Intro */}
            <div className="bg-parchment-50/90 border-2 border-parchment-300 rounded-xl p-5 text-center max-w-3xl mx-auto">
              <p className="text-xs text-parchment-700 leading-relaxed">
                Esta sección presenta <strong>{allEvidence.filter(e => yaldabaothCats.includes(e.category)).length} piezas de evidencia</strong> de 5 categorías distintas que demuestran que Yaldabaoth es el Dios creador de este mundo, identificado con Yahvé del Antiguo Testamento.
                Cada pieza de evidencia es independiente de las otras — la convergencia es lo que hace el caso irrefutable.
              </p>
            </div>

            {/* Category sections */}
            {yaldabaothCats.map(cat => (
              <CategorySection
                key={cat}
                category={cat}
                items={allEvidence.filter(e => e.category === cat)}
                allItems={allEvidence}
                collapsed={false}
              />
            ))}
          </div>
        )}

        {/* ════════ TRUE GOD TAB ════════ */}
        {!filterStr.trim() && activeTab === 'truegod' && (
          <div className="space-y-6">
            {/* Intro */}
            <div className="bg-blue-50/90 border-2 border-blue-300 rounded-xl p-5 text-center max-w-3xl mx-auto">
              <p className="text-xs text-parchment-700 leading-relaxed">
                Si Yaldabaoth/Yahvé no es el Dios supremo, ¿entonces QUIÉN es el Dios verdadero?
                Esta sección presenta <strong>{trueGodCount()} piezas de evidencia</strong> sobre el Padre de Jesús — el Dios incognoscible, el Pleroma, el Ein Sof de la Kabbalah — convergiendo desde el gnosticismo, el NT canónico, la mística judía y la tradición apofática cristiana.
              </p>
            </div>

            {trueGodCats.map(cat => (
              <CategorySection
                key={cat}
                category={cat}
                items={allEvidence.filter(e => e.category === cat)}
                allItems={allEvidence}
                collapsed={false}
              />
            ))}
          </div>
        )}

        {/* Summary (always at bottom) */}
        {!filterStr.trim() && <SummarySection />}

        {/* Footer */}
        <div className="text-center py-4 border-t border-parchment-300">
          <p className="text-[11px] text-parchment-500 italic max-w-2xl mx-auto">
            Todas las citas están verificadas contra las ediciones críticas estándar. Las traducciones del hebreo bíblico, griego koiné, copto y latín son propias o de ediciones críticas. Referencias disponibles bajo solicitud.
          </p>
        </div>
      </div>
    </div>
  );
}
