// Diagramas reutilizables. Coordenadas en el sistema del viewBox (w × h).

// ─────────────── Clases ───────────────
export const CLASS_SINGLE = {
  kind: 'class', w: 640, h: 190,
  classes: [
    {
      id: 'est', x: 150, y: 20, w: 280, name: 'Estudiante',
      attrs: ['- matricula: String', '- nombre: String', '- email: String'],
      ops: ['+ matricular(a: Asignatura): void', '+ consultarNotas(): List'],
    },
  ],
  notes: [
    { x: 445, y: 42, text: '← nombre' },
    { x: 445, y: 90, text: '← atributos' },
    { x: 445, y: 145, text: '← operaciones' },
  ],
};

export const CLASS_REL = {
  kind: 'class', w: 680, h: 312,
  classes: [
    { id: 'per', x: 50, y: 15, w: 200, name: 'Persona', attrs: ['- nombre: String', '- dni: String'] },
    { id: 'pro', x: 50, y: 195, w: 200, name: 'Profesor', attrs: ['- despacho: String'] },
    { id: 'asi', x: 440, y: 195, w: 200, name: 'Asignatura', attrs: ['- codigo: String', '- creditos: int'] },
  ],
  links: [
    { from: 'pro', to: 'per', type: 'gen' },
    { from: 'pro', to: 'asi', type: 'assoc', label: 'imparte', fromMult: '1', toMult: '1..*' },
  ],
  notes: [
    { x: 160, y: 158, text: 'herencia' },
    { x: 345, y: 304, text: 'asociación con multiplicidad', anchor: 'middle' },
  ],
};

export const CLASS_MULT = {
  kind: 'class', w: 640, h: 130,
  classes: [
    { id: 'pro', x: 40, y: 25, w: 170, name: 'Profesor', attrs: ['- nombre: String'] },
    { id: 'asi', x: 430, y: 25, w: 170, name: 'Asignatura', attrs: ['- codigo: String'] },
  ],
  links: [{ from: 'pro', to: 'asi', type: 'assoc', label: 'imparte', fromMult: '1', toMult: '1..*' }],
};

export const CLASS_AGG_COMP = {
  kind: 'class', w: 730, h: 285,
  classes: [
    { id: 'equ', x: 30, y: 20, w: 160, name: 'Equipo', attrs: ['- nombre: String'] },
    { id: 'jug', x: 30, y: 170, w: 160, name: 'Jugador', attrs: ['- dorsal: int'] },
    { id: 'cas', x: 275, y: 20, w: 160, name: 'Casa', attrs: ['- direccion: String'] },
    { id: 'hab', x: 275, y: 170, w: 160, name: 'Habitacion', attrs: ['- metros: double'] },
    { id: 'fac', x: 505, y: 20, w: 205, name: 'Factura', ops: ['+ imprimir(i: Impresora)'] },
    { id: 'imp', x: 505, y: 170, w: 205, name: 'Impresora', ops: ['+ enviar(doc)'] },
  ],
  links: [
    { from: 'equ', to: 'jug', type: 'agg', fromMult: '0..1', toMult: '*' },
    { from: 'cas', to: 'hab', type: 'comp', fromMult: '1', toMult: '1..*' },
    { from: 'fac', to: 'imp', type: 'dep', label: 'usa' },
  ],
  notes: [
    { x: 110, y: 275, text: '◇ Agregación', anchor: 'middle' },
    { x: 355, y: 275, text: '◆ Composición', anchor: 'middle' },
    { x: 607, y: 275, text: '⇢ Dependencia', anchor: 'middle' },
  ],
};

// ─────────────── Secuencia ───────────────
export const SEQ_LOGIN = {
  kind: 'sequence', w: 780, numbered: true,
  participants: [
    { id: 'usr', label: 'Usuario', actor: true },
    { id: 'pan', label: ':Pantalla' },
    { id: 'aut', label: ':Autenticador' },
    { id: 'bd', label: ':BaseDatos' },
  ],
  messages: [
    { from: 'usr', to: 'pan', label: 'ingresar(usuario, clave)' },
    { from: 'pan', to: 'aut', label: 'validar(usuario, clave)' },
    { from: 'aut', to: 'bd', label: 'buscarUsuario(usuario)' },
    { from: 'bd', to: 'aut', label: 'datosUsuario', type: 'reply' },
    { from: 'aut', to: 'pan', label: 'resultado', type: 'reply' },
    { from: 'pan', to: 'usr', label: 'mostrarBienvenida()' },
  ],
};

export const SEQ_TYPES = {
  kind: 'sequence', w: 720, numbered: true,
  participants: [
    { id: 'tie', label: ':Tienda' },
    { id: 'pas', label: ':Pasarela' },
    { id: 'cor', label: ':Correo' },
  ],
  messages: [
    { from: 'tie', to: 'pas', label: 'cobrar(importe)', type: 'sync' },
    { from: 'pas', to: 'tie', label: 'ok', type: 'reply' },
    { from: 'tie', to: 'tie', label: 'registrarVenta()', type: 'sync' },
    { from: 'tie', to: 'cor', label: 'enviarRecibo()', type: 'async' },
  ],
};

export const SEQ_ALT = {
  kind: 'sequence', w: 720, numbered: true,
  participants: [
    { id: 'cli', label: 'Cliente', actor: true },
    { id: 'caj', label: ':Cajero' },
    { id: 'ban', label: ':Banco' },
  ],
  messages: [
    { from: 'cli', to: 'caj', label: 'introducirPIN(pin)' },
    { from: 'caj', to: 'ban', label: 'validarPIN(pin)' },
    { from: 'ban', to: 'caj', label: 'resultado', type: 'reply' },
    { from: 'caj', to: 'cli', label: 'mostrarMenú()' },
    { from: 'caj', to: 'cli', label: 'mostrarError("PIN incorrecto")' },
  ],
  frames: [{ kind: 'alt', start: 3, end: 4, guard: 'PIN correcto', elseAt: 4, elseGuard: 'else' }],
};

export const SEQ_BOOKING = {
  kind: 'sequence', w: 800, numbered: true,
  participants: [
    { id: 'cli', label: 'Cliente', actor: true },
    { id: 'web', label: ':Web' },
    { id: 'pas', label: ':Pasarela' },
    { id: 'cor', label: ':Correo' },
  ],
  messages: [
    { from: 'cli', to: 'web', label: 'reservar(viaje)' },
    { from: 'web', to: 'pas', label: 'cobrar(importe)' },
    { from: 'pas', to: 'web', label: 'ok', type: 'reply' },
    { from: 'web', to: 'cor', label: 'enviarConfirmación()', type: 'async' },
    { from: 'web', to: 'cli', label: 'mostrarReserva()' },
  ],
};

// ─────────────── Actividad y estados ───────────────
export const ACT_PRESTAMO = {
  kind: 'flow', w: 720, h: 450, title: 'Actividad: Prestar libro',
  nodes: [
    { id: 's', type: 'start', x: 330, y: 40 },
    { id: 'a1', type: 'action', x: 330, y: 105, label: 'Buscar libro en el catálogo' },
    { id: 'd', type: 'decision', x: 330, y: 185 },
    { id: 'a2', type: 'action', x: 330, y: 270, label: 'Registrar préstamo' },
    { id: 'a3', type: 'action', x: 570, y: 185, label: 'Ofrecer reserva' },
    { id: 'a4', type: 'action', x: 330, y: 345, label: 'Entregar libro' },
    { id: 'e', type: 'end', x: 330, y: 415 },
  ],
  edges: [
    { from: 's', to: 'a1' },
    { from: 'a1', to: 'd' },
    { from: 'd', to: 'a2', label: '[disponible]', dx: 12, dy: 2, anchor: 'start' },
    { from: 'd', to: 'a3', label: '[no disponible]', dy: -8 },
    { from: 'a2', to: 'a4' },
    { from: 'a4', to: 'e' },
    { from: 'a3', to: 'e', via: [[570, 415]] },
  ],
};

export const STATE_PEDIDO = {
  kind: 'flow', w: 760, h: 330, title: 'Máquina de estados: Pedido',
  nodes: [
    { id: 's', type: 'start', x: 40, y: 100 },
    { id: 'cre', type: 'state', x: 160, y: 100, label: 'Creado' },
    { id: 'pag', type: 'state', x: 390, y: 100, label: 'Pagado' },
    { id: 'env', type: 'state', x: 620, y: 100, label: 'Enviado' },
    { id: 'ent', type: 'state', x: 620, y: 215, label: 'Entregado' },
    { id: 'can', type: 'state', x: 275, y: 215, label: 'Cancelado' },
    { id: 'e', type: 'end', x: 620, y: 295 },
  ],
  edges: [
    { from: 's', to: 'cre' },
    { from: 'cre', to: 'pag', label: 'pagar' },
    { from: 'pag', to: 'env', label: 'enviar' },
    { from: 'env', to: 'ent', label: 'entregar', dx: 10, dy: 4, anchor: 'start' },
    { from: 'cre', to: 'can', label: 'cancelar', dx: -14, anchor: 'end' },
    { from: 'pag', to: 'can', label: 'cancelar [reembolso]', dx: 14, anchor: 'start' },
    { from: 'ent', to: 'e' },
    { from: 'can', to: 'e', via: [[275, 295]] },
  ],
};

export const STATE_RESERVA = {
  kind: 'flow', w: 760, h: 270, title: 'Máquina de estados: Reserva',
  nodes: [
    { id: 's', type: 'start', x: 45, y: 100 },
    { id: 'pen', type: 'state', x: 175, y: 100, label: 'Pendiente' },
    { id: 'con', type: 'state', x: 430, y: 100, label: 'Confirmada' },
    { id: 'com', type: 'state', x: 660, y: 100, label: 'Completada' },
    { id: 'can', type: 'state', x: 300, y: 220, label: 'Cancelada' },
  ],
  edges: [
    { from: 's', to: 'pen' },
    { from: 'pen', to: 'con', label: 'pagar' },
    { from: 'con', to: 'com', label: 'viajar' },
    { from: 'pen', to: 'can', label: 'caducar', dx: -12, anchor: 'end' },
    { from: 'con', to: 'can', label: 'cancelar [> 48 h antes]', dx: 14, anchor: 'start' },
  ],
};

// ─────────────── Casos de uso (avance de la siguiente misión) ───────────────
export const UC_PREVIEW = {
  kind: 'usecase', w: 600, h: 250,
  boundary: { x: 180, y: 15, w: 400, h: 220, title: 'Sistema de biblioteca' },
  actors: [{ id: 'est', x: 80, y: 115, label: 'Estudiante' }],
  useCases: [
    { id: 'b', x: 380, y: 80, label: 'Buscar libro' },
    { id: 'r', x: 380, y: 175, label: 'Reservar libro' },
  ],
  links: [
    { from: 'est', to: 'b', type: 'assoc' },
    { from: 'est', to: 'r', type: 'assoc' },
  ],
};
