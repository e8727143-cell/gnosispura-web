import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { books, categories, getCategory } from '../data/books';
import type { BookCategoryId } from '../data/types';

export default function Library() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<BookCategoryId | 'all'>('all');

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchSearch = !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'all' || b.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-parchment-900 mb-2">Biblioteca</h1>
      <p className="text-parchment-600 mb-6 italic">{books.length} textos organizados en {categories.length} categorías</p>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por título o descripción..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-parchment-400 bg-parchment-50 text-parchment-900 placeholder-parchment-500 focus:outline-none focus:border-parchment-600"
          style={{ fontFamily: 'Georgia, serif' }}
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-parchment-700 text-parchment-50'
              : 'bg-parchment-200 text-parchment-700 hover:bg-parchment-300'
          }`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-parchment-700 text-parchment-50'
                : 'bg-parchment-200 text-parchment-700 hover:bg-parchment-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map(book => {
          const cat = getCategory(book.category);
          return (
            <Link
              key={book.id}
              to={`/libro/${book.id}`}
              className="block p-4 bg-parchment-50 border-2 border-parchment-300 rounded-xl hover:border-parchment-500 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-200 text-parchment-700 whitespace-nowrap">
                  {cat?.name}
                </span>
                {book.language && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-100 text-parchment-500">
                    {book.language}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-parchment-900 text-sm leading-tight mb-1">{book.title}</h3>
              {book.subtitle && (
                <p className="text-xs text-parchment-500 italic mb-2">{book.subtitle}</p>
              )}
              <p className="text-xs text-parchment-600 line-clamp-3">{book.description}</p>
              {book.highlights && book.highlights.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {book.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-parchment-100 text-parchment-600 rounded">
                      {h.length > 35 ? h.substring(0, 33) + '…' : h}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <p className="text-center text-parchment-500 mt-12 italic">
          No se encontraron libros con ese criterio de búsqueda.
        </p>
      )}
    </div>
  );
}
