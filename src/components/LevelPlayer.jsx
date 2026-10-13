import { useState } from 'react';
import Lesson from './Lesson.jsx';
import { Mascot } from './Mascot.jsx';
import Quiz from './challenges/Quiz.jsx';
import Pick from './challenges/Pick.jsx';
import Classify from './challenges/Classify.jsx';
import Order from './challenges/Order.jsx';
import Spot from './challenges/Spot.jsx';
import Builder from './challenges/Builder.jsx';
import { MAX_HEARTS, NEXT_MISSION_URL, STAR_BONUS, STREAK_CAP, STREAK_STEP } from '../data/game.js';
import { celebrate, rich, sparkle } from '../lib/utils.jsx';
import { sfx } from '../lib/sound.js';

const COMPONENTS = { quiz: Quiz, pick: Pick, classify: Classify, order: Order, spot: Spot, builder: Builder };
const PRAISE = ['¡Excelente!', '¡Bien hecho!', '¡Así se hace!', '¡Impecable!', '¡Crack!', '¡Brillante!'];

export default function LevelPlayer({ level, streak, onStreak, onFinish, onExit, onRetry, onNext, onCertificate, alreadyDone }) {
  const [phase, setPhase] = useState('lesson');
  const [idx, setIdx] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [xp, setXp] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);

  const total = level.challenges.length;
  const challenge = level.challenges[idx];
  const base = level.boss ? 150 : 100;
  const Component = challenge && COMPONENTS[challenge.type];

  function handleCheck(fraction) {
    const correct = fraction > 0.999;
    let gained;
    if (correct) {
      const bonus = Math.min(streak, STREAK_CAP) * STREAK_STEP;
      gained = base + bonus;
      onStreak(streak + 1);
      sfx.correct();
      sparkle();
      setFeedback({ correct, fraction, gained, bonus, title: PRAISE[Math.floor(Math.random() * PRAISE.length)] });
    } else {
      gained = Math.round(base * fraction * 0.5);
      onStreak(0);
      setHearts((h) => h - 1);
      setMistakes((m) => m + 1);
      sfx.wrong();
      setFeedback({ correct, fraction, gained, title: fraction >= 0.5 ? '¡Casi!' : 'No exactamente…' });
    }
    setXp((x) => x + gained);
  }

  function next() {
    setFeedback(null);
    if (hearts <= 0) {
      sfx.fail();
      setPhase('failed');
      return;
    }
    if (idx + 1 < total) {
      setIdx(idx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const stars = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
    const finalXp = xp + stars * STAR_BONUS;
    setResult({ stars, xp: finalXp, prevBest: alreadyDone?.bestXp || 0 });
    setPhase('results');
    onFinish({ xp: finalXp, stars });
    sfx.win();
    celebrate();
  }

  function exit() {
    if (phase === 'play' && !window.confirm('¿Salir del nivel? Perderás el progreso de este intento.')) return;
    onExit();
  }

  return (
    <div className="player" style={{ '--level-color': level.color }}>
      <header className="player-bar">
        <button className="btn btn-ghost btn-icon" onClick={exit} title="Volver al mapa">
          ✕
        </button>
        <div className="player-title">
          <span className="player-icon">{level.icon}</span>
          <span>{level.title}</span>
        </div>
        {phase === 'play' && (
          <>
            <div className="progress">
              <div className="progress-fill" style={{ width: `${((idx + (feedback ? 1 : 0)) / total) * 100}%` }} />
            </div>
            <div className="stat" title="Racha de aciertos">🔥 {streak}</div>
            <div className="stat" title="XP en este nivel">⚡ {xp}</div>
            <div className="hearts" title="Vidas">
              {[...Array(MAX_HEARTS)].map((_, i) => (
                <span key={i} className={`heart ${i < hearts ? '' : 'lost'}`}>❤️</span>
              ))}
            </div>
          </>
        )}
      </header>

      <main className={`player-main ${feedback ? 'with-feedback' : ''}`}>
        {phase === 'lesson' && <Lesson level={level} onDone={() => setPhase('play')} canSkip={!!alreadyDone?.completed} />}

        {phase === 'play' && (
          <div className="play-area">
            <div className="ch-counter">
              Reto {idx + 1} de {total}
              {level.boss && <span className="boss-tag">👾 JEFE FINAL</span>}
            </div>
            <Component key={idx} challenge={challenge} revealed={!!feedback} onCheck={handleCheck} />
          </div>
        )}

        {phase === 'results' && result && (
          <div className="results">
            <Mascot mood="happy" size={140} />
            <h1>¡Nivel completado!</h1>
            <div className="stars-big">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`star ${s <= result.stars ? 'on' : ''}`} style={{ animationDelay: `${s * 0.25}s` }}>
                  ★
                </span>
              ))}
            </div>
            <div className="results-stats">
              <div><strong>{result.xp}</strong><span>XP conseguidos</span></div>
              <div><strong>{mistakes}</strong><span>errores</span></div>
              <div><strong>+{result.stars * STAR_BONUS}</strong><span>bonus estrellas</span></div>
            </div>
            {result.prevBest > 0 && (
              <p className="muted">
                {result.xp > result.prevBest
                  ? `¡Nuevo récord! Superaste tu mejor marca de ${result.prevBest} XP.`
                  : `Tu mejor marca en este nivel sigue siendo ${result.prevBest} XP.`}
              </p>
            )}
            <div className="results-actions">
              <button className="btn btn-ghost" onClick={onRetry}>↻ Repetir</button>
              <button className="btn btn-ghost" onClick={onExit}>🗺️ Mapa</button>
              {onNext && <button className="btn btn-primary btn-lg glow" onClick={onNext}>Siguiente nivel →</button>}
              {level.boss && <button className="btn btn-primary btn-lg glow" onClick={onCertificate}>🎓 Ver certificado</button>}
              {level.boss && (
                <a className="btn btn-primary btn-lg" href={NEXT_MISSION_URL} target="_blank" rel="noreferrer">
                  🎯 Siguiente misión: Casos de Uso
                </a>
              )}
            </div>
          </div>
        )}

        {phase === 'failed' && (
          <div className="results">
            <Mascot mood="sad" size={140} />
            <h1>Te quedaste sin vidas</h1>
            <div className="bubble solo">
              {rich('¡No pasa nada! Equivocarse es parte de aprender. Repasa la lección y vuelve a intentarlo: **cada intento te hace mejor analista**.')}
            </div>
            <div className="results-actions">
              <button className="btn btn-ghost" onClick={onExit}>🗺️ Mapa</button>
              <button className="btn btn-primary btn-lg glow" onClick={onRetry}>↻ Reintentar</button>
            </div>
          </div>
        )}
      </main>

      {feedback && (
        <div className={`feedback ${feedback.correct ? 'ok' : 'bad'}`}>
          <div className="feedback-inner">
            <div className="feedback-icon">{feedback.correct ? '✓' : '✗'}</div>
            <div className="feedback-text">
              <h3>
                {feedback.title}
                {feedback.gained > 0 && <span className="xp-pop">+{feedback.gained} XP</span>}
                {feedback.bonus > 0 && <span className="streak-pop">🔥 bonus racha +{feedback.bonus}</span>}
                {!feedback.correct && <span className="heart-pop">−1 ❤️</span>}
              </h3>
              <p>{rich(challenge.explanation)}</p>
            </div>
            <button className="btn btn-lg feedback-btn" onClick={next} autoFocus>
              {hearts <= 0 ? 'Ver resultado' : idx + 1 < total ? 'Continuar →' : 'Terminar nivel 🏁'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
