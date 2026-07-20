import { getConnection } from '../data/connections';
import { getBook } from '../data/books';

interface Props {
  connectionId: string;
  onClose: () => void;
}

export default function ConnectionDetail({ connectionId, onClose }: Props) {
  const conn = getConnection(connectionId);

  if (!conn) return null;

  const sourceBook = getBook(conn.sourceId);
  const targetBook = getBook(conn.targetId);

  const typeColors: Record<string, string> = {
    confirms: 'bg-parchment-700 text-parchment-50',
    expands: 'bg-parchment-600 text-parchment-50',
    cites: 'bg-parchment-500 text-parchment-50',
    same_tradition: 'bg-parchment-400 text-parchment-900',
    contradicts: 'bg-parchment-800 text-parchment-200',
    parallel: 'bg-parchment-300 text-parchment-800',
    refutes: 'bg-parchment-800 text-parchment-200',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-parchment-50 border-2 border-parchment-400 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-parchment-50 border-b border-parchment-300 p-4 flex items-start justify-between rounded-t-2xl">
          <div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[conn.type] || 'bg-parchment-300 text-parchment-800'}`}>
              {conn.type}
            </span>
            <h2 className="text-lg font-bold text-parchment-900 mt-2">{conn.title}</h2>
          </div>
          <button onClick={onClose} className="text-parchment-500 hover:text-parchment-700 text-2xl leading-none">&times;</button>
        </div>

        <div className="p-4">
          {/* Books involved */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="font-medium text-parchment-700">{sourceBook?.title || conn.sourceId}</span>
            <span className="text-parchment-400 text-lg">⟷</span>
            <span className="font-medium text-parchment-700">{targetBook?.title || conn.targetId}</span>
          </div>

          {/* Summary */}
          <p className="text-sm text-parchment-700 leading-relaxed mb-4">{conn.summary}</p>

          {/* Arguments */}
          <div className="space-y-4">
            {conn.arguments.map((arg, ai) => (
              <div key={ai} className="bg-parchment-100/60 border border-parchment-300 rounded-xl p-4">
                <h3 className="text-sm font-bold text-parchment-800 mb-3">{arg.claim}</h3>
                <div className="space-y-3">
                  {arg.evidence.map((ev, ei) => (
                    <div key={ei} className="text-xs">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          ev.type === 'quote' ? 'bg-parchment-300 text-parchment-800' :
                          ev.type === 'verse' ? 'bg-parchment-400 text-parchment-900' :
                          ev.type === 'reference' ? 'bg-parchment-200 text-parchment-700' :
                          'bg-parchment-500 text-parchment-50'
                        }`}>
                          {ev.type === 'analysis' ? 'análisis' : ev.type}
                        </span>
                        <span className="text-parchment-500 italic">{ev.source}</span>
                      </div>
                      <p className="text-parchment-700 leading-relaxed whitespace-pre-wrap">{ev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
