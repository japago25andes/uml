import { useId } from 'react';
import { rich } from '../lib/utils.jsx';

// Ana Lista: la analista senior robot que guía al jugador.
export function Mascot({ mood = 'normal', size = 110 }) {
  const uid = useId().replace(/:/g, '');
  const eyes = {
    normal: (
      <>
        <ellipse cx="46" cy="52" rx="6" ry="8" className="m-eye" />
        <ellipse cx="74" cy="52" rx="6" ry="8" className="m-eye" />
      </>
    ),
    happy: (
      <>
        <path d="M39 55 Q46 45 53 55" className="m-eye-line" />
        <path d="M67 55 Q74 45 81 55" className="m-eye-line" />
      </>
    ),
    sad: (
      <>
        <ellipse cx="46" cy="55" rx="5" ry="6" className="m-eye" />
        <ellipse cx="74" cy="55" rx="5" ry="6" className="m-eye" />
        <path d="M38 44 L52 48" className="m-eye-line" />
        <path d="M82 44 L68 48" className="m-eye-line" />
      </>
    ),
    wow: (
      <>
        <circle cx="46" cy="52" r="8" className="m-eye" />
        <circle cx="74" cy="52" r="8" className="m-eye" />
        <circle cx="48" cy="50" r="2.5" fill="#0f172a" />
        <circle cx="76" cy="50" r="2.5" fill="#0f172a" />
      </>
    ),
  };
  const mouth = {
    normal: <path d="M52 67 Q60 72 68 67" className="m-mouth" />,
    happy: <path d="M49 64 Q60 77 71 64 Z" className="m-mouth filled" />,
    sad: <path d="M52 71 Q60 65 68 71" className="m-mouth" />,
    wow: <ellipse cx="60" cy="69" rx="4.5" ry="5.5" className="m-mouth filled" />,
  };

  return (
    <svg className={`mascot mood-${mood}`} width={size} height={size * 1.08} viewBox="0 0 120 130" aria-hidden="true">
      <defs>
        <linearGradient id={`mg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id={`mb-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#134e4a" />
        </linearGradient>
      </defs>
      <rect x="6" y="46" width="10" height="22" rx="5" fill="#0d9488" />
      <rect x="104" y="46" width="10" height="22" rx="5" fill="#0d9488" />
      <rect x="34" y="94" width="52" height="30" rx="13" fill={`url(#mb-${uid})`} />
      <ellipse cx="60" cy="109" rx="15" ry="7.5" fill="none" stroke="#ccfbf1" strokeWidth="2" />
      <text x="60" y="112" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#ccfbf1">UML</text>
      <rect x="14" y="18" width="92" height="78" rx="28" fill={`url(#mg-${uid})`} />
      <rect x="24" y="31" width="72" height="50" rx="18" fill="#0f172a" />
      <path d="M34,22 Q36,2 60,2 Q84,2 86,22 Z" fill="#b45309" />
      <rect x="35" y="14" width="50" height="6" fill="#451a03" />
      <ellipse cx="60" cy="22" rx="44" ry="6" fill="#92400e" />
      <circle cx="80" cy="16" r="3" className="m-antenna" />
      {eyes[mood] || eyes.normal}
      {mouth[mood] || mouth.normal}
      <circle cx="33" cy="66" r="4" fill="#f472b6" opacity="0.55" />
      <circle cx="87" cy="66" r="4" fill="#f472b6" opacity="0.55" />
    </svg>
  );
}

export function Speech({ mood, children, size = 96, title }) {
  return (
    <div className="speech">
      <Mascot mood={mood} size={size} />
      <div className="bubble">
        {title && <div className="bubble-name">{title}</div>}
        {typeof children === 'string' ? rich(children) : children}
      </div>
    </div>
  );
}
