/* Agent terpilih (dipilih di Beranda atau Build). Disimpan di browser supaya warna tema
   dan lencana agent di nav tidak ter-reset saat pindah halaman. */

const AGENT_KEY = 'drazzz-agent';
const DEFAULT_AGENT = { id: 'ellen', name: 'Ellen Joe' };

function savedAgent() {
  try { return JSON.parse(localStorage.getItem(AGENT_KEY)) || DEFAULT_AGENT; } catch (error) { return DEFAULT_AGENT; }
}

/* Lencana agent di nav bawah: klik untuk membuka build agent tersebut */
function renderNavAgent() {
  const agent = savedAgent();
  $('#nav-agent').href = 'build.html#' + agent.id;
  $('#nav-agent img').src = `assets/img/b/${agent.id}_av.webp`;
  $('#nav-agent span').textContent = agent.name;
}

/* Pasang palet tema dari warna aksen agent */
function paintTheme(accent) {
  const root = document.documentElement.style;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(accent.substr(i, 2), 16));
  root.setProperty('--accent', accent);
  root.setProperty('--accent-rgb', `${r} ${g} ${b}`);
  root.setProperty('--accent-dark', `rgb(${Math.round(r * .72)} ${Math.round(g * .72)} ${Math.round(b * .72)})`);
}

/* Pilih agent: ganti warna tema, simpan pilihan, perbarui lencana nav */
function selectAgent(agent) {
  const accent = readableAccent(agent.color);
  paintTheme(accent);
  try { localStorage.setItem(AGENT_KEY, JSON.stringify({ id: agent.id, name: agent.name, accent })); } catch (error) { /* abaikan */ }
  renderNavAgent();
}

renderNavAgent();

/* Tab lain atau tombol Back (bfcache) mengubah agent: ikut sinkron */
function syncSavedAgent() {
  const agent = savedAgent();
  if (agent.accent) paintTheme(agent.accent);
  renderNavAgent();
}
addEventListener('storage', (event) => { if (event.key === AGENT_KEY) syncSavedAgent(); });
addEventListener('pageshow', (event) => { if (event.persisted) syncSavedAgent(); });
