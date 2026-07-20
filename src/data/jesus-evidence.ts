// Evidencia histórica NO bíblica de la existencia de Jesús de Nazaret.
// Fuentes romanas, judías, griegas y sirias del siglo I-III d.C.
// Criterio: solo fuentes independientes del NT, escritas por no-cristianos.

export interface HistoricalSource {
  id: string;
  name: string;
  author: string;
  authorType: 'romano' | 'judio' | 'griego' | 'sirio' | 'cristiano';
  date: string;           // cuando fue escrito
  dateAD: number;         // año numérico (para timeline)
  title: string;
  work: string;           // obra específica
  originalLang: string;
  originalText: string;   // cita en idioma original
  translation: string;    // traducción español
  context: string;        // contexto histórico de la cita
  proves: string[];       // qué hechos históricos confirma
  historicalValue: string; // valoración histórica
  distanceFromJesus: string; // distancia temporal de Jesús (~30 d.C.)
}

export const jesusSources: HistoricalSource[] = [
  {
    id: 'tacitus',
    name: 'Tácito',
    author: 'Cornelio Tácito',
    authorType: 'romano',
    date: '~116 d.C.',
    dateAD: 116,
    title: 'Tácito — Anales 15.44',
    work: 'Anales',
    originalLang: 'Latín',
    originalText: '"Ergo abolendo rumori Nero subdidit reos et quaesitissimis poenis adfecit, quos per flagitia invisos vulgus Chrestianos appellabat. Auctor nominis eius Christus Tiberio imperitante per procuratorem Pontium Pilatum supplicio adfectus erat."',
    translation: '"Para acabar con el rumor, Nerón presentó como culpables y sometió a las más exquisitas torturas a los que el vulgo odiaba por sus abominaciones y llamaba cristianos. El autor de este nombre, Cristo, durante el reinado de Tiberio fue ajusticiado por el procurador Poncio Pilato."',
    context: 'Tácito describe la persecución de los cristianos por Nerón tras el incendio de Roma (64 d.C.). Los cristianos no eran culpables del incendio, pero Nerón los usó como chivo expiatorio. Al explicar el origen del nombre "cristianos", Tácito menciona a Cristo (Christus) como una persona histórica ejecutada por Pilato.',
    proves: [
      'Jesús (Christus) existió como persona histórica',
      'Fue ejecutado bajo Poncio Pilato durante el reinado de Tiberio (14-37 d.C.)',
      'El movimiento cristiano comenzó después de su muerte',
      'Para el 64 d.C. los cristianos eran ya un grupo numeroso y conocido en Roma',
    ],
    historicalValue: 'MÁXIMA. Tácito es el historiador romano más importante del período. Su confirmación de la ejecución de Jesús por Pilato es considerada por la crítica histórica como evidencia incontrovertible. Tácito no simpatiza con los cristianos (los llama "aborrecibles"), por lo que no hay sesgo favorable.',
    distanceFromJesus: '~85 años después de la muerte de Jesús (30 d.C.)',
  },
  {
    id: 'plinio',
    name: 'Plinio el Joven',
    author: 'Cayo Plinio Cecilio Segundo',
    authorType: 'romano',
    date: '~112 d.C.',
    dateAD: 112,
    title: 'Plinio el Joven — Epístolas 10.96',
    work: 'Epístolas (Carta al emperador Trajano)',
    originalLang: 'Latín',
    originalText: '"Affirmabant autem hanc fuisse summam vel culpae suae vel erroris, quod essent soliti stato die ante lucem convenire, carmenque Christo quasi deo dicere secum invicem..."',
    translation: '"Afirmaban que toda su culpa o error había consistido en reunirse en un día fijo antes del amanecer, cantar entre ellos un himno a Cristo como a un dios..."',
    context: 'Plinio era gobernador romano de Bitinia (actual Turquía). Escribe al emperador Trajano pidiendo consejo sobre cómo tratar a los cristianos. Describe sus prácticas: se reunían antes del amanecer, cantaban himnos "a Cristo como a un dios", y se comprometían a no cometer delitos.',
    proves: [
      'Los cristianos del s. II adoraban a Cristo como divino',
      'Las prácticas cristianas estaban establecidas (reuniones, himnos, juramentos)',
      'El culto a Cristo era el centro de su fe',
      'Para el 112 d.C. el cristianismo estaba extendido en Asia Menor',
    ],
    historicalValue: 'ALTÍSIMA. Plinio es un testigo directo de las comunidades cristianas. Su carta muestra que el culto a Cristo como ser divino ya estaba firmemente establecido a menos de 80 años de la muerte de Jesús. No hay posibilidad de que una figura mitológica hubiera generado tal culto tan rápido.',
    distanceFromJesus: '~80 años después de la muerte de Jesús',
  },
  {
    id: 'suetonio',
    name: 'Suetonio',
    author: 'Cayo Suetonio Tranquilo',
    authorType: 'romano',
    date: '~121 d.C.',
    dateAD: 121,
    title: 'Suetonio — Vida de Claudio 25.4',
    work: 'Vidas de los Doce Césares',
    originalLang: 'Latín',
    originalText: '"Iudaeos impulsore Chresto assidue tumultuantis Roma expulit."',
    translation: '"Expulsó de Roma a los judíos, que causaban continuos disturbios por instigación de Cresto (Cristo)."',
    context: 'Suetonio describe la expulsión de los judíos de Roma por el emperador Claudio en el año 49 d.C. La causa de la expulsión fueron disturbios entre los judíos provocados por "Chrestus" (variante de Christus). Los historiadores interpretan que los disturbios fueron entre judíos que aceptaban a Jesús como Mesías y los que no. Hechos 18:2 confirma que Aquila y Priscila salieron de Roma por este edicto.',
    proves: [
      'El movimiento cristiano llegó a Roma antes del 49 d.C.',
      'Jesús (Chrestus/Christus) era conocido como figura histórica',
      'Su mensaje causaba división entre los judíos',
      'El edicto de Claudio es corroborado por Hechos 18:2',
    ],
    historicalValue: 'ALTÍSIMA. Suetonio confirma que 20 años después de la muerte de Jesús, su movimiento ya había llegado a Roma y causaba controversia. La mención de "Chrestus" como instigador implica que Jesús era conocido como la figura que originó el movimiento.',
    distanceFromJesus: '~20 años después de la muerte de Jesús (el evento que describe)',
  },
  {
    id: 'mara_bar_serapion',
    name: 'Mara bar Serapión',
    author: 'Mara bar Serapión (estoico sirio)',
    authorType: 'sirio',
    date: '~73 d.C.',
    dateAD: 73,
    title: 'Mara bar Serapión — Carta a su hijo',
    work: 'Carta desde la prisión',
    originalLang: 'Siríaco',
    originalText: '"¿Qué ventaja obtuvieron los judíos al ejecutar a su Rey Sabio? ... Después de la muerte de su Rey Sabio, su reino fue abolido. Dios trajo justo castigo sobre ellos... Los judíos, desolados y expulsados de su reino, viven en dispersión total. Pero el Rey Sabio no murió — vive en sus enseñanzas."',
    translation: '"¿Qué ventaja obtuvieron los atenienses al dar muerte a Sócrates? El hambre y la peste llegaron como castigo. ¿Qué ventaja obtuvieron los samios al quemar a Pitágoras? En un momento su tierra fue cubierta de arena. ¿Qué ventaja obtuvieron los judíos al ejecutar a su Rey Sabio? Después de eso, su reino fue abolido."',
    context: 'Mara bar Serapión era un estoico sirio que escribe a su hijo desde la prisión. Menciona a tres sabios ejecutados injustamente: Sócrates (por los atenienses), Pitágoras (por los samios), y el "Rey Sabio" de los judíos (Jesús). Compara la ejecución de Jesús con la de Sócrates y Pitágoras. No es cristiano — es un pagano estoico que ve a Jesús como un sabio.',
    proves: [
      'Jesús era conocido como un sabio/maestro',
      'Fue ejecutado por los judíos',
      'Sus enseñanzas continuaron después de su muerte',
      'La destrucción de Jerusalén (70 d.C.) fue vista como castigo por su ejecución (esto implica que murió antes del 70 d.C.)',
    ],
    historicalValue: 'MUY ALTA. Mara es completamente independiente del cristianismo. Su carta es anterior a los evangelios (73 d.C.). Menciona a Jesús como "Rey Sabio" sin usar el nombre "Jesús" ni "Cristo", lo que demuestra que la historia de un sabio judío ejecutado era conocida incluso fuera del círculo cristiano a solo 40 años de la muerte de Jesús.',
    distanceFromJesus: '~40 años después de la muerte de Jesús',
  },
  {
    id: 'josefo_testimonium',
    name: 'Flavio Josefo — Testimonium Flavianum',
    author: 'Flavio Josefo',
    authorType: 'judio',
    date: '~93 d.C.',
    dateAD: 93,
    title: 'Josefo — Antigüedades 18.63-64',
    work: 'Antigüedades de los Judíos',
    originalLang: 'Griego',
    originalText: '"Γίνεται δὲ κατὰ τοῦτον τὸν χρόνον Ἰησοῦς σοφὸς ἀνήρ, εἴ γε ἄνδρα αὐτὸν λέγειν χρή· ἦν γὰρ παραδόξων ἔργων ποιητής, διδάσκαλος ἀνθρώπων τῶν ἡδονῇ τἀληθῆ δεχομένων, καὶ πολλοὺς μὲν Ἰουδαίους, πολλοὺς δὲ καὶ τοῦ Ἑλληνικοῦ ἐπηγάγετο· ὁ Χριστὸς οὗτος ἦν."',
    translation: '"Hubo por este tiempo Jesús, hombre sabio, si es lícito llamarlo hombre, porque realizaba obras asombrosas y era maestro de los que reciben la verdad con placer. Atrajo a muchos judíos y también a muchos griegos. Este era el Cristo."',
    context: 'Josefo, historiador judío del siglo I, es la fuente no-bíblica más importante sobre Jesús. El texto original (en griego) fue escrito ~93 d.C. La versión que conservamos (a través de Eusebio, s. IV) tiene interpolaciones cristianas ("si es lícito llamarlo hombre", "este era el Cristo"). Sin embargo, la mayor parte del pasaje es auténtico a Josefo. Una versión árabe del siglo X (Agapio de Hierápolis) confirma que el texto original no tenía las interpolaciones cristianas más explícitas.',
    proves: [
      'Jesús fue un hombre sabio y maestro',
      'Realizaba obras asombrosas (interpretado como milagros)',
      'Atrajo a muchos seguidores judíos y griegos',
      'Fue condenado a la cruz por Pilato',
      'Sus seguidores continuaron su movimiento después de su muerte',
      'Los cristianos de la época de Josefo (s. I) creían que Jesús era el Mesías',
    ],
    historicalValue: 'MÁXIMA. Josefo es la fuente judía más importante. El núcleo del Testimonium es aceptado como auténtico por la inmensa mayoría de los historiadores críticos (excepto las interpolaciones cristianas explícitas). La versión árabe de Agapio (s. X) confirma el texto base sin interpolaciones.',
    distanceFromJesus: '~63 años después de la muerte de Jesús',
  },
  {
    id: 'josefo_james',
    name: 'Flavio Josefo — El hermano de Jesús',
    author: 'Flavio Josefo',
    authorType: 'judio',
    date: '~93 d.C.',
    dateAD: 93,
    title: 'Josefo — Antigüedades 20.200',
    work: 'Antigüedades de los Judíos',
    originalLang: 'Griego',
    originalText: '"ὁ ἀδελφὸς Ἰησοῦ τοῦ λεγομένου Χριστοῦ, Ἰάκωβος ὄνομα αὐτῷ."',
    translation: '"El hermano de Jesús, llamado Cristo, que se llamaba Santiago."',
    context: 'Este pasaje describe la ejecución de Santiago en el 62 d.C. por el sumo sacerdote Ananías. Josefo menciona a Santiago como "el hermano de Jesús, llamado Cristo". Este pasaje es CONSIDERADO AUTÉNTICO POR TODOS LOS HISTORIADORES — no tiene interpolaciones cristianas porque es una referencia incidental. Es la evidencia más fuerte de que Jesús fue una persona real: Josefo no explica QUIÉN es "Jesús llamado Cristo" porque asume que sus lectores ya lo saben.',
    proves: [
      'Jesús tenía un hermano llamado Santiago',
      'Jesús era conocido como "el Cristo" (Mesías)',
      'El sumo sacerdote ejecutó a Santiago en el 62 d.C. por ser cristiano',
      'Josefo asume que sus lectores ya conocen quién es Jesús — no necesita presentarlo',
    ],
    historicalValue: 'MÁXIMA ABSOLUTA. Este es el pasaje más importante de toda la evidencia no-bíblica. Es una referencia casual, no una descripción. Josefo no dice "Jesús, que según los cristianos es el Mesías" — dice "Jesús, llamado Cristo". La referencia es tan natural que presupone el conocimiento público de Jesús. Ningún historiador serio duda de la autenticidad de este pasaje.',
    distanceFromJesus: '~63 años después de la muerte de Jesús (menciona ejecución de Santiago en 62 d.C.)',
  },
  {
    id: 'lucian',
    name: 'Luciano de Samósata',
    author: 'Luciano de Samósata',
    authorType: 'griego',
    date: '~165 d.C.',
    dateAD: 165,
    title: 'Luciano — La muerte de Peregrino 11-13',
    work: 'La muerte de Peregrino',
    originalLang: 'Griego',
    originalText: '"τὸν γὰρ ἀνεσκολοπισμένον ἐκεῖνον σοφιστὴν αὐτὸν προσκυνοῦσιν καὶ κατὰ τοὺς ἐκείνου νόμους ζῶσιν."',
    translation: '"Adoran a aquel sofista crucificado, y viven según sus leyes."',
    context: 'Luciano, satírico griego del siglo II, describe a los cristianos en su obra sobre Peregrino Proteo. Se burla de ellos por adorar a "aquel sofista crucificado" y por vivir según sus leyes. Describe a Jesús como un hombre que fue crucificado en Palestina y que estableció enseñanzas que sus seguidores siguen. Luciano es completamente hostil al cristianismo.',
    proves: [
      'Jesús fue un maestro (sofista) ejecutado por crucifixión',
      'Fue crucificado en Palestina',
      'Los cristianos lo adoraban como divino',
      'Las enseñanzas de Jesús eran ley para sus seguidores',
      'Los cristianos estaban dispuestos a morir por su fe',
    ],
    historicalValue: 'ALTA. Luciano es completamente hostil y se burla de los cristianos. No hay posibilidad de sesgo favorable. Su testimonio confirma que la crucifixión de Jesús en Palestina y la adoración cristiana eran hechos públicos y conocidos en el siglo II.',
    distanceFromJesus: '~135 años después de la muerte de Jesús',
  },
  {
    id: 'thallus',
    name: 'Talo (Thallus)',
    author: 'Talo (Thallus) — citado por Julio Africano',
    authorType: 'griego',
    date: '~50 d.C.',
    dateAD: 50,
    title: 'Talo — Historias (perdido) / Julio Africano, Cronografías',
    work: 'Historias (obra perdida, preservada por Julio Africano ~221 d.C.)',
    originalLang: 'Griego (perdido, preservado en latín/griego)',
    originalText: 'Julio Africano escribe: "Talo, en el tercer libro de sus Historias, explica la oscuridad como un eclipse de sol, sin razón, según me parece... los judíos... y éstos, refiriéndose a la pasión del Salvador, dicen que hubo terremotos y oscurecimientos."',
    translation: '"Talo, en el tercer libro de sus Historias, explica la oscuridad como un eclipse de sol, sin razón."',
    context: 'Talo escribió una historia del mundo mediterráneo alrededor del año 50 d.C. — aproximadamente 20 años después de la crucifixión. Su obra se ha perdido, pero Julio Africano (221 d.C.) la cita al discutir la oscuridad que ocurrió durante la crucifixión de Jesús. Talo intentó explicar la oscuridad como un eclipse, lo que IMPLICA que reconocía que algo inusual ocurrió, pero le daba una explicación natural. Esto es importante: Talo, un historiador no-cristiano del siglo I, sintió la necesidad de explicar el evento de la oscuridad.',
    proves: [
      'La oscuridad durante la crucifixión de Jesús era conocida en el siglo I',
      'Historiadores no-cristianos (Talo) intentaron explicarla naturalmente',
      'La muerte de Jesús estaba asociada con fenómenos cósmicos',
      'El evento era lo suficientemente notable como para requerir explicación histórica',
    ],
    historicalValue: 'MUY ALTA (indirecta). Aunque la obra de Talo se perdió, el hecho de que Africano la cite muestra que existía una discusión histórica sobre la crucifixión desde el siglo I. Talo es completamente no-cristiano. Su intento de explicar la oscuridad como eclipse es una confirmación indirecta de que la tradición de la oscuridad en la crucifixión era anterior a los evangelios.',
    distanceFromJesus: '~20 años después de la crucifixión',
  },
  {
    id: 'flegon',
    name: 'Flegón de Tralles',
    author: 'Flegón de Tralles — citado por Orígenes y Julio Africano',
    authorType: 'griego',
    date: '~140 d.C.',
    dateAD: 140,
    title: 'Flegón — Olímpicos (Crónicas)',
    work: 'Olímpicos (obra perdida)',
    originalLang: 'Griego (perdido, preservado por Orígenes)',
    originalText: 'Orígenes (Contra Celso 2.33): "Flegón, en el libro 13 de sus Crónicas, dice que durante el reinado de Tiberio hubo un eclipse total de sol, y que desde la hora sexta hasta la novena hubo tinieblas, lo que también lo confirman los evangelios."',
    translation: '"Flegón, en el libro 13 de sus Crónicas, dice que durante el reinado de Tiberio hubo un eclipse total de sol, y que desde la hora sexta hasta la novena hubo tinieblas."',
    context: 'Flegón, escritor griego del siglo II, escribió una crónica histórica que incluía eventos notables. Registró un eclipse y oscuridad durante el reinado de Tiberio (14-37 d.C.) que coincide temporalmente con la crucifixión. Orígenes lo cita para argumentar que la oscuridad de la crucifixión fue un evento histórico documentado. Julio Africano también lo menciona, señalando que Flegón se equivoca al llamarlo "eclipse" (los eclipses no ocurren durante la luna llena, y la Pascua era en luna llena).',
    proves: [
      'Un fenómeno de oscuridad durante el reinado de Tiberio fue registrado por historiadores independientes',
      'La oscuridad en la crucifixión no es una invención cristiana',
      'Historiadores no-cristianos del siglo II registraron el evento',
    ],
    historicalValue: 'ALTA (indirecta). Misma lógica que Talo: la discusión sobre la oscuridad en la crucifixión existía fuera del cristianismo desde muy temprano.',
    distanceFromJesus: '~110 años después (Flegón escribe) / ~20 años (el evento que registra)',
  },
  {
    id: 'celso',
    name: 'Celso',
    author: 'Celso — citado por Orígenes',
    authorType: 'griego',
    date: '~175 d.C.',
    dateAD: 175,
    title: 'Celso — El Discurso Verdadero',
    work: 'El Discurso Verdadero (perdido, preservado por Orígenes en Contra Celso)',
    originalLang: 'Griego (perdido, preservado en Contra Celso de Orígenes ~248 d.C.)',
    originalText: 'Orígenes cita a Celso: "Jesús, siendo un hombre, inventó esta historia... y se presentó a sí mismo como nacido de una virgen... y reunió a algunos de sus discípulos... y estos, después de su muerte, lo proclamaron como Dios."',
    translation: '"Jesús, siendo un hombre, inventó esta historia... y se presentó a sí mismo como nacido de una virgen... y reunió a algunos de sus discípulos... y estos, después de su muerte, lo proclamaron como Dios."',
    context: 'Celso fue un filósofo romano del siglo II que escribió el primer ataque sistemático al cristianismo. Su obra se perdió, pero Orígenes la cita extensamente para refutarla. Celso reconoce que Jesús existió, que realizó milagros (que atribuye a magia egipcia), que tuvo discípulos, y que sus seguidores lo proclamaron Dios después de su muerte. Su argumento NO es que Jesús no existió — su argumento es que Jesús fue un mago que engañó a la gente. Esto es importante: incluso los enemigos del cristianismo en el siglo II daban por sentada la existencia histórica de Jesús.',
    proves: [
      'Jesús existió como persona histórica (Celso no lo niega)',
      'Realizaba obras que la gente consideraba milagrosas',
      'Tuvo discípulos que lo siguieron',
      'Después de su muerte, sus seguidores lo proclamaron Dios',
      'El nacimiento virginal era conocido en el siglo II',
    ],
    historicalValue: 'ALTÍSIMA. Celso es TESTIGO HOSTIL. Si un crítico del cristianismo en el siglo II no niega la existencia de Jesús, es porque la existencia de Jesús era un hecho histórico indiscutible. "Jesús nunca existió" NO era un argumento que los críticos paganos usaran — eso vino 1800 años después.',
    distanceFromJesus: '~145 años después de la muerte de Jesús',
  },
  {
    id: 'talmud',
    name: 'Talmud Babilónico — Sanedrín 43a',
    author: 'Talmud (rabbis judíos)',
    authorType: 'judio',
    date: '~200-500 d.C.',
    dateAD: 400,
    title: 'Talmud Babilónico — Sanedrín 43a',
    work: 'Talmud Babilónico (compilación de tradiciones orales)',
    originalLang: 'Hebreo/Arameo',
    originalText: '"ערב הפסח תלאו את יש" — "En la víspera de la Pascua colgaron a Yeshú." "ובן סטדא הוא בן פנדירא" — "Ben Stada es Ben Pandira" (Yeshú ben Pandira).',
    translation: '"En la víspera de la Pascua, colgaron a Yeshú (Jesús)." "Él practicaba hechicería y engañaba a Israel."',
    context: 'El Talmud contiene varias referencias a "Yeshú" (Jesús). Sanedrín 43a dice que fue "colgado" (crucificado) en la víspera de la Pascua, que "practicaba hechicería y engañaba a Israel", y que sus discípulos fueron ejecutados. Otras tradiciones talmúdicas se refieren a él como "Ben Pandira" (hijo de Pandera/Pantera, una tradición sobre su concepción). Estas tradiciones son hostiles — NO favorables — lo que aumenta su valor histórico.',
    proves: [
      'Jesús fue ejecutado en la víspera de Pascua',
      'Fue acusado de hechicería (paralelo a los "milagros" de los evangelios)',
      'Fue acusado de engañar al pueblo',
      'Tuvo discípulos que también fueron ejecutados',
    ],
    historicalValue: 'ALTA. El Talmud es hostil a Jesús, no favorable. Confirma la ejecución en Pascua, el contexto de acusaciones, y la existencia de discípulos. La tradición de "Ben Pandira" sobre su nacimiento es paralela a la acusación de "hijo ilegítimo" que también menciona Celso.',
    distanceFromJesus: 'Las tradiciones orales son del s. I-II d.C.; la redacción escrita ~400 d.C.',
  },
  {
    id: 'julio_africano',
    name: 'Julio Africano',
    author: 'Sexto Julio Africano',
    authorType: 'cristiano',
    date: '~221 d.C.',
    dateAD: 221,
    title: 'Julio Africano — Cronografías',
    work: 'Cronografías (Historia mundial)',
    originalLang: 'Griego',
    originalText: '"Talo, en el tercer libro de sus Historias, explica la oscuridad como un eclipse de sol, sin razón, según me parece... porque los hebreos celebraban la Pascua en luna llena, y la pasión del Salvador ocurrió un día antes de la Pascua."',
    translation: '"Talo, en el tercer libro de sus Historias, explica la oscuridad como un eclipse de sol... pero los hebreos celebraban la Pascua en luna llena, y la pasión del Salvador ocurrió un día antes de la Pascua."',
    context: 'Julio Africano fue un historiador cristiano que escribió la primera cronología cristiana de la historia mundial. Es importante porque PRESERVA las referencias de Talo y Flegón. Al refutar la explicación del eclipse de Talo, Africano demuestra que existía un debate histórico sobre la crucifixión desde el siglo I.',
    proves: [
      'Preserva las fuentes más tempranas (Talo ~50 d.C.) sobre la crucifixión',
      'Confirma que la crucifixión fue en Pascua',
      'Muestra que la oscuridad era un evento históricamente discutido',
    ],
    historicalValue: 'DOCUMENTAL. Africano es valioso no por sí mismo, sino porque preserva fuentes anteriores perdidas (Talo, Flegón).',
    distanceFromJesus: '~190 años después de la muerte de Jesús',
  },
];

// Agrupados por tipo de fuente
export const sourceTypes = [
  { id: 'all', label: 'Todas las fuentes' },
  { id: 'romano', label: 'Fuentes Romanas' },
  { id: 'judio', label: 'Fuentes Judías' },
  { id: 'griego', label: 'Fuentes Griegas' },
  { id: 'sirio', label: 'Fuentes Sirias' },
] as const;

// Hechos históricos que las fuentes CONFIRMAN (convergencia de evidencia)
export const CONFIRMED_FACTS = [
  {
    fact: 'Jesús existió como persona histórica en Judea en el s. I d.C.',
    sources: ['Tácito', 'Josefo', 'Mara bar Serapión', 'Suetonio', 'Luciano', 'Celso', 'Talmud'],
  },
  {
    fact: 'Fue conocido como maestro/sabio (sofista, rey sabio, maestro)',
    sources: ['Josefo (Testimonium)', 'Mara bar Serapión', 'Luciano', 'Talmud'],
  },
  {
    fact: 'Realizaba acciones que se consideraban milagrosas/sobrenaturales',
    sources: ['Josefo (Testimonium)', 'Talmud ("hechicería")', 'Celso ("magia egipcia")'],
  },
  {
    fact: 'Reunió seguidores judíos y gentiles',
    sources: ['Josefo (Testimonium)', 'Tácito', 'Luciano', 'Celso'],
  },
  {
    fact: 'Fue ejecutado por crucifixión bajo Poncio Pilato',
    sources: ['Tácito', 'Josefo (Testimonium)', 'Talmud ("colgado")'],
  },
  {
    fact: 'La crucifixión ocurrió durante el reinado de Tiberio (14-37 d.C.)',
    sources: ['Tácito', 'Flegón', 'Talo'],
  },
  {
    fact: 'Ocurrió en la época de la Pascua judía',
    sources: ['Talmud', 'Julio Africano'],
  },
  {
    fact: 'Su muerte fue seguida de un fenómeno de oscuridad',
    sources: ['Talo', 'Flegón', 'Julio Africano'],
  },
  {
    fact: 'Sus seguidores continuaron su movimiento y lo adoraron como divino',
    sources: ['Plinio el Joven', 'Luciano', 'Suetonio', 'Celso'],
  },
  {
    fact: 'Tenía un hermano llamado Santiago',
    sources: ['Josefo (Ant. 20.200)'],
  },
  {
    fact: 'El movimiento cristiano llegó a Roma antes del 49 d.C.',
    sources: ['Suetonio', 'Tácito'],
  },
] as const;

// Línea de tiempo de fuentes
export const sourceTimeline = jesusSources
  .map(s => ({ id: s.id, name: s.name, date: s.date, dateAD: s.dateAD, authorType: s.authorType }))
  .sort((a, b) => a.dateAD - b.dateAD);
