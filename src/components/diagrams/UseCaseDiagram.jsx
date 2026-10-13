import { clipEllipse, Lines, wrap } from './geometry.jsx';

// Diagrama de casos de uso: actores (monigotes), casos de uso (óvalos) y límite del sistema.
const UC_RX = 80;
const UC_RY = 32;

export function ucGeom(el) {
  return el.kind === 'actor'
    ? { cx: el.x, cy: el.y + 5, rx: 30, ry: 48 }
    : { cx: el.x, cy: el.y, rx: el.rx || UC_RX, ry: el.ry || UC_RY };
}

export function ucElements(spec) {
  return [
    ...(spec.actors || []).map((a) => ({ ...a, kind: 'actor' })),
    ...(spec.useCases || []).map((u) => ({ ...u, kind: 'usecase' })),
  ];
}

export function ucZone(el) {
  if (el.kind === 'actor') return { cx: el.x, cy: el.y + 5, w: 96, h: 104 };
  return { cx: el.x, cy: el.y, w: (el.rx || UC_RX) * 2, h: (el.ry || UC_RY) * 2 };
}

export function ActorFigure({ x, y, label, status = '' }) {
  const lines = label ? wrap(label, 14) : [];
  return (
    <g className={`d-actor ${status}`}>
      <circle cx={x} cy={y - 30} r={10} />
      <line x1={x} y1={y - 20} x2={x} y2={y + 8} />
      <line x1={x - 17} y1={y - 10} x2={x + 17} y2={y - 10} />
      <line x1={x} y1={y + 8} x2={x - 13} y2={y + 28} />
      <line x1={x} y1={y + 8} x2={x + 13} y2={y + 28} />
      {lines.map((l, i) => (
        <text key={i} x={x} y={y + 46 + i * 15} className="d-label" textAnchor="middle">
          {l}
        </text>
      ))}
    </g>
  );
}

export function UseCaseDiagram({ spec, uid }) {
  const els = ucElements(spec);
  const byId = Object.fromEntries(els.map((e) => [e.id, e]));
  const b = spec.boundary;
  return (
    <>
      {b && (
        <g className="d-boundary">
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={14} />
          <text x={b.x + 16} y={b.y + 26}>{b.title}</text>
        </g>
      )}
      {spec.links.map((l, i) => {
        const ga = ucGeom(byId[l.from]);
        const gb = ucGeom(byId[l.to]);
        const [x1, y1] = clipEllipse(ga, gb.cx, gb.cy);
        const [x2, y2] = clipEllipse(gb, ga.cx, ga.cy);
        const dashed = l.type === 'include' || l.type === 'extend';
        const marker = dashed ? `url(#open-${uid})` : l.type === 'gen' ? `url(#tri-${uid})` : undefined;
        return (
          <g key={i} className="d-link">
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dashed ? '7 6' : undefined} markerEnd={marker} />
            {dashed && (
              <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} textAnchor="middle" className="d-stereo">
                «{l.type}»
              </text>
            )}
          </g>
        );
      })}
      {els.map((el) =>
        el.kind === 'actor' ? (
          <ActorFigure key={el.id} x={el.x} y={el.y} label={el.label} status={el.status} />
        ) : (
          <g key={el.id} className={`d-uc ${el.status || ''}`}>
            <ellipse cx={el.x} cy={el.y} rx={el.rx || UC_RX} ry={el.ry || UC_RY} />
            <Lines lines={el.label ? wrap(el.label, Math.floor(((el.rx || UC_RX) * 2) / 9)) : []} x={el.x} y={el.y} />
          </g>
        ),
      )}
    </>
  );
}
