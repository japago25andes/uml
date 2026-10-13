import { useEffect, useRef, useState } from 'react';
import { SCENES } from '../data/timeline.js';
import SceneArt from './SceneArt.jsx';
import { Mascot, Speech } from './Mascot.jsx';
import { rich } from '../lib/utils.jsx';
import { sfx } from '../lib/sound.js';

const WARP_MS = 1300;
const NOW = new Date().getFullYear();
const yearOf = (s) => (s.current ? NOW : s.year);

function fmtYear(y) {
  const r = Math.round(y);
  return r < 0 ? `${Math.abs(r).toLocaleString('es-ES')} a. C.` : String(r);
}

export default function TimeMachine({ name, onFinish }) {
  const [idx, setIdx] = useState(-1);
  const [warping, setWarping] = useState(false);
  const [display, setDisplay] = useState(NOW);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function travel(to) {
    if (warping) return;
    if (to >= SCENES.length) {
      sfx.win();
      onFinish();
      return;
    }
    const from = display;
    const target = yearOf(SCENES[to]);
    const t0 = performance.now();
    setWarping(true);
    sfx.warp();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / WARP_MS);
      const ease = k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2;
      setDisplay(from + (target - from) * ease);
      if (k < 1) raf.current = requestAnimationFrame(step);
      else {
        setIdx(to);
        setWarping(false);
        sfx.land();
      }
    };
    raf.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') travel(idx + 1);
      if (e.key === 'ArrowLeft' && idx > 0) travel(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const scene = SCENES[idx];
  const last = idx === SCENES.length - 1;

  return (
    <div className={`tm ${warping ? 'is-warping' : ''}`}>
      <header className="tm-top">
        <div className="tm-brand">🕰️ Máquina del tiempo</div>
        <div className="tm-dial">
          <div className="tm-year">{fmtYear(display)}</div>
          <div className="tm-when">{scene && !warping ? `${scene.when} · ${scene.place}` : warping ? 'Viajando…' : 'Listos para despegar'}</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onFinish}>
          Saltar viaje ⏭
        </button>
      </header>

      <div className="tm-track">
        {SCENES.map((s, i) => (
          <span key={i} className={`tm-stop ${i === idx ? 'active' : ''} ${i < idx ? 'seen' : ''}`} title={s.when} />
        ))}
      </div>

      {warping && <div className="warp" aria-hidden="true" />}

      {idx === -1 && !warping && (
        <div className="tm-intro">
          <Mascot mood="wow" size={170} />
          <h1 className="title-xl">
            ¿Lista la <span className="gradient-text">máquina del tiempo</span>, {name}?
          </h1>
          <p className="lead">
            {rich('Antes de aprender UML vamos a descubrir algo: **la humanidad lleva milenios comunicándose con dibujos**. Abróchate el cinturón.')}
          </p>
          <button className="btn btn-primary btn-lg glow" onClick={() => travel(0)} autoFocus>
            ¡Iniciar el viaje! 🚀
          </button>
        </div>
      )}

      {scene && !warping && (
        <div className="tm-stage" key={idx}>
          <div className="tm-art">
            <SceneArt art={scene.art} />
          </div>
          <div className="tm-info">
            <div className="tm-chapter">
              Parada {idx + 1} de {SCENES.length}
            </div>
            <h2>{scene.title}</h2>
            <p className="tm-text">{rich(scene.text)}</p>
            <Speech mood={scene.mood} size={78}>
              {scene.ana}
            </Speech>
          </div>
        </div>
      )}

      {scene && !warping && (
        <div className="tm-nav">
          <button className="btn btn-ghost" onClick={() => travel(idx - 1)} disabled={idx === 0}>
            ← Volver atrás
          </button>
          <button className="btn btn-primary btn-lg glow" onClick={() => travel(idx + 1)}>
            {last ? '¡Empezar la misión! 🚀' : 'Viajar en el tiempo →'}
          </button>
        </div>
      )}
    </div>
  );
}
