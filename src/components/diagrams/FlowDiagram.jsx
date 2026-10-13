import { clipDiamond, clipRect, Lines, wrap } from './geometry.jsx';

// Diagramas de flujo UML: actividad (acciones, decisiones) y máquina de estados (estados, transiciones).
const SIZES = {
  action: { w: 170, h: 46 },
  state: { w: 140, h: 48 },
  fork: { w: 150, h: 8 },
};
const DIAMOND = 24;

function box(n) {
  const s = SIZES[n.type] || SIZES.action;
  const w = n.w || s.w;
  const h = n.h || s.h;
  return { x: n.x - w / 2, y: n.y - h / 2, w, h };
}

function clipNode(n, tx, ty) {
  if (n.type === 'start') return clipCircle(n, 11, tx, ty);
  if (n.type === 'end') return clipCircle(n, 14, tx, ty);
  if (n.type === 'decision' || n.type === 'merge') return clipDiamond(n.x, n.y, DIAMOND, tx, ty);
  return clipRect(box(n), tx, ty);
}

function clipCircle(n, r, tx, ty) {
  const d = Math.hypot(tx - n.x, ty - n.y) || 1;
  return [n.x + ((tx - n.x) / d) * r, n.y + ((ty - n.y) / d) * r];
}

export function flowZone(n) {
  const b = box(n);
  return { cx: n.x, cy: n.y, w: b.w, h: b.h };
}

function Node({ n }) {
  const cls = `d-node ${n.type} ${n.status || ''}`;
  if (n.type === 'start') return <circle cx={n.x} cy={n.y} r={11} className={cls} />;
  if (n.type === 'end')
    return (
      <g className={cls}>
        <circle cx={n.x} cy={n.y} r={14} className="ring" />
        <circle cx={n.x} cy={n.y} r={8} className="dot" />
      </g>
    );
  if (n.type === 'decision' || n.type === 'merge') {
    const a = DIAMOND;
    return <path d={`M${n.x},${n.y - a} L${n.x + a},${n.y} L${n.x},${n.y + a} L${n.x - a},${n.y} Z`} className={cls} />;
  }
  const b = box(n);
  if (n.type === 'fork') return <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={3} className={cls} />;
  return (
    <g className={cls}>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={n.type === 'state' ? 12 : 22} />
      <Lines lines={n.label ? wrap(n.label, Math.floor(b.w / 8.4)) : []} x={n.x} y={n.y} />
    </g>
  );
}

export function FlowDiagram({ spec, uid }) {
  const byId = Object.fromEntries(spec.nodes.map((n) => [n.id, n]));
  return (
    <>
      {spec.title && (
        <text x={16} y={24} className="d-diagram-title">{spec.title}</text>
      )}
      {spec.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        const via = e.via || [];
        const first = via[0] || [b.x, b.y];
        const last = via[via.length - 1] || [a.x, a.y];
        const pts = [clipNode(a, first[0], first[1]), ...via, clipNode(b, last[0], last[1])];
        const d = pts.map((p, k) => `${k ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
        const [lx, ly] = e.labelAt || [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2];
        return (
          <g key={i} className={`d-edge ${e.status || ''}`}>
            <path d={d} fill="none" markerEnd={`url(#open-${uid})`} />
            {e.label && (
              <text x={lx + (e.dx ?? 0)} y={ly + (e.dy ?? -8)} textAnchor={e.anchor || 'middle'} className="d-guard">
                {e.label}
              </text>
            )}
          </g>
        );
      })}
      {spec.nodes.map((n) => (
        <Node key={n.id} n={n} />
      ))}
    </>
  );
}
