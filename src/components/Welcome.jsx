import { useState } from 'react';
import { Speech } from './Mascot.jsx';
import { sfx } from '../lib/sound.js';

export default function Welcome({ savedName, onStart, onContinue, onLoadFile }) {
  const [name, setName] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    sfx.win();
    onStart(name.trim());
  }

  return (
    <div className="welcome">
      <div className="welcome-hero">
        <div className="logo-badge">
          <span>UML</span>
        </div>
        <p className="eyebrow">UML Quest</p>
        <h1 className="title-xl">
          Misión: <span className="gradient-text">UML</span>
        </h1>
        <p className="lead">
          Desde las pinturas de las cavernas hasta los diagramas del software: descubre por qué la humanidad dibuja para
          entenderse y aprende a hablar el idioma visual de los programadores… ¡jugando!
        </p>
      </div>

      <div className="welcome-card">
        <Speech mood="happy" size={120} title="Ana Lista · Analista senior en NubeLab">
          ¡Hola! Acabas de entrar como **becario/a** en **NubeLab**. Antes de construir software tienes que aprender a **dibujarlo**. Para eso vamos a hacer un **viaje en el tiempo** de 36.000 años y después superar **8 niveles**. ¿Te apuntas?
        </Speech>

        {savedName ? (
          <div className="welcome-actions">
            <button className="btn btn-primary btn-lg glow" onClick={onContinue}>
              Continuar como {savedName} →
            </button>
          </div>
        ) : (
          <form className="welcome-form" onSubmit={submit}>
            <label htmlFor="player-name">¿Cómo te llamas?</label>
            <div className="input-row">
              <input
                id="player-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                maxLength={40}
                autoFocus
                autoComplete="off"
              />
              <button className="btn btn-primary btn-lg glow" disabled={!name.trim()}>
                ¡Subir a la máquina del tiempo! 🕰️
              </button>
            </div>
          </form>
        )}

        <div className="welcome-load">
          <button type="button" className="link-btn" onClick={onLoadFile}>
            📂 ¿Vienes de otro equipo? Carga tu archivo de progreso
          </button>
        </div>

        <div className="feature-row">
          <div>🕰️<span>Viaje en el tiempo</span></div>
          <div>🗺️<span>8 niveles</span></div>
          <div>🏅<span>12 insignias</span></div>
          <div>🎓<span>Certificado final</span></div>
        </div>
      </div>
    </div>
  );
}
