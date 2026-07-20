import { useParams, Link } from 'react-router-dom';
import { getBook, getCategory } from '../data/books';
import { getConnectionsForBook } from '../data/connections';
import PdfViewer from './PdfViewer';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const book = getBook(id || '');

  if (!book) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-parchment-900 mb-4">Libro no encontrado</h1>
        <Link to="/biblioteca" className="text-parchment-600 underline">Volver a la biblioteca</Link>
      </div>
    );
  }

  const cat = getCategory(book.category);
  const bookConnections = getConnectionsForBook(book.id);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-parchment-500 mb-4">
        <Link to="/biblioteca" className="hover:text-parchment-700">Biblioteca</Link>
        <span className="mx-2">/</span>
        <span className="text-parchment-700">{book.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Info panel */}
        <div className="lg:col-span-2">
          <div className="bg-parchment-50 border-2 border-parchment-300 rounded-xl p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-parchment-200 text-parchment-700 font-medium">
                {cat?.name}
              </span>
              {book.date && (
                <span className="text-xs text-parchment-500">{book.date}</span>
              )}
            </div>

            <h1 className="text-xl font-bold text-parchment-900 mb-1">{book.title}</h1>
            {book.subtitle && (
              <p className="text-sm text-parchment-500 italic mb-3">{book.subtitle}</p>
            )}

            {book.language && (
              <p className="text-xs text-parchment-600 mb-3">
                <strong>Idioma:</strong> {book.language}
              </p>
            )}

            <p className="text-sm text-parchment-700 leading-relaxed mb-4">{book.description}</p>

            {book.highlights && book.highlights.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-bold text-parchment-800 mb-2">Puntos clave</h3>
                <ul className="text-xs text-parchment-600 space-y-1">
                  {book.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-parchment-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Status badge */}
            {book.archiveUrl ? (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Disponible en Archive.org
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-parchment-200 text-parchment-600">
                  ⏳ Pendiente de subir
                </span>
              </div>
            )}

            {/* Connections list */}
            {bookConnections.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-bold text-parchment-800 mb-2">
                  Conexiones ({bookConnections.length})
                </h3>
                <div className="space-y-1.5">
                  {bookConnections.map(conn => {
                    const otherId = conn.sourceId === book.id ? conn.targetId : conn.sourceId;
                    const otherBook = getBook(otherId);
                    return (
                      <Link
                        key={conn.id}
                        to={`/libro/${otherId}`}
                        className="block text-xs text-parchment-600 hover:text-parchment-800 bg-parchment-100 rounded-lg p-2 transition-colors"
                      >
                        <span className="text-[10px] uppercase tracking-wider text-parchment-500">
                          {conn.type}
                        </span>
                        <p className="font-medium">{otherBook?.title || otherId}</p>
                        <p className="text-[10px] text-parchment-500 line-clamp-1">{conn.summary}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PDF viewer */}
        <div className="lg:col-span-3">
          {book.archiveUrl ? (
            <PdfViewer url={book.archiveUrl} title={book.title} />
          ) : (
            <div className="bg-parchment-50 border-2 border-parchment-300 rounded-xl p-6 min-h-[600px] flex flex-col items-center justify-center text-center">
              <div className="text-parchment-400 text-6xl mb-4 font-serif">?</div>
              <h2 className="text-lg font-bold text-parchment-700 mb-2">PDF aún no disponible</h2>
              <p className="text-sm text-parchment-500 max-w-md">
                Este libro está pendiente de subir a Archive.org. Mientras tanto, explora sus conexiones
                teológicas en el panel lateral.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
