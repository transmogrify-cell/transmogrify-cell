#!/usr/bin/env node
// Builds every pixel-art asset the README uses.
//
//   node tools/build.mjs          static art → assets/, live panels → dist/ from data/snapshot.json
//   node tools/build.mjs --live   same, but refresh the snapshot from GitHub + LeetCode first
//
// The live panels (achievements, activity) are published to the `output`
// branch by .github/workflows/pixel-panels.yml; everything else is committed.
// No dependencies: Node 18+ only.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { C } from './pixel/core.mjs';
import * as art from './pixel/art.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LIVE = process.argv.includes('--live');
const LOGIN = process.env.GH_LOGIN || 'transmogrify-cell';
const LEETCODE_USER = 'cogentHeisnberg';

// ------------------------------------------------------------- the content
// Everything below is checked against public data (GitHub API, LeetCode
// GraphQL, the repos themselves). Keep it that way when editing.

const STATUS = [
  ['NAME', 'HIMANSHU CHANDELA'],
  ['CLASS', 'SOFTWARE ENGINEER'],
  ['MAIN', 'C++ · PYTHON'],
  ['SPEC', 'DEEP LEARNING · COMPUTER VISION'],
  ['SKILL', 'COMPETITIVE PROGRAMMING · DSA'],
  ['TITLE', 'LEETCODE KNIGHT'],
];

const SECTIONS = [
  { slug: 'status', n: 1, title: 'PLAYER STATUS', sub: 'about me', icon: 'player' },
  { slug: 'inventory', n: 2, title: 'INVENTORY', sub: 'tech stack', icon: 'inventory' },
  { slug: 'quests', n: 3, title: 'QUEST LOG', sub: 'projects + open source', icon: 'quest' },
  { slug: 'achievements', n: 4, title: 'ACHIEVEMENTS', sub: 'leetcode + github', icon: 'trophy' },
  { slug: 'activity', n: 5, title: 'ACTIVITY', sub: 'contribution graph', icon: 'activity' },
  { slug: 'save', n: 6, title: 'SAVE POINT', sub: 'find me online', icon: 'save' },
];

const POCKETS = [
  { name: 'LANGUAGES', color: C.blue, items: ['C++', 'PYTHON', 'JAVASCRIPT', 'TYPESCRIPT', 'SQL'] },
  { name: 'ML · DATA', color: C.purple, items: ['TENSORFLOW', 'KERAS', 'OPENCV', 'NUMPY', 'PANDAS'] },
  { name: 'WEB', color: C.amber, items: ['REACT', 'VITE', 'TAILWIND', 'STREAMLIT', 'HTML · CSS'] },
  { name: 'TOOLS', color: C.g3, items: ['GIT', 'LINUX', 'JUPYTER', 'COLAB', 'GH ACTIONS'] },
];

// GitHub's own language colours, so the cards read like repo cards.
const LANG = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  'Jupyter Notebook': '#da5b0b',
};

const QUESTS = [
  {
    slug: 'cline',
    kind: 'OPEN SOURCE',
    kindColor: C.blue,
    title: 'cline/cline',
    desc: "Scope Hub session commands to the connection's own workspace.",
    lang: 'TypeScript',
    status: 'IN REVIEW',
    statusColor: C.amber,
    cta: 'VIEW PR ▶',
  },
  {
    slug: 'learningu',
    kind: 'OPEN SOURCE',
    kindColor: C.blue,
    title: 'learningu.org',
    desc: 'Reported a broken email link and proposed a new contact page UI.',
    lang: 'HTML',
    status: '2 ISSUES · 1 PR',
    statusColor: C.gray,
    cta: 'ISSUES ▶',
  },
  {
    slug: 'predictplay',
    kind: 'MAIN QUEST',
    kindColor: C.g3,
    title: 'PredictPlay',
    desc: 'React 19 + Vite betting simulator with bet slips, wallet and fixtures.',
    lang: 'JavaScript',
    cta: 'REPO ▶',
  },
  {
    slug: 'salary',
    kind: 'MAIN QUEST',
    kindColor: C.g3,
    title: 'SalaryPrediction',
    desc: 'Streamlit app predicting dev salaries from Stack Overflow survey data.',
    lang: 'Jupyter Notebook',
    cta: 'REPO ▶',
  },
  {
    slug: 'portfolio',
    kind: 'SIDE QUEST',
    kindColor: C.purple,
    title: 'portfolio',
    desc: 'Personal site with resume, night mode and animations.',
    lang: 'HTML',
    status: 'LIVE',
    statusColor: C.g3,
    cta: 'PLAY ▶',
  },
  {
    slug: 'shopping-eda',
    kind: 'SIDE QUEST',
    kindColor: C.purple,
    title: 'ShoppingTrends EDA',
    desc: 'Retail shopping-trends EDA with pandas, seaborn and matplotlib.',
    lang: 'Jupyter Notebook',
    cta: 'REPO ▶',
  },
];

const BUTTONS = [
  { slug: 'linkedin', label: 'LINKEDIN', glyph: 'linkedin' },
  { slug: 'leetcode', label: 'LEETCODE', glyph: 'leetcode' },
  { slug: 'portfolio', label: 'PORTFOLIO', glyph: 'globe' },
];

// --------------------------------------------------------------- live data

async function fetchGitHub(login, token) {
  if (!token) throw new Error('GITHUB_TOKEN is required for --live');
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{
    totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'pixel-readme' },
    body: JSON.stringify({ query, variables: { login } }),
  });
  const body = await res.json();
  if (!res.ok || body.errors) throw new Error(`GitHub GraphQL: ${res.status} ${JSON.stringify(body.errors || body)}`);
  const cal = body.data.user.contributionsCollection.contributionCalendar;
  // GitHub's own quartile buckets, so the colours match the profile graph.
  const level = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
  const days = cal.weeks.flatMap((w) => w.contributionDays.map((d) => [d.date, d.contributionCount, level[d.contributionLevel]]));
  return { login, total: cal.totalContributions, days };
}

async function fetchLeetCode(username) {
  const query = `query($u:String!){matchedUser(username:$u){submitStatsGlobal{acSubmissionNum{difficulty count}}}
    userContestRanking(username:$u){rating attendedContestsCount topPercentage badge{name}}}`;
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com', 'User-Agent': 'pixel-readme' },
    body: JSON.stringify({ query, variables: { u: username } }),
  });
  if (!res.ok) throw new Error(`LeetCode: HTTP ${res.status}`);
  const { data } = await res.json();
  if (!data?.matchedUser || !data?.userContestRanking) throw new Error('LeetCode: user not found');
  const n = Object.fromEntries(data.matchedUser.submitStatsGlobal.acSubmissionNum.map((r) => [r.difficulty.toLowerCase(), r.count]));
  const r = data.userContestRanking;
  return {
    username,
    badge: r.badge?.name ?? 'Unranked',
    rating: r.rating,
    contests: r.attendedContestsCount,
    topPercentage: r.topPercentage,
    solved: { all: n.all, easy: n.easy, medium: n.medium, hard: n.hard },
  };
}

// Decide what the achievements panel shows when LeetCode can't be reached
// (it sits behind Cloudflare and sometimes refuses CI runners).
//   error  - the Error thrown by fetchLeetCode
//   cached - the last good LeetCode block from data/snapshot.json
// Return a LeetCode block to render, or throw to fail the workflow run
// (the previous images on the `output` branch then stay up untouched).
// For now it fails loudly; returning `cached` instead would keep the panel up
// with the older SYNCED date.
function onLeetCodeFailure(error, cached) {
  throw error;
}

// ------------------------------------------------------------------- build

async function put(rel, svg) {
  const path = join(ROOT, rel);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, svg);
  return [rel, Buffer.byteLength(svg)];
}

async function main() {
  const snapshotPath = join(ROOT, 'data/snapshot.json');
  const snapshot = JSON.parse(await readFile(snapshotPath, 'utf8'));
  let data = snapshot;

  if (LIVE) {
    const github = await fetchGitHub(LOGIN, process.env.GITHUB_TOKEN);
    let leetcode;
    try {
      leetcode = await fetchLeetCode(LEETCODE_USER);
    } catch (error) {
      leetcode = onLeetCodeFailure(error, snapshot.leetcode);
    }
    data = { syncedAt: new Date().toISOString().slice(0, 10), leetcode, github };
    await writeFile(snapshotPath, `${JSON.stringify(data)}\n`);
  }

  const written = await Promise.all([
    put('assets/hero.svg', art.hero()),
    put('assets/status.svg', art.playerStatus(STATUS)),
    put('assets/inventory.svg', art.inventory(POCKETS)),
    put('assets/divider.svg', art.divider()),
    put('assets/footer.svg', art.footer()),
    ...SECTIONS.map((s) => put(`assets/headers/${s.slug}.svg`, art.sectionHeader(s))),
    ...QUESTS.map((q) => put(`assets/quests/${q.slug}.svg`, art.questCard({ ...q, langColor: LANG[q.lang] }))),
    ...BUTTONS.map((b) => put(`assets/buttons/${b.slug}.svg`, art.button(b))),
    put('dist/achievements.svg', art.achievements(data)),
    put('dist/activity.svg', art.activity(data)),
  ]);
  for (const [rel, bytes] of written) console.log(`${(bytes / 1024).toFixed(1).padStart(6)} KB  ${rel}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
