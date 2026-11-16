/* Jam live (WIB) di nav bawah dan gerak parallax foto hero (halaman Beranda) */

/* Jam live di nav bawah (format ikut bahasa) */
const clockOptions = {
  weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
};
function updateClock() {
  $('#clock').textContent = jakartaTime(clockOptions).format(new Date()).replace(/(\d)\.(\d)/g, '$1:$2') + ' WIB';
}
updateClock();
setInterval(updateClock, 1000);
document.addEventListener('app-language-change', updateClock);

/* Foto hero bergeser pelan mengikuti kursor */
const heroPanel = $('.art');
if (heroPanel && !prefersReducedMotion) {
  heroPanel.addEventListener('pointermove', (event) => {
    const box = heroPanel.getBoundingClientRect();
    heroPanel.style.setProperty('--px', ((event.clientX - box.left) / box.width - 0.5) * -26 + 'px');
    heroPanel.style.setProperty('--py', ((event.clientY - box.top) / box.height - 0.5) * -18 + 'px');
  });
  heroPanel.addEventListener('pointerleave', () => {
    heroPanel.style.setProperty('--px', '0px');
    heroPanel.style.setProperty('--py', '0px');
  });
}
