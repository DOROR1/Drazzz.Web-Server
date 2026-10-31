/* Navigasi aktif, jam live (WIB), dan gerak parallax foto hero */

/* Tandai menu yang sesuai dengan bagian yang sedang dilihat */
const navLinks = [...$$('.nav li a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
    navLinks.forEach((link) => link.classList.toggle('on', link.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-40% 0px -50% 0px' });
$$('#home, #about, #showcase, #build, #proyek, #contact').forEach((section) => sectionObserver.observe(section));

/* Jam live di nav bawah */
const clockFormat = jakartaTime({
  weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
});
function updateClock() {
  $('#clock').textContent = clockFormat.format(new Date()).replace(/(\d)\.(\d)/g, '$1:$2') + ' WIB';
}
updateClock();
setInterval(updateClock, 1000);

/* Foto hero bergeser pelan mengikuti kursor */
const heroPanel = $('.art');
if (!prefersReducedMotion) {
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
