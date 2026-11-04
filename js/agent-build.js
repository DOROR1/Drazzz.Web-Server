/* Bagian Build agent: tab agent -> stat, W-Engine, dan 6 drive disc.
   Memilih agent juga mengganti warna tema dan foto hero di bagian atas.
   Data: js/data/agents.js */

const ROMAN_SLOTS = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

const imagePath = {
  avatar: (agent) => `assets/img/b/${agent.id}_av.webp`,
  engine: (agent) => `assets/img/b/eng_${agent.id}.webp`,
  hero: (agent) => `assets/img/hero/${agent.id}.webp`,
  setIcon: (setName) => `assets/img/b/set_${slugify(setName)}.webp`,
};

let currentHeroId = 'ellen';

/* 'M0W1' -> chip "M0" dan "W1" */
function mindscapeChips(code) {
  const match = /^M(\d)W(\d)$/.exec(code || '');
  if (!match) return '';
  return `<b class="mindscape-chip" title="Mindscape ${match[1]}">M${match[1]}</b>`
    + `<b class="mindscape-chip wengine" title="W-Engine ${match[2]}">W${match[2]}</b>`;
}

function statGridHTML(agent) {
  return agent.stats.map(([label, total, base, bonus]) => `
    <div class="stat-row">
      <span>${label}</span>
      <b>${base ? `<small>${base}<em>${bonus}</em></small>` : ''}${total}</b>
    </div>`).join('');
}

function effectiveHTML(agent) {
  const chips = agent.effective.stats.map((stat) => `<span>${stat}</span>`).join('');
  return `<span>Effective sub-stat didapat <b>${agent.effective.count}</b> kali</span><div class="chip-list">${chips}</div>`;
}

/* Ringkasan set, mis. "Woodpecker Electro ×4" */
function setListHTML(agent) {
  const counts = {};
  agent.discs.forEach((disc) => { counts[disc.set] = (counts[disc.set] || 0) + 1; });
  return Object.entries(counts).map(([name, count]) => `<span>${name} ×${count}</span>`).join('');
}

function discCardHTML(disc, slotIndex) {
  const [mainStat, mainValue] = disc.main;
  const subs = disc.subs.map(([stat, value, upgrades]) => `
    <li><span>${stat}${upgrades ? `<i>+${upgrades}</i>` : ''}</span><b>${value}</b></li>`).join('');
  return `
    <article class="disc-card">
      <div class="disc-head">
        <div class="slot-badge">${ROMAN_SLOTS[slotIndex]}</div>
        <div><b>${disc.set}</b><small>Drive Disc · Lv.15</small></div>
        <img src="${imagePath.setIcon(disc.set)}" alt="">
      </div>
      <div class="disc-main"><span>${mainStat}</span><em>${mainValue}</em></div>
      <ul class="disc-subs">${subs}</ul>
    </article>`;
}

const SKILL_NAMES = ['Basic', 'Dodge', 'Assist', 'Special', 'Chain', 'Core'];
const SKILL_MAX = [12, 12, 12, 12, 12, 7];

/* Level skill agent. Core Skill ditampilkan sebagai huruf (level 2 = A ... 7 = F) */
function skillRowHTML(agent) {
  const cells = agent.skills.map((level, i) => {
    const isCore = i === SKILL_NAMES.length - 1;
    const label = isCore && level >= 2 ? 'ABCDEF'[level - 2] : level;
    const maxed = level >= SKILL_MAX[i] ? ' is-max' : '';
    return `<div class="skill${maxed}" title="${SKILL_NAMES[i]} level ${level}"><small>${SKILL_NAMES[i]}</small><b>${label}</b></div>`;
  }).join('');
  return `<div class="skill-row">${cells}</div>`;
}

function applyTheme(agent) {
  document.documentElement.style.setProperty('--accent', readableAccent(agent.color));
}

/* Foto hero ikut berganti dengan efek memudar */
function swapHero(agent) {
  if (agent.id === currentHeroId) return;
  currentHeroId = agent.id;
  const hero = $('#hero-art');
  const preload = new Image();
  preload.onload = () => {
    if (currentHeroId !== agent.id) return;   /* agent sudah diganti lagi */
    hero.style.opacity = 0;
    setTimeout(() => {
      hero.src = preload.src;
      hero.alt = `Ilustrasi agent ${agent.name} dari Zenless Zone Zero`;
      hero.style.opacity = 1;
    }, 220);
  };
  preload.src = imagePath.hero(agent);
}

function showAgent(index) {
  const agent = AGENTS[index];
  $$('.agent-tab').forEach((tab, i) => tab.setAttribute('aria-pressed', i === index));
  applyTheme(agent);
  swapHero(agent);

  const view = $('#build-view');
  view.style.setProperty('--art', `url(${new URL(imagePath.hero(agent), document.baseURI).href})`);
  view.innerHTML = `
    <div class="build-head">
      <div class="build-title"><h3>${agent.name}</h3><p class="faction">${agent.faction}</p></div>
      ${mindscapeChips(agent.mindscape)}
      <div class="engine-card">
        <img src="${imagePath.engine(agent)}" alt="">
        <span><small>W-Engine · Lv.${agent.engine.level}</small><b>${agent.engine.name}</b></span>
      </div>
    </div>
    <div class="stat-grid">${statGridHTML(agent)}</div>
    ${skillRowHTML(agent)}
    <div class="effective">${effectiveHTML(agent)}</div>
    <div class="set-list">${setListHTML(agent)}</div>
    <div class="disc-grid">${agent.discs.map(discCardHTML).join('')}</div>`;
}

$('#agent-tabs').innerHTML = AGENTS.map((agent, index) => `
  <button class="agent-tab" data-index="${index}" aria-pressed="false">
    <img src="${imagePath.avatar(agent)}" alt="" loading="lazy">
    ${agent.mindscape ? `<i>${agent.mindscape}</i>` : ''}${agent.name}
  </button>`).join('');

$('#agent-tabs').addEventListener('click', (event) => {
  const tab = event.target.closest('.agent-tab');
  if (tab) showAgent(Number(tab.dataset.index));
});

showAgent(AGENTS.findIndex((agent) => agent.id === currentHeroId));
