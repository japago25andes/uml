import { LEVELS } from '../data/levels.js';
import { NEXT_MISSION_URL, isUnlocked } from '../data/game.js';
import { Speech } from './Mascot.jsx';
import { sfx } from '../lib/sound.js';

// Posiciones de los niveles sobre un camino en forma de U (viewBox 1000 × 560).
// La curva derecha llega como máximo a x≈958, así que cabe entera (con su grosor) en el ancho de 1000.
const POS = [
  [125, 130], [375, 130], [625, 130], [875, 130],
  [875, 420], [625, 420], [375, 420], [125, 420],
];
const PATH = 'M125,130 L875,130 C985,130 985,420 875,420 L125,420';

function tipFor(progress, currentIdx) {
  if (currentIdx === -1) return '¡Ya hablas UML! Repite niveles para conseguir **todas las estrellas**, o salta a la siguiente misión: **Casos de Uso**. 👑';
  if (currentIdx === 0) return `¡Bienvenido/a, **${progress.name}**! Empieza por el nivel 1. Cada nivel tiene una lección corta y varios retos.`;
  const lvl = LEVELS[currentIdx];
  return lvl.boss
    ? '¡Ha llegado la hora! El **jefe final** te espera. Demuestra todo lo que has aprendido. 👾'
    : `¡Buen trabajo! Tu siguiente misión: **${lvl.title}**. ¿Necesitas repasar? Abre los **Apuntes**.`;
}

export default function LevelMap({ progress, onPlay, onCertificate, onTimeMachine, onReset }) {
  const currentIdx = LEVELS.findIndex((l, i) => isUnlocked(progress, i) && !progress.levels[l.id]?.completed);

  return (
    <div className="map-screen">
      <Speech mood={currentIdx === -1 ? 'happy' : 'normal'} size={84}>
        {tipFor(progress, currentIdx)}
      </Speech>

      <div className="map">
        <svg viewBox="0 0 1000 560" className="map-path" aria-hidden="true">
          <path d={PATH} className="path-bg" />
          <path d={PATH} className="path-dash" />
        </svg>

        {LEVELS.map((lvl, i) => {
          const unlocked = isUnlocked(progress, i);
          const data = progress.levels[lvl.id];
          const current = i === currentIdx;
          const [x, y] = POS[i];
          return (
            <button
              key={lvl.id}
              className={`node ${unlocked ? '' : 'locked'} ${current ? 'current' : ''} ${data?.completed ? 'done' : ''} ${lvl.boss ? 'boss' : ''}`}
              style={{ left: `${x / 10}%`, top: `${(y / 560) * 100}%`, '--level-color': lvl.color }}
              onClick={() => {
                if (!unlocked) return;
                sfx.click();
                onPlay(lvl.id);
              }}
              disabled={!unlocked}
              title={unlocked ? lvl.title : 'Completa el nivel anterior para desbloquearlo'}
            >
              {current && <span className="node-here">¡Aquí!</span>}
              <span className="node-circle">
                <span className="node-icon">{unlocked ? lvl.icon : '🔒'}</span>
                <span className="node-num">{i + 1}</span>
              </span>
              <span className="node-stars">
                {[1, 2, 3].map((s) => (
                  <span key={s} className={s <= (data?.stars || 0) ? 'on' : ''}>★</span>
                ))}
              </span>
              <span className="node-title">{lvl.title}</span>
              <span className="node-sub">{data?.bestXp ? `${data.bestXp} XP` : lvl.subtitle}</span>
            </button>
          );
        })}
      </div>

      <div className="map-footer">
        <button className="btn btn-ghost" onClick={onTimeMachine}>🕰️ Volver a la máquina del tiempo</button>
        {progress.levels.jefe?.completed && (
          <>
            <button className="btn btn-primary glow" onClick={onCertificate}>🎓 Ver mi certificado</button>
            <a className="btn btn-primary" href={NEXT_MISSION_URL} target="_blank" rel="noreferrer">🎯 Siguiente misión: Casos de Uso</a>
          </>
        )}
        <button className="btn btn-ghost btn-sm danger" onClick={onReset}>Reiniciar progreso</button>
      </div>
    </div>
  );
}
