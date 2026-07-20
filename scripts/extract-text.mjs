/**
 * extract-text.mjs — Extrae texto de todos los PDFs de la biblioteca
 * y los guarda como JSON en src/data/texts/
 *
 * Uso: node scripts/extract-text.mjs
 */
import fs from 'fs';
import path from 'path';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

// Mapeo: nombre archivo PDF → book ID
const BOOK_MAP = {
  'antiguo_testamento_griego.pdf': 'ot_griego',
  'nuevo_testamento_griego.pdf': 'nt_griego',
  'biblia_pshita_siriaca.pdf': 'pshita',
  'biblia_kadosh_estudio.pdf': 'kadosh',
  'torah_hebreo_espanol.pdf': 'torah',
  '1_enoc_charles_1912.pdf': 'enoc1',
  '1_enoc_completo.pdf': 'enoc1_completo',
  '2_enoc_completo.pdf': 'enoc2',
  '2_enoc_geller_critico.pdf': 'enoc2_critico',
  '2_enoc_morfill_charles.pdf': 'enoc2_morfill',
  '3_enoc_odeberg.pdf': 'enoc3',
  'jasher_libro_del_justo.pdf': 'jasher',
  'jubileos_completo.pdf': 'jubileos',
  'apocalipsis_abraham_box.pdf': 'apocalipsis_abraham',
  'asuncion_moises_charles.pdf': 'asuncion_moises',
  'martirio_isaias_charles.pdf': 'martirio_isaias',
  'salmos_salomon_odas_salomon.pdf': 'salmos_salomon',
  'salmos_salomon_restaurados.pdf': 'salmos_salomon_rest',
  'josefo_antiguedades.pdf': 'josefo',
  'apocrifo_juan.pdf': 'apocrifo_juan',
  'evangelio_judas_copto.pdf': 'evangelio_judas',
  'evangelio_judas_natgeo.pdf': 'evangelio_judas_natgeo',
  'evangelio_verdad_critico.pdf': 'evangelio_verdad',
  'evangelio_felipe.pdf': 'evangelio_felipe',
  'nag_hammadi_biblioteca_completa.pdf': 'nag_hammadi',
  'nh_codex_II_critico.pdf': 'nh_codice_II',
  'hipostasis_arcontes.pdf': 'hipostasis_arcontes',
  'pistis_sophia_schmidt.pdf': 'pistis_sophia',
  'pistis_sophia_weor.pdf': 'pistis_sophia_weor',
  'libros_jeu_schmidt.pdf': 'libros_jeu',
  'manuscritos_mar_muerto.pdf': 'qumran',
  'ireneo_contra_herejias_completo.pdf': 'ireneo_haereses',
  'ireneo_contra_herejias_ingles.pdf': 'ireneo_keble',
  'hipolito_refutacion_herejias.pdf': 'hipolito',
  'clemente_stromata.pdf': 'clemente',
  'origen_de_principiis.pdf': 'origen',
  'epifanio_panarion_I.pdf': 'epifanio_I',
  'epifanio_panarion_II_III.pdf': 'epifanio_II_III',
  'zohar_completo.pdf': 'zohar',
  'sefer_ha_bahir.pdf': 'bahir',
  'sefer_yetzirah_hebreo_espanol.pdf': 'yetzirah',
  'waite_santa_kabbalah.pdf': 'waite',
  'reuchlin_arte_cabalistica.pdf': 'reuchlin',
  'swedenborg_arcana_coelestia.pdf': 'arcana_coelestia',
  'swedenborg_apocalipsis_revelado.pdf': 'apocalipsis_revelado',
  'swedenborg_cielo_infierno.pdf': 'cielo_infierno',
  'swedenborg_cristianismo_verdadero.pdf': 'cristianismo_verdadero',
};

const BIBLIA_DIR = 'C:/Users/PC USER/Documents/AAA Proyectos Dev/GnosisPura/Biblioteca Bíblica';
const OUTPUT_DIR = 'C:/Users/PC USER/Documents/AAA Proyectos Dev/GnosisPura/gnosispura-web/src/data/texts';

async function extractTextFromPdf(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  const pages = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    // Unir items preservando algo de estructura
    let lastY = -1;
    const lines = [];
    for (const item of tc.items) {
      const y = Math.round(item.transform[5]);
      if (lastY !== -1 && Math.abs(y - lastY) > 5) lines.push('\n');
      lines.push(item.str);
      lastY = y;
    }
    const text = lines.join(' ')
      .replace(/ \n /g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    pages.push({ num: i, text });

    if (i % 20 === 0 || i === doc.numPages) {
      process.stdout.write(`\r  Página ${i}/${doc.numPages}`);
    }
  }
  process.stdout.write('\n');
  return { numPages: doc.numPages, pages };
}

async function main() {
  console.log('=== EXTRACCIÓN DE TEXTOS DE LA BIBLIOTECA ===\n');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let success = 0;
  let failed = 0;
  let totalPages = 0;

  const categories = fs.readdirSync(BIBLIA_DIR).filter(f =>
    fs.statSync(path.join(BIBLIA_DIR, f)).isDirectory() && !f.startsWith('_')
  );

  for (const cat of categories) {
    const catDir = path.join(BIBLIA_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f =>
      f.endsWith('.pdf') && BOOK_MAP[f] !== undefined
    );

    for (const file of files) {
      const bookId = BOOK_MAP[file];
      if (!bookId) continue;

      const filePath = path.join(catDir, file);
      const outputPath = path.join(OUTPUT_DIR, `${bookId}.json`);
      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  ${bookId} — ya existe, saltando`);
        continue;
      }

      const sizeMB = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);
      console.log(`📄 ${bookId} (${sizeMB}MB) — ${file}`);

      try {
        const result = await extractTextFromPdf(filePath);
        const output = {
          id: bookId,
          sourceFile: file,
          totalPages: result.numPages,
          pages: result.pages,
        };
        fs.writeFileSync(outputPath, JSON.stringify(output));
        const pagesWithText = result.pages.filter(p => p.text.length > 50).length;
        console.log(`  ✅ ${result.numPages} páginas (${pagesWithText} con texto) → ${bookId}.json\n`);
        success++;
        totalPages += result.numPages;
      } catch (e) {
        console.log(`  ❌ Error: ${e.message.slice(0, 100)}\n`);
        failed++;
      }
    }
  }

  console.log('\n=== RESUMEN ===');
  console.log(`✅ Libros extraídos: ${success}`);
  console.log(`📄 Páginas totales: ${totalPages}`);
  console.log(`❌ Fallos: ${failed}`);
  console.log(`📁 Destino: ${OUTPUT_DIR}`);
}

main().catch(console.error);
