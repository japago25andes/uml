import Diagram from './diagrams/index.jsx';
import Taxonomy from './Taxonomy.jsx';
import { CLASS_SINGLE, CLASS_REL, CLASS_AGG_COMP, SEQ_TYPES, ACT_PRESTAMO, STATE_PEDIDO } from '../data/diagrams.js';

function Card({ title, children, wide }) {
  return (
    <section className={`note-card ${wide ? 'wide' : ''}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

const TIMELINE = [
  ['Hace ~36.000 años', 'Pinturas de la cueva de Chauvet: dibujar para contar.'],
  ['~3200 a. C.', 'Jeroglíficos egipcios: símbolos con reglas.'],
  ['~600 a. C.', 'Mapa babilónico del mundo: convenciones gráficas.'],
  ['~1025', 'Guido d’Arezzo: notación musical común.'],
  ['1795', 'Gaspard Monge: geometría descriptiva, base del dibujo técnico.'],
  ['1989–1994', 'Guerra de los métodos: de menos de 10 a más de 50 notaciones.'],
  ['1994–1995', 'Booch, Rumbaugh y Jacobson se unen en Rational.'],
  ['1997', 'El OMG adopta UML 1.1 como estándar.'],
  ['2005 / 2017', 'UML 2.0 y UML 2.5.1. También norma ISO/IEC 19505.'],
];

export default function Notes({ onBack }) {
  return (
    <div className="page">
      <div className="page-head">
        <button className="btn btn-ghost" onClick={onBack}>← Mapa</button>
        <h1>📘 Apuntes</h1>
        <span className="pill">Chuleta de UML</span>
      </div>

      <div className="notes-grid">
        <Card title="🕰️ De las cavernas a UML" wide>
          <table className="spec-table">
            <tbody>
              {TIMELINE.map(([when, what]) => (
                <tr key={when}>
                  <th>{when}</th>
                  <td>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="muted">
            Idea clave: un dibujo solo comunica si quien lo hace y quien lo lee <b>comparten las reglas</b>. UML es ese acuerdo para el software.
          </p>
        </Card>

        <Card title="🧠 Qué es UML">
          <p>
            <b>Unified Modeling Language</b>: un lenguaje visual estándar para <b>visualizar, especificar, construir y documentar</b> sistemas de software.
          </p>
          <ul>
            <li>Un <b>modelo</b> describe el sistema; cada <b>diagrama</b> es una vista parcial del modelo.</li>
            <li>Estándar abierto del <b>OMG</b>.</li>
          </ul>
        </Card>

        <Card title="🚫 Qué NO es UML">
          <ul>
            <li>No es un <b>lenguaje de programación</b>.</li>
            <li>No es una <b>metodología</b>: no dice en qué orden trabajar.</li>
            <li>No depende de ninguna <b>tecnología</b> ni lenguaje.</li>
          </ul>
        </Card>

        <Card title="🗺️ Los 14 diagramas" wide>
          <Taxonomy />
        </Card>

        <Card title="🏛️ Clase y visibilidad">
          <Diagram spec={CLASS_SINGLE} className="small" />
          <p><code>+</code> público · <code>-</code> privado · <code>#</code> protegido · <code>~</code> paquete</p>
        </Card>

        <Card title="🏛️ Asociación, multiplicidad y herencia">
          <Diagram spec={CLASS_REL} className="small" />
          <p>Multiplicidades: <code>1</code>, <code>0..1</code>, <code>*</code>, <code>1..*</code>. El triángulo apunta al <b>padre</b>.</p>
        </Card>

        <Card title="🏛️ Agregación, composición y dependencia" wide>
          <Diagram spec={CLASS_AGG_COMP} className="small" />
          <p>◇ partes independientes · ◆ las partes mueren con el todo · ⇢ uso puntual. El rombo va junto al <b>todo</b>.</p>
        </Card>

        <Card title="💬 Secuencia">
          <Diagram spec={SEQ_TYPES} className="small" />
          <p>
            El tiempo baja. <b>Síncrono</b>: punta rellena, el emisor espera. <b>Respuesta</b>: línea discontinua. <b>Asíncrono</b>: punta abierta, no
            espera. Fragmentos: <b>alt</b>, <b>opt</b>, <b>loop</b>.
          </p>
        </Card>

        <Card title="🔄 Actividad">
          <Diagram spec={ACT_PRESTAMO} className="small" />
          <p>Inicio ⚫, acciones ▢, decisiones ◇ con guardas [condición], fin ◉.</p>
        </Card>

        <Card title="🚦 Máquina de estados" wide>
          <Diagram spec={STATE_PEDIDO} className="small" />
          <p>El ciclo de vida de <b>un objeto</b>: estados y transiciones con <b>evento [guarda]</b>.</p>
        </Card>
      </div>
    </div>
  );
}
