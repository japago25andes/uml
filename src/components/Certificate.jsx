import { MAX_STARS, rankFor, totalStars, totalXp } from '../data/game.js';
import { BADGES } from '../data/game.js';
import { Mascot } from './Mascot.jsx';

export default function Certificate({ progress, onBack }) {
  const xp = totalXp(progress);
  const { current } = rankFor(xp);
  const date = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="page">
      <div className="page-head no-print">
        <button className="btn btn-ghost" onClick={onBack}>← Mapa</button>
        <h1>🎓 Certificado</h1>
        <button className="btn btn-primary" onClick={() => window.print()}>🖨️ Imprimir / PDF</button>
      </div>

      <div className="certificate">
        <div className="cert-inner">
          <div className="cert-top">
            <Mascot mood="happy" size={80} />
            <div>
              <div className="cert-org">NubeLab · Academia de Analistas</div>
              <div className="cert-kicker">Certificado de misión cumplida</div>
            </div>
          </div>
          <p className="cert-intro">Se certifica que</p>
          <h2 className="cert-name">{progress.name}</h2>
          <p className="cert-text">
            ha completado con éxito <b>Misión: UML</b>, demostrando conocer la historia y el propósito de UML, sus 14
            tipos de diagramas, y la lectura y construcción de diagramas de clases, secuencia, actividad y estados.
          </p>
          <div className="cert-stats">
            <div><strong>{current.icon} {current.name}</strong><span>Rango</span></div>
            <div><strong>{xp}</strong><span>XP totales</span></div>
            <div><strong>{totalStars(progress)}/{MAX_STARS}</strong><span>Estrellas</span></div>
            <div><strong>{progress.badges.length}/{BADGES.length}</strong><span>Insignias</span></div>
          </div>
          <div className="cert-foot">
            <div>
              <div className="cert-sign">Ana Lista</div>
              <div className="cert-role">Analista senior · Mentora</div>
            </div>
            <div className="cert-date">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
