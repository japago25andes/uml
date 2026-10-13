import { clipRect } from './geometry.jsx';

// Diagrama de clases: cajas con nombre, atributos y operaciones, y sus relaciones.
const LINE = 18;
const HEAD = 34;

export function classBox(c) {
  const w = c.w || 180;
  const headH = HEAD + (c.stereotype ? 14 : 0);
  const attrs = c.attrs || [];
  const ops = c.ops || [];
  const aH = attrs.length ? attrs.length * LINE + 10 : 14;
  const oH = ops.length ? ops.length * LINE + 10 : 14;
  const h = headH + aH + oH;
  return { x: c.x, y: c.y, w, h, headH, aH, oH, cx: c.x + w / 2, cy: c.y + h / 2 };
}

export function classZone(c) {
  const b = classBox(c);
  return { cx: b.cx, cy: b.cy, w: b.w, h: b.h };
}

// Une dos cajas con una línea recta si se solapan en horizontal o vertical; si no, en diagonal.
function connect(A, B) {
  const ox1 = Math.max(A.x, B.x);
  const ox2 = Math.min(A.x + A.w, B.x + B.w);
  if (ox2 - ox1 > 20) {
    const x = (ox1 + ox2) / 2;
    return A.cy < B.cy ? [[x, A.y + A.h], [x, B.y]] : [[x, A.y], [x, B.y + B.h]];
  }
  const oy1 = Math.max(A.y, B.y);
  const oy2 = Math.min(A.y + A.h, B.y + B.h);
  if (oy2 - oy1 > 16) {
    const y = (oy1 + oy2) / 2;
    return A.cx < B.cx ? [[A.x + A.w, y], [B.x, y]] : [[A.x, y], [B.x + B.w, y]];
  }
  return [clipRect(A, B.cx, B.cy), clipRect(B, A.cx, A.cy)];
}

const LINK_STYLE = {
  assoc: { dashed: false },
  gen: { dashed: false, end: 'tri' },
  real: { dashed: true, end: 'tri' },
  dep: { dashed: true, end: 'open' },
  agg: { dashed: false, start: 'diamond' },
  comp: { dashed: false, start: 'diamondFill' },
};

function ClassBox({ c }) {
  const b = classBox(c);
  const { x, y, w } = b;
  const r = 8;
  const head = `M${x},${y + b.headH} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + b.headH} Z`;
  const nameY = y + b.headH / 2 + (c.stereotype ? 11 : 5);
  return (
    <g className={`d-class ${c.status || ''}`}>
      <rect x={x} y={y} width={w} height={b.h} rx={r} className="d-class-box" />
      <path d={head} className="d-class-head" />
      <line x1={x} y1={y + b.headH} x2={x + w} y2={y + b.headH} className="d-class-sep" />
      <line x1={x} y1={y + b.headH + b.aH} x2={x + w} y2={y + b.headH + b.aH} className="d-class-sep" />
      {c.stereotype && (
        <text x={b.cx} y={y + 16} textAnchor="middle" className="d-class-stereo">
          «{c.stereotype}»
        </text>
      )}
      <text x={b.cx} y={nameY} textAnchor="middle" className={`d-class-name ${c.abstract ? 'abstract' : ''}`}>
        {c.name}
      </text>
      {(c.attrs || []).map((a, i) => (
        <text key={`a${i}`} x={x + 10} y={y + b.headH + 18 + i * LINE} className="d-member">
          {a}
        </text>
      ))}
      {(c.ops || []).map((o, i) => (
        <text key={`o${i}`} x={x + 10} y={y + b.headH + b.aH + 18 + i * LINE} className="d-member">
          {o}
        </text>
      ))}
    </g>
  );
}

export function ClassDiagram({ spec, uid }) {
  const byId = Object.fromEntries(spec.classes.map((c) => [c.id, c]));
  return (
    <>
      {(spec.links || []).map((l, i) => {
        const A = classBox(byId[l.from]);
        const B = classBox(byId[l.to]);
        const [[x1, y1], [x2, y2]] = connect(A, B);
        const style = LINK_STYLE[l.type] || LINK_STYLE.assoc;
        const len = Math.hypot(x2 - x1, y2 - y1) || 1;
        const ux = (x2 - x1) / len;
        const uy = (y2 - y1) / len;
        const nx = -uy;
        const ny = ux;
        const endMarker = style.end || (l.nav ? 'open' : null);
        // En líneas casi horizontales, la multiplicidad se alinea hacia dentro de la línea para no pisar la caja.
        const horizontal = Math.abs(ux) > 0.7;
        const multAt = (px, py, dir) =>
          horizontal
            ? [px + ux * dir * 8, py + 16, (ux * dir > 0) ? 'start' : 'end']
            : [px + ux * dir * 22 + nx * 12, py + uy * dir * 22 + ny * 12 + 4, 'middle'];
        const [m1x, m1y, m1a] = multAt(x1, y1, 1);
        const [m2x, m2y, m2a] = multAt(x2, y2, -1);
        return (
          <g key={i} className={`d-link ${l.status || ''}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeDasharray={style.dashed ? '7 6' : undefined}
              markerStart={style.start ? `url(#${style.start}-${uid})` : undefined}
              markerEnd={endMarker ? `url(#${endMarker}-${uid})` : undefined}
            />
            {l.fromMult && <text x={m1x} y={m1y} textAnchor={m1a} className="d-mult">{l.fromMult}</text>}
            {l.toMult && <text x={m2x} y={m2y} textAnchor={m2a} className="d-mult">{l.toMult}</text>}
            {l.label && (
              <text x={(x1 + x2) / 2 - nx * 12} y={(y1 + y2) / 2 - ny * 12 + 4} textAnchor="middle" className="d-stereo">
                {l.label}
              </text>
            )}
          </g>
        );
      })}
      {spec.classes.map((c) => (
        <ClassBox key={c.id} c={c} />
      ))}
    </>
  );
}
