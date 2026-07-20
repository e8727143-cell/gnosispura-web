// Conexión Bíblica Pura — libros con vínculo textual DIRECTO con la Biblia
// Criterio: relación verificable textualmente, NO interpretación posterior
// Tipos de conexión:
//   biblical_core    → ES el texto bíblico (original hebreo/griego/arameo)
//   cited_in_bible   → citado EXPLÍCITAMENTE en la Biblia
//   biblical_ms      → encontrado entre manuscritos bíblicos (Qumrán, LXX)
//   apostolic_claim  → reclama ser Escritura / enseñanza apostólica
//   parallel_text    → material que PARALELA directamente la narrativa bíblica
//   historical_witness → testigo histórico externo de eventos bíblicos
//   preserve_quotes  → preserva citas de textos bíblicos perdidos

import type { BookCategoryId } from './types';

export interface BibleConnection {
  bookId: string;
  title: string;
  subtitle?: string;
  categoryId: BookCategoryId;
  connectionType: 'biblical_core' | 'cited_in_bible' | 'biblical_ms' | 'apostolic_claim' | 'parallel_text' | 'historical_witness' | 'preserve_quotes';
  bibleLinks: string[];      // referencias bíblicas específicas
  evidence: string;          // la evidencia textual concreta
  detail: string;            // explicación de la conexión
}

export const bibleConnections: BibleConnection[] = [
  // ════════════════════════════════════════════════════════════════
  // CORE BÍBLICO — Los textos que SON la Biblia
  // ════════════════════════════════════════════════════════════════
  {
    bookId: 'torah',
    title: 'Torah',
    subtitle: 'Pentateuco hebreo-español',
    categoryId: 'canonicos',
    connectionType: 'biblical_core',
    bibleLinks: ['Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio'],
    evidence: 'La Torah completa en hebreo original con traducción interlineal. ES el Pentateuco, la base de toda la Escritura.',
    detail: 'Génesis a Deuteronomio en su idioma original. No es "conexión" — es el texto mismo. Toda la Biblia depende de este texto.',
  },
  {
    bookId: 'ot_griego',
    title: 'Antiguo Testamento (LXX)',
    subtitle: 'Septuaginta griega interlineal',
    categoryId: 'canonicos',
    connectionType: 'biblical_core',
    bibleLinks: ['Todo el AT', 'Mateo 1:23', 'Hebreos 1:6', 'Hechos 13:41', 'Gálatas 3:12'],
    evidence: 'La LXX es citada DIRECTAMENTE ~300 veces en el NT. Los apóstoles no usaban el hebreo masorético, usaban la LXX.',
    detail: 'Cuando el NT dice "como está escrito", cita de la LXX. Ejemplo: Mateo 1:23 cita Isaías 7:14 LXX. La LXX dice "parthenos" (virgen) — el hebreo masorético dice "almah" (joven). La diferencia es teológica y textual.',
  },
  {
    bookId: 'nt_griego',
    title: 'Nuevo Testamento (Griego)',
    subtitle: 'Texto original griego interlineal',
    categoryId: 'canonicos',
    connectionType: 'biblical_core',
    bibleLinks: ['Todo el NT'],
    evidence: 'El texto crítico griego del NT. La base de toda la teología cristiana.',
    detail: 'El NT en su lengua original. Cada palabra, cada matiz. Juan 1:1 "En arkhé én ho Lógos" — "En el principio era el Logos". No hay interpretación, es el texto.',
  },
  {
    bookId: 'pshita',
    title: 'Peshitta',
    subtitle: 'Biblia en arameo siriaco',
    categoryId: 'canonicos',
    connectionType: 'biblical_core',
    bibleLinks: ['Todo el AT y NT'],
    evidence: 'La Biblia en arameo, la lengua semítica del Jesús histórico. La tradición siríaca preserva el texto en la lengua más cercana al Jesús histórico.',
    detail: 'El arameo era la lengua que Jesús hablaba. La Peshitta preserva matices que el griego pierde. "Maranatha" (1 Cor 16:22) — "Señor nuestro, ven" — tiene sentido completo en arameo.',
  },
  {
    bookId: 'kadosh',
    title: 'Biblia Kadosh',
    subtitle: 'Tanaj + Brit Hadasha (versión israelita)',
    categoryId: 'canonicos',
    connectionType: 'biblical_core',
    bibleLinks: ['Todo el AT y NT'],
    evidence: 'Restaura los nombres originales hebreos: YHWH, Elohim, Yeshúa. Elimina las sustituciones griegas/latinas.',
    detail: 'No es "interpretación" — es la restauración literal de los nombres divinos y mesiánicos que siglos de traducción helenizaron.',
  },

  // ════════════════════════════════════════════════════════════════
  // CITADOS EN LA BIBLIA — textos mencionados explícitamente
  // ════════════════════════════════════════════════════════════════
  {
    bookId: 'jasher',
    title: 'Libro de Jasher',
    subtitle: 'Yasher',
    categoryId: 'pseudepigrafos',
    connectionType: 'cited_in_bible',
    bibleLinks: ['Josué 10:13', '2 Samuel 1:18'],
    evidence: 'Josué 10:13: "¿No está esto escrito en el libro de Jasher?" 2 Samuel 1:18: "Está escrito en el libro de Jasher."',
    detail: 'La Biblia misma dice que Jasher existe y que contiene registros históricos que complementan el relato bíblico. Un libro que la Biblia EXPLÍCITAMENTE menciona como fuente — pero fue excluido del canon.',
  },
  {
    bookId: 'enoc1',
    title: '1 Enoc',
    subtitle: 'Libro de Enoc (ed. Charles 1912)',
    categoryId: 'pseudepigrafos',
    connectionType: 'cited_in_bible',
    bibleLinks: ['Judas 1:14-15', '2 Pedro 2:4', 'Mateo 22:30'],
    evidence: 'Judas 1:14-15: "De estos también profetizó Enoc, séptimo desde Adán, diciendo: He aquí que vino el Señor con sus santas decenas de millares..."',
    detail: 'Judas NO dice "como escribió Enoc" — dice "profetizó Enoc". Judas trata 1 Enoc como profecía genuina. Jesús mismo usa lenguaje enoquiano: "como ángeles en el cielo" (Mt 22:30 = 1 Enoc 15:6-7). El NT depende teológicamente de 1 Enoc.',
  },
  {
    bookId: 'enoc1_completo',
    title: '1 Enoc (completo)',
    subtitle: 'Versión completa',
    categoryId: 'pseudepigrafos',
    connectionType: 'cited_in_bible',
    bibleLinks: ['Judas 1:14-15', '2 Pedro 2:4', 'Mateo 22:30', 'Apocalipsis 1:7'],
    evidence: 'Complementa el texto de 1 Enoc con las Parábolas (caps. 37-71), donde el Hijo del Hombre aparece como figura divina preexistente.',
    detail: 'Las Parábolas de Enoc describen al Hijo del Hombre "escogido antes de la creación" — la misma teología que Juan aplica al Logos. Jesús se identifica con esta figura en los evangelios.',
  },
  {
    bookId: 'asuncion_moises',
    title: 'Asunción de Moisés',
    subtitle: 'Testamento de Moisés',
    categoryId: 'pseudepigrafos',
    connectionType: 'cited_in_bible',
    bibleLinks: ['Judas 1:9'],
    evidence: 'Judas 1:9: "El arcángel Miguel, cuando contendía con el diablo disputando sobre el cuerpo de Moisés, no se atrevió a proferir juicio de maldición contra él, sino que dijo: El Señor te reprenda."',
    detail: 'Este evento NO está en el AT canónico. La única fuente conocida es la Asunción de Moisés. Judas cita un texto extra-canónico como si fuera autoritativo. La Iglesia tuvo que aceptar que el NT cita textos que ella misma excluyó.',
  },

  // ════════════════════════════════════════════════════════════════
  // TEXTOS BÍBLICOS — encontrados entre manuscritos de las Escrituras
  // ════════════════════════════════════════════════════════════════
  {
    bookId: 'qumran',
    title: 'Manuscritos del Mar Muerto',
    subtitle: 'Qumrán',
    categoryId: 'pseudepigrafos',
    connectionType: 'biblical_ms',
    bibleLinks: ['Isaías', 'Salmos', 'Deuteronomio', '1 Enoc', 'Jubileos'],
    evidence: 'LOS MANUSCRITOS BÍBLICOS MÁS ANTIGUOS CONOCIDOS. El Gran Rollo de Isaías (1QIsaᵃ) es 1000 años más antiguo que los masoréticos. Los textos de Qumrán son la evidencia física de la Biblia en su forma más antigua.',
    detail: 'Qumrán nos dio la evidencia física de que 1 Enoc y Jubileos eran considerados Escritura por una comunidad judía del Segundo Templo. También contiene los manuscritos más antiguos del AT canónico.',
  },
  {
    bookId: 'jubileos',
    title: 'Libro de los Jubileos',
    subtitle: 'Pequeño Génesis',
    categoryId: 'pseudepigrafos',
    connectionType: 'biblical_ms',
    bibleLinks: ['Génesis', 'Éxodo', 'Gálatas 4:10'],
    evidence: 'ENCONTRADO EN QUMRÁN (17 copias). Era Escritura para la comunidad esenia. Reescritura angélica del Génesis que revela la existencia de Mastema, jefe de los espíritus malignos.',
    detail: 'Jubileos no es "interpretación" — es una versión alternativa/revelada del Génesis. Fue encontrado entre los rollos bíblicos de Qumrán, tratado como texto autoritativo. Explica la Ley como pre-sinaítica, no mosaica.',
  },
  {
    bookId: 'testamento_patriarcas',
    title: 'Testamento de los Doce Patriarcas',
    subtitle: 'Testamento de los hijos de Jacob',
    categoryId: 'pseudepigrafos',
    connectionType: 'biblical_ms',
    bibleLinks: ['Romanos 12:19', 'Santiago 1:12', 'Mateo 25:34-36', 'Juan 13:34'],
    evidence: 'ENCONTRADO EN QUMRÁN (fragmentos arameos). Sus enseñanzas éticas son citadas por Pablo, Santiago y Juan. La ética del NT depende de este texto.',
    detail: 'Testamento de Benjamín 4:1-3 = Romanos 12:19 (venganza). Testamento de José 18:2 = Santiago 1:12 (perseverancia). La ética del NT no es original — está tomada de los Testamentos. Los apóstoles usaban este texto como autoridad.',
  },
  {
    bookId: 'salmos_salomon',
    title: 'Salmos de Salomón / Odas de Salomón',
    subtitle: 'Colección de salmos apócrifos',
    categoryId: 'pseudepigrafos',
    connectionType: 'biblical_ms',
    bibleLinks: ['Lucas 1:51-55', 'Mateo 11:28-30', 'Apocalipsis 22:1'],
    evidence: 'ENCONTRADOS EN MANUSCRITOS DE LA LXX (Codex Alexandrinus y otros). Eran parte de la Biblia griega de los primeros cristianos. Contienen el concepto del Mesías hijo de David y la crítica al sacerdocio corrupto.',
    detail: 'Salmos de Salomón 17-18 describen al Mesías como rey davídico que purificará Jerusalén — la misma esperanza mesiánica del Magníficat de María (Lc 1:51-55). Estaban en los manuscritos bíblicos de la LXX.',
  },
  {
    bookId: 'salmos_salomon_rest',
    title: 'Salmos de Salomón (restaurados)',
    subtitle: 'Versión restaurada',
    categoryId: 'pseudepigrafos',
    connectionType: 'biblical_ms',
    bibleLinks: ['Lucas 1:51-55', 'Mateo 11:28-30'],
    evidence: 'Versión restaurada con texto crítico de la misma colección de salmos mesiánicos.',
    detail: 'Misma evidencia que los Salmos de Salomón — versión textualmente reconstruida.',
  },

  // ════════════════════════════════════════════════════════════════
  // PARALELO TEXTUAL DIRECTO — material que se sincroniza con la Biblia
  // ════════════════════════════════════════════════════════════════
  {
    bookId: 'martirio_isaias',
    title: 'Martirio de Isaías',
    subtitle: 'Ascensión de Isaías',
    categoryId: 'pseudepigrafos',
    connectionType: 'parallel_text',
    bibleLinks: ['Hebreos 11:37', 'Isaías 6:1-8', '2 Corintios 12:2-4'],
    evidence: 'Hebreos 11:37: "Fueron aserrados" — TRADICIÓN del martirio de Isaías. El Talmud (Yevamot 49b) confirma que Isaías fue aserrado por Manasés. La Ascensión de Isaías contiene esta tradición.',
    detail: 'El NT da por conocido el martirio de Isaías. La Ascensión de Isaías preserva la visión detallada de los 7 cielos que Pablo también describe (2 Co 12:2-4). NO es interpretación — la tradición del martirio de Isaías es anterior al NT y aceptada por este.',
  },
  {
    bookId: 'apocalipsis_abraham',
    title: 'Apocalipsis de Abraham',
    subtitle: 'Ed. Box',
    categoryId: 'pseudepigrafos',
    connectionType: 'parallel_text',
    bibleLinks: ['Génesis 15', 'Juan 8:56', 'Apocalipsis 4', 'Romanos 4'],
    evidence: 'Abraham ve el trono de Dios (caps. 15-18) — paralelo DIRECTISIMO con Apocalipsis 4. Abraham pregunta "¿por qué permites el mal?" — misma pregunta que Habacuc y Job.',
    detail: 'El texto DISTINGUE ENTRE EL PODER SUPREMO INVISIBLE y el "fuego creador". Abraham 17:14 "El fuego que creó el mundo no es el Altísimo" — conexión DIRECTA con la distinción gnóstica entre el Padre Invisible y Yaldabaoth.',
  },
  {
    bookId: 'apocrifo_juan',
    title: 'Apócrifo de Juan',
    subtitle: 'Apocryphon of John',
    categoryId: 'gnosticos',
    connectionType: 'apostolic_claim',
    bibleLinks: ['Juan 1:1-5', 'Juan 1:18', 'Apocalipsis 12', 'Génesis 1-3'],
    evidence: 'RECLAMA SER la revelación secreta de Jesús a Juan. El mismo Juan del Evangelio. Desarrolla el prólogo de Juan (el Logos) en teogonía completa. Explica lo que el Génesis "omitió": la creación por Yaldabaoth.',
    detail: 'No es "la opinión de alguien" — el texto dice ser la enseñanza que Jesús dio a Juan después de la resurrección. Explica QUIÉN es Yaldabaoth, POR QUÉ el mundo es imperfecto, y CÓMO Jesús revela al Padre verdadero.',
  },
  {
    bookId: 'evangelio_tomas',
    title: 'Evangelio de Tomás',
    subtitle: 'Dichos de Jesús (logia)',
    categoryId: 'gnosticos',
    connectionType: 'apostolic_claim',
    bibleLinks: ['Mateo 13:31-32', 'Lucas 17:21', 'Mateo 5:14'],
    evidence: '114 DICHOS DE JESÚS, muchos IDÉNTICOS a los evangelios canónicos. Logion 22: "Cuando hagáis lo uno" = Gálatas 3:28. Logion 113: "El Reino está dentro de vosotros" = Lucas 17:21.',
    detail: 'Tomás es UNA COLECCIÓN DE DICHOS — no tiene narrativa, no tiene teología sacrificial. Jesús habla directamente: "Yo soy la luz que está sobre todos ellos" (log. 77). Si Tomás estuvo en el canon, la teología cristiana sería radicalmente diferente.',
  },
  {
    bookId: 'evangelio_maria',
    title: 'Evangelio de María Magdalena',
    subtitle: 'Evangelio copto de María',
    categoryId: 'gnosticos',
    connectionType: 'apostolic_claim',
    bibleLinks: ['Juan 20:11-18', 'Lucas 8:2-3', 'Hechos 1:14'],
    evidence: 'RECLAMA SER las enseñanzas de María Magdalena, la primera testigo de la resurrección (Jn 20:11-18). Pedro mismo dice: "María, lo sabemos, el Salvador te amó más que a las otras mujeres."',
    detail: 'Si María fue la primera en ver al Resucitado, ¿por qué su evangelio fue suprimido? El Evangelio de María describe el ascenso del alma a través de los 7 poderes — exactamente lo que Pablo describe en 2 Corintios 12:2-4.',
  },
  {
    bookId: 'evangelio_felipe',
    title: 'Evangelio de Felipe',
    subtitle: 'Nag Hammadi Códice II',
    categoryId: 'gnosticos',
    connectionType: 'apostolic_claim',
    bibleLinks: ['Mateo 19:4-6', 'Gálatas 3:28', 'Efesios 5:31-32'],
    evidence: 'RECLAMA ser enseñanza del apóstol Felipe. Desarrolla el concepto de la Cámara Nupcial usando el mismo lenguaje que Pablo en Efesios 5:31-32. Jesús "reunió a Adán y Eva" = restauró la androginia original.',
    detail: 'Felipe dice: "Cuando Eva estaba en Adán, no había muerte" — paralelo directo con Génesis 2-3 y Romanos 5:12. La Cámara Nupcial es la reunificación de lo masculino y femenino que Pablo llama "grande misterio" (Ef 5:32).',
  },
  {
    bookId: 'evangelio_verdad',
    title: 'Evangelio de la Verdad',
    subtitle: 'Edición crítica',
    categoryId: 'gnosticos',
    connectionType: 'apostolic_claim',
    bibleLinks: ['Juan 1:1-18', 'Juan 14:6', 'Romanos 3:23', 'Colosenses 1:15-20'],
    evidence: 'RECLAMA predicar "el evangelio de la verdad" — el mismo evangelio que Pablo dice predicar (Gá 2:5, 2 Co 11:10). Desarrolla teológicamente el prólogo de Juan: el Logos como camino, verdad y vida.',
    detail: 'El Evangelio de la Verdad NO es un texto tardío — es un sermón valentiniano (s. II) que PRESUPONE el texto de Juan y lo desarrolla. "La ignorancia del Padre fue la causa de la angustia" — paralelo exacto con Romanos 3:23 "todos pecaron" pero reinterpretado como ignorancia, no culpa.',
  },
  {
    bookId: 'evangelio_judas',
    title: 'Evangelio de Judas',
    subtitle: 'Códice Tchacos',
    categoryId: 'gnosticos',
    connectionType: 'apostolic_claim',
    bibleLinks: ['Mateo 26:14-16', 'Mateo 27:3-8', 'Juan 13:21-30', 'Lucas 22:3'],
    evidence: 'RECLAMA SER el evangelio secreto de Judas Iscariote. Jesús se ríe de los discípulos porque oran al "dios de los arcontes" (Yaldabaoth). Judas es el que RECIBE la gnosis, no el que traiciona.',
    detail: 'Si el evangelio canónico dice que "Satanás entró en Judas" (Lc 22:3), el Evangelio de Judas explica POR QUÉ: Judas era el único que comprendía la verdad. Jesús le dice: "Tú los superarás a todos, porque sacrificarás al hombre que me viste."',
  },
  {
    bookId: 'pistis_sophia',
    title: 'Pistis Sophia',
    subtitle: 'Schmidt/MacDermot',
    categoryId: 'gnosticos',
    connectionType: 'apostolic_claim',
    bibleLinks: ['Mateo 13:36-43', 'Juan 14:26', 'Hechos 1:3', 'Apocalipsis 21-22'],
    evidence: 'RECLAMA SER las enseñanzas de Jesús RESUCITADO a los discípulos durante 11 años (Hechos 1:3 "40 días" es la versión abreviada). Jesús explica todo "desde el principio hasta el cumplimiento del Pleroma".',
    detail: 'Pistis Sophia desarrolla la profecía de Jesús en Jn 14:26: "el Espíritu Santo os enseñará todas las cosas". Describe el drama de Pistis Sophia (el alma caída) que es redimida por el Salvador — la misma estructura que el Apocalipsis de Juan.',
  },
  {
    bookId: 'libros_jeu',
    title: 'Libros de Jeu',
    subtitle: 'Textos del Códice Bruce',
    categoryId: 'gnosticos',
    connectionType: 'apostolic_claim',
    bibleLinks: ['Efesios 1:21', 'Colosenses 2:15', 'Apocalipsis 5:1-5'],
    evidence: 'RECLAMA SER las contraseñas que Jesús dio a sus discípulos para atravesar los arcontes. "El que conoce estos sellos pasará libremente" — paralelo con Apocalipsis 5: "¿Quién es digno de abrir el libro y desatar sus sellos?"',
    detail: 'Los Libros de Jeu contienen los NOMBRES y SELLOS que el alma necesita para ascender. Pablo dice "nos hizo sentar en los lugares celestiales" (Ef 2:6) — los Libros de Jeu explican CÓMO.',
  },
  {
    bookId: 'hipostasis_arcontes',
    title: 'Hipóstasis de los Arcontes',
    subtitle: 'La realidad de los gobernantes',
    categoryId: 'gnosticos',
    connectionType: 'parallel_text',
    bibleLinks: ['Génesis 1-6', 'Proverbios 9', 'Efesios 6:12'],
    evidence: 'EXÉGESIS DIRECTA de Génesis 1-6 revelando la identidad de los "dioses" (arcontes). Samael = "dios ciego" (2 Cor 4:4: "el dios de este siglo"). LA conexión más directa entre AT y gnosis.',
    detail: 'Hipóstasis de los Arcontes NO es "lo que alguien piensa" — es una lectura de Génesis que demuestra QUE YALdabaoth es el Dios del AT. "Ellos pensaban que solo ellos habían creado el mundo, pero en realidad estaban en ignorancia."',
  },
  {
    bookId: 'nag_hammadi',
    title: 'Biblioteca de Nag Hammadi (completa)',
    subtitle: '52 tratados',
    categoryId: 'gnosticos',
    connectionType: 'biblical_ms',
    bibleLinks: ['Todo el NT', 'Génesis', 'Salmos'],
    evidence: '52 TEXTOS COMPLETOS descubiertos en 1945. Evangelios, apocalipsis, tratados — todos escritos por cristianos del s. II-III d.C. Enterrados ~350 d.C. para protegerlos de la persecución ortodoxa.',
    detail: 'Nag Hammadi no es "una biblioteca de textos heréticos" — es la biblioteca de una comunidad cristiana primitiva que preservó textos que la ortodoxia posterior declaró herejía. Estos textos CITAN la Biblia constantemente y reclaman ser la verdadera interpretación.',
  },
  {
    bookId: 'nh_codice_II',
    title: 'Códice II de Nag Hammadi (ed. crítica)',
    subtitle: 'Copto + Inglés',
    categoryId: 'gnosticos',
    connectionType: 'biblical_ms',
    bibleLinks: ['Génesis 1-3', 'Juan 1', 'Mateo'],
    evidence: 'El códice que contiene Apócrifo de Juan, Evangelio de Tomás, Evangelio de Felipe, Hipóstasis de los Arcontes — los textos más importantes de la biblioteca.',
    detail: 'Un SOLO códice de Nag Hammadi contiene más evidencia sobre el cristianismo primitivo que todos los padres de la Iglesia juntos.',
  },

  // ════════════════════════════════════════════════════════════════
  // TESTIGO HISTÓRICO EXTERNO
  // ════════════════════════════════════════════════════════════════
  {
    bookId: 'josefo',
    title: 'Flavio Josefo — Antigüedades de los Judíos',
    subtitle: 'Historia del pueblo judío',
    categoryId: 'pseudepigrafos',
    connectionType: 'historical_witness',
    bibleLinks: ['Lucas 3:1', 'Mateo 14:1-12', 'Hechos 5:36-37', 'Juan 18:28-40', 'Hechos 12:20-23'],
    evidence: 'Josefo es la FUENTE EXTERNA PRINCIPAL para corroborar el NT. El Testimonium Flavianum (Ant. 18.3.3) menciona a Jesús: "Hubo por este tiempo un varón sabio llamado Jesús".',
    detail: 'Josefo menciona a Juan el Bautista, a Santiago "hermano de Jesús", a Pilato, a Herodes, al sumo sacerdote Anás. NO es interpretación — es un historiador judío del s. I que documenta los mismos eventos que el NT. Es el testigo externo que confirma que el NT describe personas y eventos reales.',
  },

  // ════════════════════════════════════════════════════════════════
  // PADRES DE LA IGLESIA — preservan textos bíblicos que de otro modo se perderían
  // ════════════════════════════════════════════════════════════════
  {
    bookId: 'ireneo_haereses',
    title: 'Ireneo — Contra Herejías',
    subtitle: 'Adversus Haereses',
    categoryId: 'patristica',
    connectionType: 'preserve_quotes',
    bibleLinks: ['Todo el NT', 'Génesis 1-3'],
    evidence: 'Ireneo CITA EXTENSAMENTE los textos gnósticos que hoy se encuentran en Nag Hammadi. Sin Ireneo, no sabríamos qué decían los gnósticos. Su refutación es nuestra fuente principal de su teología.',
    detail: 'Ireneo cita ADVERUS HAERESES I.29 = el texto del Apócrifo de Juan. Cuando Nag Hammadi fue descubierto en 1945, los académicos confirmaron que Ireneo había citado CORRECTAMENTE. Ireneo, el enemigo de la gnosis, es el que preservó la gnosis para la historia.',
  },
  {
    bookId: 'hipolito',
    title: 'Hipólito — Refutación de Todas las Herejías',
    subtitle: 'Philosophumena',
    categoryId: 'patristica',
    connectionType: 'preserve_quotes',
    bibleLinks: ['Génesis 1-3', 'Juan 1', 'Romanos 7'],
    evidence: 'Hipólito PRESERVA el mito del Apócrifo de Juan en su forma más antigua (Ref. VI.29-36). También preserva el sistema de los Naasenos, que combinan mitología griega con exégesis bíblica.',
    detail: 'Hipólito documenta cómo los herejes INTERPRETABAN la Biblia. No es su interpretación — es su testimonio de CÓMO los gnósticos leían las Escrituras. Sin Hipólito, no sabríamos que existió una exégesis gnóstica del AT.',
  },
  {
    bookId: 'clemente',
    title: 'Clemente de Alejandría — Stromata',
    subtitle: 'Tapices',
    categoryId: 'patristica',
    connectionType: 'preserve_quotes',
    bibleLinks: ['Todo el NT', 'Hebreos 5:12-14', '1 Corintios 2:6-16'],
    evidence: 'Clemente CITA el Evangelio de los Egipcios (hoy perdido). Defiende que la gnosis es compatible con la fe. Cita textos bíblicos en su forma más antigua. Es el primer padre de la Iglesia que cita el NT de forma sistemática.',
    detail: 'Clemente fue un cristiano platónico que veía la filosofía griega como preparación para el evangelio. Preserva citas de textos cristianos primitivos que hoy están perdidos. Su obra es una ventana a un cristianismo donde gnosis y fe no estaban separados.',
  },
  {
    bookId: 'origen',
    title: 'Orígenes — De Principiis',
    subtitle: 'Sobre los Principios',
    categoryId: 'patristica',
    connectionType: 'preserve_quotes',
    bibleLinks: ['Todo el AT y NT', 'Mateo 19:12', 'Romanos 8:19-23', 'Apocalipsis 21:4-5'],
    evidence: 'Orígenes fue el PRIMER GRAN ERUDITO BÍBLICO. Su Hexapla comparaba 6 versiones del AT lado a lado. Escribió comentarios a casi todos los libros de la Biblia. Defendió la preexistencia de las almas y la apocatástasis.',
    detail: 'Orígenes enseñó que el INFIERNO no es eterno (apocatástasis = restauración universal). Fue condenado como hereje 300 años después de su muerte. Sus obras preservan el texto bíblico en su forma más antigua y demuestran que la interpretación "ortodoxa" no es la única posible.',
  },
];

// Agrupados por tipo de conexión para facilitar el filtrado
export type ConnectionType = BibleConnection['connectionType'];

export const connectionTypeLabels: Record<string, string> = {
  biblical_core: 'ES el texto bíblico',
  cited_in_bible: 'Citado en la Biblia',
  biblical_ms: 'Manuscrito bíblico',
  apostolic_claim: 'Reclama ser Escritura',
  parallel_text: 'Paralelo bíblico directo',
  historical_witness: 'Testigo histórico externo',
  preserve_quotes: 'Preserva citas bíblicas',
};

// Número total de libros con conexión pura
export const pureConnectionCount = bibleConnections.length;
// IDs de libros para filtrado rápido
export const pureConnectionBookIds = new Set(bibleConnections.map(b => b.bookId));
