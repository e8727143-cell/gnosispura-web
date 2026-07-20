import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MindMap from './components/MindMap';
import Library from './components/Library';
import BookDetail from './components/BookDetail';
import Chronology from './components/Chronology';
import JesusEvidence from './components/JesusEvidence';

function HomePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-parchment-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          GnosisPura
        </h1>
        <p className="text-lg text-parchment-700 italic max-w-2xl mx-auto">
          Biblioteca digital de textos bíblicos, gnósticos, apócrifos, patrísticos, kabbalísticos y místicos
          — con mapa interactivo de conexiones teológicas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <a href="/mapa" className="block p-6 bg-parchment-50 border-2 border-parchment-300 rounded-xl hover:border-parchment-500 transition-all hover:shadow-lg">
          <h2 className="text-xl font-bold text-parchment-800 mb-2">Mapa Mental</h2>
          <p className="text-parchment-600 text-sm">
            Explora las conexiones entre todos los textos. Grafo interactivo que revela la red de argumentos teológicos.
          </p>
        </a>
        <a href="/biblioteca" className="block p-6 bg-parchment-50 border-2 border-parchment-300 rounded-xl hover:border-parchment-500 transition-all hover:shadow-lg">
          <h2 className="text-xl font-bold text-parchment-800 mb-2">Biblioteca</h2>
          <p className="text-parchment-600 text-sm">
            Navega los 50 libros organizados por categorías. Busca por título, autor o tema.
          </p>
        </a>
        <a href="/cronologia" className="block p-6 bg-parchment-50 border-2 border-parchment-300 rounded-xl hover:border-parchment-500 transition-all hover:shadow-lg">
          <h2 className="text-xl font-bold text-parchment-800 mb-2">Cronología</h2>
          <p className="text-parchment-600 text-sm">
            Línea de tiempo completa con todos los textos en su contexto histórico. Conexión Bíblica Pura — solo libros con vínculo textual directo con la Biblia.
          </p>
        </a>
        <a href="/evidencia" className="block p-6 bg-parchment-50 border-2 border-parchment-300 rounded-xl hover:border-parchment-500 transition-all hover:shadow-lg">
          <h2 className="text-xl font-bold text-parchment-800 mb-2">Evidencia Histórica</h2>
          <p className="text-parchment-600 text-sm">
            12 fuentes no-bíblicas que confirman la existencia de Jesús. Tácito, Josefo, el Talmud, y más — con citas originales, contexto y valoración histórica.
          </p>
        </a>
      </div>

      <div className="bg-parchment-50 border border-parchment-300 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-parchment-800 mb-3">Tesis Central</h2>
        <p className="text-parchment-700 leading-relaxed">
          El Dios del Antiguo Testamento (Yahweh/Elohim) es Yaldabaoth, el Demiurgo ciego que creó el mundo material
          creyéndose el único Dios. Jesús reveló al Padre verdadero (<em>Ein Sof</em> / el Invisible),
          inaccesible bajo el sistema de Yaldabaoth. La salvación es Gnosis — el conocimiento liberador
          que reúne al alma dividida con su origen divino.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs text-parchment-600">
        <span className="bg-parchment-200 px-2 py-1 rounded">Torah</span>
        <span className="bg-parchment-200 px-2 py-1 rounded">1 Enoc</span>
        <span className="bg-parchment-200 px-2 py-1 rounded">Ap. Juan</span>
        <span className="bg-parchment-200 px-2 py-1 rounded">Ev. Felipe</span>
        <span className="bg-parchment-200 px-2 py-1 rounded">Zohar</span>
        <span className="bg-parchment-200 px-2 py-1 rounded">Ireneo</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MindMap />} />
          <Route path="/biblioteca" element={<Library />} />
          <Route path="/cronologia" element={<Chronology />} />
          <Route path="/evidencia" element={<JesusEvidence />} />
          <Route path="/libro/:id" element={<BookDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
