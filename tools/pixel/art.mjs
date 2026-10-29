// Every README asset is composed here from the canvas in core.mjs.
// Coordinates are art pixels. Animations follow one rule: the static picture
// (no CSS, or prefers-reduced-motion) is always complete; CSS only hides or
// moves things while it runs.

import { Canvas, C, LINE } from './core.mjs';

const HAIR = '#4b3324';
const HAIR_HI = '#6b4a35';

const fmt = (v) => +v.toFixed(3);

// ---------------------------------------------------------------- animation

// n mutually exclusive frames; frame 0 is the static fallback.
function frames(c, prefix, n, period, draw) {
  for (let i = 0; i < n; i++) {
    const cls = `${prefix}${i}`;
    c.use(cls, cls, i ? ' opacity="0"' : '');
    draw(i);
    const a = (i * 100) / n;
    const b = ((i + 1) * 100) / n;
    const kf = i === 0 ? `0%{opacity:1}${fmt(b)}%{opacity:0}100%{opacity:0}` : `0%{opacity:0}${fmt(a)}%{opacity:1}${fmt(b)}%{opacity:0}`;
    c.style(`.${cls}{animation:${cls} ${period}s steps(1,end) infinite}@keyframes ${cls}{${kf}}`);
  }
  c.use('base');
}

function appear(c, cls, pct, cycle) {
  c.style(`.${cls}{animation:${cls} ${cycle}s steps(1,end) infinite}@keyframes ${cls}{0%{opacity:0}${fmt(pct)}%{opacity:1}100%{opacity:1}}`);
}

function blink(c, cls, period, { delay = 0, low = 0 } = {}) {
  c.style(`.${cls}{animation:${cls} ${period}s steps(1,end) ${-delay}s infinite}@keyframes ${cls}{0%{opacity:1}50%{opacity:${low}}}`);
}

// Typewriter: the text is always drawn; a cover slides off it one glyph per
// step. The cover's resting position is outside its clip, so a renderer that
// ignores CSS shows the finished line.
function typed(c, id, x, y, str, color, from, to, cycle, { track = null, appearAt = null } = {}) {
  const n = [...str].length;
  const W = n * 6;
  const textLayer = `tx${id}`;
  c.use(textLayer, textLayer);
  c.text(x, y, str, color, { mono: true });
  // One spare row above and below: a transformed layer is anti-aliased, and
  // without the overshoot its edges let a sliver of the hidden text through.
  const cls = `cv${id}`;
  c.use(cls, cls);
  c.rect(x + W, y - 1, W, LINE + 1, C.void);
  if (track) c.text(x + W, y, track.str, track.color, { mono: true });
  c.clip(cls, x, y - 1, W, LINE + 1);
  if (appearAt != null) {
    c.wrap(cls, `ap${id}`);
    appear(c, `ap${id}`, appearAt, cycle);
    appear(c, textLayer, appearAt, cycle);
  }
  c.style(
    `.${cls}{animation:${cls} ${cycle}s linear infinite}@keyframes ${cls}{0%{transform:translateX(-${W}px)}${fmt(from)}%{transform:translateX(-${W}px);animation-timing-function:steps(${n},end)}${fmt(to)}%,100%{transform:translateX(0)}}`,
  );
  c.use('base');
}

// ------------------------------------------------------------------ helpers

export function wrapText(c, str, maxW) {
  const lines = [];
  let cur = '';
  for (const word of str.split(' ')) {
    const next = cur ? `${cur} ${word}` : word;
    if (c.measure(next) <= maxW) cur = next;
    else {
      lines.push(cur);
      cur = word;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// '#' main, '+' shade, everything else transparent.
function icon(c, x, y, rows, main, shade) {
  c.sprite(x, y, rows, { '#': main, '+': shade });
}

export const ICONS = {
  player: [
    '....####....',
    '...######...',
    '..###++###..',
    '..##++++##..',
    '...#++++#...',
    '....####....',
    '..########..',
    '.##++++++##.',
    '.#++++++++#.',
    '.#++++++++#.',
    '.##########.',
  ],
  inventory: [
    '..########..',
    '.#++++++++#.',
    '#++++++++++#',
    '############',
    '#+++####+++#',
    '#+++#++#+++#',
    '#+++####+++#',
    '#++++++++++#',
    '#++++++++++#',
    '############',
  ],
  quest: [
    '.#########..',
    '#+#++++++#..',
    '###++++++#..',
    '..#+####+#..',
    '..#++++++#..',
    '..#+###++#..',
    '..#++++++#..',
    '..#+####+#..',
    '..#++++++###',
    '..#++++++#+#',
    '..#########.',
  ],
  trophy: [
    '############',
    '#.#++++++#.#',
    '#.#++++++#.#',
    '.##++++++##.',
    '...#++++#...',
    '....#++#....',
    '.....##.....',
    '.....##.....',
    '...######...',
    '...#++++#...',
    '...######...',
  ],
  activity: [
    '+++.###.###.',
    '+++.###.###.',
    '+++.###.###.',
    '............',
    '###.+++.###.',
    '###.+++.###.',
    '###.+++.###.',
    '............',
    '+++.###.+++.',
    '+++.###.+++.',
    '+++.###.+++.',
  ],
  save: [
    '##########..',
    '#+#####+#+#.',
    '#+#...#+#++#',
    '#+#...#+#++#',
    '#+#####+#++#',
    '#++++++++++#',
    '#+########+#',
    '#+#++++++#+#',
    '#+#++++++#+#',
    '#+########+#',
    '############',
  ],
  flag: [
    '##..........',
    '##########..',
    '##+++++++#..',
    '##++++++#...',
    '##+++++++#..',
    '##########..',
    '##..........',
    '##..........',
    '##..........',
    '##..........',
    '######......',
  ],
  code: [
    '............',
    '............',
    '.......#....',
    '..#...#..#..',
    '.##...#..##.',
    '##...#....##',
    '.##..#...##.',
    '..#.#....#..',
    '....#.......',
  ],
};

// 7x7 button glyphs.
const GLYPHS = {
  github: ['.#...#.', '###.###', '.#...#.', '.#..#..', '.#.#...', '.##....', '###....'],
  linkedin: ['..###..', '.#...#.', '#######', '#######', '###.###', '#######', '#######'],
  leetcode: ['.##.##.', '.#...#.', '.#...#.', '#.....#', '.#...#.', '.#...#.', '.##.##.'],
  globe: ['..###..', '.#.#.#.', '#######', '#..#..#', '#######', '.#.#.#.', '..###..'],
};

// ------------------------------------------------------------------ sprites

const HEAD_SIDE = [
  '....HHPHHH.....',
  '..HhhhPhhHHH...',
  '.HHHHPHHHHHHH..',
  '.HHHHPHHHHHHHH.',
  'HHHPPPPHHSSSSH.',
  'HHHPPPPSSSSSS..',
  'HHHPGGPHSSSESS.',
  'HHHPGGPSSSSSSSS',
  '.HHPPPPSSSSSSS.',
  '..HHHSSSSSSSS..',
  '...HsSSSSSSSs..',
  '.....sSSSSs....',
  '......ssss.....',
];

const BUST = [
  '........HHHHHHHH........',
  '......HHhhhhhhHHHH......',
  '.....HHhhHHHHHHHHHH.....',
  '....HHHHHHHHHHHHHHHH....',
  '...HHHHHHHHHHHHHHHHHH...',
  '...HHHHHHHHHHHHHHHHHH...',
  '..HHHHHHHSHHHHHSHHHHHH..',
  '..HHHHHHSSSHHHSSSSHHHH..',
  '..HHHSSSSSSSSSSSSSSHHH..',
  '..HHSSSSSSSSSSSSSSSSHH..',
  '..HSSSSSSSSSSSSSSSSSSH..',
  '..HSSSWESSSSSSSSWESSSH..',
  '.sSSSSEESSSSSSSSEESSSSs.',
  '.sSSSSSSSSSSSSSSSSSSSSs.',
  '..SSSSSSSSSSSSSSSSSSSS..',
  '..SSSSSSSSSssSSSSSSSSS..',
  '...SSSSSSSSSSSSSSSSSS...',
  '....sSSSSSSSSSSSSSSs....',
  '......ssSSSSSSSSss......',
  '.........ssSSss.........',
  '.......PPPsSSsPPP.......',
  '....TTPPGPPssPPGPPTT....',
  '..TTTTTPPPTTTTPPPTTTTT..',
  '.TTTTTTTTTTttTTTTTTTTTT.',
  'TTTTTTTTTTTttTTTTTTTTTTT',
  'TTTtTTTTTTTttTTTTTTTtTTT',
  'TTTtTTTwTTTttTTTwTTTtTTT',
  'TTTtTTTwTTTttTTTwTTTtTTT',
  'TTTtTTTTTTTttTTTTTTTtTTT',
  'TTTtTTTTTTTttTTTTTTTtTTT',
  'TTTtTTtttttttttttTTTtTTT',
  'TTTtTtTTTTTttTTTTtTTtTTT',
  'TTTtTtTTTTTttTTTTtTTtTTT',
  'TTTtTttttttttttttTTTtTTT',
  'SSStTTTTTTTttTTTTTTTtSSS',
  'sSStTTTTTTTttTTTTTTTtSSs',
  'tttttttttttttttttttttttt',
];

const SKIN = { S: C.skin, s: C.skinDk, e: C.skinDk };
const PAL = {
  ...SKIN,
  H: HAIR,
  h: HAIR_HI,
  P: C.mute,
  G: C.g3,
  E: C.void,
  W: C.bright,
  T: C.btn,
  t: C.g1,
  w: C.text,
};

// Small walker used on the activity lane and in the footer (7x11).
const MINI = {
  head: ['..HHH..', '.HHHHH.', '.HHSSE.', '..SSS..'],
  body: ['.TTTTT.', 'TTTTTTS', '.TTTT..'],
  legs: [
    ['.JJ.JJ.', '.J...J.', 'KK...KK', '.......'],
    ['..JJJ..', '..J.J..', '..KKK..', '.......'],
  ],
};
const MINI_PAL = { ...PAL, J: C.mute, K: C.text };

function mini(c, x, y, frame, { wave = false } = {}) {
  c.sprite(x, y, MINI.head, MINI_PAL);
  const body = wave && frame ? ['.TTTTTS', 'TTTTTT.', '.TTTT..'] : MINI.body;
  c.sprite(x, y + 4, body, MINI_PAL);
  c.sprite(x, y + 7, MINI.legs[wave ? 0 : frame], MINI_PAL);
}

// ---------------------------------------------------------------- the hero

const CYCLE = 12;

const CODE = [
  [0, ['p', 3], ['b', 6], ['x', 8]],
  [3, ['b', 5], ['x', 2], ['a', 2]],
  [3, ['p', 3], ['b', 2], ['p', 2], ['x', 9]],
  [6, ['b', 4], ['x', 10]],
  [6, ['b', 6], ['x', 3], ['g', 9]],
  [6, ['p', 2], ['x', 6], ['a', 3]],
  [9, ['b', 5], ['x', 10]],
  [3, ['p', 6], ['b', 5]],
  [0],
  [0, ['p', 3], ['b', 4], ['x', 7]],
  [3, ['x', 4], ['g', 11], ['x', 2]],
  [3, ['p', 6], ['a', 1]],
];
const CODE_INK = { p: C.purple, b: C.blue, x: C.gray, g: C.g2, a: C.amber };

export function hero() {
  const c = new Canvas(320, 146);
  c.box(0, 0, 320, 146, { fill: C.bg, border: C.line, notch: 2 });

  // HUD strip
  c.rect(1, 1, 318, 12, C.panel);
  c.px(1, 1, C.line);
  c.px(318, 1, C.line);
  c.hline(1, 13, 318, C.line);
  c.text(8, 4, '~/transmogrify-cell', C.gray);
  const p1 = 'PLAYER 1';
  const p1x = 311 - c.measure(p1);
  c.text(p1x, 4, p1, C.g3);
  c.use('hudArrow', 'hudArrow');
  c.text(p1x - 7, 4, '▶', C.g3);
  blink(c, 'hudArrow', 1.6);
  c.use('base');

  // Title block
  c.text(10, 19, "HELLO, WORLD. I'M", C.gray);
  for (const [str, y] of [
    ['HIMANSHU', 29],
    ['CHANDELA', 47],
  ]) {
    c.text(11, y + 1, str, C.g1, { scale: 2 });
    c.text(10, y, str, C.bright, { scale: 2 });
  }
  c.hline(10, 65, 14, C.g3);
  c.hline(26, 65, 5, C.g2);
  c.hline(33, 65, 2, C.g1);
  c.text(10, 69, 'SOFTWARE ENGINEER', C.g3);
  c.text(10, 79, 'DEEP LEARNING · CV · DSA', C.gray);

  // Terminal (10px line pitch leaves room for the cover overshoot)
  c.box(10, 91, 140, 51, { fill: C.void, border: C.line });
  c.rect(11, 92, 138, 9, C.raised);
  c.hline(11, 101, 138, C.line);
  for (const [i, col] of [C.mute, C.mute, C.g2].entries()) c.rect(14 + i * 5, 95, 3, 3, col);
  const tt = 'himanshu@dev: ~';
  c.text(80 - c.measure(tt) / 2, 93, tt, C.dim);

  c.text(15, 104, '$', C.g3, { mono: true });
  typed(c, '1', 27, 104, './solve < in.txt', C.text, 4, 16, CYCLE);

  c.use('o2', 'o2');
  c.text(15, 114, '> accepted', C.g3, { mono: true });
  appear(c, 'o2', 19, CYCLE);

  c.use('p3', 'p3');
  c.text(15, 124, '$', C.g3, { mono: true });
  appear(c, 'p3', 22, CYCLE);
  typed(c, '3', 27, 124, 'python train.py', C.text, 25, 37, CYCLE, { appearAt: 22 });

  c.use('o4', 'o4');
  c.text(15, 134, '>', C.g3, { mono: true });
  appear(c, 'o4', 40, CYCLE);
  typed(c, '4', 27, 134, '██████████', C.g2, 41, 57, CYCLE, {
    appearAt: 40,
    track: { str: '░░░░░░░░░░', color: C.line },
  });
  c.use('o5', 'o5');
  c.text(93, 134, 'done', C.g3, { mono: true });
  appear(c, 'o5', 59, CYCLE);
  c.use('cur', 'cur');
  c.rect(123, 134, 5, 7, C.g3);
  c.wrap('cur', 'apcur');
  blink(c, 'cur', 1);
  appear(c, 'apcur', 61, CYCLE);
  c.use('base');

  room(c);

  return c.toSVG({
    title: 'Himanshu Chandela, software engineer',
    desc:
      'Pixel-art title screen. Left: the name Himanshu Chandela, the role Software Engineer, and the focus areas deep learning, computer vision and data structures and algorithms, above a terminal that compiles a competitive-programming solution (accepted) and runs a training script. Right: the developer in a green hoodie and headphones typing at a desk at night, with a neural-network poster, code on the monitor, a coffee mug, a plant and a blinking PC tower.',
  });
}

function room(c) {
  // Viewport and wall
  c.box(158, 16, 152, 126, { fill: C.panel, border: C.line });
  for (let y = 21; y < 110; y += 8) {
    for (let x = 163 + ((y - 21) % 16 ? 4 : 0); x < 307; x += 8) c.px(x, y, C.raised);
  }
  c.rect(159, 112, 150, 2, C.line);
  c.rect(159, 114, 150, 27, C.bg);
  for (const [y, joints] of [
    [120, [171, 214, 262]],
    [127, [190, 236, 288]],
    [134, [168, 222, 270]],
  ]) {
    c.hline(159, y, 150, C.panel);
    for (const x of joints) c.vline(x, y - 6, 6, C.panel);
  }

  // Neural-network poster: a signal walks input → hidden → output.
  c.box(166, 26, 47, 33, { fill: C.void, border: C.line });
  const A = [31, 40, 49].map((y) => [172, y]);
  const B = [29, 36, 43, 50].map((y) => [187, y]);
  const O = [36, 45].map((y) => [202, y]);
  const edges = (from, to, col) => {
    for (const [ax, ay] of from) for (const [bx, by] of to) c.line(ax + 3, ay + 1, bx - 1, by + 1, col);
  };
  edges(A, B, C.raised);
  edges(B, O, C.raised);
  for (const [x, y] of [...A, ...B, ...O]) c.rect(x, y, 3, 3, C.mute);
  frames(c, 'nn', 4, 3.2, (i) => {
    if (i === 0) for (const [x, y] of A) c.rect(x, y, 3, 3, C.g3);
    if (i === 1) {
      edges(A, B, C.g1);
      for (const [x, y] of B) c.rect(x, y, 3, 3, C.g3);
    }
    if (i === 2) {
      edges(B, O, C.g1);
      for (const [x, y] of O) c.rect(x, y, 3, 3, C.purple);
    }
  });

  // Window: night sky, moon, skyline.
  c.box(266, 24, 37, 35, { fill: C.night, border: C.mute });
  for (const [x, y, w, h] of [
    [267, 50, 5, 8],
    [272, 46, 4, 12],
    [276, 52, 6, 6],
    [282, 48, 5, 10],
    [287, 51, 4, 7],
    [291, 44, 5, 14],
    [296, 49, 6, 9],
  ]) {
    c.rect(x, y, w, h, C.void);
  }
  for (const [x, y] of [
    [273, 48],
    [274, 52],
    [283, 50],
    [292, 46],
    [294, 50],
    [268, 53],
    [298, 52],
  ]) {
    c.px(x, y, C.amberDk);
  }
  c.sprite(294, 27, ['.###', '##..', '#...', '#...', '##..', '.###'], { '#': C.text });
  for (const [x, y] of [
    [270, 28],
    [288, 31],
    [272, 39],
    [299, 38],
  ]) {
    c.px(x, y, C.gray);
  }
  for (const [i, [x, y]] of [
    [276, 33],
    [281, 27],
    [291, 37],
  ].entries()) {
    c.use(`star${i}`, `star${i}`);
    c.px(x, y, C.bright);
    blink(c, `star${i}`, 2.4 + i * 0.7, { delay: i * 0.9, low: 0.2 });
  }
  c.use('base');
  c.vline(284, 25, 33, C.mute);
  c.hline(267, 41, 35, C.mute);
  c.rect(264, 59, 41, 2, C.line);

  // Chair (behind the character)
  const X = 176;
  const Y = 62;
  c.rect(X, Y + 14, 3, 19, C.mute);
  c.vline(X + 2, Y + 15, 17, C.line);
  c.rect(X + 1, Y + 34, 16, 3, C.line);
  c.hline(X + 1, Y + 34, 16, C.mute);
  c.rect(X + 8, Y + 37, 2, 12, C.mute);
  c.hline(X + 3, Y + 49, 12, C.line);
  for (const cx of [X + 3, X + 8, X + 13]) c.rect(cx, Y + 50, 2, 2, C.mute);

  // Desk and tower
  c.hline(196, 92, 113, C.mute);
  c.rect(196, 93, 113, 2, C.line);
  c.rect(198, 95, 2, 17, C.line);
  c.rect(302, 95, 2, 17, C.line);
  c.rect(280, 97, 14, 15, C.line);
  c.rect(281, 98, 12, 13, C.raised);
  for (const y of [105, 107, 109]) c.hline(283, y, 8, C.line);
  c.vline(292, 99, 11, C.purpleDk);
  for (const [i, [x, col, period]] of [
    [283, C.g3, 2.2],
    [285, C.blue, 1.3],
  ].entries()) {
    c.use(`led${i}`, `led${i}`);
    c.px(x, 100, col);
    blink(c, `led${i}`, period, { delay: i * 0.4, low: 0.15 });
  }
  c.use('base');

  // Character, side view, typing
  c.rect(X + 3, Y + 12, 4, 3, C.g1);
  c.rect(X + 4, Y + 13, 11, 20, C.btn);
  c.vline(X + 4, Y + 14, 18, C.g1);
  c.vline(X + 13, Y + 14, 3, C.text);
  c.hline(X + 8, Y + 27, 6, C.g1);
  c.rect(X + 7, Y + 15, 6, 11, C.g1);
  c.rect(X + 8, Y + 15, 4, 9, C.btn);
  c.rect(X + 9, Y + 23, 14, 4, C.g1);
  c.rect(X + 10, Y + 23, 12, 3, C.btn);
  c.rect(X + 5, Y + 32, 14, 4, C.mute);
  c.hline(X + 5, Y + 32, 14, C.dim);
  c.rect(X + 16, Y + 36, 3, 13, C.mute);
  c.rect(X + 15, Y + 48, 6, 2, C.text);
  c.hline(X + 15, Y + 50, 7, C.gray);
  c.sprite(X + 3, Y, HEAD_SIDE, PAL);
  frames(c, 'hand', 2, 0.42, (i) => {
    if (i === 0) c.rect(X + 22, Y + 26, 3, 2, C.skin);
    else {
      c.rect(X + 22, Y + 25, 3, 2, C.skin);
      c.px(X + 24, Y + 27, C.skinDk);
    }
  });

  // Monitor with scrolling code
  c.rect(222, 56, 47, 30, C.line);
  c.hline(223, 56, 45, C.mute);
  c.rect(224, 58, 43, 25, C.void);
  c.px(264, 84, C.g3);
  c.rect(242, 86, 5, 4, C.line);
  c.rect(237, 90, 15, 2, C.mute);
  frames(c, 'code', 4, 4.8, (i) => {
    CODE.slice(i, i + 8).forEach(([indent, ...segs], row) => {
      let x = 226 + indent;
      for (const [k, len] of segs) {
        c.hline(x, 60 + row * 3, Math.min(len, 265 - x), CODE_INK[k]);
        x += len + 2;
      }
    });
  });

  // Keyboard
  c.hline(200, 91, 19, C.line);
  for (let x = 201; x < 218; x += 2) c.px(x, 90, C.gray);

  // Mug with steam
  c.rect(272, 85, 5, 7, C.text);
  c.hline(273, 85, 3, HAIR);
  c.hline(272, 88, 5, C.btn);
  for (const [x, y] of [
    [277, 86],
    [278, 87],
    [278, 88],
    [277, 89],
  ]) {
    c.px(x, y, C.text);
  }
  const STEAM = [
    ['.#..', '..#.', '..#.', '.#..', '.#..', '..#.'],
    ['..#.', '.#..', '.#..', '..#.', '..#.', '.#..'],
    ['.#..', '.#..', '..#.', '..#.', '.#..', '.#..'],
  ];
  frames(c, 'steam', 3, 1.5, (i) => c.sprite(272, 77, STEAM[i], { '#': C.mute }));

  // Plant
  c.sprite(
    283,
    74,
    [
      '.....g.....',
      '..g..gg..g.',
      '.gg.ggG.gg.',
      'gGg.gGg.Gg.',
      '.gGggGgGg..',
      '..gGgGgGg..',
      '...gGgGg...',
      '....ggg....',
      '.....g.....',
      '.....g.....',
    ],
    { g: C.g1, G: C.g2 },
  );
  c.rect(284, 85, 9, 1, C.mute);
  c.rect(285, 86, 7, 6, C.raised);
}

// ------------------------------------------------------------- section head

export function sectionHeader({ n, title, sub, icon: name }) {
  const c = new Canvas(320, 24);
  c.box(0, 0, 320, 24, { fill: C.panel, border: C.line, notch: 2 });
  c.box(5, 4, 16, 16, { fill: C.void, border: C.line });
  icon(c, 7, 7, ICONS[name], C.g3, C.g1);
  c.text(29, 6, title, C.g1, { scale: 2 });
  const end = c.text(28, 5, title, C.bright, { scale: 2 });

  const tag = String(n).padStart(2, '0');
  const tagW = c.measure(tag) + 8;
  const tagX = 314 - tagW;
  c.box(tagX, 6, tagW, 12, { fill: C.void, border: C.g1 });
  c.text(tagX + 4, 8, tag, C.g3);

  const subW = c.measure(sub);
  const subX = tagX - 8 - subW;
  c.text(subX, 9, sub, C.gray);
  for (let x = end + 8; x < subX - 6; x += 3) c.px(x, 15, C.line);

  return c.toSVG({ title: `${tag} ${title}`, desc: `Section header: ${title.toLowerCase()}, ${sub}.`, scale: 3 });
}

// ------------------------------------------------------------ player status

export function playerStatus(rows) {
  const c = new Canvas(320, 78);
  c.box(0, 0, 320, 78, { fill: C.panel, border: C.line, notch: 2 });

  // Portrait with idle blink
  c.box(8, 8, 42, 62, { fill: C.void, border: C.line });
  for (let y = 12; y < 69; y += 4) c.hline(9, y, 40, C.bg);
  // Character-select spotlight behind the head
  const by = 69 - BUST.length;
  for (let y = 9; y < 69; y++) {
    for (let x = 9; x < 49; x++) {
      const d = Math.hypot((x - 28.5) / 1.1, y - (by + 10));
      if (d < 15) c.px(x, y, C.g0);
      else if (d < 17 && (x + y) % 2) c.px(x, y, C.g0);
    }
  }
  c.sprite(17, by, BUST, PAL);
  c.use('lid', 'lid', ' opacity="0"');
  for (const x of [23, 33]) {
    c.rect(x, by + 11, 2, 2, C.skin);
    c.hline(x, by + 12, 2, C.skinDk);
  }
  c.style('.lid{animation:lid 4.2s steps(1,end) infinite}@keyframes lid{0%{opacity:0}93%{opacity:1}97%{opacity:0}}');
  c.use('base');
  const lv = 'P1';
  c.box(8, 8, c.measure(lv) + 6, 11, { fill: C.btn, border: C.btn });
  c.text(11, 10, lv, C.bright);

  // Stat rows
  const kx = 62;
  const vx = 102;
  rows.forEach(([k, v], i) => {
    const y = 10 + i * 10;
    c.text(kx, y, k, C.dim);
    c.text(vx, y, v, i === 0 ? C.bright : C.text);
    if (i < rows.length - 1) for (let x = kx; x < 310; x += 2) c.px(x, y + 8, C.raised);
  });
  c.use('sel', 'sel');
  c.text(kx - 7, 10, '▶', C.g3);
  blink(c, 'sel', 1.2);
  c.use('base');

  return c.toSVG({
    title: 'Player status',
    desc: rows.map(([k, v]) => `${k.toLowerCase()}: ${v.toLowerCase()}`).join('; '),
  });
}

// ---------------------------------------------------------------- inventory

export function inventory(pockets) {
  const c = new Canvas(320, 86);
  c.box(0, 0, 320, 86, { fill: C.panel, border: C.line, notch: 2 });
  const w = 74;
  pockets.forEach(({ name, color, items }, i) => {
    const x = 6 + i * (w + 4);
    c.box(x, 6, w, 74, { fill: C.void, border: C.line });
    c.rect(x + 1, 7, w - 2, 12, C.raised);
    c.hline(x + 1, 19, w - 2, C.line);
    c.text(x + 6, 10, '◆', color);
    c.text(x + 14, 10, name, C.bright);
    items.forEach((item, j) => {
      const y = 24 + j * 11;
      c.rect(x + 5, y + 3, 2, 2, color);
      c.text(x + 10, y, item, C.text);
    });
  });
  c.use('pick', 'pick');
  c.rect(6 + 1, 23, w - 2, 9, C.raised);
  c.style('.pick{animation:pick 9s steps(1,end) infinite}@keyframes pick{0%{transform:translateX(0)}25%{transform:translateX(78px)}50%{transform:translateX(156px)}75%{transform:translateX(234px)}}');
  c.use('base');

  // The highlight sits under the text, so redraw the first row on top of it.
  const top = new Canvas(320, 86);
  pockets.forEach(({ color, items }, i) => {
    const x = 6 + i * (w + 4);
    top.rect(x + 5, 27, 2, 2, color);
    top.text(x + 10, 24, items[0], C.bright);
  });
  mergeLayer(c, top, 'firstRow');

  return c.toSVG({
    title: 'Inventory: tech stack',
    desc: pockets.map((p) => `${p.name.toLowerCase()}: ${p.items.join(', ')}`).join('; '),
  });
}

function mergeLayer(c, other, name) {
  c.use(name, name);
  for (const [k, col] of other.layers.get('base').cells) c.cur.cells.set(k, col);
  c.use('base');
}

// ---------------------------------------------------------------- quest card

export function questCard({ kind, kindColor, title, desc, lang, langColor, status, statusColor, cta }) {
  const W = 176;
  const R = W - 6;
  const c = new Canvas(W, 78);
  c.box(0, 0, W, 78, { fill: C.panel, border: C.line, notch: 2 });

  const kw = c.measure(kind) + 8;
  c.box(6, 6, kw, 11, { fill: C.void, border: kindColor });
  c.text(10, 8, kind, kindColor);
  if (status) {
    const sw = c.measure(status);
    c.text(R - sw, 8, status, statusColor);
    c.use('dot', 'dot');
    c.text(R - sw - 8, 8, '●', statusColor);
    blink(c, 'dot', 1.8, { low: 0.3 });
    c.use('base');
  }

  c.text(6, 22, title, C.bright, { bold: true });
  const lines = wrapText(c, desc, R - 6);
  if (lines.length > 3) throw new Error(`Quest "${title}" description needs ${lines.length} lines; 3 fit.`);
  lines.forEach((line, i) => c.text(6, 33 + i * 9, line, C.gray));

  c.hline(6, 63, R - 6, C.raised);
  c.rect(6, 68, 5, 5, langColor);
  const langEnd = c.text(14, 67, lang, C.dim);
  const cw = c.measure(cta);
  if (langEnd + 6 > R - cw) throw new Error(`Quest "${title}": "${lang}" and "${cta}" overlap.`);
  c.text(R - cw, 67, cta, C.blue);

  return c.toSVG({ title: `${kind}: ${title}`, desc: `${desc} ${lang}.${status ? ` Status: ${status.toLowerCase()}.` : ''}`, scale: 3 });
}

// ------------------------------------------------------------ connect button

export function button({ label, glyph }) {
  const w = 88;
  const c = new Canvas(w, 20);
  c.box(0, 0, w, 20, { fill: C.raised, border: C.line });
  c.hline(1, 1, w - 2, C.mute);
  c.hline(1, 18, w - 2, C.panel);
  c.sprite(7, 6, GLYPHS[glyph], { '#': C.g3 });
  c.text(18, 6, label, C.bright);
  c.text(w - 10, 6, '▶', C.g1);
  return c.toSVG({ title: label, desc: `Link button: ${label.toLowerCase()}`, scale: 2 });
}

// ------------------------------------------------------------------ divider

export function divider() {
  const c = new Canvas(320, 7);
  for (let x = 2; x < 150; x += 4) c.rect(x, 3, 2, 1, C.line);
  for (let x = 170; x < 318; x += 4) c.rect(x, 3, 2, 1, C.line);
  c.sprite(157, 0, ['...#...', '..###..', '.##+##.', '###+###', '.##+##.', '..###..', '...#...'], { '#': C.g2, '+': C.g3 });
  return c.toSVG({ title: 'Divider', desc: 'Pixel divider', scale: 3 });
}

// ------------------------------------------------------------------- footer

export function footer() {
  const c = new Canvas(320, 60);
  c.box(0, 0, 320, 60, { fill: C.bg, border: C.line, notch: 2 });
  const t = 'THANKS FOR VISITING';
  const tw = c.measure(t, { scale: 2 });
  c.text(161 - tw / 2, 11, t, C.g1, { scale: 2 });
  c.text(160 - tw / 2, 10, t, C.bright, { scale: 2 });
  const s = 'GAME SAVED · SEE YOU ON THE NEXT LEVEL';
  const sw = c.measure(s);
  c.text(164 - sw / 2, 30, s, C.gray);
  c.use('cont', 'cont');
  c.text(156 - sw / 2, 30, '▶', C.g3);
  blink(c, 'cont', 1.2);
  c.use('base');

  // Grass strip
  c.rect(1, 46, 318, 12, C.panel);
  c.hline(1, 45, 318, C.g1);
  for (let x = 2; x < 318; x += 3) c.px(x, 44 - ((x * 7) % 5 === 0 ? 1 : 0), C.g2);
  for (let x = 4; x < 318; x += 11) c.px(x, 50 + ((x * 3) % 5), C.line);

  frames(c, 'wave', 2, 1, (i) => mini(c, 24, 34, i, { wave: true }));
  c.sprite(286, 32, ICONS.save, { '#': C.g3, '+': C.g1 });
  c.use('spark', 'spark');
  c.px(299, 31, C.bright);
  c.px(300, 30, C.g3);
  blink(c, 'spark', 1.6);
  c.use('base');

  return c.toSVG({ title: 'Thanks for visiting', desc: 'Footer: thanks for visiting. Game saved, see you on the next level.' });
}

// --------------------------------------------------------------- live: wins

export function achievements(data) {
  const { leetcode: lc, github: gh, syncedAt } = data;
  const c = new Canvas(320, 104);
  c.box(0, 0, 320, 104, { fill: C.panel, border: C.line, notch: 2 });

  const tiles = [
    {
      icon: 'trophy',
      color: C.amber,
      shade: C.amberDk,
      value: lc.badge.toUpperCase(),
      label: 'LEETCODE BADGE',
      detail: [
        ['CONTEST RATING ', C.dim],
        [String(Math.round(lc.rating)), C.text],
      ],
    },
    {
      icon: 'code',
      color: C.g3,
      shade: C.g1,
      value: lc.solved.all.toLocaleString('en-US'),
      label: 'PROBLEMS SOLVED',
      split: true,
      detail: [
        [`${lc.solved.easy}`, C.g3],
        [' E · ', C.dim],
        [`${lc.solved.medium}`, C.amber],
        [' M · ', C.dim],
        [`${lc.solved.hard}`, C.red],
        [' H', C.dim],
      ],
    },
    {
      icon: 'flag',
      color: C.blue,
      shade: C.blueDk,
      value: String(lc.contests),
      label: 'RATED CONTESTS',
      detail: [
        ['TOP ', C.dim],
        [`${lc.topPercentage}%`, C.text],
        [' WORLDWIDE', C.dim],
      ],
    },
    {
      icon: 'activity',
      color: C.g3,
      shade: C.g1,
      value: gh.total.toLocaleString('en-US'),
      label: 'CONTRIBUTIONS',
      detail: [['ON GITHUB · PAST YEAR', C.dim]],
    },
  ];

  tiles.forEach((t, i) => {
    const x = 6 + (i % 2) * 156;
    const y = 6 + Math.floor(i / 2) * 44;
    c.box(x, y, 152, 40, { fill: C.void, border: C.line });
    c.box(x + 5, y + 5, 16, 16, { fill: C.panel, border: C.line });
    icon(c, x + 7, y + 8, ICONS[t.icon], t.color, t.shade);
    c.text(x + 29, y + 7, t.value, C.g1, { scale: 2 });
    c.text(x + 28, y + 6, t.value, C.bright, { scale: 2 });
    c.text(x + 28, y + 23, t.label, t.color);
    let dx = x + 28;
    for (const [s, col] of t.detail) dx = c.text(dx, y + 31, s, col) + 1;
    if (dx > x + 148) throw new Error(`Achievement detail too wide: ${t.label}`);

    if (t.split) {
      // Difficulty split as a pixel bar beside the big number
      const { easy, medium, hard, all } = lc.solved;
      const bw = 52;
      let bx = x + 146 - bw;
      for (const [n, col] of [
        [easy, C.g2],
        [medium, C.amber],
        [hard, C.red],
      ]) {
        const w = Math.round((n / all) * bw);
        c.rect(bx, y + 11, w, 4, col);
        bx += w;
      }
    }
  });

  const foot = `SYNCED ${syncedAt} · LEETCODE + GITHUB GRAPHQL`;
  c.text(Math.round(160 - c.measure(foot) / 2), 93, foot, C.mute);

  return c.toSVG({
    title: 'Achievements',
    desc: `LeetCode ${lc.badge} badge, rating ${Math.round(lc.rating)}, top ${lc.topPercentage} percent. ${lc.solved.all} problems solved (${lc.solved.easy} easy, ${lc.solved.medium} medium, ${lc.solved.hard} hard). ${lc.contests} rated contests. ${gh.total} GitHub contributions in the last year. Synced ${syncedAt}.`,
  });
}

// ------------------------------------------------------------ live: activity

const LEVELS = [C.raised, C.g0, C.g1, C.g2, C.g3];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function streaks(days) {
  let longest = 0;
  let run = 0;
  for (const [, n] of days) {
    run = n > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Like GitHub used to: today with no contributions yet doesn't break it.
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i][1] === 0) i--;
  for (; i >= 0 && days[i][1] > 0; i--) current++;
  const best = days.reduce((m, d) => (d[1] > m[1] ? d : m), ['', 0]);
  return { longest, current, best };
}

export function activity(data) {
  const { days, total } = data.github;
  const c = new Canvas(320, 98);
  c.box(0, 0, 320, 98, { fill: C.panel, border: C.line, notch: 2 });

  const first = new Date(`${days[0][0]}T00:00:00Z`);
  const offset = first.getUTCDay();
  const weeks = Math.ceil((days.length + offset) / 7);
  const gx = Math.round((320 - (weeks * 5 - 1)) / 2);
  const gy = 30;

  const right = gx + weeks * 5 - 1;
  let x = c.text(gx, 7, total.toLocaleString('en-US'), C.bright, { bold: true });
  c.text(x + 5, 7, 'CONTRIBUTIONS IN THE LAST YEAR', C.gray);
  // Legend: the five GitHub levels, less → more
  const sx = right - (LEVELS.length * 6 - 1);
  LEVELS.forEach((col, i) => c.rect(sx + i * 6, 8, 5, 5, col));

  let lastMonth = -1;
  let labelEnd = -Infinity;
  days.forEach(([date, , level], i) => {
    const k = i + offset;
    const wx = gx + Math.floor(k / 7) * 5;
    const wy = gy + (k % 7) * 5;
    c.rect(wx, wy, 4, 4, LEVELS[level]);
    const d = new Date(`${date}T00:00:00Z`);
    if (k % 7 === 0 || i === 0) {
      const m = d.getUTCMonth();
      if (m !== lastMonth && d.getUTCDate() <= 7 && wx >= labelEnd + 3 && wx + c.measure(MONTHS[m]) <= right) {
        labelEnd = c.text(wx, 19, MONTHS[m], C.dim);
        lastMonth = m;
      }
    }
  });

  // Today's square: a blinking outline, "you are here".
  const kLast = days.length - 1 + offset;
  const tx = gx + Math.floor(kLast / 7) * 5;
  const ty = gy + (kLast % 7) * 5;
  c.use('here', 'here');
  c.hline(tx - 1, ty - 1, 6, C.bright);
  c.hline(tx - 1, ty + 4, 6, C.bright);
  c.vline(tx - 1, ty, 4, C.bright);
  c.vline(tx + 4, ty, 4, C.bright);
  blink(c, 'here', 1.4);
  c.use('base');

  const { longest, current, best } = streaks(days);
  const days_ = (n) => `${n} ${n === 1 ? 'DAY' : 'DAYS'}`;
  const stats = [
    ['LONGEST STREAK ', days_(longest)],
    ['CURRENT STREAK ', days_(current)],
  ];
  // Flush left and flush right under the grid
  stats.forEach(([k, v], i) => {
    const w = c.measure(k) + 1 + c.measure(v);
    c.text(c.text(i ? right - w : gx, 70, k, C.dim) + 1, 70, v, C.text);
  });

  // Walker lane
  c.hline(1, 94, 318, C.line);
  for (let lx2 = 3; lx2 < 318; lx2 += 6) c.px(lx2, 93, C.raised);
  frames(c, 'step', 2, 0.5, (i) => mini(c, 4, 82, i));
  for (const n of ['step0', 'step1']) c.wrap(n, 'walker');
  c.style('.walker{animation:walk 18s steps(152,end) infinite}@keyframes walk{0%{transform:translateX(0)}100%{transform:translateX(304px)}}');

  return c.toSVG({
    title: 'Contribution activity',
    desc: `${total} GitHub contributions in the last year. Longest streak ${longest} days, current streak ${current} days, best day ${best[1]} contributions on ${best[0]}.`,
  });
}
