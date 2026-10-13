import { ActorFigure } from './UseCaseDiagram.jsx';

// Diagrama de secuencia: participantes arriba, el tiempo avanza hacia abajo.
const HEAD_Y = 20;
const FIRST_Y = 112;

export function seqLayout(spec) {
  const w = spec.w || 760;
  const n = spec.participants.length;
  const m = spec.margin || 95;
  const xs = spec.participants.map((_, i) => (n === 1 ? w / 2 : m + (i * (w - 2 * m)) / (n - 1)));
  const frames = (spec.frames || []).map((f) => ({ ...f }));
  const rows = [];
  let y = FIRST_Y;
  spec.messages.forEach((msg, i) => {
    for (const f of frames) {
      if (f.start === i) {
        f.top = y - 22;
        y += 30;
      }
      if (f.elseAt === i) {
        f.elseY = y - 20;
        y += 26;
      }
    }
    rows[i] = y;
    y += msg.from === msg.to ? 58 : 44;
    for (const f of frames) {
      if (f.end === i) {
        f.bottom = y - 18;
        y += 14;
      }
    }
  });
  return { w, h: y + 16, xs, rows, frames };
}

export function SequenceDiagram({ spec, uid }) {
  const { w, h, xs, rows, frames } = seqLayout(spec);
  const idx = Object.fromEntries(spec.participants.map((p, i) => [p.id, i]));
  return (
    <>
      {frames.map((f, i) => (
        <g key={`f${i}`} className="d-frame">
          <rect x={18} y={f.top} width={w - 36} height={f.bottom - f.top} rx={6} />
          <path d={`M18,${f.top} h58 v14 l-9 9 h-49 z`} className="d-frame-tab" />
          <text x={30} y={f.top + 17} className="d-frame-kind">{f.kind}</text>
          {f.guard && <text x={88} y={f.top + 17} className="d-frame-guard">[{f.guard}]</text>}
          {f.elseY && (
            <>
              <line x1={18} y1={f.elseY} x2={w - 18} y2={f.elseY} strokeDasharray="6 5" />
              <text x={30} y={f.elseY + 17} className="d-frame-guard">[{f.elseGuard || 'else'}]</text>
            </>
          )}
        </g>
      ))}

      {spec.participants.map((p, i) => {
        const x = xs[i];
        const top = p.actor ? HEAD_Y + 72 : HEAD_Y + 40;
        return (
          <g key={p.id} className={`d-participant ${p.status || ''}`}>
            <line x1={x} y1={top + (p.actor ? 8 : 0)} x2={x} y2={h - 10} className="d-lifeline" />
            {p.actor ? (
              <ActorFigure x={x} y={HEAD_Y + 30} label={p.label} />
            ) : (
              <>
                <rect x={x - 70} y={HEAD_Y} width={140} height={40} rx={8} className="d-head" />
                <text x={x} y={HEAD_Y + 25} textAnchor="middle" className="d-label">{p.label}</text>
              </>
            )}
          </g>
        );
      })}

      {spec.messages.map((msg, i) => {
        const y = rows[i];
        const x1 = xs[idx[msg.from]];
        const x2 = xs[idx[msg.to]];
        const type = msg.type || 'sync';
        const marker = `url(#${type === 'sync' ? 'filled' : 'open'}-${uid})`;
        const text = `${spec.numbered ? `${i + 1}: ` : ''}${msg.label}`;
        if (msg.from === msg.to) {
          return (
            <g key={i} className={`d-msg ${type}`}>
              <path d={`M${x1},${y} H${x1 + 42} V${y + 26} H${x1 + 3}`} fill="none" markerEnd={marker} strokeDasharray={type === 'reply' ? '6 5' : undefined} />
              <text x={x1 + 50} y={y + 17} className="d-msg-label" textAnchor="start">{text}</text>
            </g>
          );
        }
        const dir = Math.sign(x2 - x1);
        return (
          <g key={i} className={`d-msg ${type}`}>
            <line x1={x1} y1={y} x2={x2 - dir * 2} y2={y} markerEnd={marker} strokeDasharray={type === 'reply' ? '6 5' : undefined} />
            <text x={(x1 + x2) / 2} y={y - 8} className="d-msg-label" textAnchor="middle">{text}</text>
          </g>
        );
      })}
    </>
  );
}
