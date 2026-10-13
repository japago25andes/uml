import { useMemo, useState } from 'react';
import Shell from './Shell.jsx';
import Diagram, { elementsOf, mapElements, zoneSize } from '../diagrams/index.jsx';
import { shuffle } from '../../lib/utils.jsx';
import { sfx } from '../../lib/sound.js';

export default function Builder({ challenge, revealed, onCheck }) {
  const { diagram } = challenge;
  const slots = useMemo(() => elementsOf(diagram).filter((e) => e.slot), [diagram]);
  const chips = useMemo(() => shuffle([...slots.map((s) => s.label), ...(challenge.decoys || [])]), [slots, challenge]);
  const [placed, setPlaced] = useState({}); // { slotId: label }
  const [selected, setSelected] = useState(null);
  const [over, setOver] = useState(null);

  const used = new Set(Object.values(placed));
  const pool = chips.filter((c) => !used.has(c));
  const allFilled = slots.every((s) => placed[s.id]);

  function place(slotId, label) {
    if (revealed) return;
    setPlaced((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) if (next[k] === label) delete next[k];
      next[slotId] = label;
      return next;
    });
    setSelected(null);
    sfx.click();
  }

  function clickSlot(slotId) {
    if (revealed) return;
    if (selected) return place(slotId, selected);
    if (placed[slotId]) {
      const next = { ...placed };
      delete next[slotId];
      setPlaced(next);
      sfx.click();
    }
  }

  function check() {
    const hits = slots.filter((s) => placed[s.id] === s.label).length;
    onCheck(hits / slots.length);
  }

  // Diagrama que se dibuja: huecos vacíos, piezas colocadas o la solución al corregir.
  const view = useMemo(() => {
    const mark = (el) => {
      if (!el.slot) return el;
      if (revealed) return { ...el, status: placed[el.id] === el.label ? 'ok' : 'bad' };
      return placed[el.id] ? { ...el, label: placed[el.id], status: 'filled' } : { ...el, label: '', status: 'ghost' };
    };
    return mapElements(diagram, mark);
  }, [diagram, placed, revealed]);

  return (
    <Shell
      challenge={challenge}
      revealed={revealed}
      canCheck={allFilled}
      onCheck={check}
      actionHint={`Rellena todos los huecos (${Object.keys(placed).length}/${slots.length})`}
    >
      <Diagram spec={view} className="builder-diagram">
        {slots.map((s) => (
          <div
            key={s.id}
            className={`dropzone ${s.kind} ${over === s.id ? 'over' : ''} ${selected && !revealed ? 'armed' : ''} ${placed[s.id] ? 'filled' : ''}`}
            style={zoneSize(diagram, s)}
            onClick={() => clickSlot(s.id)}
            onDragOver={(e) => {
              e.preventDefault();
              if (over !== s.id) setOver(s.id);
            }}
            onDragLeave={() => setOver(null)}
            onDrop={(e) => {
              e.preventDefault();
              setOver(null);
              const label = e.dataTransfer.getData('text/plain');
              if (label) place(s.id, label);
            }}
            title={placed[s.id] ? 'Clic para quitar' : 'Suelta aquí una pieza'}
          />
        ))}
      </Diagram>

      {revealed ? (
        <p className="legend-note">El diagrama muestra la solución. En verde, los huecos que acertaste; en rojo, los que fallaste.</p>
      ) : (
        <div className="chip-tray">
          <div className="chip-tray-title">Piezas disponibles</div>
          <div className="chips">
            {pool.map((c) => (
              <button
                key={c}
                className={`chip ${selected === c ? 'selected' : ''}`}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', c);
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onClick={() => setSelected(selected === c ? null : c)}
              >
                {c}
              </button>
            ))}
            {pool.length === 0 && <span className="chip-empty">¡Todas colocadas!</span>}
          </div>
        </div>
      )}
    </Shell>
  );
}
