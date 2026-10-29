// Pixel canvas → crisp SVG. Every visible mark in the README art goes through
// this file: one art pixel is one SVG user unit, same-colour pixels are merged
// into rectangles, and each colour becomes a single <path>. No fonts, no
// scripts, no external references, so GitHub renders it exactly as drawn.

// GitHub dark-mode tokens plus four accents. Nothing outside this list.
export const C = {
  void: '#010409',
  bg: '#0d1117',
  panel: '#161b22',
  raised: '#21262d',
  line: '#30363d',
  mute: '#484f58',
  dim: '#6e7681',
  gray: '#8b949e',
  text: '#c9d1d9',
  bright: '#f0f6fc',
  g0: '#0e4429',
  g1: '#006d32',
  g2: '#26a641',
  g3: '#39d353',
  btn: '#238636',
  blue: '#58a6ff',
  blueDk: '#1f6feb',
  amber: '#e3b341',
  amberDk: '#9e6a03',
  purple: '#bc8cff',
  purpleDk: '#8957e5',
  red: '#f85149',
  skin: '#e8b48a',
  skinDk: '#c28560',
  hair: '#3b2a20',
  night: '#0b1d33',
};

// 5x7 bitmap font. Rows 0-6 sit on the baseline; g j p q y carry two extra
// descender rows. '#' is ink. Drawn for this project, not traced from a font.
const G = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  G: ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.####'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['.###.', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  N: ['#...#', '#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '#.#.#', '.#.#.'],
  X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  a: ['.....', '.....', '.###.', '....#', '.####', '#...#', '.####'],
  b: ['#....', '#....', '####.', '#...#', '#...#', '#...#', '####.'],
  c: ['.....', '.....', '.###.', '#....', '#....', '#...#', '.###.'],
  d: ['....#', '....#', '.####', '#...#', '#...#', '#...#', '.####'],
  e: ['.....', '.....', '.###.', '#...#', '#####', '#....', '.###.'],
  f: ['..##.', '.#...', '.#...', '###..', '.#...', '.#...', '.#...'],
  g: ['.....', '.....', '.####', '#...#', '#...#', '#...#', '.####', '....#', '.###.'],
  h: ['#....', '#....', '#.##.', '##..#', '#...#', '#...#', '#...#'],
  i: ['..#..', '.....', '.##..', '..#..', '..#..', '..#..', '.###.'],
  j: ['...#.', '.....', '..##.', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  k: ['#....', '#....', '#..#.', '#.#..', '##...', '#.#..', '#..#.'],
  l: ['.##..', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  m: ['.....', '.....', '##.#.', '#.#.#', '#.#.#', '#.#.#', '#...#'],
  n: ['.....', '.....', '#.##.', '##..#', '#...#', '#...#', '#...#'],
  o: ['.....', '.....', '.###.', '#...#', '#...#', '#...#', '.###.'],
  p: ['.....', '.....', '####.', '#...#', '#...#', '#...#', '####.', '#....', '#....'],
  q: ['.....', '.....', '.####', '#...#', '#...#', '#...#', '.####', '....#', '....#'],
  r: ['.....', '.....', '#.##.', '##..#', '#....', '#....', '#....'],
  s: ['.....', '.....', '.####', '#....', '.###.', '....#', '####.'],
  t: ['.#...', '.#...', '###..', '.#...', '.#...', '.#..#', '..##.'],
  u: ['.....', '.....', '#...#', '#...#', '#...#', '#..##', '.##.#'],
  v: ['.....', '.....', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  w: ['.....', '.....', '#...#', '#...#', '#.#.#', '#.#.#', '.#.#.'],
  x: ['.....', '.....', '#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
  y: ['.....', '.....', '#...#', '#...#', '#...#', '#...#', '.####', '....#', '.###.'],
  z: ['.....', '.....', '#####', '...#.', '..#..', '.#...', '#####'],
  0: ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  3: ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'],
  4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  5: ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  6: ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
  7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  8: ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  9: ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
  ' ': ['...', '...', '...', '...', '...', '...', '...'],
  '.': ['.', '.', '.', '.', '.', '.', '#'],
  ',': ['..', '..', '..', '..', '..', '.#', '#.'],
  ':': ['.', '.', '#', '.', '.', '#', '.'],
  ';': ['..', '..', '.#', '..', '..', '.#', '#.'],
  '!': ['#', '#', '#', '#', '#', '.', '#'],
  '?': ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
  "'": ['#', '#', '.', '.', '.', '.', '.'],
  '"': ['#.#', '#.#', '...', '...', '...', '...', '...'],
  '-': ['....', '....', '....', '####', '....', '....', '....'],
  _: ['.....', '.....', '.....', '.....', '.....', '.....', '#####'],
  '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
  '=': ['....', '....', '####', '....', '####', '....', '....'],
  '*': ['.....', '#.#.#', '.###.', '#####', '.###.', '#.#.#', '.....'],
  '/': ['....#', '....#', '...#.', '..#..', '.#...', '#....', '#....'],
  '\\': ['#....', '#....', '.#...', '..#..', '...#.', '....#', '....#'],
  '|': ['#', '#', '#', '#', '#', '#', '#'],
  '(': ['..#', '.#.', '#..', '#..', '#..', '.#.', '..#'],
  ')': ['#..', '.#.', '..#', '..#', '..#', '.#.', '#..'],
  '[': ['###', '#..', '#..', '#..', '#..', '#..', '###'],
  ']': ['###', '..#', '..#', '..#', '..#', '..#', '###'],
  '<': ['...#', '..#.', '.#..', '#...', '.#..', '..#.', '...#'],
  '>': ['#...', '.#..', '..#.', '...#', '..#.', '.#..', '#...'],
  '#': ['.#.#.', '.#.#.', '#####', '.#.#.', '#####', '.#.#.', '.#.#.'],
  '@': ['.###.', '#...#', '#.###', '#.#.#', '#.###', '#....', '.####'],
  '&': ['.##..', '#..#.', '#.#..', '.#...', '#.#.#', '#..#.', '.##.#'],
  '%': ['##...', '##..#', '...#.', '..#..', '.#...', '#..##', '...##'],
  '$': ['..#..', '.####', '#.#..', '.###.', '..#.#', '####.', '..#..'],
  '~': ['.....', '.....', '.#...', '#.#.#', '...#.', '.....', '.....'],
  '·': ['.', '.', '.', '#', '.', '.', '.'],
  '▶': ['#...', '##..', '###.', '####', '###.', '##..', '#...'],
  '◀': ['...#', '..##', '.###', '####', '.###', '..##', '...#'],
  '▼': ['.......', '#######', '.#####.', '..###..', '...#...', '.......', '.......'],
  '◆': ['.....', '..#..', '.###.', '#####', '.###.', '..#..', '.....'],
  '●': ['.....', '.###.', '#####', '#####', '#####', '.###.', '.....'],
  '★': ['..#..', '..#..', '#####', '.###.', '.###.', '##.##', '#...#'],
  '♥': ['.....', '##.##', '#####', '#####', '.###.', '..#..', '.....'],
  '→': ['.....', '...#.', '....#', '#####', '....#', '...#.', '.....'],
  '█': ['#####', '#####', '#####', '#####', '#####', '#####', '#####'],
  '░': ['#.#.#', '.#.#.', '#.#.#', '.#.#.', '#.#.#', '.#.#.', '#.#.#'],
  '−': ['....', '....', '....', '####', '....', '....', '....'],
};

// Proportional fonts look better in titles; terminals need fixed columns.
function glyph(ch) {
  return G[ch] || G[ch.toUpperCase()] || G['?'];
}

function glyphWidth(rows) {
  return rows[0].length;
}

export const LINE = 9; // cap height 7 + 2 descender rows

export class Canvas {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.layers = new Map();
    this.css = [];
    this.defs = [];
    this.use('base');
  }

  // Layers become <g> elements, so anything animated lives in its own layer.
  // attrs are presentation attributes: they hold the static fallback (what a
  // renderer that ignores CSS, or a reduced-motion viewer, sees) and CSS
  // animations override them while running.
  use(name, cls = name, attrs = '') {
    if (!this.layers.has(name)) this.layers.set(name, { cells: new Map(), cls, attrs, wrap: [] });
    this.cur = this.layers.get(name);
    return this;
  }

  // Wrap a layer in an outer <g class> so two animations can share a target.
  wrap(layer, cls) {
    this.layers.get(layer).wrap.push(`<g class="${cls}">`);
    return this;
  }

  style(text) {
    this.css.push(text);
    return this;
  }

  px(x, y, c) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const k = y * this.w + x;
    if (c == null) this.cur.cells.delete(k);
    else this.cur.cells.set(k, c);
  }

  rect(x, y, w, h, c) {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.px(x + i, y + j, c);
    return this;
  }

  hline(x, y, w, c) {
    return this.rect(x, y, w, 1, c);
  }

  vline(x, y, h, c) {
    return this.rect(x, y, 1, h, c);
  }

  // Bresenham, so diagonals stay one pixel thick.
  line(x0, y0, x1, y1, c) {
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      this.px(x0, y0, c);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x0 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y0 += sy;
      }
    }
    return this;
  }

  // A panel with the corners knocked out: the pixel-art rounded rectangle.
  box(x, y, w, h, { fill = C.panel, border = C.line, notch = 1 } = {}) {
    this.rect(x + 1, y + 1, w - 2, h - 2, fill);
    this.hline(x + notch, y, w - 2 * notch, border);
    this.hline(x + notch, y + h - 1, w - 2 * notch, border);
    this.vline(x, y + notch, h - 2 * notch, border);
    this.vline(x + w - 1, y + notch, h - 2 * notch, border);
    if (notch > 1) {
      for (let i = 1; i < notch; i++) {
        this.px(x + i, y + notch - i, border);
        this.px(x + w - 1 - i, y + notch - i, border);
        this.px(x + i, y + h - 1 - notch + i, border);
        this.px(x + w - 1 - i, y + h - 1 - notch + i, border);
      }
    }
    return this;
  }

  // rows: array of strings; map: char → colour; '.' and ' ' are transparent.
  sprite(x, y, rows, map, { flip = false } = {}) {
    rows.forEach((row, j) => {
      [...row].forEach((ch, i) => {
        const c = map[ch];
        if (c) this.px(flip ? x + row.length - 1 - i : x + i, y + j, c);
      });
    });
    return this;
  }

  measure(str, { scale = 1, mono = false, gap = 1 } = {}) {
    let w = 0;
    for (const ch of str) w += (mono ? 5 : glyphWidth(glyph(ch))) * scale + gap * scale;
    return Math.max(0, w - gap * scale);
  }

  // Returns the x just past the last glyph so callers can chain colours.
  text(x, y, str, c, { scale = 1, mono = false, gap = 1, bold = false } = {}) {
    let cx = x;
    for (const ch of str) {
      const rows = glyph(ch);
      const gw = glyphWidth(rows);
      const ox = mono ? Math.floor((5 - gw) / 2) : 0;
      rows.forEach((row, j) => {
        [...row].forEach((bit, i) => {
          if (bit !== '#') return;
          for (let b = 0; b <= (bold ? 1 : 0); b++) {
            this.rect(cx + (ox + i) * scale + b, y + j * scale, scale, scale, c);
          }
        });
      });
      cx += (mono ? 5 : gw) * scale + gap * scale + (bold ? 1 : 0);
    }
    return cx - gap * scale;
  }

  // Clip a layer to a rectangle (used by the typewriter covers).
  clip(layer, x, y, w, h) {
    const id = `k${this.defs.length}`;
    this.defs.push(`<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`);
    this.layers.get(layer).wrap.push(`<g clip-path="url(#${id})">`);
    return this;
  }

  toSVG({ title, desc = '', scale = 3 } = {}) {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const out = [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.w} ${this.h}" width="${this.w * scale}" height="${this.h * scale}" shape-rendering="crispEdges" role="img" aria-labelledby="t d">`,
      `<title id="t">${esc(title)}</title>`,
      `<desc id="d">${esc(desc)}</desc>`,
    ];
    if (this.css.length) {
      out.push(
        `<style>${this.css.join('')}@media (prefers-reduced-motion:reduce){*{animation:none!important}}</style>`,
      );
    }
    if (this.defs.length) out.push(`<defs>${this.defs.join('')}</defs>`);
    for (const [name, layer] of this.layers) {
      const paths = layerPaths(layer.cells, this.w);
      if (!paths) continue;
      if (name === 'base') {
        out.push(paths);
        continue;
      }
      let g = `<g class="${layer.cls}"${layer.attrs}>${paths}</g>`;
      for (const open of layer.wrap) g = `${open}${g}</g>`;
      out.push(g);
    }
    out.push('</svg>');
    return out.join('\n') + '\n';
  }
}

// Merge same-colour pixels: horizontal runs first, then stack identical runs
// on consecutive rows into rectangles. Keeps the hero under ~40 KB.
function layerPaths(cells, w) {
  const byColour = new Map();
  for (const [k, c] of cells) {
    if (!byColour.has(c)) byColour.set(c, []);
    byColour.get(c).push(k);
  }
  const out = [];
  for (const [colour, keys] of byColour) {
    keys.sort((a, b) => a - b);
    const runs = [];
    let start = null;
    let prev = null;
    for (const k of keys) {
      if (start !== null && k === prev + 1 && k % w !== 0) {
        prev = k;
        continue;
      }
      if (start !== null) runs.push([start % w, Math.floor(start / w), prev - start + 1]);
      start = prev = k;
    }
    if (start !== null) runs.push([start % w, Math.floor(start / w), prev - start + 1]);

    const open = new Map();
    const rects = [];
    for (const [x, y, len] of runs) {
      const key = `${x}:${len}`;
      const r = open.get(key);
      if (r && r.y + r.h === y) r.h++;
      else {
        const nr = { x, y, w: len, h: 1 };
        open.set(key, nr);
        rects.push(nr);
      }
    }
    const d = rects.map((r) => `M${r.x} ${r.y}h${r.w}v${r.h}h-${r.w}z`).join('');
    out.push(`<path fill="${colour}" d="${d}"/>`);
  }
  return out.join('');
}
