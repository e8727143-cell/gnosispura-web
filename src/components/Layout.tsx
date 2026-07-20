import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const loc = useLocation();
  const isActive = (path: string) => loc.pathname === path
    ? 'text-parchment-900 border-b-2 border-parchment-600'
    : 'text-parchment-600 hover:text-parchment-800';

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5e6c8' }}>
      {/* Header */}
      <header className="border-b-2 border-parchment-400 bg-parchment-50/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-parchment-900" style={{ fontFamily: 'Georgia, serif' }}>
            GnosisPura
          </Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link to="/" className={`${isActive('/')} pb-1`}>Inicio</Link>
            <Link to="/mapa" className={`${isActive('/mapa')} pb-1`}>Mapa Mental</Link>
            <Link to="/cronologia" className={`${isActive('/cronologia')} pb-1`}>Cronología</Link>
            <Link to="/evidencia" className={`${isActive('/evidencia')} pb-1`}>Evidencia</Link>
            <Link to="/biblioteca" className={`${isActive('/biblioteca')} pb-1`}>Biblioteca</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-parchment-400 bg-parchment-50/60 py-6 text-center text-sm text-parchment-500">
        <p>GnosisPura — Biblioteca de textos bíblicos, gnósticos y místicos</p>
        <p className="mt-1">Tesina de investigación — Todos los textos son de dominio público o uso académico</p>
      </footer>
    </div>
  );
}
