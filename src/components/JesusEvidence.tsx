import { useState, useMemo } from 'react';
import { jesusSources, sourceTypes, CONFIRMED_FACTS, sourceTimeline, type HistoricalSource } from '../data/jesus-evidence';

const AUTHOR_TYPE_COLORS: Record<string, string> = {
  romano: '#c0392b',
  judio:  '#2980b9',
  griego: '#27ae60',
  sirio:  '#8e44ad',
  cristiano: '#b8860b',
};

const AUTHOR_TYPE_BG: Record<string, string> = {
  romano: 'rgba(192,57,43,0.10)',
  judio:  'rgba(41,128,185,0.10)',
  griego: 'rgba(39,174,96,0.10)',
  sirio:  'rgba(142,68,173,0.10)',
  cristiano: 'rgba(184,134,11,0.10)',
};

function SourceCard({ source }: { source: HistoricalSource }) {
  const color = AUTHOR_TYPE_COLORS[source.authorType];
  const bg = AUTHOR_TYPE_BG[source.authorType];
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative">
      {/* Year marker line */}
      <div className="hidden md:flex items-center gap-4 mb-2">
        <div className="w-20 text-right">
          <span className="text-xs font-mono font-bold" style={{ color }}>
            {source.date}
          </span>
        </div>
        <div className="flex-1 h-px" style={{ backgroundColor: `${color}44` }} />
        <span
          className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ backgroundColor: bg, color }}
        >
          {source.authorType}
        </span>
      </div>

      {/* Card */}
      <div
        className="ml-0 md:ml-28 rounded-xl border-2 overflow-hidden transition-all duration-200 hover:shadow-xl"
        style={{ borderColor: `${color}44`, backgroundColor: '#fefcf8' }}
      >
        {/* Top bar */}
        <div className="h-1" style={{ backgroundColor: color }} />

        <div className="p-5 md:p-6">
          {/* Mobile date + type */}
          <div className="flex items-center gap-2 mb-3 md:hidden">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded" style={{ backgroundColor: bg, color }}>
              {source.date}
            </span>
            <span className="text-[10px] uppercase tracking-widest opacity-60" style={{ color }}>
              {source.authorType}
            </span>
          </div>

          {/* Title row */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h2 className="text-lg font-bold text-parchment-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                {source.title}
              </h2>
              <p className="text-xs text-parchment-600 mt-0.5">
                <span className="font-semibold">{source.author}</span>
                {' — '}{source.work}
                {' · '}<span className="italic">{source.originalLang}</span>
              </p>
            </div>
            <span className="hidden md:inline text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap shrink-0" style={{ backgroundColor: bg, color }}>
              {source.date}
            </span>
          </div>

          {/* Quote */}
          <div className="bg-amber-50/80 border-l-3 rounded-r px-4 py-3 mb-4" style={{ borderLeft: '3px solid', borderColor: color }}>
            <p className="text-xs text-parchment-800 leading-relaxed italic">
              {source.translation}
            </p>
            {source.originalText && (
              <p className="text-[10px] text-parchment-500 leading-relaxed mt-2 font-mono tracking-tight">
                {source.originalText}
              </p>
            )}
          </div>

          {/* Context & Proof */}
          <div className="space-y-2 text-xs text-parchment-700 leading-relaxed mb-4">
            <p>
              <span className="font-bold text-parchment-800">Contexto: </span>
              {source.context}
            </p>
            <div>
              <span className="font-bold text-parchment-800">Confirma: </span>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {source.proves.map((p, i) => (
                  <li key={i} className="text-parchment-700">{p}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Historical value */}
          <div
            className="rounded-lg px-4 py-2.5 border"
            style={{ backgroundColor: `${color}08`, borderColor: `${color}22` }}
          >
            <p className="text-xs leading-relaxed">
              <span className="font-bold text-parchment-800">Valor histórico: </span>
              <span className="text-parchment-700">{source.historicalValue}</span>
            </p>
            <p className="text-[10px] text-parchment-500 mt-1 italic">
              Distancia temporal de Jesús (~30 d.C.): {source.distanceFromJesus}
            </p>
          </div>

          {/* Expand note for secondary sources */}
          {!expanded && source.authorType === 'cristiano' && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-3 text-[11px] font-medium underline decoration-dotted opacity-60 hover:opacity-100 transition-opacity"
              style={{ color }}
            >
              ¿Por qué incluimos esta fuente si es cristiana?
            </button>
          )}
          {expanded && (
            <div className="mt-3 text-[11px] text-parchment-600 bg-parchment-100 rounded-lg px-4 py-2.5 leading-relaxed">
              <strong>Incluimos a Julio Africano</strong> porque su obra es la única que PRESERVA las fuentes perdidas de Talo (~50 d.C.) y Flegón (~140 d.C.), dos historiadores no-cristianos del siglo I-II que documentaron la oscuridad durante la crucifixión. Sin Africano, habríamos perdido la evidencia más temprana (Talo, ~20 años después de la crucifixión).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineBar() {
  const sorted = [...sourceTimeline].sort((a, b) => a.dateAD - b.dateAD);
  const min = sorted[0].dateAD;
  const max = sorted[sorted.length - 1].dateAD;
  const span = max - min;

  return (
    <div className="bg-parchment-100/80 rounded-xl border border-parchment-300 p-5">
      <h3 className="text-sm font-bold text-parchment-800 mb-3 text-center" style={{ fontFamily: "'Georgia', serif" }}>
        Distancia temporal de los testigos
      </h3>
      <p className="text-xs text-parchment-600 text-center mb-5 italic">
        Cada fuente escrita está más cerca de Jesús (~30 d.C.) que los evangelios más antiguos (Marcos ~70 d.C.)
      </p>

      {/* Absolute timeline */}
      <div className="relative h-24 mb-4">
        {/* Reference line: Jesus death */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: '#c9a84c' }} />

        {/* Jesus marker */}
        <div className="absolute bottom-0 left-[2%] -translate-x-1/2 text-center">
          <div className="w-3 h-3 rounded-full bg-parchment-800 border-2 border-parchment-200 -mt-1.5 mx-auto" />
          <p className="text-[9px] font-bold text-parchment-800 mt-0.5 whitespace-nowrap">Jesús</p>
          <p className="text-[8px] text-parchment-500 whitespace-nowrap">~30 d.C.</p>
        </div>

        {/* Source dots */}
        {sorted.map(s => {
          const pct = ((s.dateAD - min) / span) * 95 + 2.5; // offset by 2.5% for Jesus marker
          return (
            <div
              key={s.id}
              className="absolute bottom-0 -translate-x-1/2"
              style={{ left: `${pct}%` }}
            >
              <div
                className="w-[10px] h-[10px] rounded-full border-2 shadow-sm -mb-[4px] mx-auto transition-transform hover:scale-150"
                style={{
                  backgroundColor: AUTHOR_TYPE_COLORS[s.authorType],
                  borderColor: '#fefcf8',
                }}
                title={`${s.name} (${s.date})`}
              />
              <p className="text-[8px] mt-1.5 whitespace-nowrap font-medium" style={{ color: AUTHOR_TYPE_COLORS[s.authorType] }}>
                {s.name}
              </p>
              <p className="text-[7px] text-parchment-500 whitespace-nowrap">{s.date}</p>
            </div>
          );
        })}
      </div>

      {/* Distance legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5 pt-3 border-t border-parchment-300">
        {sorted.map(s => (
          <div key={s.id} className="flex items-center gap-1.5 text-[10px] text-parchment-700">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: AUTHOR_TYPE_COLORS[s.authorType] }} />
            <span>{s.name}</span>
            <span className="text-parchment-500 ml-auto">{s.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Confirmed Facts Grid ──────────────────────────────────────
function ConfirmedFactsSection() {
  return (
    <div className="bg-parchment-100/80 rounded-xl border-2 border-parchment-300 p-5 md:p-8">
      <h2 className="text-xl font-bold text-parchment-900 mb-2 text-center" style={{ fontFamily: "'Georgia', serif" }}>
        Hechos Históricos Confirmados
      </h2>
      <p className="text-xs text-parchment-600 text-center mb-6">
        Hechos que la historiografía crítica considera establecidos por la convergencia de fuentes independientes
      </p>

      <div className="space-y-3">
        {CONFIRMED_FACTS.map((fact, i) => (
          <div key={i} className="bg-parchment-50 rounded-lg border border-parchment-300 overflow-hidden">
            <div className="flex items-start gap-2 p-3">
              <span className="text-parchment-500 font-mono text-[11px] mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-parchment-800 leading-snug">{fact.fact}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {fact.sources.map((src, j) => {
                    const source = jesusSources.find(s => s.name === src);
                    const color = source ? AUTHOR_TYPE_COLORS[source.authorType] : '#888';
                    return (
                      <span
                        key={j}
                        className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                        style={{ backgroundColor: `${color}15`, color }}
                      >
                        {src}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mythicism Section ─────────────────────────────────────────
function MythicismSection() {
  return (
    <div className="bg-amber-50/90 rounded-xl border-2 border-amber-400/60 p-5 md:p-8">
      <h2 className="text-lg font-bold text-parchment-900 mb-3 text-center" style={{ fontFamily: "'Georgia', serif" }}>
        ¿Existió Jesús? — El consenso histórico
      </h2>

      <div className="max-w-3xl mx-auto space-y-3 text-xs text-parchment-700 leading-religido">
        <p>
          <strong>Afirmación: "Jesús nunca existió; es un mito solar / un dios astroteológico / una invención de Pablo."</strong>
        </p>
        <p>
          Esta posición (llamada "teoría del mito de Jesús" o <em>Jesus mythicism</em>) es rechazada por
          la práctica totalidad de los historiadores especializados en el período, tanto cristianos como
          agnósticos y ateos. No existe ni un solo historiador de las religiones del mundo antiguo con
          credenciales académicas que sostenga que Jesús no existió.
        </p>
        <p className="font-bold text-parchment-800">¿Por qué?</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Las fuentes no-cristianas son demasiado tempranas:</strong> Mara bar Serapión (~73 d.C.)
            menciona al "Rey Sabio" de los judíos. Talo (~50 d.C.) registra la oscuridad durante la crucifixión.
            Son contemporáneas o anteriores a los evangelios.
          </li>
          <li>
            <strong>Múltiples fuentes independientes:</strong> Tácito (romano), Josefo (judío), Mara bar Serapión
            (sirio estoico), Luciano (griego satírico). No hay una sola fuente — hay una constelación de fuentes
            de distintas culturas, idiomas y perspectivas que coinciden en el mismo hecho: Jesús existió y fue
            crucificado bajo Pilato.
          </li>
          <li>
            <strong>El criterio de "atestiguación múltiple":</strong> En historiografía crítica, un hecho respaldado
            por fuentes independientes y no relacionadas entre sí tiene mayor probabilidad de ser histórico.
            La ejecución de Jesús por Pilato está confirmada por Tácito (romano, 116 d.C.), Josefo (judío, 93 d.C.),
            el Talmud (judío), y los evangelios (cristianos). Ninguna otra figura del período tiene esta cantidad
            de corroboración independiente.
          </li>
          <li>
            <strong>El argumento del silencio es insostenible:</strong> "Pero solo contamos con unos pocos párrafos."
            Eso es más evidencia que para la mayoría de las figuras del mundo antiguo. De los emperadores romanos
            del siglo I tenemos menos. De personas como Poncio Pilato — gobernador de Judea — tenemos una única
            inscripción (la Piedra Pilato) y algunas líneas de Josefo y Filón.
          </li>
          <li>
            <strong>La evidencia es inversamente proporcional a la tesis:</strong> Para que Jesús no hubiera
            existido, habría que explicar cómo surgió un movimiento masivo alrededor de una figura ficticia
            en una generación — con testigos vivos que podrían haberlo desmentido — y cómo historiadores
            hostiles como Tácito, que no tenían interés en promover el cristianismo, confirman la ejecución.
          </li>
        </ul>

        <div className="bg-parchment-100 border border-parchment-300 rounded-lg p-4 mt-4">
          <p className="text-xs text-parchment-700 leading-relaxed mb-2">
            <strong>La posición académica actual</strong> (Bart Ehrman, ateo; E. P. Sanders, agnóstico;
            John P. Meier, católico; Gerd Lüdemann, ateo; Dale Allison, protestante; Paula Fredriksen,
            judía): Jesús de Nazaret existió como figura histórica. Fue un judío del siglo I que predicó
            en Galilea y Judea, reunió seguidores, y fue ejecutado por crucifixión bajo Poncio Pilato
            durante el reinado de Tiberio. Los detalles teológicos se debaten; la existencia histórica no.
          </p>
          <p className="text-[11px] text-parchment-500 italic">
            "Los historiadores que mantienen la teoría del mito de Jesús lo hacen desde el activismo
            amateur, no desde la academia." — Bart Ehrman, <em>Did Jesus Exist?</em> (2012)
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Intro Hero ────────────────────────────────────────────────
function IntroHero() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-parchment-900 mb-3" style={{ fontFamily: "'Georgia', serif" }}>
        La prueba irrefutable de que Jesús existió
      </h1>
      <p className="text-base font-bold text-parchment-700 mb-4 italic">
        Historia Pura — fuentes no-bíblicas
      </p>
      <p className="text-sm text-parchment-600 leading-relaxed max-w-3xl mx-auto">
        Aquí no hay fe. No hay teología. No hay Biblia.
        Son <strong className="text-parchment-800">12 fuentes históricas independientes</strong> — romanas, judías, griegas y sirias —
        escritas por no-cristianos entre los años 50 y 400 d.C., que confirman la existencia de Jesús de Nazaret.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {sourceTypes.filter(t => t.id !== 'all').map(type => {
          const color = AUTHOR_TYPE_COLORS[type.id];
          const count = jesusSources.filter(s => s.authorType === type.id).length;
          return (
            <div
              key={type.id}
              className="text-[11px] px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: `${color}15`, color }}
            >
              {type.label}: {count} fuentes
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-parchment-500 mt-5 max-w-2xl mx-auto">
        Todas las citas están verificadas contra las ediciones críticas estándar. Referencias disponibles bajo solicitud.
      </p>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function JesusEvidence() {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = useMemo(() => {
    if (filterType === 'all') return jesusSources;
    return jesusSources.filter(s => s.authorType === filterType);
  }, [filterType]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5e6c8' }}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <IntroHero />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {sourceTypes.map(type => {
            const count = type.id === 'all'
              ? jesusSources.length
              : jesusSources.filter(s => s.authorType === type.id).length;
            return (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterType === type.id
                    ? 'bg-parchment-800 text-parchment-50 shadow-md'
                    : 'bg-parchment-200 text-parchment-700 hover:bg-parchment-300'
                }`}
              >
                {type.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Sources list */}
        <div className="space-y-8">
          {filtered.map(source => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>

        {/* Timeline visualization */}
        <TimelineBar />

        {/* Confirmed facts */}
        <ConfirmedFactsSection />

        {/* Mythicism refutation */}
        <MythicismSection />

        {/* Footer */}
        <div className="text-center py-6 border-t border-parchment-300">
          <p className="text-xs text-parchment-500 italic max-w-2xl mx-auto">
            Esta sección presenta evidencia histórica NO bíblica y NO teológica. 
            Cada fuente es independiente del Nuevo Testamento. El criterio es el método histórico estándar:
            fuentes primarias, atestiguación múltiple, testigos hostiles, y corroboración independiente.
          </p>
        </div>
      </div>
    </div>
  );
}
