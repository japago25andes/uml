import { rich } from '../../lib/utils.jsx';

const KINDS = {
  quiz: { label: 'Pregunta', icon: '❓' },
  pick: { label: 'Selección múltiple', icon: '☑️' },
  classify: { label: 'Clasifica', icon: '🗂️' },
  order: { label: 'Ordena', icon: '🔢' },
  builder: { label: 'Construye', icon: '🧩' },
  spot: { label: 'Encuentra errores', icon: '🕵️' },
};

export default function Shell({ challenge, children, canCheck, revealed, onCheck, actionHint }) {
  const kind = KINDS[challenge.type];
  return (
    <div className={`challenge type-${challenge.type}`}>
      <div className="ch-kind">
        <span>{kind.icon}</span> {kind.label}
      </div>
      <h2 className="ch-question">{challenge.question}</h2>
      {challenge.story && <div className="story">📖 {rich(challenge.story)}</div>}
      {challenge.hint && <p className="ch-hint">{challenge.hint}</p>}
      {children}
      {onCheck && !revealed && (
        <div className="ch-actions">
          {actionHint && !canCheck && <span className="ch-action-hint">{actionHint}</span>}
          <button className="btn btn-primary btn-lg" disabled={!canCheck} onClick={onCheck}>
            Comprobar
          </button>
        </div>
      )}
    </div>
  );
}
