// Mapa visual de los 14 diagramas de UML 2.5. Las ⭐ marcan los más usados.
const STRUCTURE = [
  ['🏛️', 'Clases', true],
  ['🧊', 'Objetos'],
  ['🧩', 'Componentes'],
  ['🪆', 'Estructura compuesta'],
  ['📦', 'Paquetes'],
  ['🖥️', 'Despliegue'],
  ['🏷️', 'Perfiles'],
];
const BEHAVIOR = [
  ['🎯', 'Casos de uso', true],
  ['🔄', 'Actividad', true],
  ['🚦', 'Máquina de estados', true],
];
const INTERACTION = [
  ['💬', 'Secuencia', true],
  ['🔗', 'Comunicación'],
  ['⏱️', 'Tiempos'],
  ['🗺️', 'Visión general de interacción'],
];

function Chips({ items }) {
  return (
    <div className="tax-chips">
      {items.map(([icon, name, star]) => (
        <span key={name} className={`tax-chip ${star ? 'top' : ''}`}>
          {icon} {name} {star && '⭐'}
        </span>
      ))}
    </div>
  );
}

export default function Taxonomy() {
  return (
    <div className="taxonomy">
      <div className="tax-root">UML 2.5 · 14 diagramas</div>
      <div className="tax-cols">
        <div className="tax-col structure">
          <h4>🧱 Estructura <small>lo que el sistema ES</small></h4>
          <Chips items={STRUCTURE} />
        </div>
        <div className="tax-col behavior">
          <h4>🎬 Comportamiento <small>lo que el sistema HACE</small></h4>
          <Chips items={BEHAVIOR} />
          <div className="tax-sub">
            <h5>💬 Interacción</h5>
            <Chips items={INTERACTION} />
          </div>
        </div>
      </div>
    </div>
  );
}
