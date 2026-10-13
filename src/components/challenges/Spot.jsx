import { useState } from 'react';
import Shell from './Shell.jsx';
import Diagram, { pct } from '../diagrams/index.jsx';
import { sfx } from '../../lib/sound.js';

export default function Spot({ challenge, revealed, onCheck }) {
  const [marked, setMarked] = useState(() => new Set());
  const { markers, diagram } = challenge;

  function toggle(i) {
    if (revealed) return;
    sfx.click();
    setMarked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function check() {
    const hits = markers.filter((m, i) => m.error === marked.has(i)).length;
    onCheck(hits / markers.length);
  }

  function stateOf(m, i) {
    const on = marked.has(i);
    if (!revealed) return on ? 'on' : '';
    if (m.error) return on ? 'ok' : 'missed';
    return on ? 'bad' : 'fine';
  }

  return (
    <Shell challenge={challenge} revealed={revealed} canCheck={marked.size > 0} onCheck={check} actionHint="Marca al menos un error">
      <Diagram spec={diagram}>
        {markers.map((m, i) => (
          <button
            key={i}
            className={`marker ${stateOf(m, i)}`}
            style={pct(diagram, m.x, m.y)}
            onClick={() => toggle(i)}
            disabled={revealed}
            title={`Marcador ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </Diagram>
      {revealed && (
        <ul className="spot-notes">
          {markers.map((m, i) => (
            <li key={i} className={stateOf(m, i)}>
              <span className="marker static">{i + 1}</span>
              <span>
                <strong>{m.error ? '❌ Error' : '✅ Correcto'}</strong>
                {stateOf(m, i) === 'missed' && ' (no lo marcaste)'}
                {stateOf(m, i) === 'bad' && ' (lo marcaste, pero estaba bien)'} — {m.note}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
