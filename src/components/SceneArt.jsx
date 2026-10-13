// Ilustraciones de cada época de la máquina del tiempo (CSS + SVG + emoji).

function Cave() {
  const paints = [
    { e: '🐎', x: 14, y: 22, s: 64, r: -6 },
    { e: '🦬', x: 46, y: 14, s: 78, r: 4 },
    { e: '🦏', x: 24, y: 56, s: 70, r: 2 },
    { e: '🐆', x: 60, y: 52, s: 66, r: -4 },
    { e: '🦌', x: 78, y: 20, s: 54, r: 8 },
  ];
  return (
    <div className="art art-cave">
      <div className="torch" />
      {paints.map((p, i) => (
        <span key={i} className="paint" style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.s, transform: `rotate(${p.r}deg)`, animationDelay: `${0.3 + i * 0.25}s` }}>
          {p.e}
        </span>
      ))}
      <span className="paint hand" style={{ left: '82%', top: '62%', animationDelay: '1.6s' }}>✋</span>
      <svg className="ochre-dots" viewBox="0 0 100 60" preserveAspectRatio="none">
        {[...Array(14)].map((_, i) => (
          <circle key={i} cx={6 + i * 6.5} cy={52 + Math.sin(i) * 3} r={1.3} />
        ))}
      </svg>
    </div>
  );
}

function Egypt() {
  const rows = ['𓀀 𓁐 𓃭 𓅓 𓆓 𓇋', '𓈖 𓊃 𓋴 𓌳 𓂝 𓄿', '𓅱 𓆑 𓇳 𓂀 𓆣 𓋹'];
  return (
    <div className="art art-egypt">
      <div className="sun">☀️</div>
      <div className="glyph-rows">
        {rows.map((r, i) => (
          <div key={i} className="glyph-row" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
            {r}
          </div>
        ))}
      </div>
      <div className="cartouche">𓂀 𓆣 𓇳 𓋹</div>
    </div>
  );
}

function BabylonMap() {
  const tri = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <div className="art art-map">
      <svg viewBox="0 0 300 300" className="clay-map">
        <g className="tri">
          {tri.map((a) => (
            <path key={a} d="M150,18 L136,50 L164,50 Z" transform={`rotate(${a} 150 150)`} />
          ))}
        </g>
        <circle cx="150" cy="150" r="100" className="ocean" />
        <circle cx="150" cy="150" r="80" className="land" />
        <path d="M140,70 C135,120 160,170 145,230" className="river" />
        <path d="M152,70 C147,120 172,170 157,230" className="river" />
        <rect x="128" y="112" width="50" height="22" rx="3" className="city-main" />
        <text x="153" y="127" textAnchor="middle" className="map-label">Babilonia</text>
        {[[110, 175], [195, 165], [185, 95], [105, 105], [150, 200]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" className="city" />
        ))}
      </svg>
      <div className="compass">🧭</div>
    </div>
  );
}

function Music() {
  const notes = [
    { x: 70, y: 112, s: 'UT' },
    { x: 125, y: 101, s: 'RE' },
    { x: 180, y: 90, s: 'MI' },
    { x: 235, y: 79, s: 'FA' },
    { x: 290, y: 68, s: 'SOL' },
    { x: 345, y: 57, s: 'LA' },
  ];
  return (
    <div className="art art-music">
      <svg viewBox="0 0 400 190" className="staff">
        {[46, 68, 90, 112].map((y, i) => (
          <line key={y} x1="20" y1={y} x2="380" y2={y} className={i === 1 ? 'red' : i === 3 ? 'yellow' : ''} />
        ))}
        {notes.map((n, i) => (
          <g key={i} className="neume" style={{ animationDelay: `${0.3 + i * 0.2}s` }}>
            <rect x={n.x - 9} y={n.y - 9} width="18" height="18" />
            <text x={n.x} y={160} textAnchor="middle">{n.s}</text>
          </g>
        ))}
      </svg>
      <div className="music-float">🎼 ♪ ♫</div>
    </div>
  );
}

function Blueprint() {
  return (
    <div className="art art-blueprint">
      <svg viewBox="0 0 400 260" className="plan">
        <rect x="40" y="30" width="300" height="180" className="wall" />
        <line x1="190" y1="30" x2="190" y2="130" className="wall" />
        <line x1="40" y1="130" x2="150" y2="130" className="wall" />
        <line x1="230" y1="130" x2="340" y2="130" className="wall" />
        <path d="M150,130 A40,40 0 0 1 190,170" className="door" />
        <line x1="150" y1="130" x2="150" y2="170" className="thin" />
        <line x1="95" y1="30" x2="135" y2="30" className="window" />
        <line x1="250" y1="210" x2="300" y2="210" className="window" />
        <text x="115" y="85" textAnchor="middle" className="room">SALÓN</text>
        <text x="265" y="85" textAnchor="middle" className="room">COCINA</text>
        <text x="190" y="180" textAnchor="middle" className="room">PASILLO</text>
        <line x1="40" y1="232" x2="340" y2="232" className="dim" />
        <line x1="40" y1="226" x2="40" y2="238" className="dim" />
        <line x1="340" y1="226" x2="340" y2="238" className="dim" />
        <text x="190" y="248" textAnchor="middle" className="dim-text">8,50 m</text>
        <rect x="290" y="236" width="100" height="20" className="thin" />
        <text x="340" y="250" textAnchor="middle" className="dim-text small">PLANTA · E 1:100</text>
      </svg>
    </div>
  );
}

function Chaos() {
  const methods = [
    { t: 'Booch', x: 8, y: 12, shape: 'cloud' },
    { t: 'OMT', x: 60, y: 8, shape: 'box' },
    { t: 'OOSE', x: 36, y: 40, shape: 'oval' },
    { t: 'Shlaer-Mellor', x: 66, y: 46, shape: 'chip' },
    { t: 'Coad-Yourdon', x: 4, y: 64, shape: 'chip' },
    { t: 'Fusion', x: 44, y: 76, shape: 'chip' },
    { t: 'Wirfs-Brock', x: 72, y: 78, shape: 'chip' },
    { t: 'Martin-Odell', x: 10, y: 40, shape: 'chip' },
  ];
  return (
    <div className="art art-chaos">
      {methods.map((m, i) => (
        <div key={m.t} className={`method ${m.shape}`} style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${i * 0.17}s` }}>
          {m.shape === 'box' ? (
            <div className="omt-box">
              <b>{m.t}</b>
              <span />
              <span />
            </div>
          ) : (
            m.t
          )}
        </div>
      ))}
      <span className="q q1">?</span>
      <span className="q q2">?</span>
      <span className="q q3">?</span>
      <div className="chaos-count">50+ métodos</div>
    </div>
  );
}

function Amigos() {
  const people = [
    { i: 'GB', n: 'Grady Booch', m: 'Booch' },
    { i: 'JR', n: 'James Rumbaugh', m: 'OMT' },
    { i: 'IJ', n: 'Ivar Jacobson', m: 'OOSE' },
  ];
  return (
    <div className="art art-amigos">
      <div className="amigos-row">
        {people.map((p, k) => (
          <div key={p.i} className="amigo" style={{ animationDelay: `${0.2 + k * 0.25}s` }}>
            <div className="avatar">{p.i}</div>
            <div className="amigo-name">{p.n}</div>
            <div className="amigo-method">{p.m}</div>
          </div>
        ))}
      </div>
      <div className="converge">⬇ ⬇ ⬇</div>
      <div className="uml-pill">UML</div>
    </div>
  );
}

function UmlBirth() {
  const versions = [
    ['1997', 'UML 1.1'],
    ['2005', 'UML 2.0'],
    ['2017', 'UML 2.5.1'],
  ];
  return (
    <div className="art art-uml">
      <div className="uml-big">UML</div>
      <div className="uml-sub">Unified Modeling Language</div>
      <div className="versions">
        {versions.map(([y, v], i) => (
          <div key={y} className="version" style={{ animationDelay: `${0.5 + i * 0.3}s` }}>
            <b>{y}</b>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div className="std-badges">
        <span>OMG</span>
        <span>ISO/IEC 19505</span>
      </div>
    </div>
  );
}

function Today() {
  return (
    <div className="art art-today">
      <div className="thumbs">
        <div className="thumb">
          <svg viewBox="0 0 100 70">
            <rect x="20" y="8" width="60" height="54" rx="4" />
            <line x1="20" y1="24" x2="80" y2="24" />
            <line x1="20" y1="42" x2="80" y2="42" />
          </svg>
          <span>Clases</span>
        </div>
        <div className="thumb">
          <svg viewBox="0 0 100 70">
            <rect x="8" y="6" width="30" height="12" rx="2" />
            <rect x="62" y="6" width="30" height="12" rx="2" />
            <line x1="23" y1="18" x2="23" y2="66" strokeDasharray="3 3" />
            <line x1="77" y1="18" x2="77" y2="66" strokeDasharray="3 3" />
            <line x1="23" y1="32" x2="74" y2="32" />
            <line x1="77" y1="48" x2="26" y2="48" strokeDasharray="4 3" />
          </svg>
          <span>Secuencia</span>
        </div>
        <div className="thumb">
          <svg viewBox="0 0 100 70">
            <circle cx="18" cy="20" r="6" />
            <line x1="18" y1="26" x2="18" y2="44" />
            <line x1="8" y1="32" x2="28" y2="32" />
            <line x1="18" y1="44" x2="10" y2="58" />
            <line x1="18" y1="44" x2="26" y2="58" />
            <ellipse cx="68" cy="35" rx="26" ry="13" />
            <line x1="28" y1="34" x2="42" y2="35" />
          </svg>
          <span>Casos de uso</span>
        </div>
        <div className="thumb">
          <svg viewBox="0 0 100 70">
            <circle cx="50" cy="8" r="5" className="fill" />
            <rect x="28" y="18" width="44" height="14" rx="7" />
            <path d="M50,38 L58,46 L50,54 L42,46 Z" />
            <line x1="50" y1="13" x2="50" y2="18" />
            <line x1="50" y1="32" x2="50" y2="38" />
            <line x1="50" y1="54" x2="50" y2="62" />
          </svg>
          <span>Actividad</span>
        </div>
      </div>
      <div className="today-msg">🌍 Un idioma visual común</div>
    </div>
  );
}

const ARTS = { cave: Cave, egypt: Egypt, map: BabylonMap, music: Music, blueprint: Blueprint, chaos: Chaos, amigos: Amigos, uml: UmlBirth, today: Today };

export default function SceneArt({ art }) {
  const Art = ARTS[art];
  return Art ? <Art /> : null;
}
