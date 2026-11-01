(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const collage = document.querySelector('.collage');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const progress = document.querySelector('.progress');
  const experience = document.querySelector('.experience');
  const sticky = document.querySelector('.experience-sticky');
  const counter = document.querySelector('.story-counter');
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0, frame = 0;

  function animateCollage() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    collage.style.setProperty('--mx', currentX.toFixed(4));
    collage.style.setProperty('--my', currentY.toFixed(4));
    if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.001) frame = requestAnimationFrame(animateCollage);
    else frame = 0;
  }
  function moveCollage(x, y) {
    targetX = x; targetY = y;
    if (!frame) frame = requestAnimationFrame(animateCollage);
  }
  document.querySelector('.hero').addEventListener('pointermove', event => {
    if (!finePointer.matches || reduceMotion.matches) return;
    const rect = collage.getBoundingClientRect();
    moveCollage(Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)), Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1)));
  }, { passive: true });
  document.querySelector('.hero').addEventListener('pointerleave', () => moveCollage(0, 0));

  if (!reduceMotion.matches) document.documentElement.classList.add('motion-ready');
  let scrollFrame = false;
  function updateScroll() {
    const total = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
    const sceneRect = experience.getBoundingClientRect();
    const sceneRange = Math.max(1, experience.offsetHeight - sticky.offsetHeight);
    const scene = Math.max(0, Math.min(1, -sceneRect.top / sceneRange));
    experience.style.setProperty('--scene', reduceMotion.matches ? '1' : scene.toFixed(4));
    const step = reduceMotion.matches ? '2' : String(Math.min(2, Math.floor(scene * 3)));
    if (experience.dataset.step !== step) {
      experience.dataset.step = step;
      counter.textContent = `0${Number(step) + 1} — 03`;
    }
    const heroElement = document.querySelector('.hero');
    const hero = heroElement.getBoundingClientRect();
    const exit = reduceMotion.matches ? '0' : Math.max(0, Math.min(1, -hero.top / hero.height)).toFixed(4);
    collage.style.setProperty('--exit', exit);
    heroElement.style.setProperty('--exit', exit);
    if (!finePointer.matches && !reduceMotion.matches) {
      const rect = collage.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) moveCollage(0, Math.max(-0.4, Math.min(0.4, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight)));
    }
    scrollFrame = false;
  }
  addEventListener('scroll', () => {
    if (!scrollFrame) { requestAnimationFrame(updateScroll); scrollFrame = true; }
  }, { passive: true });
  addEventListener('resize', updateScroll, { passive: true });
  updateScroll();
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) {
      document.documentElement.classList.remove('motion-ready');
      moveCollage(0, 0);
    }
    updateScroll();
  });

  document.querySelector('#interest-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const contact = document.querySelector('#contact').value.trim();
    const status = document.querySelector('.form-status');
    if (name.length < 2 || contact.length < 5) {
      status.textContent = 'Completá tu nombre y un mail o WhatsApp para seguir.';
      return;
    }
    const message = `¡Hola, Presencia! Soy ${name}. Me gustaría conocer las clases de teatro y consultar por grupos, horarios y disponibilidad. Mi contacto es ${contact}.`;
    const url = `https://wa.me/5491133577872?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    status.replaceChildren();
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Tu consulta está lista. Abrí WhatsApp para enviarla ↗';
    status.append(link);
  });
})();
