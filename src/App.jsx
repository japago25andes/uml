import { useEffect, useState } from 'react';
import Welcome from './components/Welcome.jsx';
import Hud from './components/Hud.jsx';
import LevelMap from './components/LevelMap.jsx';
import LevelPlayer from './components/LevelPlayer.jsx';
import Notes from './components/Notes.jsx';
import Badges from './components/Badges.jsx';
import Certificate from './components/Certificate.jsx';
import TimeMachine from './components/TimeMachine.jsx';
import { LEVELS } from './data/levels.js';
import { BADGES, earnedBadges } from './data/game.js';
import { EMPTY_PROGRESS, useProgress } from './lib/progress.js';
import { setMuted, sfx } from './lib/sound.js';

export default function App() {
  const [progress, setProgress] = useProgress();
  const [screen, setScreen] = useState('welcome');
  const [levelId, setLevelId] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [toasts, setToasts] = useState([]);

  useEffect(() => setMuted(progress.muted), [progress.muted]);

  // Concede las insignias en cuanto se cumplen sus condiciones.
  useEffect(() => {
    const fresh = earnedBadges(progress).filter((id) => !progress.badges.includes(id));
    if (!fresh.length) return;
    setProgress((p) => ({ ...p, badges: [...new Set([...p.badges, ...fresh])] }));
    sfx.badge();
    const items = fresh.map((id) => ({ ...BADGES.find((b) => b.id === id), key: `${id}-${Date.now()}` }));
    setToasts((t) => [...t, ...items]);
    setTimeout(() => setToasts((t) => t.filter((x) => !items.includes(x))), 4500);
  }, [progress, setProgress]);

  const levelIndex = LEVELS.findIndex((l) => l.id === levelId);
  const level = LEVELS[levelIndex];

  function play(id) {
    setLevelId(id);
    setAttempt((a) => a + 1);
    setScreen('level');
    window.scrollTo(0, 0);
  }

  function finishLevel(id, { xp, stars }) {
    setProgress((p) => {
      const prev = p.levels[id] || {};
      return {
        ...p,
        levels: {
          ...p.levels,
          [id]: { completed: true, stars: Math.max(prev.stars || 0, stars), bestXp: Math.max(prev.bestXp || 0, xp) },
        },
      };
    });
  }

  function setStreak(n) {
    setProgress((p) => ({ ...p, streak: n, bestStreak: Math.max(p.bestStreak, n) }));
  }

  function reset() {
    if (!window.confirm('¿Seguro que quieres borrar todo tu progreso? Esta acción no se puede deshacer.')) return;
    setProgress(EMPTY_PROGRESS);
    setScreen('welcome');
  }

  const nav = (s) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };

  let content;
  if (screen === 'welcome' || !progress.name) {
    content = (
      <Welcome
        savedName={progress.name}
        onStart={(name) => {
          setProgress((p) => ({ ...p, name }));
          nav('timemachine');
        }}
        onContinue={() => nav(progress.prologueSeen ? 'map' : 'timemachine')}
      />
    );
  } else if (screen === 'timemachine') {
    content = (
      <TimeMachine
        name={progress.name}
        onFinish={() => {
          setProgress((p) => ({ ...p, prologueSeen: true }));
          nav('map');
        }}
      />
    );
  } else if (screen === 'level' && level) {
    const nextLevel = LEVELS[levelIndex + 1];
    content = (
      <LevelPlayer
        key={`${levelId}-${attempt}`}
        level={level}
        streak={progress.streak}
        alreadyDone={progress.levels[levelId]}
        onStreak={setStreak}
        onFinish={(r) => finishLevel(levelId, r)}
        onExit={() => nav('map')}
        onRetry={() => play(levelId)}
        onNext={nextLevel ? () => play(nextLevel.id) : null}
        onCertificate={() => nav('certificate')}
      />
    );
  } else {
    const pages = {
      notes: <Notes onBack={() => nav('map')} />,
      badges: <Badges progress={progress} onBack={() => nav('map')} />,
      certificate: <Certificate progress={progress} onBack={() => nav('map')} />,
    };
    content = (
      <>
        <Hud progress={progress} onNav={nav} onToggleMute={() => setProgress((p) => ({ ...p, muted: !p.muted }))} />
        {pages[screen] || (
          <LevelMap
            progress={progress}
            onPlay={play}
            onCertificate={() => nav('certificate')}
            onTimeMachine={() => nav('timemachine')}
            onReset={reset}
          />
        )}
      </>
    );
  }

  return (
    <div className="app">
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      {content}
      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.key} className="toast">
            <span className="toast-icon">{t.icon}</span>
            <div>
              <div className="toast-title">¡Nueva insignia!</div>
              <div className="toast-name">{t.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
