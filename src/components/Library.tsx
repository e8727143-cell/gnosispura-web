import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { books, categories, getCategory } from '../data/books';
import type { BookCategoryId } from '../data/types';

const CATEGORY_COLORS: Record<string, { bg: string; accent: string; text: string; spine: string }> = {
  canonicos:    { bg: '#1a1a2e', accent: '#c9a84c', text: '#f5e6c8', spine: '#c9a84c' },
  pseudepigrafos: { bg: '#2d1b29', accent: '#e8c4a0', text: '#f0e0c8', spine: '#b8885a' },
  gnosticos:   { bg: '#1a2f1a', accent: '#6db36d', text: '#e0f0e0', spine: '#4a8c4a' },
  patristica:  { bg: '#2c1810', accent: '#d4a574', text: '#f0e6d8', spine: '#b8865a' },
  kabbalah:    { bg: '#1e1e3a', accent: '#b080d0', text: '#e8ddf5', spine: '#9060b0' },
  swedenborg:  { bg: '#1a2e3a', accent: '#7ab8d4', text: '#d8eef5', spine: '#5090b0' },
};

const CATEGORY_HEADER_BG: Record<string, string> = {
  canonicos:    'from-[#1a1a2e] to-[#2a2a4e]',
  pseudepigrafos: 'from-[#2d1b29] to-[#4d2b39]',
  gnosticos:   'from-[#1a2f1a] to-[#2a4f2a]',
  patristica:  'from-[#2c1810] to-[#4c2820]',
  kabbalah:    'from-[#1e1e3a] to-[#3e3e5a]',
  swedenborg:  'from-[#1a2e3a] to-[#2a4e5a]',
};

function BookCover({ book, catColor }: { book: typeof books[number]; catColor: typeof CATEGORY_COLORS[string] }) {
  const stripes = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="relative group perspective-[1000px] w-full" style={{ aspectRatio: '2.8/4' }}>
      <Link to={`/libro/${book.id}`} className="block w-full h-full">
        {/* 3D cover container */}
        <div
          className="relative w-full h-full rounded-sm overflow-hidden transition-all duration-500 ease-out
                     shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                     group-hover:rotate-y-[-8deg] group-hover:rotate-x-[4deg]"
          style={{ backgroundColor: catColor.bg, transformStyle: 'preserve-3d' }}
        >
          {/* Book spine */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[8px] rounded-l-sm"
            style={{ backgroundColor: catColor.spine, boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.3)' }}
          />

          {/* Cover inner border */}
          <div className="absolute inset-[10px] border" style={{ borderColor: `${catColor.accent}55`, borderRadius: '1px' }} />

          {/* Decorative top line */}
          <div className="absolute top-[18px] left-[18px] right-[18px] h-[1px]" style={{ background: `linear-gradient(90deg, ${catColor.accent}88, ${catColor.accent}22)` }} />

          {/* Decorative pattern: subtle stripes at bottom */}
          <div className="absolute bottom-[22px] left-[18px] right-[18px] flex gap-[3px]">
            {stripes.map(i => (
              <div key={i} className="h-[2px] flex-1 rounded-sm" style={{ backgroundColor: `${catColor.accent}${30 + i * 10}` }} />
            ))}
          </div>

          {/* Centered content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[20px] py-[32px]">
            {/* Category badge */}
            <span
              className="text-[7px] uppercase tracking-[2px] mb-[10px] px-2 py-0.5 rounded-sm"
              style={{ backgroundColor: `${catColor.accent}22`, color: catColor.accent }}
            >
              {getCategory(book.category)?.name || book.category}
            </span>

            {/* Title */}
            <h3
              className="text-center font-bold leading-tight mb-[4px]"
              style={{
                color: catColor.text,
                fontSize: 'clamp(10px, 2.2vw, 16px)',
                fontFamily: "'Georgia', serif",
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {book.title.length > 45 ? book.title.slice(0, 42) + '…' : book.title}
            </h3>

            {/* Subtitle */}
            {book.subtitle && (
              <p
                className="text-center italic leading-tight opacity-80"
                style={{
                  color: catColor.text,
                  fontSize: 'clamp(7px, 1.4vw, 11px)',
                }}
              >
                {book.subtitle.length > 50 ? book.subtitle.slice(0, 47) + '…' : book.subtitle}
              </p>
            )}

            {/* Language badge */}
            {book.language && (
              <span
                className="mt-[8px] text-[6px] uppercase tracking-[1.5px] px-2 py-0.5 rounded-sm"
                style={{ backgroundColor: `${catColor.accent}15`, color: `${catColor.accent}aa`, border: `1px solid ${catColor.accent}33` }}
              >
                {book.language}
              </span>
            )}
          </div>

          {/* Bottom shine effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{ background: 'linear-gradient(transparent, rgba(255,255,255,0.06))' }}
          />
        </div>
      </Link>
    </div>
  );
}

export default function Library() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<BookCategoryId | 'all'>('all');

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchSearch = !search ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase()) ||
        (b.subtitle || '').toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'all' || b.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  // Group filtered books by category
  const groupedByCategory = useMemo(() => {
    const groups: { catId: BookCategoryId; books: typeof books }[] = [];
    for (const cat of categories) {
      const catBooks = filteredBooks.filter(b => b.category === cat.id);
      if (catBooks.length > 0) {
        groups.push({ catId: cat.id, books: catBooks });
      }
    }
    return groups;
  }, [filteredBooks]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-parchment-900 mb-1" style={{ fontFamily: "'Georgia', serif" }}>Biblioteca</h1>
        <p className="text-parchment-500 italic text-sm">{books.length} textos organizados en {categories.length} categorías</p>
      </div>

      {/* Search bar */}
      <div className="max-w-md mx-auto mb-5">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-parchment-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por título, descripción..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-parchment-300 bg-parchment-50 text-parchment-900 placeholder-parchment-400 focus:outline-none focus:border-parchment-500 transition-colors text-sm"
            style={{ fontFamily: "'Georgia', serif" }}
          />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-parchment-800 text-parchment-50 shadow-md'
              : 'bg-parchment-200 text-parchment-700 hover:bg-parchment-300'
          }`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-parchment-800 text-parchment-50 shadow-md'
                : 'bg-parchment-200 text-parchment-700 hover:bg-parchment-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Books grouped by category */}
      {groupedByCategory.map(group => {
        const cat = getCategory(group.catId)!;
        const catColor = CATEGORY_COLORS[group.catId];
        const headerBg = CATEGORY_HEADER_BG[group.catId];

        return (
          <section key={group.catId} className="mb-10">
            {/* Category header — dark band with category name */}
            <div
              className={`bg-gradient-to-r ${headerBg} rounded-lg px-5 py-3 mb-5 flex items-center justify-between`}
            >
              <div>
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  {cat.name}
                </h2>
                <p className="text-xs text-white/60 italic">{cat.description}</p>
              </div>
              <span className="text-white/40 text-xs font-mono">{group.books.length} textos</span>
            </div>

            {/* Book grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
              {group.books.map(book => (
                <BookCover key={book.id} book={book} catColor={catColor} />
              ))}
            </div>
          </section>
        );
      })}

      {filteredBooks.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl text-parchment-300 mb-4">📚</div>
          <p className="text-parchment-500 italic">
            No se encontraron libros con ese criterio de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}
