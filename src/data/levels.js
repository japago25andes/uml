import {
  CLASS_SINGLE, CLASS_REL, CLASS_MULT, CLASS_AGG_COMP,
  SEQ_LOGIN, SEQ_TYPES, SEQ_ALT, SEQ_BOOKING,
  ACT_PRESTAMO, STATE_PEDIDO, STATE_RESERVA, UC_PREVIEW,
} from './diagrams.js';

/*
  Tipos de reto:
  - quiz:     una respuesta correcta (options + answer = índice); diagram opcional
  - pick:     selección múltiple (options: [{ text, correct }])
  - classify: asignar cada elemento a una categoría (bins + items: [{ text, bin }])
  - order:    ordenar pasos (steps en el orden correcto; se barajan al jugar)
  - builder:  completar un diagrama (elementos con slot: true + decoys)
  - spot:     encontrar errores en un diagrama (markers con error: true/false)
  En los textos, **negrita** y *cursiva* se resaltan.
*/

export const LEVELS = [
  // ───────────────────────────── 1
  {
    id: 'historia',
    icon: '🦬',
    title: 'Dibujar para entenderse',
    subtitle: '36.000 años de lenguajes visuales',
    color: '#d97706',
    lesson: [
      {
        title: 'Un viaje de 36.000 años',
        mood: 'happy',
        text: 'Acabamos de viajar desde las cavernas hasta hoy. Repasemos lo que vimos:',
        points: [
          '🦬 **Cuevas**: dibujar para contar y recordar.',
          '𓂀 **Jeroglíficos**: símbolos con reglas que otros pueden leer.',
          '🗺️ **Mapas**: convenciones como la leyenda, la escala o la rosa de los vientos.',
          '🎼 **Partituras**: una notación musical común.',
          '📐 **Planos**: normas internacionales de dibujo técnico.',
        ],
      },
      {
        title: 'La lección de la historia',
        text: 'Un dibujo solo comunica si **quien lo hace y quien lo lee comparten las reglas**. Cuando cada uno dibuja a su manera, el mensaje se pierde.',
        tip: 'Un lenguaje visual estándar = **símbolos** + **reglas** + **acuerdo** de una comunidad.',
      },
      {
        title: '¿Y el software?',
        mood: 'wow',
        text: 'El software es **invisible**: no se puede tocar ni fotografiar. Por eso necesitamos dibujarlo para entenderlo, discutirlo y construirlo en equipo. El idioma visual que usamos para eso es **UML**.',
      },
    ],
    challenges: [
      {
        type: 'order',
        question: 'Ordena estos hitos del más antiguo al más reciente',
        steps: [
          'Pinturas de la cueva de Chauvet',
          'Jeroglíficos egipcios',
          'Mapa babilónico del mundo',
          'Notación musical de Guido d’Arezzo',
          'Geometría descriptiva de Gaspard Monge',
          'Nace el estándar UML',
        ],
        explanation: 'Chauvet (hace ~36.000 años) → jeroglíficos (~3200 a. C.) → mapa babilónico (~600 a. C.) → Guido d’Arezzo (~1025) → Monge (1795) → UML (1997).',
      },
      {
        type: 'quiz',
        question: '¿Qué tienen en común un plano, una partitura y un mapa?',
        options: [
          'Usan símbolos con reglas compartidas que cualquiera formado en ellas puede interpretar',
          'Todos se dibujan a mano alzada',
          'Solo los entiende la persona que los dibujó',
          'Son obras de arte sin una función práctica',
        ],
        answer: 0,
        explanation: 'Los tres son lenguajes visuales estandarizados: sus símbolos tienen un significado acordado.',
      },
      {
        type: 'quiz',
        question: '¿Por qué los jeroglíficos fueron un avance respecto a las pinturas rupestres?',
        options: [
          'Porque sus símbolos seguían reglas convencionales que otros podían aprender y leer',
          'Porque eran más bonitos',
          'Porque se pintaban con más colores',
          'Porque solo los usaban los faraones',
        ],
        answer: 0,
        explanation: 'El salto fue pasar de dibujos libres a un sistema con reglas compartidas, como hace UML con el software.',
      },
      {
        type: 'pick',
        question: '¿Cuáles de estos son lenguajes visuales estandarizados?',
        hint: 'Selecciona todos los correctos.',
        options: [
          { text: 'Una partitura musical', correct: true },
          { text: 'Un plano de arquitectura', correct: true },
          { text: 'Un garabato en una servilleta', correct: false },
          { text: 'Las señales de tráfico', correct: true },
          { text: 'Un esquema eléctrico', correct: true },
          { text: 'Un dibujo libre que cada programador hace a su manera', correct: false },
        ],
        explanation: 'Partituras, planos, señales de tráfico y esquemas eléctricos siguen normas comunes. Un garabato o un dibujo libre no.',
      },
      {
        type: 'quiz',
        question: '¿Qué problema resuelve un lenguaje visual estándar?',
        options: [
          'Que personas distintas interpreten el mismo dibujo de la misma manera',
          'Que los dibujos ocupen menos espacio',
          'Que no haga falta aprender nada',
          'Que los dibujos se hagan más rápido',
        ],
        answer: 0,
        explanation: 'El objetivo es la comunicación sin malentendidos: el mismo símbolo significa lo mismo para todos.',
      },
    ],
  },

  // ───────────────────────────── 2
  {
    id: 'metodos',
    icon: '⚔️',
    title: 'La guerra de los métodos',
    subtitle: 'Cómo nació UML',
    color: '#dc2626',
    lesson: [
      {
        title: 'Demasiados dibujos distintos',
        mood: 'sad',
        text: 'A finales de los años 80 la **programación orientada a objetos** se puso de moda y cada experto creó su método para analizar y diseñar software, cada uno con su propia notación.',
        points: [
          'Entre 1989 y 1994 se pasó de **menos de 10 a más de 50 métodos**.',
          'Los equipos no se entendían entre sí y las herramientas eran incompatibles.',
          'Elegir método era casi como elegir bando: de ahí lo de «**guerra de los métodos**».',
        ],
      },
      {
        title: 'Los tres métodos más influyentes',
        text: 'Tres métodos destacaban sobre el resto:',
        points: [
          '☁️ **Booch** (Grady Booch): fuerte en **diseño**. Dibujaba las clases como **nubes**.',
          '▭ **OMT** (James Rumbaugh): fuerte en **análisis** y modelado de objetos y datos.',
          '⬭ **OOSE / Objectory** (Ivar Jacobson): introdujo los **casos de uso** para capturar requisitos.',
        ],
      },
      {
        title: 'Los tres amigos',
        mood: 'happy',
        text: 'En **1994** Rumbaugh se unió a Booch en la empresa **Rational Software**. En **1995** llegó Jacobson. Los llamaron «**los tres amigos**» y juntos crearon un lenguaje unificado tomando lo mejor de cada método.',
      },
      {
        title: 'De propuesta a estándar',
        text: 'Para que fuera de todos y no de una empresa, se entregó a un organismo de estándares:',
        points: [
          '**1997**: el **OMG** (Object Management Group) adopta **UML 1.1**.',
          '**2005**: **UML 2.0**, una gran revisión.',
          '**2017**: **UML 2.5.1**.',
          'UML también es norma internacional **ISO/IEC 19505**.',
        ],
        tip: '**UML** = *Unified Modeling Language*: Lenguaje **Unificado** de Modelado. «Unificado» porque unió los métodos.',
      },
    ],
    challenges: [
      {
        type: 'quiz',
        question: '¿Qué fue la «guerra de los métodos»?',
        options: [
          'Una época con decenas de métodos orientados a objetos, cada uno con su propia notación incompatible',
          'Una competición entre lenguajes de programación',
          'Una disputa legal entre empresas de hardware',
          'Un videojuego de los años 90',
        ],
        answer: 0,
        explanation: 'A finales de los 80 y principios de los 90 había más de 50 métodos y notaciones: nadie hablaba el mismo idioma visual.',
      },
      {
        type: 'classify',
        question: '¿A qué autor corresponde cada aportación?',
        bins: [
          { id: 'boo', label: '☁️ Booch' },
          { id: 'rum', label: '▭ Rumbaugh' },
          { id: 'jac', label: '⬭ Jacobson' },
        ],
        items: [
          { text: 'Método fuerte en diseño', bin: 'boo' },
          { text: 'OMT (Object Modeling Technique)', bin: 'rum' },
          { text: 'Los casos de uso', bin: 'jac' },
          { text: 'OOSE / Objectory', bin: 'jac' },
          { text: 'Método fuerte en análisis de objetos y datos', bin: 'rum' },
          { text: 'Clases dibujadas como nubes', bin: 'boo' },
        ],
        explanation: 'Booch: diseño (y sus famosas nubes). Rumbaugh: OMT y análisis. Jacobson: OOSE/Objectory y los casos de uso.',
      },
      {
        type: 'quiz',
        question: '¿Qué organización adoptó UML como estándar en 1997?',
        options: ['El OMG (Object Management Group)', 'La ISO', 'El IEEE', 'El W3C'],
        answer: 0,
        explanation: 'El OMG adoptó UML 1.1 en 1997. Años después también se publicó como norma ISO/IEC 19505.',
      },
      {
        type: 'order',
        question: 'Ordena la historia de UML',
        steps: [
          'Explosión de métodos orientados a objetos (finales de los 80)',
          'Rumbaugh se une a Booch en Rational (1994)',
          'Jacobson se suma al equipo (1995)',
          'El OMG adopta UML 1.1 (1997)',
          'Gran revisión: UML 2.0 (2005)',
          'Se publica UML 2.5.1 (2017)',
        ],
        explanation: 'Del caos de métodos a la unificación de los tres amigos, y de ahí al estándar del OMG y sus revisiones.',
      },
      {
        type: 'quiz',
        question: '¿Qué significa UML?',
        options: [
          'Unified Modeling Language (Lenguaje Unificado de Modelado)',
          'Universal Machine Language (Lenguaje Universal de Máquina)',
          'User Management Logic (Lógica de Gestión de Usuarios)',
          'Unified Markup Language (Lenguaje Unificado de Marcado)',
        ],
        answer: 0,
        explanation: 'Unified Modeling Language. «Unificado» porque unió los métodos de Booch, Rumbaugh y Jacobson.',
      },
    ],
  },

  // ───────────────────────────── 3
  {
    id: 'que-es',
    icon: '🧠',
    title: '¿Qué es UML?',
    subtitle: 'Lo que es… y lo que no es',
    color: '#0d9488',
    lesson: [
      {
        title: 'La definición',
        text: 'UML es un **lenguaje visual estándar** para **visualizar, especificar, construir y documentar** sistemas de software.',
        points: [
          '👀 **Visualizar**: ver el sistema antes (o después) de programarlo.',
          '📏 **Especificar**: describirlo con precisión, sin ambigüedades.',
          '🏗️ **Construir**: algunas herramientas generan código a partir de los modelos.',
          '📚 **Documentar**: dejar constancia para el equipo y para el futuro.',
        ],
      },
      {
        title: 'Lo que UML NO es',
        mood: 'wow',
        text: 'Tres confusiones muy frecuentes:',
        points: [
          '❌ **No es un lenguaje de programación**: no se compila ni se ejecuta como Java o Python.',
          '❌ **No es una metodología**: no dice en qué orden trabajar. Se puede usar con Scrum, con cascada o con lo que quieras.',
          '❌ **No depende de una tecnología**: sirve para cualquier lenguaje y plataforma.',
        ],
      },
      {
        title: 'Modelo y diagrama',
        text: 'Un **modelo** es una representación simplificada de un sistema. Un **diagrama** es una **vista parcial** de ese modelo.',
        tip: 'Piensa en una ciudad: el plano del metro, el de calles y el de relieve son diagramas distintos de **la misma ciudad**.',
      },
      {
        title: '¿Para qué modelar?',
        mood: 'happy',
        text: 'Modelar ayuda a:',
        points: [
          '🗣️ **Comunicar** ideas entre el equipo y con el cliente.',
          '🧩 **Entender** sistemas complejos o heredados.',
          '🐞 **Detectar errores pronto**: corregir un dibujo es mucho más barato que corregir código.',
          '📚 **Documentar** decisiones.',
        ],
      },
    ],
    challenges: [
      {
        type: 'quiz',
        question: 'UML es…',
        options: [
          'Un lenguaje visual estándar de modelado',
          'Un lenguaje de programación orientado a objetos',
          'Una metodología de gestión de proyectos',
          'Un programa de dibujo',
        ],
        answer: 0,
        explanation: 'UML es un lenguaje de modelado: tiene símbolos y reglas, pero ni se ejecuta como un programa ni impone un proceso de trabajo.',
      },
      {
        type: 'classify',
        question: '¿Verdadero o falso?',
        bins: [
          { id: 'v', label: '✅ Verdadero' },
          { id: 'f', label: '❌ Falso' },
        ],
        items: [
          { text: 'UML es independiente del lenguaje de programación', bin: 'v' },
          { text: 'UML te dice en qué orden hacer las tareas del proyecto', bin: 'f' },
          { text: 'Algunas herramientas generan código a partir de modelos UML', bin: 'v' },
          { text: 'UML solo sirve para sistemas hechos en Java', bin: 'f' },
          { text: 'Un diagrama muestra una vista parcial del modelo', bin: 'v' },
          { text: 'UML pertenece a una empresa y hay que pagar para usarlo', bin: 'f' },
        ],
        explanation: 'UML es un estándar abierto del OMG, independiente de la tecnología y del proceso. Los diagramas son vistas parciales del modelo.',
      },
      {
        type: 'quiz',
        question: 'Según la analogía de la ciudad, ¿cuál es la relación entre modelo y diagrama?',
        options: [
          'El modelo es la ciudad completa descrita; cada diagrama es un plano que muestra una parte',
          'Son exactamente lo mismo',
          'El diagrama contiene varios modelos',
          'El modelo es el código fuente',
        ],
        answer: 0,
        explanation: 'Un modelo puede tener muchos diagramas, y cada uno muestra un aspecto del sistema.',
      },
      {
        type: 'pick',
        question: '¿Para qué sirve modelar con UML?',
        hint: 'Selecciona todos los correctos.',
        options: [
          { text: 'Comunicar ideas al equipo', correct: true },
          { text: 'Detectar problemas antes de programar', correct: true },
          { text: 'Sustituir por completo a la programación', correct: false },
          { text: 'Documentar el sistema', correct: true },
          { text: 'Hacer que el programa se ejecute más rápido', correct: false },
          { text: 'Entender un sistema existente', correct: true },
        ],
        explanation: 'Modelar sirve para comunicar, entender, detectar errores y documentar. No sustituye a programar ni acelera la ejecución.',
      },
      {
        type: 'quiz',
        question: '¿Por qué es más barato encontrar un error en un diagrama que en el código?',
        options: [
          'Porque cambiar un dibujo cuesta mucho menos que reescribir, volver a probar y desplegar código',
          'Porque los diagramas no tienen errores',
          'Porque el código no se puede cambiar',
          'No es más barato: cuesta lo mismo',
        ],
        answer: 0,
        explanation: 'Cuanto más tarde se descubre un error, más caro es corregirlo. Modelar ayuda a encontrarlo pronto.',
      },
    ],
  },

  // ───────────────────────────── 4
  {
    id: 'mapa',
    icon: '🗺️',
    title: 'El mapa de los 14 diagramas',
    subtitle: 'Estructura y comportamiento',
    color: '#7c3aed',
    lesson: [
      {
        title: 'Dos grandes familias',
        text: 'UML 2.5 define **14 tipos de diagramas** en dos familias:',
        points: [
          '🧱 **Estructura**: lo que el sistema **ES** (sus partes y relaciones).',
          '🎬 **Comportamiento**: lo que el sistema **HACE** (procesos, estados, interacciones).',
        ],
        taxonomy: true,
      },
      {
        title: 'Diagramas de estructura',
        text: 'Muestran la parte **estática** del sistema:',
        points: [
          '**Clases**: clases, atributos, operaciones y relaciones. ⭐',
          '**Objetos**: una «foto» de objetos concretos en un momento.',
          '**Componentes**: piezas de software y sus interfaces.',
          '**Estructura compuesta**: el interior de una clase o componente.',
          '**Paquetes**: cómo se agrupan los elementos en módulos.',
          '**Despliegue**: en qué máquinas o nodos se ejecuta el software.',
          '**Perfiles**: extensiones de UML para un dominio concreto.',
        ],
      },
      {
        title: 'Diagramas de comportamiento',
        text: 'Muestran la parte **dinámica**. Cuatro de ellos forman la subfamilia de **interacción**:',
        points: [
          '**Casos de uso**: qué hace el sistema para cada actor. ⭐',
          '**Actividad**: flujos de trabajo y procesos. ⭐',
          '**Máquina de estados**: el ciclo de vida de un objeto. ⭐',
          '💬 **Secuencia**: mensajes ordenados en el tiempo. ⭐',
          '💬 **Comunicación**: mensajes entre objetos, centrado en sus enlaces.',
          '💬 **Tiempos**: cambios de estado en una línea de tiempo exacta.',
          '💬 **Visión general de interacción**: un mapa de varias interacciones.',
        ],
        tip: 'Las ⭐ marcan los diagramas más usados. No necesitas los 14 a diario.',
      },
    ],
    challenges: [
      {
        type: 'classify',
        question: '¿A qué familia pertenece cada diagrama?',
        bins: [
          { id: 'e', label: '🧱 Estructura' },
          { id: 'c', label: '🎬 Comportamiento' },
          { id: 'i', label: '💬 Interacción' },
        ],
        items: [
          { text: 'Clases', bin: 'e' },
          { text: 'Despliegue', bin: 'e' },
          { text: 'Casos de uso', bin: 'c' },
          { text: 'Secuencia', bin: 'i' },
          { text: 'Paquetes', bin: 'e' },
          { text: 'Actividad', bin: 'c' },
          { text: 'Comunicación', bin: 'i' },
          { text: 'Máquina de estados', bin: 'c' },
          { text: 'Componentes', bin: 'e' },
          { text: 'Tiempos', bin: 'i' },
        ],
        explanation: 'Estructura: clases, objetos, componentes, estructura compuesta, paquetes, despliegue y perfiles. Comportamiento: casos de uso, actividad y estados, más la subfamilia de interacción (secuencia, comunicación, tiempos y visión general).',
      },
      {
        type: 'quiz',
        question: '¿Qué pregunta responde un diagrama de estructura?',
        options: [
          '¿De qué partes está hecho el sistema y cómo se relacionan?',
          '¿En qué orden ocurren las cosas?',
          '¿Cuánto cuesta el proyecto?',
          '¿Qué usuario hizo clic primero?',
        ],
        answer: 0,
        explanation: 'Los diagramas de estructura muestran lo que el sistema ES. El orden de las cosas lo muestran los de comportamiento.',
      },
      {
        type: 'classify',
        question: '¿Qué diagrama usarías en cada caso?',
        bins: [
          { id: 'cla', label: '🏛️ Clases' },
          { id: 'seq', label: '💬 Secuencia' },
          { id: 'cu', label: '🎯 Casos de uso' },
          { id: 'act', label: '🔄 Actividad' },
        ],
        items: [
          { text: 'Qué puede hacer cada tipo de usuario con el sistema', bin: 'cu' },
          { text: 'Las clases de una tienda, con sus atributos y relaciones', bin: 'cla' },
          { text: 'El orden de los mensajes entre objetos al pagar', bin: 'seq' },
          { text: 'El flujo para aprobar una solicitud, con decisiones', bin: 'act' },
          { text: 'Los objetivos del cliente en un cajero automático', bin: 'cu' },
          { text: 'Qué objeto llama a cuál durante el inicio de sesión', bin: 'seq' },
        ],
        explanation: 'Usuarios y objetivos → casos de uso. Estructura de datos → clases. Mensajes en orden → secuencia. Procesos con decisiones → actividad.',
      },
      {
        type: 'quiz',
        question: '¿Cuántos tipos de diagramas define UML 2.5?',
        options: ['14', '9', '12', '20'],
        answer: 0,
        explanation: 'UML 2.5 define 14: siete de estructura y siete de comportamiento (cuatro de ellos de interacción).',
      },
      {
        type: 'quiz',
        question: 'Quieres mostrar en qué servidores se ejecuta cada parte del sistema. ¿Qué diagrama usas?',
        options: ['Despliegue', 'Clases', 'Secuencia', 'Casos de uso'],
        answer: 0,
        explanation: 'El diagrama de despliegue muestra los nodos físicos (servidores, dispositivos) y qué se ejecuta en cada uno.',
      },
    ],
  },

  // ───────────────────────────── 5
  {
    id: 'clases',
    icon: '🏛️',
    title: 'Diagrama de clases',
    subtitle: 'El plano del software',
    color: '#2563eb',
    lesson: [
      {
        title: 'La clase',
        text: 'Una **clase** es una plantilla para crear objetos. Se dibuja como una caja con **tres compartimentos**:',
        diagram: CLASS_SINGLE,
        points: [
          '**Nombre**: un sustantivo en singular con mayúscula inicial.',
          '**Atributos**: `nombre: Tipo`.',
          '**Operaciones**: `nombre(parámetros): TipoDeRetorno`.',
        ],
      },
      {
        title: 'Visibilidad',
        text: 'El símbolo delante de cada atributo u operación indica **quién puede usarlo**:',
        points: [
          '`+` **público**: cualquiera.',
          '`-` **privado**: solo la propia clase.',
          '`#` **protegido**: la clase y sus subclases.',
          '`~` **paquete**: las clases del mismo paquete.',
        ],
        tip: 'Lo habitual: atributos privados (-) y operaciones públicas (+).',
      },
      {
        title: 'Asociación y herencia',
        text: 'Las clases se relacionan entre sí:',
        diagram: CLASS_REL,
        points: [
          '**Asociación** (línea): dos clases se conocen. La **multiplicidad** indica cuántos: `1`, `0..1`, `*`, `1..*`.',
          '**Herencia** o generalización (triángulo hueco **hacia el padre**): «Profesor **es una** Persona».',
        ],
      },
      {
        title: 'Agregación, composición y dependencia',
        text: 'Tres relaciones más:',
        diagram: CLASS_AGG_COMP,
        points: [
          '◇ **Agregación**: un todo con partes que **pueden existir solas** (un jugador puede cambiar de equipo).',
          '◆ **Composición**: las partes **mueren con el todo** (sin casa no hay habitaciones).',
          '⇢ **Dependencia**: una clase **usa** a otra de forma puntual.',
        ],
        tip: 'El rombo siempre va en el extremo del **TODO**.',
      },
    ],
    challenges: [
      {
        type: 'quiz',
        question: '¿Qué indica el signo «-» delante de un atributo?',
        diagram: CLASS_SINGLE,
        options: ['Que es privado', 'Que es público', 'Que está desactivado', 'Que su valor es negativo'],
        answer: 0,
        explanation: '«-» significa privado: solo la propia clase puede acceder. «+» es público, «#» protegido y «~» de paquete.',
      },
      {
        type: 'quiz',
        question: '¿Qué dice este diagrama?',
        diagram: CLASS_MULT,
        options: [
          'Cada profesor imparte al menos una asignatura, y cada asignatura la imparte exactamente un profesor',
          'Cada profesor imparte una sola asignatura',
          'Una asignatura puede no tener profesor',
          'Un profesor puede no impartir ninguna asignatura',
        ],
        answer: 0,
        explanation: 'La multiplicidad se lee en el extremo opuesto: un profesor imparte «1..*» asignaturas, y cada asignatura tiene «1» profesor.',
      },
      {
        type: 'classify',
        question: '¿Qué relación hay en cada caso?',
        bins: [
          { id: 'her', label: '△ Herencia' },
          { id: 'com', label: '◆ Composición' },
          { id: 'agr', label: '◇ Agregación' },
          { id: 'aso', label: '— Asociación' },
        ],
        items: [
          { text: 'Un Perro es un Animal', bin: 'her' },
          { text: 'Un Pedido contiene Líneas de pedido que no existen sin él', bin: 'com' },
          { text: 'Un Equipo tiene Jugadores que pueden cambiar de equipo', bin: 'agr' },
          { text: 'Un Cliente realiza Pedidos', bin: 'aso' },
          { text: 'Un Libro tiene Capítulos que desaparecen si se borra el libro', bin: 'com' },
          { text: 'Un Coche eléctrico es un Coche', bin: 'her' },
        ],
        explanation: '«Es un» → herencia. Partes que mueren con el todo → composición. Partes independientes → agregación. Simplemente se relacionan → asociación.',
      },
      {
        type: 'builder',
        question: 'Completa el diagrama de clases de la universidad',
        story: 'Toda **Persona** tiene nombre y DNI. Los **Estudiantes** (con su matrícula) y los **Profesores** (con su despacho) son tipos de persona. Los estudiantes cursan **Asignaturas** (código y créditos), y cada asignatura la imparte un profesor.',
        diagram: {
          kind: 'class', w: 760, h: 490,
          classes: [
            { id: 'per', x: 290, y: 20, w: 180, name: 'Persona', attrs: ['- nombre: String', '- dni: String'], slot: true },
            { id: 'est', x: 30, y: 175, w: 200, name: 'Estudiante', attrs: ['- matricula: String'], ops: ['+ matricular()'], slot: true },
            { id: 'pro', x: 530, y: 175, w: 200, name: 'Profesor', attrs: ['- despacho: String'], ops: ['+ calificar()'], slot: true },
            { id: 'asi', x: 290, y: 385, w: 180, name: 'Asignatura', attrs: ['- codigo: String', '- creditos: int'], slot: true },
          ],
          links: [
            { from: 'est', to: 'per', type: 'gen' },
            { from: 'pro', to: 'per', type: 'gen' },
            { from: 'est', to: 'asi', type: 'assoc', label: 'cursa', fromMult: '*', toMult: '*' },
            { from: 'pro', to: 'asi', type: 'assoc', label: 'imparte', fromMult: '1', toMult: '1..*' },
          ],
        },
        decoys: ['Matrícula', 'BaseDeDatos'],
        explanation: 'Persona es la clase padre (los triángulos apuntan a ella). Los atributos delatan a Estudiante (matrícula), Profesor (despacho) y Asignatura (código y créditos).',
      },
      {
        type: 'spot',
        question: 'Tienda online: ¿qué marcadores señalan errores?',
        diagram: {
          kind: 'class', w: 790, h: 345,
          classes: [
            { id: 'cli', x: 20, y: 30, w: 180, name: 'Cliente', attrs: ['- nombre: String'] },
            { id: 'ped', x: 300, y: 30, w: 190, name: 'Pedido', attrs: ['- fecha: Date', '- total: double'] },
            { id: 'lin', x: 300, y: 250, w: 190, name: 'LineaPedido', attrs: ['- cantidad: int'] },
            { id: 'pro', x: 570, y: 30, w: 200, name: 'Producto', attrs: ['- nombre: String', '- precio: double', '+ calcularIVA(): double'], ops: ['+ getPrecio(): double'] },
            { id: 'dig', x: 570, y: 250, w: 200, name: 'ProductoDigital', attrs: ['- urlDescarga: String'] },
          ],
          links: [
            { from: 'cli', to: 'ped', type: 'assoc', label: 'realiza', fromMult: '1', toMult: '0..*' },
            { from: 'lin', to: 'ped', type: 'comp' },
            { from: 'lin', to: 'pro', type: 'assoc', fromMult: '*', toMult: '1' },
            { from: 'pro', to: 'dig', type: 'gen' },
          ],
        },
        markers: [
          { x: 782, y: 113, error: true, note: '«calcularIVA()» es una operación (lleva paréntesis): va en el tercer compartimento, no entre los atributos.' },
          { x: 425, y: 230, error: true, note: 'El rombo de la composición va en el extremo del TODO (Pedido), no en la parte (LineaPedido).' },
          { x: 702, y: 228, error: true, note: 'El triángulo de la herencia debe apuntar al PADRE (Producto). Aquí apunta al hijo.' },
          { x: 236, y: 24, error: false, note: 'Correcto: un cliente realiza cero o más pedidos, y cada pedido es de un cliente.' },
          { x: 468, y: 92, error: false, note: 'Correcto: atributos privados (-) con su tipo.' },
        ],
        explanation: 'Errores: una operación entre los atributos, el rombo en el extremo equivocado y la herencia apuntando al revés.',
      },
      {
        type: 'quiz',
        question: '¿Qué relación representa un rombo RELLENO?',
        options: ['Composición', 'Agregación', 'Herencia', 'Dependencia'],
        answer: 0,
        explanation: 'Rombo relleno ◆ = composición (las partes mueren con el todo). Rombo hueco ◇ = agregación.',
      },
    ],
  },

  // ───────────────────────────── 6
  {
    id: 'secuencia',
    icon: '💬',
    title: 'Diagrama de secuencia',
    subtitle: 'Mensajes en el tiempo',
    color: '#db2777',
    lesson: [
      {
        title: 'El tiempo hacia abajo',
        text: 'El diagrama de secuencia muestra **cómo colaboran los objetos** en un escenario concreto. El **tiempo avanza hacia abajo**.',
        diagram: SEQ_LOGIN,
        points: [
          'Arriba, los **participantes** (actores u objetos como `:Pantalla`).',
          'Debajo de cada uno, su **línea de vida** (discontinua).',
          'Las **flechas** son mensajes, numerados en orden.',
        ],
      },
      {
        title: 'Tipos de mensaje',
        text: 'La forma de la flecha importa:',
        diagram: SEQ_TYPES,
        points: [
          '➡️ **Síncrono** (línea continua y punta rellena): el emisor **espera** la respuesta.',
          '⇠ **Respuesta** (línea discontinua): devuelve el resultado.',
          '→ **Asíncrono** (punta abierta): el emisor **no espera**.',
          '↩️ **Mensaje a sí mismo**: el objeto se llama a sí mismo.',
        ],
      },
      {
        title: 'Fragmentos combinados',
        text: 'Marcos que añaden lógica al diagrama:',
        diagram: SEQ_ALT,
        points: [
          '**alt**: alternativas (si… si no…).',
          '**opt**: algo opcional que solo ocurre si se cumple una condición.',
          '**loop**: algo que se repite.',
        ],
        tip: 'La condición entre corchetes, como [PIN correcto], se llama **guarda**.',
      },
    ],
    challenges: [
      {
        type: 'quiz',
        question: 'En un diagrama de secuencia, ¿qué representa la dirección vertical?',
        options: ['El paso del tiempo', 'La importancia de cada objeto', 'La herencia entre clases', 'El tamaño de los datos'],
        answer: 0,
        explanation: 'El tiempo avanza de arriba abajo: los mensajes de más arriba ocurren antes.',
      },
      {
        type: 'quiz',
        question: 'Según el diagrama, ¿quién consulta la base de datos?',
        diagram: SEQ_LOGIN,
        options: [':Autenticador', ':Pantalla', 'Usuario', 'Nadie'],
        answer: 0,
        explanation: 'El mensaje 3, buscarUsuario(usuario), va de :Autenticador a :BaseDatos.',
      },
      {
        type: 'order',
        question: 'Ordena los mensajes de «Comprar en línea»',
        steps: [
          'Cliente → Web: añadirAlCarrito(producto)',
          'Cliente → Web: pagar()',
          'Web → Pasarela: cobrar(importe)',
          'Pasarela → Web: confirmación',
          'Web → Cliente: mostrarRecibo()',
        ],
        explanation: 'Primero se elige el producto, después se paga. La web cobra con la pasarela, espera la confirmación y muestra el recibo.',
      },
      {
        type: 'classify',
        question: '¿Qué tipo de mensaje es cada uno?',
        bins: [
          { id: 'sin', label: '➡️ Síncrono' },
          { id: 'res', label: '⇠ Respuesta' },
          { id: 'asi', label: '→ Asíncrono' },
        ],
        items: [
          { text: 'Línea continua con punta rellena: el emisor espera', bin: 'sin' },
          { text: 'Línea discontinua de vuelta con el resultado', bin: 'res' },
          { text: 'Punta abierta: el emisor sigue sin esperar', bin: 'asi' },
          { text: 'enviarCorreo() sin esperar resultado', bin: 'asi' },
          { text: 'validarPIN() y esperar un sí o un no', bin: 'sin' },
          { text: 'Devolver «PIN correcto»', bin: 'res' },
        ],
        explanation: 'Síncrono: espera. Asíncrono: no espera. Respuesta: devuelve el resultado de un mensaje síncrono.',
      },
      {
        type: 'quiz',
        question: 'Según el diagrama, ¿qué ocurre si el PIN es incorrecto?',
        diagram: SEQ_ALT,
        options: [
          'El cajero muestra el error «PIN incorrecto»',
          'El cajero muestra el menú',
          'El banco bloquea la tarjeta',
          'No ocurre nada',
        ],
        answer: 0,
        explanation: 'El fragmento alt tiene dos ramas: con [PIN correcto] se muestra el menú y en [else] se muestra el error.',
      },
      {
        type: 'quiz',
        question: '«Si hay stock, reservar el producto; si no, avisar al cliente». ¿Qué fragmento usarías?',
        options: ['alt', 'loop', 'opt', 'ref'],
        answer: 0,
        explanation: 'Con dos alternativas excluyentes (si… si no…) se usa «alt». «opt» sirve cuando solo hay una rama opcional.',
      },
    ],
  },

  // ───────────────────────────── 7
  {
    id: 'comportamiento',
    icon: '🔄',
    title: 'Actividad, estados y compañía',
    subtitle: 'Procesos y ciclos de vida',
    color: '#059669',
    lesson: [
      {
        title: 'Diagrama de actividad',
        text: 'Muestra un **flujo de trabajo** paso a paso, como un diagrama de flujo con superpoderes:',
        diagram: ACT_PRESTAMO,
        points: [
          '⚫ **Inicio** (círculo relleno) y ◉ **fin** (diana).',
          '▢ **Acciones** (rectángulos redondeados).',
          '◇ **Decisiones** con **guardas** entre corchetes: [disponible].',
        ],
        tip: 'Para tareas en paralelo se usan barras gruesas: **fork** (dividir) y **join** (unir).',
      },
      {
        title: 'Máquina de estados',
        text: 'Muestra el **ciclo de vida de UN objeto**: en qué estados puede estar y qué eventos lo hacen cambiar.',
        diagram: STATE_PEDIDO,
        points: [
          '▢ **Estados**: Creado, Pagado, Enviado…',
          '→ **Transiciones** con su **evento** («pagar») y, si hace falta, una **guarda** ([reembolso]).',
        ],
      },
      {
        title: 'Un adelanto: casos de uso',
        mood: 'happy',
        text: 'El diagrama de **casos de uso** muestra **qué puede hacer cada actor** con el sistema. ¡Es tan importante que tiene su propia misión!',
        diagram: UC_PREVIEW,
        tip: 'Cuando termines esta misión, continúa con **Misión: Casos de Uso**. 🎯',
      },
      {
        title: 'Y la arquitectura',
        text: 'Otros dos diagramas muy útiles en proyectos reales:',
        points: [
          '🧩 **Componentes**: las piezas de software (módulos, servicios) y sus interfaces.',
          '🖥️ **Despliegue**: los **nodos** (servidores, móviles, bases de datos) donde se ejecuta cada pieza.',
        ],
      },
    ],
    challenges: [
      {
        type: 'quiz',
        question: '¿Qué representa el rombo en este diagrama de actividad?',
        diagram: ACT_PRESTAMO,
        options: [
          'Una decisión: el flujo sigue un camino u otro según la guarda',
          'Una clase abstracta',
          'El final del proceso',
          'Una composición',
        ],
        answer: 0,
        explanation: 'En los diagramas de actividad, el rombo es un nodo de decisión (o de fusión). Cada salida lleva una guarda: [disponible], [no disponible].',
      },
      {
        type: 'quiz',
        question: 'Según la máquina de estados, ¿desde qué estados se puede cancelar un pedido?',
        diagram: STATE_PEDIDO,
        options: ['Desde Creado y desde Pagado', 'Solo desde Enviado', 'Desde cualquier estado', 'Desde Entregado'],
        answer: 0,
        explanation: 'Solo hay transiciones «cancelar» que salen de Creado y de Pagado. Un pedido enviado o entregado ya no se puede cancelar.',
      },
      {
        type: 'classify',
        question: '¿Actividad o máquina de estados?',
        bins: [
          { id: 'act', label: '🔄 Actividad' },
          { id: 'est', label: '🚦 Estados' },
        ],
        items: [
          { text: 'El proceso de matrícula paso a paso', bin: 'act' },
          { text: 'Los estados de una factura: emitida, pagada, anulada', bin: 'est' },
          { text: 'El flujo para aprobar un gasto, con decisiones', bin: 'act' },
          { text: 'Un semáforo: rojo, verde, ámbar', bin: 'est' },
          { text: 'El ciclo de vida de un ticket de soporte', bin: 'est' },
          { text: 'La receta para preparar un café', bin: 'act' },
        ],
        explanation: 'Actividad: los pasos de un proceso. Estados: las situaciones por las que pasa un objeto y lo que lo hace cambiar.',
      },
      {
        type: 'quiz',
        question: '¿Qué símbolos marcan el inicio y el fin en un diagrama de actividad?',
        options: [
          'Un círculo relleno (inicio) y una diana (fin)',
          'Un rombo (inicio) y un cuadrado (fin)',
          'Dos flechas',
          'Un actor y un óvalo',
        ],
        answer: 0,
        explanation: 'Nodo inicial: círculo negro relleno. Nodo final: círculo con otro círculo relleno dentro (una «diana»).',
      },
      {
        type: 'quiz',
        question: '¿Qué diagrama muestra qué puede hacer cada usuario con el sistema?',
        options: ['Casos de uso', 'Clases', 'Despliegue', 'Tiempos'],
        answer: 0,
        explanation: 'El diagrama de casos de uso muestra actores y sus objetivos. ¡Lo verás a fondo en Misión: Casos de Uso!',
      },
    ],
  },

  // ───────────────────────────── 8
  {
    id: 'jefe',
    icon: '👾',
    title: 'Jefe final: NubeTrip',
    subtitle: 'Todo lo aprendido, en un solo reto',
    color: '#c026d3',
    boss: true,
    lesson: [
      {
        title: '¡Proyecto urgente!',
        mood: 'wow',
        text: 'La agencia de viajes **NubeTrip** quiere su nueva plataforma de reservas, y el equipo necesita que alguien **hable UML con fluidez**. ¡Es tu momento!',
        points: [
          '👾 Reto mixto: historia, tipos de diagramas, clases, secuencia y estados.',
          '💎 Cada acierto vale **150 XP**.',
          '❤️ Tienes 3 vidas. ¡Suerte, viajero/a del tiempo!',
        ],
      },
    ],
    challenges: [
      {
        type: 'classify',
        question: 'NubeTrip: ¿qué diagrama necesitas para cada encargo?',
        bins: [
          { id: 'cla', label: '🏛️ Clases' },
          { id: 'seq', label: '💬 Secuencia' },
          { id: 'act', label: '🔄 Actividad' },
          { id: 'est', label: '🚦 Estados' },
          { id: 'cu', label: '🎯 Casos de uso' },
        ],
        items: [
          { text: 'Los datos de clientes, reservas y viajes', bin: 'cla' },
          { text: 'Los mensajes entre la web y la pasarela al pagar', bin: 'seq' },
          { text: 'El proceso para gestionar una reclamación', bin: 'act' },
          { text: 'Los estados de una reserva: pendiente, confirmada, cancelada', bin: 'est' },
          { text: 'Qué puede hacer un cliente y qué un agente', bin: 'cu' },
          { text: 'Qué objeto llama a cuál al buscar vuelos', bin: 'seq' },
        ],
        explanation: 'Cada diagrama responde a una pregunta distinta: estructura (clases), mensajes (secuencia), procesos (actividad), ciclo de vida (estados) y objetivos de los usuarios (casos de uso).',
      },
      {
        type: 'quiz',
        question: '¿Por qué se creó UML?',
        options: [
          'Para unificar las decenas de notaciones incompatibles en un lenguaje visual común',
          'Para sustituir a los lenguajes de programación',
          'Para vender una herramienta de dibujo',
          'Para gestionar los plazos de los proyectos',
        ],
        answer: 0,
        explanation: 'UML nació para acabar con la guerra de los métodos: un único idioma visual estándar para el software.',
      },
      {
        type: 'builder',
        question: 'Construye el diagrama de clases de NubeTrip',
        story: 'Un **Cliente** (nombre, email) hace **Reservas** (código, fecha). Cada reserva es de un **Viaje** (destino, precio), y el viaje incluye **Hoteles** que existen por su cuenta (agregación). Los **Pagos** de una reserva no existen sin ella (composición).',
        diagram: {
          kind: 'class', w: 760, h: 320,
          classes: [
            { id: 'cli', x: 20, y: 30, w: 170, name: 'Cliente', attrs: ['- nombre: String', '- email: String'], slot: true },
            { id: 'res', x: 290, y: 30, w: 180, name: 'Reserva', attrs: ['- codigo: String', '- fecha: Date'], slot: true },
            { id: 'via', x: 565, y: 30, w: 180, name: 'Viaje', attrs: ['- destino: String', '- precio: double'], slot: true },
            { id: 'pag', x: 290, y: 225, w: 180, name: 'Pago', attrs: ['- importe: double'], slot: true },
            { id: 'hot', x: 565, y: 225, w: 180, name: 'Hotel', attrs: ['- estrellas: int'], slot: true },
          ],
          links: [
            { from: 'cli', to: 'res', type: 'assoc', label: 'hace', fromMult: '1', toMult: '0..*' },
            { from: 'res', to: 'via', type: 'assoc', fromMult: '*', toMult: '1' },
            { from: 'res', to: 'pag', type: 'comp', fromMult: '1', toMult: '1..*' },
            { from: 'via', to: 'hot', type: 'agg', fromMult: '*', toMult: '1..*' },
          ],
        },
        decoys: ['Reservar', 'PantallaDePago'],
        explanation: 'La composición ◆ une Reserva con Pago y la agregación ◇ une Viaje con Hotel. Los atributos identifican a cada clase.',
      },
      {
        type: 'quiz',
        question: 'Según la máquina de estados, ¿qué evento confirma una reserva?',
        diagram: STATE_RESERVA,
        options: ['pagar', 'viajar', 'cancelar', 'caducar'],
        answer: 0,
        explanation: 'La transición de Pendiente a Confirmada se dispara con el evento «pagar».',
      },
      {
        type: 'quiz',
        question: '¿Qué tipo de mensaje es enviarConfirmación()?',
        diagram: SEQ_BOOKING,
        options: [
          'Asíncrono: la web no espera respuesta del correo',
          'Síncrono: la web espera la respuesta',
          'Una respuesta',
          'Un mensaje a sí mismo',
        ],
        answer: 0,
        explanation: 'Tiene la punta abierta y línea continua: es asíncrono. La web sigue trabajando sin esperar al servicio de correo.',
      },
      {
        type: 'spot',
        question: 'Revisa el diagrama del becario: ¿qué marcadores señalan errores?',
        diagram: {
          kind: 'class', w: 780, h: 340,
          classes: [
            { id: 'via', x: 20, y: 30, w: 190, name: 'Viaje', attrs: ['- destino: String', '- precio: double'] },
            { id: 'org', x: 20, y: 240, w: 190, name: 'ViajeOrganizado', attrs: ['- guia: String'] },
            { id: 'res', x: 300, y: 30, w: 190, name: 'Reserva', attrs: ['- codigo: String'] },
            { id: 'pag', x: 300, y: 240, w: 190, name: 'Pago', attrs: ['- importe: double'] },
            { id: 'ges', x: 570, y: 30, w: 190, name: 'gestionarViajes', attrs: ['- lista: List'], ops: ['+ buscar()'] },
          ],
          links: [
            { from: 'org', to: 'via', type: 'gen' },
            { from: 'via', to: 'res', type: 'assoc', fromMult: '1', toMult: 'muchos' },
            { from: 'res', to: 'pag', type: 'comp' },
            { from: 'res', to: 'ges', type: 'assoc' },
          ],
        },
        markers: [
          { x: 262, y: 110, error: true, note: '«muchos» no es una multiplicidad UML. Se escribe «*» (o «0..*», «1..*»).' },
          { x: 748, y: 30, error: true, note: 'Las clases se nombran con sustantivos en singular y mayúscula inicial (p. ej., «GestorViajes»), no con verbos.' },
          { x: 145, y: 140, error: false, note: 'Correcto: ViajeOrganizado es un tipo de Viaje, y el triángulo apunta al padre.' },
          { x: 425, y: 126, error: false, note: 'Correcto: los pagos no existen sin su reserva, y el rombo relleno está junto al todo.' },
          { x: 504, y: 288, error: false, note: 'Correcto: atributo privado con su tipo.' },
        ],
        explanation: 'Errores: «muchos» no es una multiplicidad válida y una clase con nombre de verbo.',
      },
      {
        type: 'quiz',
        question: 'Completa la analogía: la partitura es a la música lo que UML es a…',
        options: ['el software', 'la pintura', 'la contabilidad', 'la geografía'],
        answer: 0,
        explanation: '¡Exacto! UML es el idioma visual común del software, como la partitura lo es de la música. 🎓',
      },
    ],
  },
];
