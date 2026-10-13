// Utilidades geométricas compartidas por todos los diagramas.

export function wrap(text, max) {
  const lines = [];
  let cur = '';
  for (const word of String(text).split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Punto del borde de una elipse en dirección a (tx, ty). */
export function clipEllipse(g, tx, ty) {
  const dx = tx - g.cx;
  const dy = ty - g.cy;
  if (!dx && !dy) return [g.cx, g.cy];
  const t = 1 / Math.sqrt((dx / g.rx) ** 2 + (dy / g.ry) ** 2);
  return [g.cx + dx * t, g.cy + dy * t];
}

/** Punto del borde de un rectángulo { x, y, w, h } en dirección a (tx, ty). */
export function clipRect(r, tx, ty) {
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  const dx = tx - cx;
  const dy = ty - cy;
  if (!dx && !dy) return [cx, cy];
  const t = Math.min(dx ? r.w / 2 / Math.abs(dx) : Infinity, dy ? r.h / 2 / Math.abs(dy) : Infinity);
  return [cx + dx * t, cy + dy * t];
}

/** Punto del borde de un rombo centrado en (cx, cy) con semieje a. */
export function clipDiamond(cx, cy, a, tx, ty) {
  const dx = tx - cx;
  const dy = ty - cy;
  if (!dx && !dy) return [cx, cy];
  const t = a / (Math.abs(dx) + Math.abs(dy));
  return [cx + dx * t, cy + dy * t];
}

/** Texto multilínea centrado verticalmente en (x, y). */
export function Lines({ lines, x, y, className = 'd-label', anchor = 'middle', step = 15 }) {
  return lines.map((l, i) => (
    <text key={i} x={x} y={y + 4.5 + (i - (lines.length - 1) / 2) * step} className={className} textAnchor={anchor}>
      {l}
    </text>
  ));
}
