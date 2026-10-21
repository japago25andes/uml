# 🕰️ Misión: UML

> **Misión 1 de 2 del curso.** Introducción gamificada a UML para estudiantes universitarios.
> Siguiente misión: **🎯 Misión: Casos de Uso** (carpeta `casos-de-uso-quest`).

Una web interactiva en español que explica **qué es UML y por qué existe**. Empieza con una **máquina del tiempo** que recorre 36.000 años de lenguajes visuales, desde las pinturas de las cavernas hasta la "guerra de los métodos" del software. Así el estudiante descubre que la humanidad siempre se ha comunicado con dibujos, y que UML nació para que el software también tuviera **un idioma visual común**.

Después de la máquina del tiempo hay **8 niveles** con lecciones cortas y retos, guiados por **Ana Lista**, una analista robot de la empresa ficticia *NubeLab*.

---

## 📑 Índice

1. [Resumen rápido](#-resumen-rápido)
2. [Requisitos](#-requisitos)
3. [Puertos](#-puertos)
4. [Cómo levantar la web con Docker](#-cómo-levantar-la-web-con-docker)
5. [Cómo comprobar que funciona](#-cómo-comprobar-que-funciona)
6. [Cómo detenerla y actualizarla](#-cómo-detenerla-y-actualizarla)
7. [Usarla en clase (varios ordenadores)](#-usarla-en-clase-varios-ordenadores)
8. [Contenido didáctico](#-contenido-didáctico)
9. [Mecánica de juego](#-mecánica-de-juego)
10. [Editar o ampliar el contenido](#-editar-o-ampliar-el-contenido)
11. [Estructura del proyecto](#-estructura-del-proyecto)
12. [Solución de problemas](#-solución-de-problemas)
13. [Tecnología](#-tecnología)

---

## ⚡ Resumen rápido

| Qué | Valor |
|---|---|
| Dirección de la web | **http://localhost:8081** |
| Arrancar (Windows) | Doble clic en **`iniciar.bat`** |
| Detener (Windows) | Doble clic en **`detener.bat`** |
| Arrancar (terminal) | `docker compose up -d --build` |
| Detener (terminal) | `docker compose down` |
| Nombre del contenedor | `uml-quest` |
| Requisito único | **Docker Desktop** abierto |

---

## 🧰 Requisitos

Solo hace falta **Docker**. No hay que instalar Node.js, npm ni ninguna otra herramienta: todo se compila dentro de Docker.

| Sistema | Qué instalar |
|---|---|
| **Windows 10/11** | [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/) (usa WSL 2; el instalador lo configura) |
| **macOS** | [Docker Desktop para Mac](https://www.docker.com/products/docker-desktop/) (Intel o Apple Silicon) |
| **Linux** | Docker Engine + el plugin **Docker Compose v2** (`docker compose`) |

Recomendaciones:

- Tener **conexión a internet la primera vez**. Docker descarga las imágenes base (`node:20-alpine` y `nginx:1.27-alpine`) y las librerías del proyecto. Después funciona sin conexión.
- Unos **500 MB libres** en disco para las imágenes.
- Un navegador moderno: **Chrome, Edge o Firefox**. La web está pensada para **pantallas de ordenador**.

Para comprobar que Docker está listo, abre una terminal y ejecuta:

```bash
docker --version
```

```bash
docker compose version
```

Si ambos comandos responden con un número de versión, todo está preparado.

---

## 🔌 Puertos

| Puerto | Para qué | Cuándo se usa |
|---|---|---|
| **8081** | **Versión para clase** (Nginx sirviendo la web compilada) | Siempre: es la que usan los estudiantes |
| **5174** | Versión de **desarrollo** con recarga automática | Solo si vas a editar preguntas o textos |

Puertos de los dos juegos del curso, que pueden funcionar **a la vez**:

| Juego | Clase | Desarrollo |
|---|---|---|
| 🕰️ **Misión: UML** (este) | `http://localhost:8081` | `http://localhost:5174` |
| 🎯 **Misión: Casos de Uso** | `http://localhost:8080` | `http://localhost:5173` |

> 🔗 Al vencer al jefe final aparece el botón **"Siguiente misión: Casos de Uso"**, que abre `http://localhost:8080`. Para que funcione, el otro juego también tiene que estar levantado.

### Cambiar el puerto

Si el 8081 ya está ocupado en tu ordenador:

1. Abre `docker-compose.yml` y cambia el número de la **izquierda** en `ports`:
   ```yaml
   ports:
     - "9081:80"   # antes "8081:80"; el 80 de la derecha NO se toca
   ```
2. Cambia también la dirección en `iniciar.bat` (dos líneas con `http://localhost:8081`).
3. Vuelve a arrancar con `iniciar.bat` o `docker compose up -d --build`.

Si cambias el puerto del juego de **Casos de Uso**, actualiza también el enlace de "Siguiente misión" en `src/data/game.js`:

```js
export const NEXT_MISSION_URL = 'http://localhost:8080';
```

---

## 🚀 Cómo levantar la web con Docker

### Opción A: Windows con doble clic (la más fácil)

1. Abre **Docker Desktop** y espera a que indique que está en marcha (*Engine running*).
2. Entra en la carpeta `uml-quest` y haz **doble clic en `iniciar.bat`**.
3. Se abre una ventana negra que construye la web. **La primera vez tarda 1–3 minutos**; después, unos segundos.
4. Al terminar se abre el navegador en **http://localhost:8081**.

### Opción B: desde una terminal (Windows, macOS o Linux)

1. Abre una terminal **dentro de la carpeta del proyecto**:
   - Windows: en el Explorador, entra en `uml-quest`, escribe `cmd` en la barra de direcciones y pulsa Enter.
   - macOS/Linux: `cd ruta/a/uml-quest`.
2. Construye y arranca el contenedor en segundo plano:
   ```bash
   docker compose up -d --build
   ```
3. Abre **http://localhost:8081** en el navegador.

Qué significa cada parte del comando:

| Parte | Significado |
|---|---|
| `docker compose up` | Crea y arranca el servicio `web` definido en `docker-compose.yml` |
| `-d` | Lo deja funcionando en segundo plano, así puedes cerrar la terminal |
| `--build` | Vuelve a compilar la web; necesario la primera vez y tras cualquier cambio |

### ¿Qué hace Docker por dentro?

El `Dockerfile` construye la web en **dos etapas**:

1. **Compilación** (`node:20-alpine`): instala las dependencias y ejecuta `npm run build`, que genera la web optimizada en `dist/`.
2. **Servidor** (`nginx:1.27-alpine`): copia solo la carpeta `dist/` y la sirve con Nginx en el puerto 80 del contenedor.

`docker-compose.yml` conecta el **puerto 8081 de tu ordenador** con el puerto 80 del contenedor. Además lo configura con `restart: unless-stopped`, así que la web **vuelve a arrancar sola** al reiniciar el ordenador, siempre que Docker Desktop esté abierto.

---

## ✅ Cómo comprobar que funciona

```bash
docker compose ps
```

Debe aparecer el contenedor `uml-quest` con estado `Up` (o `running`) y el puerto `0.0.0.0:8081->80/tcp`.

Para ver los mensajes del servidor:

```bash
docker compose logs -f web
```

(Pulsa `Ctrl + C` para salir; la web sigue funcionando.)

---

## 🛑 Cómo detenerla y actualizarla

| Acción | Windows | Terminal |
|---|---|---|
| Detener | Doble clic en `detener.bat` | `docker compose down` |
| Volver a arrancar | Doble clic en `iniciar.bat` | `docker compose up -d --build` |
| Aplicar cambios del contenido | Doble clic en `iniciar.bat` | `docker compose up -d --build` |
| Reconstruir desde cero (si algo raro pasa) | — | `docker compose build --no-cache` y después `docker compose up -d` |

> Detener el contenedor **no borra el progreso** de los estudiantes, porque se guarda en su navegador (ver más abajo).

---

## 🏫 Usarla en clase (varios ordenadores)

Hay dos formas de usarla en el aula:

**1. Cada estudiante en su propio ordenador** (recomendado si tienen Docker). Cada uno copia la carpeta y ejecuta `iniciar.bat`.

**2. Un solo ordenador (el del profesor/a) sirve la web a toda la clase** por la red local:

1. Levanta la web en tu ordenador como siempre.
2. Averigua tu IP local:
   - Windows: ejecuta `ipconfig` y busca *Dirección IPv4*, por ejemplo `192.168.1.50`.
   - macOS/Linux: ejecuta `ipconfig getifaddr en0` o `hostname -I`.
3. Los estudiantes abren **`http://TU-IP:8081`**, por ejemplo `http://192.168.1.50:8081`, conectados a la **misma red**.
4. Si no carga, permite el puerto en el **Firewall de Windows**. Ejecuta esto en PowerShell como administrador:
   ```powershell
   New-NetFirewallRule -DisplayName "Mision UML 8081" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow
   ```
   Algunas redes universitarias aíslan los equipos entre sí; en ese caso usa la opción 1.

### Sobre el progreso de los estudiantes

- Se guarda en el **navegador de cada estudiante** (`localStorage`). No hay base de datos ni cuentas.
- Para **llevar el progreso a otro equipo** (por ejemplo, de la sala de cómputo al portátil de casa) está el **archivo de progreso**:
  1. En el juego, botón **💾 Progreso → Descargar archivo**. Se descarga un `.txt`, por ejemplo `progreso-uml-juan-perez-2026-10-21.txt`.
  2. El estudiante lo guarda en su correo, Drive o una USB.
  3. En el otro equipo, en la pantalla de inicio: **📂 ¿Vienes de otro equipo? Carga tu archivo de progreso** (o **💾 Progreso → Elegir archivo**, o arrastrando el archivo a la ventana). El juego muestra un resumen y pide confirmación antes de reemplazar lo que haya.
- El archivo guarda **todo**: nombre, niveles, estrellas, XP, rachas e insignias. Su contenido va **codificado y sellado**: no se puede leer con el Bloc de notas y, si se cambia una sola letra, el juego lo rechaza. Cada archivo solo sirve para su propio juego. (Es una protección contra la edición a mano, no cifrado de alta seguridad.)
- Al terminar cada nivel aparece el botón **💾 Guardar progreso**, para que guardarlo se vuelva costumbre.
- Sin ese archivo, si cambian de navegador u ordenador o borran los datos de navegación, empiezan de cero.
- Desde el mapa, el botón **"Reiniciar progreso"** borra la partida de ese navegador.
- Al terminar, cada estudiante obtiene un **certificado imprimible** (o guardable como PDF) con su nombre, rango, XP, estrellas e insignias. Puede servir como evidencia de actividad.

---

## 📚 Contenido didáctico

### Orden recomendado en el curso

1. 🕰️ **Misión: UML** (este juego): qué es UML, de dónde viene y sus diagramas principales.
2. 🎯 **Misión: Casos de Uso**: profundiza en los casos de uso.

### 🕰️ Prólogo: la máquina del tiempo

Se muestra al empezar la partida y se puede repetir desde el mapa. Un contador de años "viaja" con animación entre 9 paradas:

| # | Época | Lugar | Idea que transmite |
|---|---|---|---|
| 1 | Hace ~36.000 años | Cueva de Chauvet (Francia) | Dibujar para contar, antes de la escritura |
| 2 | ~3200 a. C. | Antiguo Egipto | Los jeroglíficos: símbolos con **reglas compartidas** |
| 3 | ~600 a. C. | Babilonia | El mapa babilónico del mundo y las **convenciones** gráficas |
| 4 | ~1025 | Arezzo (Italia) | Guido d’Arezzo y la notación musical común |
| 5 | 1795 | Francia | Gaspard Monge y el dibujo técnico normalizado |
| 6 | 1989–1994 | El mundo del software | La **guerra de los métodos**: de menos de 10 a más de 50 notaciones |
| 7 | 1994–1995 | Rational Software | Booch, Rumbaugh y Jacobson, "los tres amigos" |
| 8 | 1997 | OMG | Nace **UML 1.1** como estándar; después UML 2.0 (2005) y 2.5.1 (2017); norma ISO/IEC 19505 |
| 9 | Hoy | Tu clase | UML es el **idioma visual común** del software |

**Mensaje central:** un dibujo solo comunica si quien lo hace y quien lo lee **comparten las reglas**. UML es ese acuerdo para el software.

### 🗺️ Niveles

| # | Nivel | Qué se aprende | Retos |
|---|---|---|---|
| 1 | 🦬 Dibujar para entenderse | Lenguajes visuales en la historia; por qué hace falta un estándar | 5 |
| 2 | ⚔️ La guerra de los métodos | Booch, OMT, OOSE; los tres amigos; OMG; versiones; qué significa UML | 5 |
| 3 | 🧠 ¿Qué es UML? | Lenguaje de modelado (no de programación ni metodología); modelo frente a diagrama; para qué modelar | 5 |
| 4 | 🗺️ El mapa de los 14 diagramas | Estructura, comportamiento e interacción; qué diagrama usar en cada caso | 5 |
| 5 | 🏛️ Diagrama de clases | Compartimentos, visibilidad, asociación, multiplicidad, herencia, agregación, composición y dependencia | 6 |
| 6 | 💬 Diagrama de secuencia | Líneas de vida; mensajes síncronos, asíncronos y de respuesta; fragmentos alt, opt y loop | 6 |
| 7 | 🔄 Actividad, estados y compañía | Diagrama de actividad, máquina de estados, avance de casos de uso, componentes y despliegue | 5 |
| 8 | 👾 Jefe final: NubeTrip | Reto mixto con todo lo anterior (150 XP por acierto) | 7 |

Además:

- **📘 Apuntes**: una chuleta de repaso con la línea del tiempo, el mapa de los 14 diagramas y ejemplos de cada diagrama.
- **🏆 Logros**: 12 insignias.
- **🎓 Certificado** al derrotar al jefe final.

---

## 🎮 Mecánica de juego

| Elemento | Cómo funciona |
|---|---|
| **Lección** | Cada nivel empieza con diapositivas cortas de Ana Lista (se pueden saltar si el nivel ya está superado) |
| **Tipos de reto** | ❓ pregunta · ☑️ selección múltiple · 🗂️ clasificar · 🔢 ordenar · 🧩 construir un diagrama arrastrando piezas · 🕵️ encontrar errores en un diagrama |
| **Vidas** | 3 ❤️ por nivel. Cada fallo resta una; sin vidas, se repite el nivel |
| **XP** | 100 por acierto (150 en el jefe final). En los retos de varias partes, un acierto parcial da algo de XP pero cuesta una vida |
| **Racha 🔥** | Bonus de +10 XP por cada acierto seguido (máximo +50) |
| **Estrellas** | ⭐⭐⭐ sin fallos · ⭐⭐ con 1 fallo · ⭐ con 2. Cada estrella suma 50 XP |
| **Mejor marca** | Repetir un nivel solo cuenta si se mejora la puntuación (no se puede "farmear" XP) |
| **Rangos** | 🪨 Pintor/a rupestre → 📜 Escriba → 🗺️ Cartógrafo/a → 📐 Ingeniero/a de planos → 💻 Modelador/a UML → 👑 Leyenda UML |
| **Sonido** | Efectos sintetizados, con botón 🔊 para silenciarlos |
| **Teclado** | Teclas `1`–`4` para responder preguntas, `Enter` para continuar y flechas para avanzar en lecciones y en la máquina del tiempo |

---

## ✏️ Editar o ampliar el contenido

Todo el contenido está en archivos de texto dentro de `src/data/`. No hace falta tocar el código de la web.

| Archivo | Qué contiene |
|---|---|
| `src/data/levels.js` | Los 8 niveles: lecciones y retos |
| `src/data/timeline.js` | Las 9 escenas de la máquina del tiempo |
| `src/data/diagrams.js` | Los diagramas UML de las lecciones y los apuntes |
| `src/data/game.js` | Rangos, insignias, puntuaciones y enlace a la siguiente misión |

### Ver los cambios en directo (modo desarrollo)

```bash
docker compose --profile dev up dev
```

Abre **http://localhost:5174**. Cada vez que guardes un archivo, la página se actualiza sola. Para salir, pulsa `Ctrl + C`.

Cuando termines, **actualiza la versión de clase** con `iniciar.bat` o `docker compose up -d --build`.

### Ejemplos de retos

En los textos, `**negrita**`, `*cursiva*` y `` `código` `` se resaltan automáticamente.

**Pregunta** (la respuesta correcta es el índice `answer`, empezando en 0; las opciones se barajan solas):

```js
{
  type: 'quiz',
  question: '¿Qué significa UML?',
  options: ['Unified Modeling Language', 'Universal Machine Language', 'User Management Logic'],
  answer: 0,
  explanation: '«Unificado» porque unió los métodos de Booch, Rumbaugh y Jacobson.',
}
```

**Clasificar:**

```js
{
  type: 'classify',
  question: '¿A qué familia pertenece cada diagrama?',
  bins: [
    { id: 'e', label: '🧱 Estructura' },
    { id: 'c', label: '🎬 Comportamiento' },
  ],
  items: [
    { text: 'Clases', bin: 'e' },
    { text: 'Actividad', bin: 'c' },
  ],
  explanation: '…',
}
```

**Ordenar** (escribe los pasos en el orden correcto; el juego los baraja):

```js
{ type: 'order', question: 'Ordena la historia de UML', steps: ['Paso 1', 'Paso 2', 'Paso 3'], explanation: '…' }
```

**Selección múltiple:** `type: 'pick'` con `options: [{ text, correct: true/false }]`.

Los retos **construir** (`builder`) y **encontrar errores** (`spot`) usan diagramas con coordenadas. Copia uno existente de `levels.js` como plantilla:

- **Construir:** cada elemento con `slot: true` se convierte en un hueco, y `decoys` añade piezas trampa.
- **Encontrar errores:** cada marcador tiene posición `x`/`y`, `error: true/false` y una explicación en `note`.

### Tipos de diagrama disponibles (`kind`)

| `kind` | Diagrama | Elementos principales |
|---|---|---|
| `class` | Clases | `classes` (nombre, atributos, operaciones) y `links` de tipo `assoc`, `gen`, `agg`, `comp`, `dep` o `real`, con multiplicidades |
| `sequence` | Secuencia | `participants`, `messages` (`sync`, `async`, `reply`) y `frames` (`alt`, `opt`, `loop`) |
| `flow` | Actividad y estados | `nodes` (`start`, `end`, `action`, `state`, `decision`, `fork`) y `edges` con guardas |
| `usecase` | Casos de uso | `actors`, `useCases` y `links` (`assoc`, `include`, `extend`, `gen`) |

---

## 🗂️ Estructura del proyecto

```
uml-quest/
├── iniciar.bat / detener.bat   ← arrancar y parar con doble clic (Windows)
├── docker-compose.yml          ← puertos 8081 (clase) y 5174 (desarrollo)
├── Dockerfile                  ← compila con Node y sirve con Nginx
├── nginx.conf                  ← configuración del servidor web
├── package.json                ← dependencias (React, Vite, confeti, tipografía)
└── src/
    ├── data/                   ← CONTENIDO editable (niveles, viaje en el tiempo, diagramas, reglas)
    ├── components/
    │   ├── TimeMachine.jsx     ← máquina del tiempo
    │   ├── SceneArt.jsx        ← ilustraciones de cada época
    │   ├── LevelMap.jsx        ← mapa de niveles
    │   ├── LevelPlayer.jsx     ← lección, retos, vidas, XP y resultados
    │   ├── challenges/         ← los 6 tipos de reto
    │   └── diagrams/           ← motor de dibujo UML (clases, secuencia, actividad/estados, casos de uso)
    ├── lib/                    ← progreso guardado, sonidos y utilidades
    ├── styles.css              ← estilos generales
    └── uml.css                 ← estilos de los diagramas y la máquina del tiempo
```

---

## 🩺 Solución de problemas

| Problema | Causa probable | Solución |
|---|---|---|
| `iniciar.bat` dice *"No se pudo arrancar"* | Docker Desktop no está abierto | Abre Docker Desktop, espera a *Engine running* y vuelve a intentarlo |
| `failed to connect to the docker API` | Igual que el anterior | Igual que el anterior |
| `port is already allocated` | Otro programa usa el puerto 8081 | Cambia el puerto (ver [Puertos](#cambiar-el-puerto)) |
| `no such host` o error de red al construir | Docker acaba de arrancar y aún no tiene red, o no hay internet | Espera unos segundos y repite. La primera vez necesita internet |
| Error al construir relacionado con *bake* o *buildkit* | Algunas versiones de Docker Compose | Ejecuta `set COMPOSE_BAKE=false` (Windows cmd) o `export COMPOSE_BAKE=false` (macOS/Linux) y repite. `iniciar.bat` ya lo hace |
| No veo mis cambios | No se reconstruyó la imagen, o el navegador usa la caché | `docker compose up -d --build` y recarga con `Ctrl + F5` |
| El enlace "Siguiente misión" no abre nada | El juego de Casos de Uso no está levantado | Arranca también `casos-de-uso-quest` (puerto 8080) |
| Un estudiante perdió su progreso | Cambió de navegador o borró los datos de navegación | El progreso vive en cada navegador. Si guardó su archivo de progreso, que lo cargue con **💾 Progreso**; si no, debe usar siempre el mismo navegador |
| Al cargar el archivo dice «fue modificado o está dañado» | Se abrió y editó, o se dañó al copiarlo | Usar el archivo original descargado del juego, sin editarlo |
| Al cargar el archivo dice «es de Misión: …» | Es el archivo de otro juego del curso | Cargarlo en ese juego |
| Los jeroglíficos se ven como cuadrados | Falta la fuente en el sistema (Windows la incluye; algunos Linux no) | Instala *Noto Sans Egyptian Hieroglyphs* o ignóralo: el resto funciona igual |

---

## 🛠️ Tecnología

- **React 18 + Vite 5**: interfaz y compilación.
- **SVG propio**: todos los diagramas UML se dibujan en el navegador, sin imágenes.
- **canvas-confetti**: celebraciones. **Web Audio API**: sonidos sintetizados, sin archivos de audio.
- **Fuente Outfit**: incluida en el proyecto, no depende de internet.
- **Docker** (Node 20 para compilar, Nginx 1.27 para servir).
