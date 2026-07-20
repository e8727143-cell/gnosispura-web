import { useEffect, useRef, useState, useCallback } from 'react';

const PDF_JS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.mjs';

interface Props {
  url: string;
  title: string;
}

export default function PdfViewer({ url, title }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scale, setScale] = useState(1.2);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);

  const loadPDF = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const pdfjs = await import(/* @vite-ignore */ PDF_JS_CDN);
      pdfjs.GlobalWorkerOptions.workerSrc = PDF_JS_CDN;
      const doc = await pdfjs.getDocument(url).promise;
      pdfDocRef.current = doc;
      setNumPages(doc.numPages);
      setPageNum(1);
      setLoading(false);
    } catch (e: any) {
      setError(e.message || 'Error al cargar el PDF');
      setLoading(false);
    }
  }, [url]);

  const renderPage = useCallback(async (num: number) => {
    if (!pdfDocRef.current || !canvasRef.current) return;
    if (renderTaskRef.current) {
      try { await renderTaskRef.current.cancel(); } catch {}
    }
    try {
      const page = await pdfDocRef.current.getPage(num);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Parchment background for the page
      ctx.fillStyle = '#fdf8f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const renderTask = page.render({
        canvasContext: ctx,
        viewport,
        background: '#fdf8f0',
      });
      renderTaskRef.current = renderTask;
      await renderTask.promise;
    } catch (e: any) {
      if (e.name !== 'RenderingCancelledException') {
        console.warn('Render error:', e);
      }
    }
  }, [scale]);

  useEffect(() => { loadPDF(); }, [loadPDF]);

  useEffect(() => {
    if (pdfDocRef.current && pageNum >= 1 && pageNum <= numPages) {
      renderPage(pageNum);
    }
  }, [pageNum, numPages, renderPage]);

  useEffect(() => {
    if (pdfDocRef.current) renderPage(pageNum);
  }, [scale, pageNum, renderPage]);

  // Cleanup
  useEffect(() => {
    return () => { if (renderTaskRef.current) renderTaskRef.current.cancel(); };
  }, []);

  return (
    <div className="bg-parchment-100 border-2 border-parchment-300 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-parchment-300 bg-parchment-200/70">
        <div className="flex items-center gap-2 text-xs text-parchment-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
            className="px-2 py-1 text-xs rounded bg-parchment-50 hover:bg-parchment-300 border border-parchment-400 text-parchment-700"
            title="Alejar"
          >−</button>
          <span className="text-xs text-parchment-600 w-8 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(s => Math.min(3, s + 0.2))}
            className="px-2 py-1 text-xs rounded bg-parchment-50 hover:bg-parchment-300 border border-parchment-400 text-parchment-700"
            title="Acercar"
          >+</button>
        </div>
      </div>

      {/* Viewer area */}
      <div className="flex flex-col items-center bg-parchment-100 p-4 min-h-[500px] relative">
        {loading && (
          <div className="flex items-center justify-center py-20 text-parchment-500 text-sm italic">
            Cargando PDF...
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center py-20 text-parchment-700 text-sm">
            <div className="text-center">
              <p className="mb-2">⚠️ No se pudo cargar el PDF</p>
              <p className="text-xs text-parchment-500">{error}</p>
              <button onClick={loadPDF} className="mt-3 text-xs px-3 py-1.5 rounded bg-parchment-300 hover:bg-parchment-400 text-parchment-800">
                Reintentar
              </button>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`shadow-lg rounded-sm ${loading || error ? 'hidden' : ''}`}
          style={{
            background: '#fdf8f0',
            maxWidth: '100%',
            height: 'auto',
          }}
        />

        {/* Page nav */}
        {numPages > 0 && !loading && !error && (
          <div className="flex items-center gap-3 mt-4 text-xs text-parchment-700">
            <button
              onClick={() => setPageNum(p => Math.max(1, p - 1))}
              disabled={pageNum <= 1}
              className="px-3 py-1.5 rounded bg-parchment-50 hover:bg-parchment-300 border border-parchment-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>
            <span className="font-medium">
              Página {pageNum} de {numPages}
            </span>
            <button
              onClick={() => setPageNum(p => Math.min(numPages, p + 1))}
              disabled={pageNum >= numPages}
              className="px-3 py-1.5 rounded bg-parchment-50 hover:bg-parchment-300 border border-parchment-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
