import { useId } from 'react';
import { UseCaseDiagram, ucElements, ucZone } from './UseCaseDiagram.jsx';
import { ClassDiagram, classZone } from './ClassDiagram.jsx';
import { SequenceDiagram, seqLayout } from './SequenceDiagram.jsx';
import { FlowDiagram, flowZone } from './FlowDiagram.jsx';

/*
  Un único componente <Diagram spec={...}> para todos los diagramas UML del juego.
  spec.kind: 'usecase' (por defecto) | 'class' | 'sequence' | 'flow'
  spec.notes: anotaciones de texto opcionales [{ x, y, text, anchor }]
*/

const RENDERERS = {
  usecase: UseCaseDiagram,
  class: ClassDiagram,
  sequence: SequenceDiagram,
  flow: FlowDiagram,
};

export function sizeOf(spec) {
  if (spec.kind === 'sequence') {
    const { w, h } = seqLayout(spec);
    return { w, h };
  }
  return { w: spec.w, h: spec.h };
}

/** Posición en % de un punto del viewBox, para superponer elementos HTML. */
export function pct(spec, x, y) {
  const { w, h } = sizeOf(spec);
  return { left: `${(x / w) * 100}%`, top: `${(y / h) * 100}%` };
}

/** Elementos que pueden ser huecos (slot) en los retos de construir. */
export function elementsOf(spec) {
  if (spec.kind === 'class') return spec.classes.map((c) => ({ ...c, kind: 'class', label: c.name }));
  if (spec.kind === 'flow') return spec.nodes.map((n) => ({ ...n, kind: 'node' }));
  return ucElements(spec);
}

/** Devuelve una copia del diagrama aplicando fn a cada elemento (con label normalizado). */
export function mapElements(spec, fn) {
  if (spec.kind === 'class')
    return {
      ...spec,
      classes: spec.classes.map((c) => {
        const r = fn({ ...c, label: c.name });
        return { ...r, name: r.label };
      }),
    };
  if (spec.kind === 'flow') return { ...spec, nodes: spec.nodes.map(fn) };
  return { ...spec, actors: (spec.actors || []).map(fn), useCases: (spec.useCases || []).map(fn) };
}

/** Zona clicable de un elemento, en %. */
export function zoneSize(spec, el) {
  const z = el.kind === 'class' ? classZone(el) : el.kind === 'node' ? flowZone(el) : ucZone(el);
  const { w, h } = sizeOf(spec);
  return { ...pct(spec, z.cx, z.cy), width: `${(z.w / w) * 100}%`, height: `${(z.h / h) * 100}%` };
}

function Defs({ uid }) {
  return (
    <defs>
      <marker id={`open-${uid}`} viewBox="0 0 14 14" refX="13" refY="7" markerWidth="14" markerHeight="14" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M1 1 L13 7 L1 13" className="d-arrowhead" />
      </marker>
      <marker id={`filled-${uid}`} viewBox="0 0 14 14" refX="13" refY="7" markerWidth="13" markerHeight="13" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M1 1 L13 7 L1 13 Z" className="d-arrowfill" />
      </marker>
      <marker id={`tri-${uid}`} viewBox="0 0 18 18" refX="17" refY="9" markerWidth="18" markerHeight="18" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M1 1 L17 9 L1 17 Z" className="d-triangle" />
      </marker>
      <marker id={`diamond-${uid}`} viewBox="0 0 22 14" refX="21" refY="7" markerWidth="22" markerHeight="14" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
        <path d="M1 7 L11 1 L21 7 L11 13 Z" className="d-diamond" />
      </marker>
      <marker id={`diamondFill-${uid}`} viewBox="0 0 22 14" refX="21" refY="7" markerWidth="22" markerHeight="14" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
        <path d="M1 7 L11 1 L21 7 L11 13 Z" className="d-diamond filled" />
      </marker>
    </defs>
  );
}

export default function Diagram({ spec, children, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const Renderer = RENDERERS[spec.kind || 'usecase'];
  const { w, h } = sizeOf(spec);
  return (
    <div className={`diagram kind-${spec.kind || 'usecase'} ${className}`}>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Diagrama UML">
        <Defs uid={uid} />
        <Renderer spec={spec} uid={uid} />
        {(spec.notes || []).map((n, i) => (
          <text key={i} x={n.x} y={n.y} textAnchor={n.anchor || 'start'} className="d-note">
            {n.text}
          </text>
        ))}
      </svg>
      {children && <div className="diagram-overlay">{children}</div>}
    </div>
  );
}
