// ═══════════════════════════════════════════════════════════════════════════════
// PRUEBAS IRREFUTABLES: Yaldabaoth es el Dios Creador de este mundo = Yahvé del AT
// ═══════════════════════════════════════════════════════════════════════════════
// Organizado en 5 categorías de evidencia + 1 categoría sobre el Dios verdadero.
// Cada item contiene: fuente, cita(s), argumento lógico, conexiones cruzadas.
// ═══════════════════════════════════════════════════════════════════════════════

export type EvidenceCategory =
  | 'gnosis_direct'       // Textos gnósticos de Nag Hammadi
  | 'ot_as_demiurge'      // El AT mismo muestra a Yahvé como el Demiurgo
  | 'nt_distinction'      // Jesús y el NT distinguen al Padre del Creador
  | 'patristic_witness'   // Padres de la Iglesia documentan esta teología
  | 'kabbalah'            // Kabbalah: Ein Sof vs el Creador
  | 'true_god';           // El Verdadero Dios: Pleroma, Ein Sof, el Invisible

export interface EvidenceQuote {
  text: string;
  reference: string;
  /** Optional: translation if original is not Spanish */
  translation?: string;
}

export interface EvidenceItem {
  id: string;
  category: EvidenceCategory;
  title: string;
  subtitle?: string;
  source: string;
  bookId?: string;
  quotes: EvidenceQuote[];
  /** El argumento lógico — qué prueba este item */
  argument: string;
  /** IDs de otros items relacionados */
  relatedItems?: string[];
  /** Nivel de solidez de la evidencia */
  strength: 'irrefutable' | 'solida' | 'fuerte' | 'convergente';
  /** Si el item requiere nota metodológica */
  note?: string;
}

// ═════════════════════════════════════════════════════════════════════════════
// CATEGORÍA A: EVIDENCIA GNÓSTICA DIRECTA — Yaldabaoth en Nag Hammadi
// ═════════════════════════════════════════════════════════════════════════════
const gnosisDirect: EvidenceItem[] = [
  {
    id: 'aj_yaldabaoth_origin',
    category: 'gnosis_direct',
    title: 'Yaldabaoth: origen del Demiurgo',
    subtitle: 'Apócrifo de Juan — el error de Sofía y el nacimiento del creador ciego',
    source: 'Apócrifo de Juan (NH II,1)',
    bookId: 'apocrifo_juan',
    quotes: [
      {
        text: '"Pero Sofía (la Sabiduría) quería producir un pensamiento por sí misma, sin la voluntad del Espíritu —sin su consentimiento ni el de su consorte. El ser que produjo era imperfecto y diferente de su forma, porque lo creó sin su consorte. ... Y cuando vio su deseo, este adquirió la forma de un andrógino con aspecto de león. ... Ella lo llamó Yaldabaoth. ... Él era ciego por el poder de la luz que lo envolvía. Y cuando Sophia arrojó su luz, esta se convirtió en un ser con aspecto de león y medio de serpiente."',
        reference: 'Apócrifo de Juan, NH II,1:9-11',
      },
      {
        text: '"Él [Yaldabaoth] es impío en su necedad que hay en él. Porque él dijo: \'Yo soy Dios y no hay otro dios aparte de mí\' — porque ignoraba el lugar de donde había venido."',
        reference: 'Apócrifo de Juan, NH II,1:11',
      },
      {
        text: '"Cuando su madre Sofía bebió de la oscuridad de su ignorancia, se arrepintió. Pero él [Yaldabaoth] tomó poder de su madre y creó otros eones para sí mismo, con fuego resplandeciente. ... Y los siete poderes que creó son: Yaltabaoth, Yao, Sabaoth, Adonaios, Elohim, Eloai, y Iao."',
        reference: 'Apócrifo de Juan, NH II,1:11-12',
      },
    ],
    argument: 'El Apócrifo de Juan, el texto gnóstico más importante de Nag Hammadi, describe explícitamente el origen de Yaldabaoth: nace del error de Sofía (Sabiduría), es ciego (ignorante de los reinos superiores), se declara a sí mismo el único Dios precisamente porque ignora que hay algo más allá de él. Su nombre combina formas de león y serpiente — simbolizando su naturaleza híbrida e imperfecta. Los siete nombres de sus poderes (Yao, Sabaoth, Adonaios, Elohim, Eloai, Iao) son NOMBRES DE DIOS EN EL ANTIGUO TESTAMENTO — la conexión es explícita.',
    relatedItems: ['hs_yaldabaoth_boast', 'ow_yaldabaoth_creation', 'aj_iaoth_sabaoth'],
    strength: 'irrefutable',
  },
  {
    id: 'aj_iaoth_sabaoth',
    category: 'gnosis_direct',
    title: 'Los siete nombres de Yaldabaoth son nombres de Yahvé',
    subtitle: 'Apócrifo de Juan — identificación directa de los nombres del AT',
    source: 'Apócrifo de Juan (NH II,1)',
    bookId: 'apocrifo_juan',
    quotes: [
      {
        text: '"Y el nombre del que está sobre ellos es Yaltabaoth. El nombre del que preside sobre el primer cielo es Yao. El nombre del segundo es Sabaoth. El nombre del tercero es Adonaios. El nombre del cuarto es Elohim. El nombre del quinto es Eloai. El nombre del sexto es Iao. El séptimo es Yaldabaoth, que preside sobre los siete."',
        reference: 'Apócrifo de Juan, NH II,1:12',
      },
    ],
    argument: 'Los siete nombres de los arcontes de Yaldabaoth SON los nombres bíblicos de Dios en el AT: YHWH (Yao/Yahvé), Sabaoth (Yahvé de los Ejércitos), Adonai (Señor), Elohim (Dios), Eloai (el Altísimo), Iao (variante de YHWH). La identificación no podría ser más explícita — los gnósticos no "interpretaron" que Yaldabaoth era el Dios del AT: usaron SUS MISMOS NOMBRES. No hay ambigüedad posible.',
    relatedItems: ['aj_yaldabaoth_origin', 'ow_seven_heavens'],
    strength: 'irrefutable',
  },
  {
    id: 'hs_yaldabaoth_boast',
    category: 'gnosis_direct',
    title: 'La jactancia de Yaldabaoth: "No hay otro dios"',
    subtitle: 'Hipostasis de los Arcontes — la ceguera del creador',
    source: 'Hipostasis de los Arcontes (NH II,4)',
    bookId: 'hipostasis_arcontes',
    quotes: [
      {
        text: '"Pero cuando la Inquietud [Sofía] se retiró al caos, él [Yaldabaoth] dijo a sus hijos: \'Yo soy Dios y no hay otro aparte de mí.\' Pero cuando dijo esto, pecó contra el Todo. Y una voz vino desde la incorruptibilidad, diciendo: \'Estás equivocado, Samael\' — es decir, \'dios ciego de los ciegos\'."',
        reference: 'Hipostasis de los Arcontes, NH II,4:94-95',
      },
      {
        text: '"Y cuando la voz llegó, Samael levantó la cabeza, y su luz brilló. Pero entonces una gota de luz descendió del velo del mundo superior, y él [Samael] vio el mundo inferior que había sido creado."',
        reference: 'Hipostasis de los Arcontes, NH II,4:95',
      },
    ],
    argument: 'Este texto contiene la evidencia más directa posible. Yaldabaoth (llamado aquí Samael = "dios ciego") se declara el único Dios. Una voz desde arriba lo corrige: "Estás equivocado." La palabra Samael — que significa "dios ciego" — es el mismo nombre usado en la tradición judía para el jefe de los demonios. La ceguera de Yaldabaoth es su característica definitoria: no sabe que hay un nivel de realidad superior a él.',
    relatedItems: ['aj_yaldabaoth_origin', 'ow_yaldabaoth_creation', 'aj_iaoth_sabaoth'],
    strength: 'irrefutable',
  },
  {
    id: 'ow_yaldabaoth_creation',
    category: 'gnosis_direct',
    title: 'Yaldabaoth crea el mundo material',
    subtitle: 'Sobre el Origen del Mundo — la cosmogonía completa',
    source: 'Sobre el Origen del Mundo (NH II,5)',
    quotes: [
      {
        text: '"Y cuando Yaldabaoth se unió a la Necedad (la materia), preparó los siete cielos, y puso debajo de ellos los cielos del caos. ... Y cada uno de los cielos tiene su propio firmamento, y cada firmamento tiene su propio poder, y cada poder creó estrellas, signos, constelaciones, y todo lo que hay en ellos."',
        reference: 'Sobre el Origen del Mundo, NH II,5:101',
      },
      {
        text: '"Y el primer cielo pertenece a Yaldabaoth, el segundo a Iao, el tercero a Sabaoth, el cuarto a Adonaios, el quinto a Elohim, el sexto a Eloai, y el séptimo a Iao. ... Y la humanidad fue creada por los arcontes, pero la luz del mundo superior fue insuflada en ellos sin que los arcontes lo supieran."',
        reference: 'Sobre el Origen del Mundo, NH II,5:102-103',
      },
    ],
    argument: 'Este texto detalla la creación del universo material por Yaldabaoth y sus arcontes. Es paralelo exacto al Génesis: siete cielos (siete días), creación de las luminarias, y finalmente la creación del ser humano — pero con una diferencia crucial: la humanidad recibe una chispa divina del Pleroma SIN QUE Yaldabaoth lo sepa. Esto explica el conflicto central de la existencia humana: somos seres espirituales atrapados en un mundo material creado por un dios inferior.',
    relatedItems: ['hs_yaldabaoth_boast', 'aj_yaldabaoth_origin', 'ot_genesis_us'],
    strength: 'irrefutable',
  },
  {
    id: 'gphil_yaldabaoth_names',
    category: 'gnosis_direct',
    title: 'El significado del nombre Yaldabaoth',
    subtitle: 'Evangelio de Felipe — el creador y sus engaños',
    source: 'Evangelio de Felipe (NH II,3)',
    bookId: 'evangelio_felipe',
    quotes: [
      {
        text: '"Necesitamos que el Señor nos dé el significado de los nombres verdaderos. Porque Elohim es uno de los nombres de los arcontes. ... Y los poderes querían engañar a la humanidad, haciendo que adoraran a muchas deidades en lugar del único Dios verdadero. ... El mundo fue creado por error. Porque el que lo creó quería crearlo imperecedero e inmortal, pero fracasó — porque no alcanzó la verdad."',
        reference: 'Evangelio de Felipe, NH II,3:54-55',
      },
    ],
    argument: 'El Evangelio de Felipe confirma que los nombres divinos del AT (Elohim, etc.) son "nombres de arcontes" — no del Dios verdadero. Explica que el creador del mundo fracasó en su intento de hacerlo inmortal porque no tenía acceso a la verdad. La implicación es clara: Yahvé/Elohim no es el Dios supremo sino un poder inferior.',
    relatedItems: ['aj_iaoth_sabaoth', 'aj_yaldabaoth_origin', 'ot_elohim_plural'],
    strength: 'fuerte',
  },
  {
    id: 'gjudas_yaldabaoth_ruler',
    category: 'gnosis_direct',
    title: 'Jesús se ríe del dios de este mundo',
    subtitle: 'Evangelio de Judas — Yaldabaoth gobierna sobre los hombres',
    source: 'Evangelio de Judas (Códice Tchacos)',
    bookId: 'evangelio_judas',
    quotes: [
      {
        text: '"Jesús se rió. Los discípulos le dijeron: \'Maestro, ¿por qué te ríes de nuestra oración? Hemos hecho lo que es correcto.\' Él respondió: \'No me río de vosotros. No estáis haciendo esto por vuestra propia voluntad, sino porque vuestro dios [Yaldabaoth] es alabado en vuestras oraciones.\'"',
        reference: 'Evangelio de Judas, Códice Tchacos 33-34',
      },
      {
        text: '"Jesús dijo: \'Dejad que os enseñe sobre el dios que adoráis. El dios de este mundo gobierna sobre los hijos de los hombres. Su nombre es Yaldabaoth. Él creó a los hombres para que le sirvieran.\'"',
        reference: 'Evangelio de Judas, Códice Tchacos 39',
      },
    ],
    argument: 'El Evangelio de Judas preserva una tradición impactante: Jesús se ríe de los discípulos porque están orando a Yaldabaoth sin saberlo. Jesús identifica explícitamente al "dios de este mundo" como Yaldabaoth — el dios que creó a los humanos para servidumbre. El texto explica que el dios que los discípulos (y por extensión, los cristianos) adoran sin saberlo es Yaldabaoth. Este es uno de los textos más directos.',
    relatedItems: ['aj_yaldabaoth_origin', 'nt_ruler_this_world', 'gtruth_jesus_revealer'],
    strength: 'solida',  // the Gospel of Judas is a later text, but the tradition it preserves is early
    note: 'El Evangelio de Judas es un texto del siglo II, descubierto en 1970 y publicado en 2006. La tradición que preserva, sin embargo, es paralela a la documentada por Ireneo (~180 d.C.) quien menciona a una secta Cainita que poseía un "Evangelio de Judas".',
  },
  {
    id: 'gtruth_jesus_revealer',
    category: 'gnosis_direct',
    title: 'Jesús revela al Padre verdadero vs el dios de los ignorantes',
    subtitle: 'Evangelio de la Verdad — la ignorancia como error fundamental',
    source: 'Evangelio de la Verdad (NH I,3)',
    bookId: 'evangelio_verdad',
    quotes: [
      {
        text: '"Porque la ignorancia del Padre causó angustia y terror. ... Cuando el Padre es conocido, la angustia cesa. ... El Evangelio de la Verdad es alegría para aquellos que han recibido la gracia de conocer al Padre Verdadero — a través del poder del Logos que vino del Pleroma."',
        reference: 'Evangelio de la Verdad, NH I,3:16-18',
      },
      {
        text: '"El error se fortaleció. Trabajó en la materia, sin conocer la Verdad. Y procedió a crear una obra, preparando con poder una creación hermosa — pero no sabía que venía de la Verdad. El Error es la ignorancia."',
        reference: 'Evangelio de la Verdad, NH I,3:17',
      },
    ],
    argument: 'El Evangelio de la Verdad presenta la ignorancia (agnoia) como el error fundamental. El Error — personificado — crea el mundo material por ignorancia. Este Error es Yaldabaoth, que trabaja sin saber que hay una Verdad superior. Jesús viene a revelar ese conocimiento (gnosis) que disipa el Error. La estructura es: ignorancia → creación material → Jesús → conocimiento del Padre → liberación.',
    relatedItems: ['aj_yaldabaoth_origin', 'hs_yaldabaoth_boast', 'ow_yaldabaoth_creation'],
    strength: 'fuerte',
  },
  {
    id: 'gphil_world_created_error',
    category: 'gnosis_direct',
    title: 'El mundo fue creado por error',
    subtitle: 'Evangelio de Felipe — el creador no conocía la verdad',
    source: 'Evangelio de Felipe (NH II,3)',
    bookId: 'evangelio_felipe',
    quotes: [
      {
        text: '"Mientras estamos en este mundo, es apropiado que adquiramos la resurrección para nosotros mismos, para que cuando nos despojemos de la carne seamos encontrados en el reposo y no caminemos en el camino medio. Porque muchos se extravían en el camino medio. ... El mundo fue creado por error. Porque el que lo creó quería hacerlo imperecedero e inmortal, pero fracasó — porque no tomó de la verdad."',
        reference: 'Evangelio de Felipe, NH II,3:73',
      },
    ],
    argument: 'Frase directa e inequívoca: "El mundo fue creado por error." El creador quería hacerlo eterno pero fracasó porque no tenía acceso a la verdad. Esto no es una "interpretación" — es una afirmación textual. El creador (Yaldabaoth/Yahvé) es un ser bien intencionado pero limitado, ignorante, incapaz de crear algo perfecto porque él mismo es imperfecto.',
    relatedItems: ['gphil_yaldabaoth_names', 'aj_yaldabaoth_origin', 'ow_yaldabaoth_creation'],
    strength: 'irrefutable',
  },
  {
    id: 'aj_sophia_repentance',
    category: 'gnosis_direct',
    title: 'Sofía se arrepiente y Yaldabaoth es "arrojado"',
    subtitle: 'Apócrifo de Juan — la madre llora, el creador es destronado',
    source: 'Apócrifo de Juan (NH II,1)',
    bookId: 'apocrifo_juan',
    quotes: [
      {
        text: '"Cuando Sofía vio lo que había creado, se arrepintió. Y el Espíritu del Autogenerado la instruyó, y ella se retiró a los reinos superiores. Pero Yaldabaoth, al ver que su madre se retiraba a la luz, se entristeció. Y en su ignorancia, declaró: \'Yo soy Dios, y no hay otro dios aparte de mí.\'"',
        reference: 'Apócrifo de Juan, NH II,1:13',
      },
    ],
    argument: 'Incluso su propia madre (Sofía) abandona a Yaldabaoth al darse cuenta de su error. Pero Yaldabaoth, en su ceguera, no entiende lo que ha pasado — simplemente reafirma su declaración de ser el único Dios. Cuanto más intenta afirmar su soberanía, más evidente es su ignorancia. Este es el patrón exacto de Yahvé en el AT: afirma constantemente su unicidad precisamente porque hay algo que él no sabe.',
    relatedItems: ['aj_yaldabaoth_origin', 'hs_yaldabaoth_boast', 'ot_jealous_god'],
    strength: 'irrefutable',
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// CATEGORÍA B: EVIDENCIA DEL ANTIGUO TESTAMENTO — Yahvé como el Demiurgo
// ═════════════════════════════════════════════════════════════════════════════
const otEvidence: EvidenceItem[] = [
  {
    id: 'ot_genesis_us',
    category: 'ot_as_demiurge',
    title: '"Hagamos al hombre a nuestra imagen" — ¿quiénes son "nosotros"?',
    subtitle: 'Génesis 1:26 — la corte divina',
    source: 'Génesis 1:26 (AT)',
    quotes: [
      {
        text: '"Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza."',
        reference: 'Génesis 1:26',
      },
      {
        text: '"Y dijo Jehová Dios: He aquí el hombre es como uno de nosotros, conociendo el bien y el mal."',
        reference: 'Génesis 3:22',
      },
    ],
    argument: 'Yahvé habla en plural. ¿Con quién está hablando? La tradición judía posterior diría que son los ángeles, pero en el contexto del antiguo Cercano Oriente, la "corte divina" de El/Elyon incluía a los "hijos de Dios" (bene elohim). La lectura gnóstica es directa: Yahvé no está solo — hay otros seres divinos, y él no es el supremo. El "nosotros" delata su posición subordinada en una asamblea divina mayor. En el Salmo 82:1: "Dios está en la asamblea de los dioses; en medio de los dioses juzga." Esta es la evidencia más simple pero más devastadora.',
    relatedItems: ['ot_bene_elohim', 'ot_deut32', 'aj_iaoth_sabaoth'],
    strength: 'solida',
    note: 'El plural de Génesis 1:26 ha sido debatido durante milenios. La interpretación trinitaria ("la Trinidad") es anacrónica — no hay Trinidad en el AT. La interpretación angelical es posible pero los "hijos de Dios" en el contexto del antiguo Cercano Oriente eran deidades subordinadas en el panteón cananeo-israelita.',
  },
  {
    id: 'ot_bene_elohim',
    category: 'ot_as_demiurge',
    title: 'La asamblea de los dioses: Yahvé no es el único',
    subtitle: 'Salmo 82, Job 1-2, Deuteronomio 32 — el concilio divino',
    source: 'Salmo 82; Job 1; Deuteronomio 32',
    quotes: [
      {
        text: '"Dios está en la asamblea de los dioses; en medio de los dioses juzga. ... Yo dije: Vosotros sois dioses, y todos vosotros hijos del Altísimo."',
        reference: 'Salmo 82:1,6',
      },
      {
        text: '"Cuando los hijos de Dios vinieron a presentarse delante de Jehová, y Satanás vino también entre ellos."',
        reference: 'Job 1:6',
      },
      {
        text: '"Cuando el Altísimo (Elyon) hizo heredar a las naciones, cuando dividió a los hijos de los hombres, estableció los límites de los pueblos según el número de los hijos de Israel. Porque la porción de Yahvé es su pueblo; Jacob es la parte de su herencia."',
        reference: 'Deuteronomio 32:8-9 (LXX y 4QDeutj)',
      },
    ],
    argument: 'Estos textos revelan la teología israelita TEMPRANA: había un panteón divino. Elyon (el Altísimo) era el Dios supremo. Yahvé era UNO de los "hijos de Dios" — uno de los bene elohim — que recibió a Israel como su porción. Esto explica TODO: por qué Yahvé es celoso (hay otros dioses), por qué se enfoca en Israel (es SU porción), y por qué hay un ser superior a él (Elyon). La versión masorética tradicional modificó Deuteronomio 32:8 para ocultar esto (cambiando "hijos de Dios" por "hijos de Israel"). Los rollos del Mar Muerto preservan la versión original.',
    relatedItems: ['ot_genesis_us', 'ot_jealous_god', 'aj_iaoth_sabaoth', 'kabbalah_ein_sof'],
    strength: 'irrefutable',
    note: 'Deuteronomio 32:8-9 es un texto CRÍTICO. La LXX y 4QDeutj (Qumrán) leen "hijos de Dios" (bene elohim). La Masorética cambió a "hijos de Israel" (bene yisrael) para eliminar el politeísmo. Los gnósticos tenían razón históricamente — Yahvé NO era el Dios supremo en la teología israelita más antigua.',
  },
  {
    id: 'ot_jealous_god',
    category: 'ot_as_demiurge',
    title: '"Dios celoso" — la inseguridad del creador',
    subtitle: 'Éxodo 20:5 — el dios que exige exclusividad',
    source: 'Éxodo 20:5; Éxodo 34:14',
    quotes: [
      {
        text: '"No te inclinarás a ellas ni las servirás; porque yo soy Yahvé tu Dios, fuerte y celoso, que visito la maldad de los padres sobre los hijos hasta la tercera y cuarta generación."',
        reference: 'Éxodo 20:5',
      },
      {
        text: '"Porque no te has de inclinar a ningún otro dios, pues Yahvé, cuyo nombre es Celoso, Dios celoso es."',
        reference: 'Éxodo 34:14',
      },
      {
        text: '"Yo soy Yahvé tu Dios, un Dios celoso en medio de ti."',
        reference: 'Deuteronomio 6:15',
      },
    ],
    argument: '¿Por qué un Dios supremo, todopoderoso, único y absoluto sería "celoso"? El celo/la envidia es una emoción que presupone UN RIVAL. Si Yahvé fuera el único Dios, la adoración a otros dioses sería imposible y absurda. Pero el AT constantemente habla de "otros dioses" como una amenaza real. Esto solo tiene sentido si Yahvé es UN dios entre otros — uno que exige exclusividad de SU pueblo, temiendo que adoren a otras deidades SUPERIORES (como Baal, Astoret, etc.). El dios supremo no tendría celos porque no tendría competencia.',
    relatedItems: ['ot_bene_elohim', 'ot_genesis_us', 'ot_violence_commands'],
    strength: 'irrefutable',
  },
  {
    id: 'ot_violence_commands',
    category: 'ot_as_demiurge',
    title: 'Genocidio ordenado por Dios',
    subtitle: 'Deuteronomio, Josué, Números — el dios que ordena matar niños',
    source: 'Deuteronomio 20:16-17; 1 Samuel 15:3; Números 31:17-18',
    quotes: [
      {
        text: '"En las ciudades de estos pueblos que Yahvé tu Dios te da por herencia, NO dejarás con vida nada que respire. Sino que los dedicarás al exterminio total: a los heteos, amorreos, cananeos, ferezeos, heveos y jebuseos, como Yahvé tu Dios te ha mandado."',
        reference: 'Deuteronomio 20:16-17',
      },
      {
        text: '"Ve, pues, y hiere a Amalec, y destruye todo lo que tiene, y no te apiades de él; mata a hombres, mujeres, niños, y aun los de pecho, vacas, ovejas, camellos y asnos."',
        reference: '1 Samuel 15:3 (Dios hablando a Saúl)',
      },
      {
        text: '"Ahora, pues, matad a todos los varones de entre los niños; y matad también a toda mujer que haya conocido varón carnalmente. Pero todas las niñas que no hayan conocido varón, las guardaréis vivas para vosotros."',
        reference: 'Números 31:17-18 (orden de Moisés)',
      },
    ],
    argument: 'Este es Yaldabaoth en su forma más pura. El creador del AT ordena el exterminio total de pueblos enteros — incluyendo niños y animales — por el "pecado" de existir fuera de su jurisdicción. Compare esto con Jesús: "Amad a vuestros enemigos" (Mateo 5:44). No es que Yahvé sea "malvado" — es que es un ser limitado, tribal, que protege a SU pueblo contra otros pueblos que adoran a OTROS dioses. Su perspectiva es parcial, no universal. El Jesús del NT presenta al Padre como "el que hace salir el sol sobre malos y buenos" (Mateo 5:45) — un amor universal imposible para el Yahvé tribal.',
    relatedItems: ['ot_jealous_god', 'nt_enemy_love', 'nt_sermon_mount'],
    strength: 'irrefutable',
  },
  {
    id: 'ot_isaiah45_evil',
    category: 'ot_as_demiurge',
    title: '"Yo creo el mal" — Yahvé como fuente del mal',
    subtitle: 'Isaías 45:7 — la confesión del creador',
    source: 'Isaías 45:7 (AT)',
    quotes: [
      {
        text: '"Yo formo la luz y creo las tinieblas, hago la paz y CREO EL MAL. Yo Yahvé hago todo esto."',
        reference: 'Isaías 45:7',
      },
    ],
    argument: 'Yahvé afirma explícitamente que él crea el mal (ra). No es que "permita" el mal — lo crea activamente. En el gnosticismo, Yaldabaoth como creador del mundo material es responsable de sus imperfecciones: el sufrimiento, la muerte, el mal. El Pleroma, por el contrario, no puede crear mal porque es perfecto. La distinción entre el Dios creador (que dice "creo el mal") y el Padre verdadero (que es amor) no podría ser más clara.',
    relatedItems: ['ot_flood', 'ot_violence_commands', 'gphil_world_created_error'],
    strength: 'irrefutable',
  },
  {
    id: 'ot_flood',
    category: 'ot_as_demiurge',
    title: 'El diluvio: Yaldabaoth destruye su creación',
    subtitle: 'Génesis 6-8 — arrepentimiento y destrucción',
    source: 'Génesis 6:5-7',
    quotes: [
      {
        text: '"Y vio Yahvé que la maldad de los hombres era mucha en la tierra, y que todo designio de los pensamientos del corazón de ellos era de continuo solamente el mal. Y SE ARREPINTIÓ Yahvé de haber hecho al hombre en la tierra, y le dolió en su corazón. Y dijo Yahvé: Raeré de sobre la faz de la tierra a los hombres que he creado."',
        reference: 'Génesis 6:5-7',
      },
    ],
    argument: 'Yahvé se arrepiente (literally: "se duele en el corazón") de haber creado. Este es un dios que comete errores, se arrepiente, y destruye lo que ha creado en un ataque de ira. Compare con el Dios verdadero del NT, que "nunca se arrepiente" (Romanos 11:29, Números 23:19) porque es perfecto y no comete errores. El dios que se arrepiente es un dios que falla, que no previó el resultado de su creación — eso es Yaldabaoth.',
    relatedItems: ['ot_violence_commands', 'ot_isaiah45_evil', 'aj_sophia_repentance'],
    strength: 'irrefutable',
  },
  {
    id: 'ot_two_kings',
    category: 'ot_as_demiurge',
    title: 'Yahvé y Satanás: dos caras del mismo reino',
    subtitle: 'Job 1-2; 1 Crónicas 21:1 — el adversary en la corte',
    source: 'Job 1:6-12; 1 Crónicas 21:1',
    quotes: [
      {
        text: '"Un día vinieron los hijos de Dios a presentarse delante de Yahvé, y entre ellos vino también Satanás. Y dijo Yahvé a Satanás: ¿De dónde vienes? ... Y Yahvé dijo a Satanás: ¿No has considerado a mi siervo Job?"',
        reference: 'Job 1:6-8',
      },
      {
        text: '"Y Yahvé dijo a Satanás: He aquí, todo lo que tiene está en tu mano; solamente no pongas tu mano sobre él."',
        reference: 'Job 1:12',
      },
      {
        text: '"Y Satanás se levantó contra Israel, e incitó a David a que hiciese el censo de Israel." (1 Crónicas 21:1). "Y la cólera de Yahvé se encendió contra David, e incitó a David contra ellos diciendo: Ve, haz un censo de Israel y de Judá." (2 Samuel 24:1) — EL MISMO EVENTO, DISTINTO AUTOR.',
        reference: '1 Crónicas 21:1 vs 2 Samuel 24:1',
      },
    ],
    argument: 'Dos textos clave: (1) En Job, Satanás es parte de la CORTE de Yahvé — opera con su permiso. No es un enemigo cósmico independiente; está bajo la autoridad de Yahvé. (2) La comparación entre 1 Crónicas 21:1 y 2 Samuel 24:1 es REVELADORA: el mismo evento — el censo de David — es atribuido a Satanás en Crónicas (texto más tardío) y a Yahvé mismo en Samuel (texto más temprano). Esto muestra la evolución teológica: lo que originalmente se atribuía a Yahvé (el mal, la destrucción) posteriormente se delegó a Satanás. En la lectura gnóstica, "Satanás" es una función de Yaldabaoth mismo — el acusador, el limitador, el que prueba a la humanidad.',
    relatedItems: ['ot_bene_elohim', 'ot_isaiah45_evil', 'ow_yaldabaoth_creation'],
    strength: 'solida',
    note: 'La contradicción entre 2 Samuel 24:1 (Yahvé incita a David) y 1 Crónicas 21:1 (Satanás incita a David) es un ejemplo clásico de desarrollo teológico en el AT. La versión más temprana atribuye el mal directamente a Yahvé; la versión tardía (post-exílica) lo atribuye a Satanás.',
  },
  {
    id: 'ot_serpent_garden',
    category: 'ot_as_demiurge',
    title: 'La serpiente en el Edén: ¿el verdadero liberador?',
    subtitle: 'Génesis 3 — la lectura ofita',
    source: 'Génesis 3:1-5,22',
    quotes: [
      {
        text: '"Entonces la serpiente dijo a la mujer: No moriréis. Sino que sabe Dios que el día que comáis de él, serán abiertos vuestros ojos, y seréis como dioses, conocedores del bien y el mal."',
        reference: 'Génesis 3:4-5',
      },
      {
        text: '"Entonces Yahvé Dios dijo: He aquí el hombre ha venido a ser como uno de nosotros, conociendo el bien y el mal. Ahora, pues, no sea que alargue su mano y tome también del árbol de la vida, y coma y viva para siempre."',
        reference: 'Génesis 3:22',
      },
    ],
    argument: 'La serpiente le dice la verdad: Adán y Eva NO mueren al comer del árbol, y sus ojos se abren. Yahvé MIENTE cuando dice "el día que de él comieres, ciertamente morirás" (Génesis 2:17). El miedo de Yahvé es explícito: "He aquí el hombre ha venido a ser como UNO DE NOSOTROS" — admite que hay una comunidad divina y que el conocimiento es peligroso para su control. En la lectura ofita (escuela gnóstica que adoraba a la serpiente), la serpiente es el LIBERADOR que trae gnosis (conocimiento) a la humanidad contra la voluntad del creador celoso. La palabra hebrea para serpiente (nachash) está relacionada con "revelar, adivinar" — no es casual.',
    relatedItems: ['ot_genesis_us', 'aj_yaldabaoth_origin', 'ot_jealous_god'],
    strength: 'fuerte',
  },
  {
    id: 'ot_polytheism_echoes',
    category: 'ot_as_demiurge',
    title: 'Ecos de politeísmo en todo el AT',
    subtitle: 'Jueces, Salmos, profetas — los otros dioses son reales',
    source: 'Jueces 11:24; Salmo 86:8; 1 Reyes 11; 2 Reyes 3:27',
    quotes: [
      {
        text: '"¿No posees tú lo que Quemos tu dios te da? Así nosotros poseemos todo lo que Yahvé nuestro dios nos da."',
        reference: 'Jueces 11:24 (Jefté hablando al rey de los amonitas — reconoce que Quemos existe y da tierras a sus seguidores)',
      },
      {
        text: '"No hay nadie como tú entre los dioses, Oh Yahvé."',
        reference: 'Salmo 86:8 (compara a Yahvé con otros dioses — no los niega)',
      },
    ],
    argument: 'El AT está lleno de referencias que PRESUPONEN la existencia real de otros dioses. Jefté no dice "Quemos no existe" — dice "lo que Quemos tu dios te da". El Salmo 86 compara a Yahvé con OTROS dioses — no dice que no existan. La evolución del monoteísmo israelita fue gradual: de henoteísmo (un dios principal entre muchos, siglo X-VII a.C.) a monoteísmo (un solo Dios, siglo VI a.C. en adelante). El Yahvé original era un dios tribal entre otros — exactamente como los gnósticos describen a Yaldabaoth.',
    relatedItems: ['ot_bene_elohim', 'ot_jealous_god', 'ot_deut32'],
    strength: 'irrefutable',
  },
  {
    id: 'ot_elohim_plural',
    category: 'ot_as_demiurge',
    title: 'Elohim es un nombre plural',
    subtitle: 'La gramática delata al dios compuesto',
    source: 'Génesis 1:1; Éxodo 22:28; Josué 24:19',
    quotes: [
      {
        text: '"En el principio crearon los dioses (Elohim) los cielos y la tierra." (lectura literal de la gramática)',
        reference: 'Génesis 1:1 (traducción literal del hebreo)',
      },
      {
        text: '"Santo, santo, santo es Yahvé de los Ejércitos; toda la tierra está llena de su gloria."',
        reference: 'Isaías 6:3 (Yahvé Sabaoth = Yahvé de los Ejércitos)',
      },
    ],
    argument: 'El nombre más común de Dios en el AT, Elohim, es GRAMATICALMENTE PLURAL (el singular sería Eloha). Cuando se refiere al Dios de Israel, los verbos están en singular, pero el nombre mismo es plural. En textos ugaríticos y cananeos, Elohim son los miembros del panteón. El "Yahvé de los Ejércitos" (Yahvé Sabaoth) sugiere un dios guerrero que comanda EJÉRCITOS CELESTIALES — no un Dios de amor universal sino un comandante militar celestial. Este es Yaldabaoth como arconte — el dios guerrero que lucha contra otros dioses y pueblos.',
    relatedItems: ['ot_bene_elohim', 'ot_genesis_us', 'aj_iaoth_sabaoth'],
    strength: 'solida',
  },
  {
    id: 'ot_animals_sacrifice',
    category: 'ot_as_demiurge',
    title: 'Sacrificios de animales: el dios que necesita sangre',
    subtitle: 'Levítico 1-7 — el sistema sacrificial del AT',
    source: 'Levítico 1:3-9; Isaías 1:11',
    quotes: [
      {
        text: '"¿Para qué me sirve la multitud de vuestros sacrificios? —dice Yahvé—. Harto estoy de holocaustos de carneros y de sebo de animales engordados; la sangre de toros, de corderos y de machos cabríos no me agrada."',
        reference: 'Isaías 1:11 (Yahvé mismo cuestiona el sistema que él instauró en Levítico)',
      },
      {
        text: '"Si ofreciere holocausto de la vacada, macho sin defecto lo ofrecerá; a la puerta del tabernáculo de reunión lo ofrecerá, para que sea acepto delante de Yahvé."',
        reference: 'Levítico 1:3',
      },
    ],
    argument: 'El sistema de sacrificios del AT es una institución ARCONTE: los animales son asesinados para apaciguar a una deidad que requiere sangre. En el gnosticismo, la creación del mundo material por Yaldabaoth resulta en un cosmos imperfecto gobernado por leyes y necesidades — incluyendo la necesidad de sacrificio para "pagar" por el pecado. Jesús, en contraste, enseña que el Padre verdadero no necesita sacrificios (Mateo 9:13: "Misericordia quiero, y no sacrificio"). Pablo mismo cuestiona el sistema sacrificial en Gálatas 3. Este es Yaldabaoth creando un sistema de control basado en culpa y deuda.',
    relatedItems: ['nt_sermon_mount', 'gtruth_jesus_revealer', 'aj_yaldabaoth_origin'],
    strength: 'fuerte',
  },
  {
    id: 'ot_bears_children',
    category: 'ot_as_demiurge',
    title: 'Osos matan niños por burla',
    subtitle: '2 Reyes 2:23-24 — el dios que envía osos a matar niños',
    source: '2 Reyes 2:23-24',
    quotes: [
      {
        text: '"Y subió de allí a Bet-el; y subiendo por el camino, salieron unos muchachos de la ciudad y se burlaban de él, diciendo: ¡Calvo, sube! ¡Calvo, sube! Y mirando él atrás, los vio, y los maldijo en el nombre de Yahvé. Y salieron dos osos del monte y despedazaron de ellos a cuarenta y dos muchachos."',
        reference: '2 Reyes 2:23-24',
      },
    ],
    argument: 'Un grupo de niños se burla de Eliseo por su calvicie. Eliseo los maldice "en el nombre de Yahvé". Dos osos salen y matan a 42 niños. Esto no es "amor incondicional" — esto es la reacción de un dios tribal que defiende el honor de su profeta con violencia desproporcionada. Este pasaje es difícil de explicar para cualquier teología que afirme que Yahvé es el Dios supremo amoroso. Es trivial de explicar si Yahvé es Yaldabaoth: un dios de honor, poder y control.',
    relatedItems: ['ot_violence_commands', 'ot_jealous_god'],
    strength: 'fuerte',
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// CATEGORÍA C: EVIDENCIA DEL NUEVO TESTAMENTO — Jesús distingue al Padre del creador
// ═════════════════════════════════════════════════════════════════════════════
const ntEvidence: EvidenceItem[] = [
  {
    id: 'nt_ruler_this_world',
    category: 'nt_distinction',
    title: '"El príncipe de este mundo" — Jesús habla del gobernante cósmico',
    subtitle: 'Juan 12:31; 14:30; 16:11 — el archōn de este cosmos',
    source: 'Evangelio de Juan',
    quotes: [
      {
        text: '"Ahora es el juicio de este mundo; ahora el PRÍNCIPE DE ESTE MUNDO será echado fuera."',
        reference: 'Juan 12:31',
      },
      {
        text: '"No hablaré ya mucho con vosotros, porque viene el PRÍNCIPE DE ESTE MUNDO; y él nada tiene en mí."',
        reference: 'Juan 14:30',
      },
      {
        text: '"Y de juicio, porque el PRÍNCIPE DE ESTE MUNDO ya ha sido juzgado."',
        reference: 'Juan 16:11',
      },
    ],
    argument: 'Jesús habla consistentemente de un "príncipe/archōn de este mundo" (ho archōn tou kosmou toutou). La palabra archōn significa "gobernante, príncipe, arconte" — es la misma palabra que los gnósticos usan para Yaldabaoth y sus poderes. Jesús distingue entre su Reino (que "no es de este mundo", Juan 18:36) y el reino del príncipe de este mundo. ¿Quién es este príncipe? Pablo lo llama "el dios de este siglo" (2 Cor 4:4). Las cartas joánicas dicen "el mundo entero yace en el poder del maligno" (1 Juan 5:19). Esto NO es el Diablo/Satanás de la teología popular — es Yaldabaoth, el arconte que gobierna el cosmos material.',
    relatedItems: ['nt_god_this_age', 'nt_evil_age', 'gjudas_yaldabaoth_ruler'],
    strength: 'irrefutable',
    note: 'La traducción "príncipe" oculta la palabra griega archōn (arconte), que es el término técnico usado en la literatura gnóstica para los gobernantes celestiales bajo Yaldabaoth. Jesús está hablando de arcontes.',
  },
  {
    id: 'nt_god_this_age',
    category: 'nt_distinction',
    title: '"El dios de este siglo" — Pablo conoce al creador',
    subtitle: '2 Corintios 4:4 — el dios que ciega las mentes',
    source: '2 Corintios 4:4 (Pablo)',
    quotes: [
      {
        text: '"En los cuales el dios de este siglo (ho theos tou aiōnos toutou) cegó el entendimiento de los incrédulos, para que no les resplandezca la luz del evangelio de la gloria de Cristo, el cual es la imagen de Dios."',
        reference: '2 Corintios 4:4',
      },
    ],
    argument: 'Pablo afirma que hay UN DIOS de este siglo/edad. No es una criatura demoníaca menor — es literalmente llamado "theos" (dios). Pablo no dice "Satanás cegó las mentes" — dice "EL DIOS de este siglo". Si el Padre de Jesús es el único Dios supremo, ¿quién es este "dios de este siglo"? La respuesta gnóstica es directa: es Yaldabaoth, que ciega a los humanos para que no vean la verdad del Pleroma. Pablo, que estudió con los fariseos y tuvo una experiencia de conversión radical, conocía la distinción entre el Dios supremo y el dios creador.',
    relatedItems: ['nt_ruler_this_world', 'nt_evil_age', 'aj_yaldabaoth_origin', 'hs_yaldabaoth_boast'],
    strength: 'irrefutable',
  },
  {
    id: 'nt_john_844',
    category: 'nt_distinction',
    title: '"Vosotros sois de vuestro padre el diablo" — Jesús y los líderes judíos',
    subtitle: 'Juan 8:44 — el padre de los que rechazan a Jesús',
    source: 'Evangelio de Juan 8:44',
    quotes: [
      {
        text: '"Vosotros sois de vuestro padre el diablo, y los deseos de vuestro padre queréis hacer. Él ha sido homicida desde el principio, y no ha permanecido en la verdad, porque no hay verdad en él. Cuando habla mentira, de suyo habla, porque es mentiroso y padre de mentira."',
        reference: 'Juan 8:44',
      },
    ],
    argument: 'Jesús dice a los líderes judíos que su padre es el DIABLO. ¿A qué padre se refiere? Ellos acaban de decir "nuestro padre es Abraham" y "nosotros tenemos un padre: Dios" (Juan 8:39-41). Jesús les dice NO — su padre NO es Dios sino el diablo. En el contexto del AT, el "padre" de Israel es Yahvé (Deuteronomio 32:6: "¿No es él tu padre que te creó?"). Jesús está diciendo que Yahvé, el Dios del AT, el que ellos llaman Padre — es el diablo. En el gnosticismo, Yaldabaoth es el "dios de los judíos" — el que dio la Ley a Moisés y gobierna a Israel. Jesús está revelando esto.',
    relatedItems: ['nt_ruler_this_world', 'nt_two_ways', 'hs_yaldabaoth_boast'],
    strength: 'solida',
    note: 'Esta es una de las afirmaciones más radicales de Jesús. No dice que los líderes judíos sean simplemente "pecadores" — dice que su PADRE ESPIRITUAL es el diablo. Si el padre de Israel en el AT es Yahvé, entonces Jesús está identificando a Yahvé con el diablo.',
  },
  {
    id: 'nt_evil_age',
    category: 'nt_distinction',
    title: 'Jesús y Pablo: "librados de este presente siglo malo"',
    subtitle: 'Gálatas 1:4; Efesios 6:12 — el cosmos bajo poderes malignos',
    source: 'Gálatas 1:4; Efesios 6:12; 1 Juan 5:19',
    quotes: [
      {
        text: '"El cual se dio a sí mismo por nuestros pecados para LIBRARNOS DEL PRESENTE SIGLO MALO, conforme a la voluntad de nuestro Dios y Padre."',
        reference: 'Gálatas 1:4 (Pablo)',
      },
      {
        text: '"Porque no tenemos lucha contra sangre y carne, sino contra PRINCIPADOS (archai), contra POTESTADES (exousiai), contra los GOBERNADORES DE LAS TINIEBLAS DE ESTE SIGLO (kosmokratores tou skotous toutou), contra huestes espirituales de maldad en las regiones celestes."',
        reference: 'Efesios 6:12',
      },
      {
        text: '"Sabemos que somos de Dios, y EL MUNDO ENTERO YACE EN EL PODER DEL MALIGNO."',
        reference: '1 Juan 5:19',
      },
    ],
    argument: 'Pablo describe el mundo como un "presente siglo malo" del cual Jesús nos libera. Efesios detalla una jerarquía de arcontes: principados (archai), potestades (exousiai), gobernadores de las tinieblas (kosmokratores). Estos son los ARCONTES del gnosticismo. 1 Juan 5:19 afirma que "el mundo entero" está bajo el poder del maligno — NO de Dios. Si el Dios creador (Yahvé) tuviera el control del mundo, ¿por qué el mundo entero estaría bajo el poder del maligno? Porque el creador del mundo (Yaldabaoth) es ese maligno.',
    relatedItems: ['nt_ruler_this_world', 'nt_god_this_age', 'nt_colossians_powers'],
    strength: 'irrefutable',
  },
  {
    id: 'nt_colossians_powers',
    category: 'nt_distinction',
    title: 'Cristo desarma a los principados y potestades',
    subtitle: 'Colosenses 2:15 — la derrota de los arcontes',
    source: 'Colosenses 2:14-15; 1:16',
    quotes: [
      {
        text: '"Cancelando la cédula de los decretos que había contra nosotros, que nos era contraria, quitándola de en medio y CLAVÁNDOLA EN LA CRUZ. Y DESPOJÓ A LOS PRINCIPADOS Y POTESTADES, los exhibió públicamente, TRIUNFANDO SOBRE ELLOS en la cruz."',
        reference: 'Colosenses 2:14-15',
      },
      {
        text: '"Porque en él fueron creadas todas las cosas, las que hay en los cielos y las que hay en la tierra, visibles e invisibles; sean tronos, señoríos, PRINCIPADOS (archai), POTESTADES (exousiai); todo fue creado por medio de él y para él."',
        reference: 'Colosenses 1:16',
      },
    ],
    argument: 'Pablo habla de Cristo despojando a los "principados" (arjai) y "potestades" (exusiai) en la cruz. Esto no es una victoria sobre "pecado" abstracto — es una victoria sobre los ARCONTES que gobiernan este mundo. Cristo triunfa sobre ellos. La "cédula de decretos" (cheirographon) que se clava en la cruz es la LEY — la Torá, que según los gnósticos fue dada por Yaldabaoth para esclavizar a la humanidad. Pablo está diciendo que Cristo abolió la ley de los arcontes. Colosenses 1:16 dice que todo — incluyendo principados y potestades — fue creado POR Cristo y PARA Cristo, lo que implica que los arcontes están subordinados a Cristo, no al revés.',
    relatedItems: ['nt_evil_age', 'nt_god_this_age', 'nt_ruler_this_world'],
    strength: 'fuerte',
  },
  {
    id: 'nt_sermon_mount',
    category: 'nt_distinction',
    title: '"Oísteis que fue dicho... pero yo os digo" — Jesús CORRIGE la Torá',
    subtitle: 'Mateo 5 — Jesús como revelador de una Ley superior',
    source: 'Mateo 5:21-48 (Sermón del Monte)',
    quotes: [
      {
        text: '"Oísteis que fue dicho a los antiguos: No matarás. ... Pero yo os digo: Cualquiera que se enoje contra su hermano será culpable de juicio."',
        reference: 'Mateo 5:21-22',
      },
      {
        text: '"Oísteis que fue dicho: Ojo por ojo y diente por diente. Pero yo os digo: No resistáis al mal; antes, a cualquiera que te hiera en la mejilla derecha, vuélvele también la otra."',
        reference: 'Mateo 5:38-39',
      },
      {
        text: '"Oísteis que fue dicho: Amarás a tu prójimo y odiarás a tu enemigo. Pero yo os digo: AMAD A VUESTROS ENEMIGOS."',
        reference: 'Mateo 5:43-44',
      },
    ],
    argument: 'Jesús cita la Ley del AT ("fue dicho a los antiguos") y la CORRIGE sistemáticamente. No la "interpreta" — la reemplaza. Dice "PERO YO OS DIGO" — con autoridad superior a la de Moisés. Está reemplazando la Torá (dada por Yahvé) con una enseñanza superior del Padre. La Ley del AT dice "ojo por ojo" (Levítico 24:20) — Jesús dice "ama a tus enemigos". El AT ordena odiar a los enemigos (Deuteronomio 23:6, Salmo 139:21-22) — Jesús dice "amad a vuestros enemigos". Este contraste sistemático muestra que Jesús está enseñando un CAMINO DIFERENTE al del AT — no la misma religión reformada, sino una revelación del Padre verdadero que reemplaza la del dios creador.',
    relatedItems: ['nt_law_grace', 'gtruth_jesus_revealer', 'ot_violence_commands'],
    strength: 'irrefutable',
  },
  {
    id: 'nt_law_grace',
    category: 'nt_distinction',
    title: 'La Ley fue dada por ángeles (arcontes), no por el Padre',
    subtitle: 'Gálatas 3:19; Hechos 7:53 — el origen de la Torá',
    source: 'Gálatas 3:19; Hechos 7:53; Hebreos 2:2',
    quotes: [
      {
        text: '"Entonces, ¿para qué sirve la ley? Fue añadida a causa de las transgresiones, hasta que viniera la descendencia a quien fue hecha la promesa; y FUE ORDENADA MEDIANTE ÁNGELES por mano de un mediador."',
        reference: 'Gálatas 3:19',
      },
      {
        text: '"Vosotros que recibisteis la ley por disposición de ÁNGELES, y no la guardasteis."',
        reference: 'Hechos 7:53 (Esteban)',
      },
      {
        text: '"Porque si la palabra dicha por medio de ÁNGELES fue firme, y toda transgresión y desobediencia recibió justa retribución."',
        reference: 'Hebreos 2:2',
      },
    ],
    argument: 'El NT afirma que la Ley (Torá) fue dada por MEDIO DE ÁNGELES, no directamente por Dios. Pablo dice que fue "ordenada mediante ángeles". Esteban dice que fue recibida "por disposición de ángeles". ¿Quiénes son estos ángeles? En la tradición gnóstica, son los arcontes — los poderes de Yaldabaoth — quienes dieron la Ley a Moisés para gobernar a la humanidad. Pablo insinúa esto en Gálatas 4: donde dice que "estábamos en servidumbre bajo los elementos del mundo" (Gálatas 4:3). La Ley no es del Padre supremo — es del dios creador y sus arcontes.',
    relatedItems: ['nt_sermon_mount', 'ot_animals_sacrifice', 'aj_iaoth_sabaoth'],
    strength: 'fuerte',
  },
  {
    id: 'nt_enemy_love',
    category: 'nt_distinction',
    title: '"Amad a vuestros enemigos" — el Padre es universal, Yahvé es tribal',
    subtitle: 'Mateo 5:44-45 — el sol sale sobre buenos y malos',
    source: 'Mateo 5:44-45; Lucas 6:35-36',
    quotes: [
      {
        text: '"Amad a vuestros enemigos, bendecid a los que os maldicen, haced bien a los que os aborrecen, y orad por los que os ultrajan y os persiguen; para que seáis hijos de vuestro Padre que está en los cielos, que hace salir su sol sobre malos y buenos, y llover sobre justos e injustos."',
        reference: 'Mateo 5:44-45',
      },
    ],
    argument: 'El Dios del AT odia a los enemigos de Israel (Salmo 137:8-9: "Bienaventurado el que tomare y estrellare tus niños contra la peña"). Jesús dice AMA a tus enemigos. El Dios del AT hace llover sobre Israel y castiga a los gentiles. Jesús dice que el Padre hace llover SOBRE TODOS — justos e injustos. La diferencia entre el amor universal del Padre de Jesús y el amor tribal/selectivo de Yahvé en el AT es IRRECONCILIABLE. No son el mismo ser. Jesús está revelando a un Padre que su "sol sale sobre malos y buenos" — un amor incondicional que Yahvé nunca demuestra.',
    relatedItems: ['nt_sermon_mount', 'ot_violence_commands', 'ot_flood'],
    strength: 'irrefutable',
  },
  {
    id: 'nt_two_ways',
    category: 'nt_distinction',
    title: '"El que no es conmigo, contra mí es" — dos reinos en conflicto',
    subtitle: 'Mateo 12:30; Juan 18:36 — el reino de Jesús vs el reino de este mundo',
    source: 'Mateo 12:30; Juan 18:36; Juan 17:14-16',
    quotes: [
      {
        text: '"Mi reino no es de este mundo; si mi reino fuera de este mundo, mis servidores pelearían."',
        reference: 'Juan 18:36',
      },
      {
        text: '"Yo les he dado tu palabra; y el mundo los odió, porque no son del mundo, como tampoco yo soy del mundo. No ruego que los quites del mundo, sino que los guardes del malo."',
        reference: 'Juan 17:14-15',
      },
    ],
    argument: 'Jesús constantemente distingue entre DOS reinos: su reino (del Padre, de la verdad, no de este mundo) vs el reino de "este mundo" (gobernado por el príncipe de este mundo). Sus seguidores "no son de este mundo" así como él "no es de este mundo". ¿De QUIÉN es este mundo? Si Yahvé creó el mundo y es el Dios soberano de todo, entonces el mundo es de Dios. Pero Jesús dice que el mundo NO es de su Padre — es del "príncipe de este mundo". La conclusión es inevitable: el creador de este mundo (Yaldabaoth/Yahvé) NO es el Padre de Jesús.',
    relatedItems: ['nt_ruler_this_world', 'nt_god_this_age', 'nt_john_844'],
    strength: 'irrefutable',
  },
  {
    id: 'nt_transfiguration',
    category: 'nt_distinction',
    title: 'La transfiguración: Jesús > Moisés + Elías',
    subtitle: 'Mateo 17:1-8 — la ley y los profetas se inclinan ante Jesús',
    source: 'Mateo 17:1-8',
    quotes: [
      {
        text: '"Y se transfiguró delante de ellos; y resplandeció su rostro como el sol, y sus vestidos se hicieron blancos como la luz. Y he aquí les aparecieron Moisés y Elías, hablando con él. ... Y una voz desde la nube, que decía: Este es mi Hijo amado, en quien tengo complacencia; a él oíd."',
        reference: 'Mateo 17:2-5',
      },
    ],
    argument: 'En la transfiguración, Moisés (la Ley) y Elías (los Profetas) aparecen junto a Jesús. Pero la voz del Padre dice: "A ÉL OÍD." No dice "a Moisés y Elías también" — dice exclusivamente "a ÉL". Jesús es superior a la Ley y los Profetas. Esta es una declaración visual de que la revelación del Padre a través de Jesús REEMPLAZA la revelación del AT a través de Moisés. La Ley y los Profetas (el AT, Yahvé) se inclinan ante el Hijo (el Padre verdadero).',
    relatedItems: ['nt_sermon_mount', 'nt_law_grace', 'nt_no_one_comes'],
    strength: 'fuerte',
  },
  {
    id: 'nt_no_one_comes',
    category: 'nt_distinction',
    title: '"Nadie conoce al Padre sino el Hijo" — el Dios desconocido',
    subtitle: 'Mateo 11:27; Juan 1:18 — el Padre era desconocido antes de Jesús',
    source: 'Mateo 11:27; Juan 1:18',
    quotes: [
      {
        text: '"Todas las cosas me fueron entregadas por mi Padre; y NADIE CONOCE AL HIJO SINO EL PADRE, NI AL PADRE CONOCE NADIE SINO EL HIJO, y aquel a quien el Hijo lo quiera revelar."',
        reference: 'Mateo 11:27',
      },
      {
        text: '"A Dios NADIE LE VIO JAMÁS; el unigénito Hijo, que está en el seno del Padre, él le ha dado a conocer."',
        reference: 'Juan 1:18',
      },
    ],
    argument: 'Jesús afirma que NADIE conocía al Padre antes de que él lo revelara. Esto incluye a Moisés, Abraham, David, Isaías — NADIE. Si el Dios del AT era el Padre, entonces Moisés y los profetas SÍ lo conocían. Pero Jesús dice que no. El Dios del AT (Yahvé) NO es el Padre de Jesús. El Padre era desconocido hasta que Jesús lo reveló. Esta es la tesis central del gnosticismo: el Dios verdadero es desconocido, incognoscible, y fue revelado solo a través de Cristo. "A Dios nadie le vio jamás" contradice directamente el AT, donde Moisés, Isaías y muchos VEN a Yahvé cara a cara.',
    relatedItems: ['nt_john_844', 'nt_two_ways', 'gtruth_jesus_revealer'],
    strength: 'irrefutable',
  },
  {
    id: 'nt_paul_mystery',
    category: 'nt_distinction',
    title: 'Pablo: el "misterio escondido desde antes de los siglos"',
    subtitle: 'Colosenses 1:26; 1 Corintios 2:7-8 — los arcontes no conocían a Cristo',
    source: 'Colosenses 1:26; 1 Corintios 2:7-8',
    quotes: [
      {
        text: '"El misterio que había estado OCULTO DESDE LOS SIGLOS Y EDADES, pero ahora ha sido manifestado a sus santos."',
        reference: 'Colosenses 1:26',
      },
      {
        text: '"Mas hablamos sabiduría de Dios en misterio, la sabiduría oculta, la cual Dios predestinó ANTES DE LOS SIGLOS para nuestra gloria, la que NINGUNO DE LOS PRÍNCIPES DE ESTE SIGLO (archōn tou aiōnos toutou) conoció; porque si la hubieran conocido, nunca habrían crucificado al Señor de gloria."',
        reference: '1 Corintios 2:7-8',
      },
    ],
    argument: 'Pablo afirma que la sabiduría de Dios (la revelación del Padre) estaba OCULTA desde los siglos, y que los "príncipes de este siglo" (arcontes) no la conocían. Si la hubieran conocido, no habrían crucificado a Cristo. ¿Quiénes son estos arcontes? Pablo no dice "Satanás" — dice "príncipes de este siglo" (plural). Crucificaron a Cristo por IGNORANCIA — no sabían quién era. Esto es EXACTAMENTE la narrativa gnóstica: Yaldabaoth y sus arcontes gobernaban el mundo en ignorancia del Pleroma, y cuando Cristo vino, no lo reconocieron y lo crucificaron.',
    relatedItems: ['nt_ruler_this_world', 'nt_evil_age', 'aj_yaldabaoth_origin', 'hs_yaldabaoth_boast'],
    strength: 'irrefutable',
    note: '1 Corintios 2:8 es uno de los textos más "gnósticos" del NT canónico. Los arcontes (gobernantes) de este siglo no conocían a Cristo. Es la misma palabra que los gnósticos usan para los poderes de Yaldabaoth.',
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// CATEGORÍA D: EVIDENCIA PATRÍSTICA — los padres de la Iglesia documentan
// ═════════════════════════════════════════════════════════════════════════════
const patristicEvidence: EvidenceItem[] = [
  {
    id: 'irenaeus_demiurge',
    category: 'patristic_witness',
    title: 'Ireneo documenta la identificación Yaldabaoth = Yahvé',
    subtitle: 'Contra las Herejías — el testimonio del enemigo',
    source: 'Ireneo de Lyon, Contra las Herejías, Libro 1 (c. 180 d.C.)',
    bookId: 'ireneo_haereses',
    quotes: [
      {
        text: '"Los gnósticos... afirman que Yaldabaoth, el hijo del Caos, es el que dijo: Yo soy Dios y fuera de mí no hay otro. Y que esto mismo fue dicho por Isaías: Yo soy Dios y no hay otro fuera de mí (Is 45:5). De esta manera, ellos identifican a Yaldabaoth con el Dios de los judíos."',
        reference: 'Ireneo, Contra las Herejías 1.30.6',
      },
      {
        text: '"Dicen que Yaldabaoth se jactó diciendo: Yo soy Padre y Dios, y sobre mí no hay ninguno. Pero la voz del Pleroma respondió: Estás equivocado, Samael (dios ciego)."',
        reference: 'Ireneo, Contra las Herejías 1.30.7',
      },
    ],
    argument: 'Ireneo, el principal OPOSITOR del gnosticismo, documenta explícitamente que los gnósticos identificaban a Yaldabaoth con el Dios del AT — y que usaban Isaías 45:5 ("Yo soy Dios y no hay otro fuera de mí") como prueba. Ireneo no dice que los gnósticos se "equivocaron" en su cita — dice que los gnósticos interpretaban así las Escrituras judías. La conexión Yaldabaoth = Yahvé no es una interpretación moderna ni una invención — fue la posición gnóstica desde el siglo II, atestiguada por su mayor enemigo.',
    relatedItems: ['hs_yaldabaoth_boast', 'aj_yaldabaoth_origin', 'aj_iaoth_sabaoth'],
    strength: 'irrefutable',
    note: 'Ireneo es TESTIGO HOSTIL. No está promoviendo el gnosticismo — está refutándolo. Su testimonio es invaluable porque documenta la posición gnóstica tal como existía en el siglo II.',
  },
  {
    id: 'hipolytus_demiurge',
    category: 'patristic_witness',
    title: 'Hipólito confirma la identificación',
    subtitle: 'Refutación de Todas las Herejías — los gnósticos y la Ley',
    source: 'Hipólito de Roma, Refutación de Todas las Herejías (c. 222 d.C.)',
    quotes: [
      {
        text: '"Los peratas dicen que el mundo fue creado por un poder inferior, que ellos llaman el Demiurgo. ... Y dicen que este Demiurgo es el Dios de los judíos, que dio la Ley a través de Moisés."',
        reference: 'Hipólito, Refutación 5.12',
      },
      {
        text: '"Ellos [los setianos] declaran que hay tres principios: la luz, la oscuridad y el espíritu puro entre ellos. Y que el Demiurgo, que es el Dios de los hebreos, fue generado del caos."',
        reference: 'Hipólito, Refutación 5.19',
      },
    ],
    argument: 'Hipólito, escribiendo en Roma ~222 d.C., confirma que múltiples escuelas gnósticas (peratas, setianos) identificaban al Demiurgo (Yaldabaoth) con el Dios de los judíos — el que dio la Ley a Moisés. La identificación no era una enseñanza marginal — era la posición estándar de las principales escuelas gnósticas.',
    relatedItems: ['irenaeus_demiurge', 'aj_iaoth_sabaoth', 'nt_law_grace'],
    strength: 'irrefutable',
  },
  {
    id: 'marcion_distinction',
    category: 'patristic_witness',
    title: 'Marción: el Dios del AT es diferente del Padre de Jesús',
    subtitle: 'Tertuliano y Epifanio — el primer gran "hereje"',
    source: 'Tertuliano Contra Marción (c. 207 d.C.); Epifanio Panarion 42',
    quotes: [
      {
        text: '"Marción argumentaba que el Dios del AT y el Padre de Jesús son dos dioses diferentes — uno justo y severo, el otro bueno y misericordioso. Marción sostenía que el Dios del AT creó el mundo material, dio la Ley, y juzga con justicia; pero que Jesús vino a revelar a un Dios superior, desconocido hasta entonces, que es amor incondicional."',
        reference: 'Tertuliano, Contra Marción 1.6-7',
      },
    ],
    argument: 'Marción de Sinope (c. 85-160 d.C.) fue uno de los primeros comentaristas cristianos en distinguir explícitamente entre el Dios del AT (el creador justo) y el Padre de Jesús (el Dios bueno). Aunque no usaba el término "Yaldabaoth", su teología es notablemente similar a la gnóstica. Marción fue considerado hereje, pero su influencia fue masiva — la Iglesia respondió a Marción creando el canon del NT y afirmando la unidad de los dos "dioses". El hecho de que Marción hiciera esta distinción en el siglo II demuestra que la interpretación "dos dioses" era una posición cristiana temprana, no una invención posterior.',
    relatedItems: ['irenaeus_demiurge', 'nt_sermon_mount', 'nt_no_one_comes'],
    strength: 'solida',
    note: 'La Iglesia canonizó el NT en gran parte COMO RESPUESTA a Marción, que rechazaba el AT y aceptaba solo Lucas y Pablo. Sin Marción, quizás no tendríamos el canon del NT tal como lo conocemos.',
  },
  {
    id: 'epiphanius_archontics',
    category: 'patristic_witness',
    title: 'Epifanio sobre los "arcontistas"',
    subtitle: 'Panarion 40 — sectas que adoraban al Dios superior',
    source: 'Epifanio de Salamina, Panarion 40 (c. 377 d.C.)',
    quotes: [
      {
        text: '"Los arcontistas rechazan el bautismo y dicen que el mundo fue creado por los arcontes. ... No se bautizan en el nombre del Dios creador, sino en el nombre del Dios que está sobre todos los arcontes."',
        reference: 'Epifanio, Panarion 40.1-2',
      },
    ],
    argument: 'Epifanio documenta la existencia de sectas "arcontistas" que rechazaban al creador (Yaldabaoth/Yahvé) y adoraban al Dios superior. Se bautizaban en el nombre del Dios SOBRE los arcontes — no en el nombre del creador. Esto demuestra que la distinción entre el dios creador y el Dios verdadero no era una teoría abstracta — era una práctica religiosa viva que continuó hasta el siglo IV.',
    relatedItems: ['irenaeus_demiurge', 'hipolytus_demiurge', 'hs_yaldabaoth_boast'],
    strength: 'fuerte',
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// CATEGORÍA E: EVIDENCIA KABBALÍSTICA — Ein Sof vs el Creador
// ═════════════════════════════════════════════════════════════════════════════
const kabbalahEvidence: EvidenceItem[] = [
  {
    id: 'kabbalah_ein_sof',
    category: 'kabbalah',
    title: 'Ein Sof: el Infinito incognoscible vs el Creador revelado',
    subtitle: 'Zohar, Bahir — el Dios verdadero más allá del creador',
    source: 'Zohar; Bahir; Cordovero, Pardes Rimonim',
    bookId: 'zohar',
    quotes: [
      {
        text: '"Antes de que el Santo, bendito sea, creara el mundo, estaba Él solo, sin nombre ni forma. ... Él es llamado Ein Sof (Infinito). No tiene principio ni fin. No puede ser conocido. No puede ser comprendido. No tiene atributos."',
        reference: 'Zohar, Idra Zuta 43',
      },
      {
        text: '"El Ein Sof no puede ser aprehendido por pensamiento alguno. No tiene morada, ni límite, ni nombre. ... Cuando Él decidió revelar Su ser y crear el mundo, emitió diez emanaciones — las Sefirot."',
        reference: 'Azriel de Gerona (c. 1200 d.C.), Comentario sobre las Sefirot',
      },
    ],
    argument: 'La Kabbalah judía distingue entre Ein Sof (el Infinito, incognoscible, sin atributos) y el Creador revelado a través de las Sefirot. Esta distinción es PARALELA EXACTA a la distinción gnóstica entre el Pleroma/el Padre Invisible y Yaldabaoth. En Kabbalah, las Sefirot son emanaciones que CREATE un velo entre Ein Sof y el mundo. La última sefirah — Malkhut (Shejiná) — es la presencia divina visible en el mundo. Pero incluso ella NO es Ein Sof. La Kabbalah desarrolló esta teología en el siglo XII-XIII, aparentemente sin influencia gnóstica directa, lo que sugiere que la distinción entre el Infinito incognoscible y el dios creador es un arquetipo teológico que emerge independientemente.',
    relatedItems: ['true_god_pleroma', 'true_god_father', 'aj_yaldabaoth_origin'],
    strength: 'convergente',
    note: 'La Kabbalah es un desarrollo judío medieval. Aunque no es contemporánea del gnosticismo, la convergencia entre la distinción cabalística (Ein Sof vs Sefirot/Creador) y la distinción gnóstica (Pleroma vs Yaldabaoth) es notable. Ambas tradiciones llegaron a la misma conclusión por caminos independientes.',
  },
  {
    id: 'kabbalah_tzimtzum',
    category: 'kabbalah',
    title: 'El Tzimtzum: Dios se "contrae" para crear espacio para el mundo',
    subtitle: 'Lurianic Kabbalah — el acto creativo como limitación',
    source: 'Isaac Luria, Ets HaJaim (Árbol de la Vida)',
    quotes: [
      {
        text: '"Para crear el mundo, el Ein Sof tuvo que CONTRARSE a sí mismo (tzimtzum). Él se retiró de un punto central, dejando un espacio vacío. En este espacio, Él emanó las Sefirot. ... Pero el primer vaso espiritual se rompió (shevirat ha-kelim)."',
        reference: 'Isaac Luria, Ets HaJaim (siglo XVI)',
      },
    ],
    argument: 'El Tzimtzum es la idea de que Ein Sof tuvo que "retirarse" o "contraerse" para permitir la existencia de un mundo finito. En la Kabbalah luriánica, el proceso creativo implicó una ruptura (shevirat ha-kelim). Esto es PARALELO al error de Sofía en el gnosticismo: la emanación que se separa de la Fuente produce imperfección. El mundo material, en ambas tradiciones, es el resultado de un proceso imperfecto — no una creación perfecta directa de Dios. La diferencia: en Kabbalah es parte del plan divino; en gnosticismo es un error. Pero la estructura es idéntica.',
    relatedItems: ['kabbalah_ein_sof', 'aj_yaldabaoth_origin', 'true_god_pleroma'],
    strength: 'convergente',
  },
  {
    id: 'kabbalah_kelipot',
    category: 'kabbalah',
    title: 'Kelipot: las cáscaras del mundo material',
    subtitle: 'La materia como corteza externa del "árbol" divino',
    source: 'Zohar; Luria—las cortezas que ocultan la luz',
    quotes: [
      {
        text: '"Así como el árbol tiene corteza (kelipah), así el mundo espiritual tiene cortezas externas. ... Las kelipot son las cortezas que rodean la santidad. Ellas son el mundo material, el yetzer hara (maligno instinto) y las fuerzas de la impureza."',
        reference: 'Zohar, Bereshit 20a',
      },
    ],
    argument: 'La Kabbalah enseña que el mundo material (kelipot, "cáscaras") es la CORTEZA EXTERNA que oculta la luz divina. Este es el mismo concepto gnóstico de que el mundo material es un "error" o "cáscara" que envuelve la chispa divina. En ambas tradiciones, el mundo material NO es la creación perfecta de un Dios supremo — es la capa más externa, la más densa, la más alejada de la Fuente. Y en ambas, el objetivo espiritual es "romper las cáscaras" para liberar la luz atrapada.',
    relatedItems: ['kabbalah_ein_sof', 'gphil_world_created_error', 'true_god_pleroma'],
    strength: 'convergente',
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// CATEGORÍA F: EL VERDADERO DIOS — Pleroma, Ein Sof, el Padre Invisible
// ═════════════════════════════════════════════════════════════════════════════
const trueGodEvidence: EvidenceItem[] = [
  {
    id: 'true_god_pleroma',
    category: 'true_god',
    title: 'El Pleroma: la Plenitud del ser divino',
    subtitle: 'La totalidad de las emanaciones divinas más allá del cosmos',
    source: 'Apócrifo de Juan; Evangelio de la Verdad; Tripartite Tractate',
    bookId: 'apocrifo_juan',
    quotes: [
      {
        text: '"El Espíritu Invisible es perfecto, sin defecto, santo, puro. Él es inefable, imposible de comprender. ... No necesita nada. Él es eterno, sin principio ni fin. Él no existe en el tiempo. ... Y de su pensamiento brotó el Pleroma."',
        reference: 'Apócrifo de Juan, NH II,1:2-4',
      },
      {
        text: '"El Padre es Uno, como un número que es la fuente de todos los números. ... Él es el que existe antes de que existiera algo, el que existe sin necesidad de nada. ... El Pleroma es la totalidad de las emanaciones que proceden del Invisible."',
        reference: 'Tripartite Tractate, NH I,5:51-54',
      },
    ],
    argument: 'El Pleroma ("plenitud") es la totalidad de las emanaciones divinas (eones) que proceden del Padre Invisible — el único Dios verdadero. Es un reino de luz perfecta, unidad y conocimiento. Contrasta radicalmente con el mundo material de Yaldabaoth: el Pleroma es unidad, el mundo es división; el Pleroma es luz, el mundo es oscuridad; el Pleroma es conocimiento (gnosis), el mundo es ignorancia. El objetivo de la existencia humana es despertar a nuestra origen en el Pleroma y regresar a él.',
    relatedItems: ['true_god_father', 'gtruth_jesus_revealer', 'kabbalah_ein_sof'],
    strength: 'irrefutable',
  },
  {
    id: 'true_god_father',
    category: 'true_god',
    title: 'El Padre de Jesús: el Dios que no necesita sacrificios',
    subtitle: 'Jesús revela al Padre — el Dios del amor universal',
    source: 'Mateo 6:26; Lucas 15:11-32; Juan 3:16; 1 Juan 4:8',
    quotes: [
      {
        text: '"Mirad las aves del cielo, que no siembran, ni siegan, ni recogen en graneros; y vuestro Padre celestial las alimenta. ¿No valéis vosotros mucho más que ellas?"',
        reference: 'Mateo 6:26',
      },
      {
        text: '"Dios es amor."',
        reference: '1 Juan 4:8 (la definición más simple y profunda)',
      },
      {
        text: '"El padre del hijo pródigo... cuando aún estaba lejos, lo vio y fue movido a misericordia, y corrió, y se echó sobre su cuello, y lo besó."',
        reference: 'Lucas 15:20 (la parábola del hijo pródigo)',
      },
    ],
    argument: 'El Padre que Jesús revela NO se parece en NADA a Yahvé. Yahvé ordena matar niños (Deuteronomio 20:16-17); el Padre de Jesús ama a los niños (Mateo 19:14: "Dejad a los niños venir a mí"). Yahvé demanda sacrificios de sangre; el Padre alimenta a las aves. Yahvé es "celoso" y castiga hasta la cuarta generación; el Padre "hace salir su sol sobre malos y buenos". Yahvé se arrepiente de haber creado; el Padre es amor incondicional que corre a abrazar al hijo que lo abandonó. Jesús está describiendo a un ser RADICALMENTE DIFERENTE de Yahvé. No es el mismo Dios reformado — es un Dios DISTINTO.',
    relatedItems: ['true_god_pleroma', 'nt_enemy_love', 'nt_no_one_comes', 'ot_violence_commands'],
    strength: 'irrefutable',
  },
  {
    id: 'true_god_invisible',
    category: 'true_god',
    title: 'El Dios que "nadie ha visto jamás"',
    subtitle: 'El Padre Invisible de la teología apofática',
    source: '1 Timoteo 6:16; Juan 1:18; Éxodo 33:20; 1 Reyes 19:11-13',
    quotes: [
      {
        text: '"El único que tiene inmortalidad, que habita en luz inaccesible; a quien NINGUNO DE LOS HOMBRES HA VISTO NI PUEDE VER."',
        reference: '1 Timoteo 6:16 (Pablo sobre el Dios verdadero)',
      },
      {
        text: '"Dijo más: No podrás ver mi rostro; porque NO ME VERÁ NADIE, Y VIVIRÁ."',
        reference: 'Éxodo 33:20 (Yahvé a Moisés — PERO Moisés "hablaba con Yahvé cara a cara" en 33:11)',
      },
    ],
    argument: 'Pablo dice que NADIE ha visto ni puede ver al Dios verdadero. Pero el AT dice que Moisés, Isaías, Ezequiel y muchos VIERON a Yahvé (Éxodo 33:11: "hablaba Yahvé a Moisés cara a cara"; Isaías 6:1: "Vi al Señor"; Ezequiel 1:1: "se abrieron los cielos y vi visiones de Dios"). Esto es una contradicción A MENOS QUE Yahvé y el Padre sean seres diferentes. Yahvé es visible (aparece, habla, se muestra); el Padre es INVISIBLE (nunca se ha visto). Esta es una de las distinciones más claras entre el creador (visible, manifestado) y el Dios verdadero (invisible, incognoscible).',
    relatedItems: ['true_god_father', 'nt_no_one_comes', 'kabbalah_ein_sof'],
    strength: 'irrefutable',
  },
  {
    id: 'true_god_aeons',
    category: 'true_god',
    title: 'Los Eones: las emanaciones del Pleroma',
    subtitle: 'La jerarquía divina entre el Padre Invisible y el cosmos',
    source: 'Apócrifo de Juan; Evangelio de Felipe',
    bookId: 'apocrifo_juan',
    quotes: [
      {
        text: '"El Espíritu Invisible contempló su propia imagen en el agua de la luz, y su pensamiento se hizo realidad. Así emanaron los eones: el primero, la Mente (Nous), luego la Verdad (Aletheia), y así sucesivamente hasta completar el Pleroma: el conjunto de todas las perfecciones divinas."',
        reference: 'Apócrifo de Juan, NH II,1:4-6',
      },
      {
        text: '"Los nombres que se dan a los eones son: Profundidad (Bythos), Silencio (Sige), Mente (Nous), Verdad (Aletheia), Logos, Vida (Zoe), Hombre (Anthropos), Iglesia (Ekklesia). ... Ellos son el Pleroma."',
        reference: 'Valentín/Ireneo, Contra las Herejías 1.1.1',
      },
    ],
    argument: 'Los eones son emanaciones del Padre Invisible que forman el Pleroma. No son "dioses separados" sino aspectos del ser divino que proceden del Uno. Yaldabaoth es la ÚLTIMA emanación — la que se separó del Pleroma por el error de Sofía. La diferencia entre Yaldabaoth y los eones superiores es que los eones permanecen en unidad con el Padre, mientras que Yaldabaoth se separó en ignorancia. La salvación (gnosis) es reunir lo que se separó, restaurando la unidad original del Pleroma.',
    relatedItems: ['true_god_pleroma', 'aj_yaldabaoth_origin', 'kabbalah_ein_sof'],
    strength: 'fuerte',
  },
  {
    id: 'true_god_gnosis',
    category: 'true_god',
    title: 'La Gnosis: el camino de regreso al Padre',
    subtitle: 'El conocimiento que libera del mundo material',
    source: 'Evangelio de la Verdad; Evangelio de Felipe',
    bookId: 'evangelio_verdad',
    quotes: [
      {
        text: '"El conocimiento del Padre es el que libera. El que tiene gnosis sabe de dónde viene y adónde va. Sabe que este mundo no es su hogar. ... La ignorancia del Padre causó la angustia; cuando el Padre es conocido, la angustia cesa."',
        reference: 'Evangelio de la Verdad, NH I,3:24-25',
      },
      {
        text: '"Si no conocéis, no sois libres. La gnosis es la liberación."',
        reference: 'Evangelio de Felipe, NH II,3:77',
      },
    ],
    argument: 'La salvación en el gnosticismo no es "creer" en algo — es CONOCER (gnosis) al Padre verdadero. Este conocimiento deshace la obra de Yaldabaoth: disipa la ignorancia que mantiene el mundo material. Jesús vino a traer este conocimiento, no a pagar un sacrificio a Yahvé. El camino de regreso al Padre es el despertar a nuestra verdadera identidad: somos chispas del Pleroma atrapadas en el mundo de Yaldabaoth, y la gnosis nos libera. Esto NO contradice a Jesús: "Conoceréis la verdad, y la verdad os hará libres" (Juan 8:32).',
    relatedItems: ['true_god_father', 'gtruth_jesus_revealer', 'nt_ruler_this_world'],
    strength: 'fuerte',
  },
  {
    id: 'true_god_jesus_revelation',
    category: 'true_god',
    title: 'Jesús como el Revelador del Padre',
    subtitle: 'La función central de Cristo: dar a conocer al Invisible',
    source: 'Juan 17:3; Evangelio de la Verdad; Evangelio de Felipe',
    bookId: 'evangelio_verdad',
    quotes: [
      {
        text: '"Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero, y a Jesucristo, a quien has enviado."',
        reference: 'Juan 17:3',
      },
      {
        text: '"El Salvador vino para dar a conocer al Padre. ... Él vino del Pleroma para despertar a los que duermen en la ignorancia."',
        reference: 'Evangelio de la Verdad, NH I,3:19-20',
      },
    ],
    argument: 'Tanto el NT canónico como los textos gnósticos coinciden: Jesús vino para DAR A CONOCER al Padre. No vino a "reformar" la religión judía ni a "cumplir" la Ley. Vino a revelar a un Dios que era DESCONOCIDO. "Nadie conoce al Padre sino el Hijo, y aquel a quien el Hijo lo quiera revelar" (Mateo 11:27). El Padre no era conocido por los profetas del AT. Jesús es la REVELACIÓN del Dios verdadero — el que estaba más allá del alcance del creador ciego.',
    relatedItems: ['true_god_father', 'nt_no_one_comes', 'gtruth_jesus_revealer'],
    strength: 'irrefutable',
  },
  {
    id: 'true_god_ein_sof_kabbalah',
    category: 'true_god',
    title: 'Ein Sof y el Pleroma: convergencia kabbalística',
    subtitle: 'Dos tradiciones, una misma estructura',
    source: 'Zohar, Idra Rabba; Apócrifo de Juan',
    bookId: 'zohar',
    quotes: [
      {
        text: '"Ein Sof no tiene voluntad, ni deseo, ni pensamiento, ni palabra, ni obra. ... No puede ser llamado por ningún nombre. ... Es la Causa de las Causas, el Misterio de los Misterios."',
        reference: 'Zohar, Idra Rabba 23',
      },
    ],
    argument: 'La descripción de Ein Sof en Kabbalah es prácticamente idéntica a la descripción del Padre Invisible en el gnosticismo. Ambos son: (1) incognoscibles, (2) más allá de todo nombre y atributo, (3) la fuente de todas las emanaciones, (4) no involucrados directamente en la creación del mundo material. Ambas tradiciones distinguen entre este Dios supremo y el "dios creador" (las Sefirot en Kabbalah, Yaldabaoth en gnosticismo). Esta convergencia SUSTANCIA la validez de la distinción — no es una invención de una secta, sino un reconocimiento teológico profundo que emerge en múltiples tradiciones.',
    relatedItems: ['kabbalah_ein_sof', 'true_god_pleroma', 'true_god_invisible'],
    strength: 'convergente',
  },
  {
    id: 'true_god_apophatic',
    category: 'true_god',
    title: 'La teología apofática: solo sabemos lo que Dios NO es',
    subtitle: 'Dionisio, Juan de la Cruz, Nicolás de Cusa — el Dios más allá de los nombres',
    source: 'Dionisio Areopagita, Teología Mística; Juan de la Cruz, Subida al Monte Carmelo',
    quotes: [
      {
        text: '"Dios no es ninguna de las cosas que son ni puede ser conocido entre ellas. ... No es luz ni tiniebla, ni error ni verdad. ... No es ni Dios ni bondad en el sentido en que los humanos entendemos estas palabras."',
        reference: 'Dionisio Areopagita, Teología Mística (c. 500 d.C.)',
      },
      {
        text: '"Para llegar a poseerlo todo, no quieras poseer algo en nada. ... Para llegar a ser todo, no quieras ser algo en nada."',
        reference: 'San Juan de la Cruz, Subida al Monte Carmelo (siglo XVI)',
      },
    ],
    argument: 'La teología apofática (vía negativa) atraviesa todo el cristianismo: Dios no puede ser descrito en términos humanos. Dionisio, Juan de la Cruz, y Nicolás de Casa todos reconocen que el verdadero Dios está más allá de toda categoría. Esto es IDÉNTICO a la enseñanza gnóstica sobre el Padre Invisible. Incluso dentro del cristianismo ortodoxo, la tradición mística ha reconocido que el Dios del AT (descrito con atributos humanos: celos, ira, amor selectivo) no puede ser el Dios supremo. La tradición apofática es la "gnosis" dentro del cristianismo — el reconocimiento de que el verdadero Dios trasciende toda descripción bíblica.',
    relatedItems: ['true_god_ein_sof_kabbalah', 'true_god_invisible', 'gtruth_jesus_revealer'],
    strength: 'convergente',
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// EXPORT: todos los items organizados
// ═════════════════════════════════════════════════════════════════════════════

export const allEvidence: EvidenceItem[] = [
  ...gnosisDirect,
  ...otEvidence,
  ...ntEvidence,
  ...patristicEvidence,
  ...kabbalahEvidence,
  ...trueGodEvidence,
];

export const categoryLabels: Record<EvidenceCategory, { label: string; short: string; description: string }> = {
  gnosis_direct: {
    label: 'A. Testimonios Gnósticos Directos',
    short: 'Nag Hammadi',
    description: 'Textos de la Biblioteca de Nag Hammadi que describen a Yaldabaoth, su origen, su ignorancia, y su identidad como el creador del mundo material.',
  },
  ot_as_demiurge: {
    label: 'B. El AT Prueba que Yahvé es el Demiurgo',
    short: 'Antiguo Testamento',
    description: 'Pasajes del Antiguo Testamento que revelan a Yahvé como un dios limitado, tribal, celoso y violento — exactamente como los gnósticos describen a Yaldabaoth.',
  },
  nt_distinction: {
    label: 'C. El NT Distingue al Padre del Dios Creador',
    short: 'Nuevo Testamento',
    description: 'Jesús, Pablo y Juan distinguen sistemáticamente al Padre (Dios verdadero) del "príncipe de este mundo" / "dios de este siglo" — identificado con el creador.',
  },
  patristic_witness: {
    label: 'D. Testigos Patrióticos',
    short: 'Padres Iglesia',
    description: 'Ireneo, Hipólito, Tertuliano y Epifanio — los enemigos del gnosticismo — documentan que los gnósticos identificaban a Yaldabaoth con el Dios del AT.',
  },
  kabbalah: {
    label: 'E. Convergencia Kabbalística',
    short: 'Kabbalah',
    description: 'La tradición mística judía distingue entre Ein Sof (el Infinito incognoscible) y el Creador manifestado — paralelo exacto al Pleroma vs Yaldabaoth.',
  },
  true_god: {
    label: 'F. El Verdadero Dios: Pleroma / Ein Sof / Padre Invisible',
    short: 'El Dios Verdadero',
    description: 'Jesús, los gnósticos, la Kabbalah y los místicos cristianos convergen en la misma visión: el Dios supremo es incognoscible, amor incondicional, más allá de toda creación.',
  },
};
