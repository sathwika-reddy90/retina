// Fading slideshow with arrows, dots, keyboard control and an accessible auto-play.
//
//   <section data-slideshow data-interval="6000">
//     <article data-slide class="is-active">…</article>  <article data-slide>…</article>
//     <button data-slide-prev> <button data-slide-next> <button data-slide-pause>
//     <div data-slide-dots></div>   (one button per slide is generated)
//   </section>
//
// Auto-play pauses while the slideshow is hovered, focused or off-screen and when the
// tab is hidden; it stops for good once the visitor uses any control. It never starts
// for visitors who prefer reduced motion.

export function initSlideshows(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-slideshow]').forEach((el) => {
    if (el.dataset.slideshowReady) return;
    el.dataset.slideshowReady = '1';
    const slides = Array.from(el.querySelectorAll<HTMLElement>('[data-slide]'));
    if (slides.length < 2) return;
    const prev = el.querySelector<HTMLButtonElement>('[data-slide-prev]');
    const next = el.querySelector<HTMLButtonElement>('[data-slide-next]');
    const pauseBtn = el.querySelector<HTMLButtonElement>('[data-slide-pause]');
    const dotsEl = el.querySelector<HTMLElement>('[data-slide-dots]');
    const interval = Number(el.dataset.interval) || 6000;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let index = Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));
    let timer: number | undefined;
    let stopped = reduce; // explicit pause, user interaction, or reduced motion
    const holds = new Set<string>(); // temporary reasons: hover, focus, hidden tab, off-screen

    const dots = dotsEl
      ? slides.map((s, i) => {
          const d = document.createElement('button');
          d.type = 'button';
          d.className = 'slideshow-dot';
          d.setAttribute('aria-label', `Show slide ${i + 1} of ${slides.length}: ${s.dataset.title ?? ''}`.trim());
          d.addEventListener('click', () => { interact(); show(i); });
          dotsEl.append(d);
          return d;
        })
      : [];

    function show(i: number) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, j) => {
        const on = j === index;
        s.classList.toggle('is-active', on);
        s.toggleAttribute('inert', !on);
        s.setAttribute('aria-hidden', String(!on));
      });
      dots.forEach((d, j) => d.setAttribute('aria-current', String(j === index)));
      schedule();
    }
    function schedule() {
      window.clearTimeout(timer);
      if (stopped || holds.size) return;
      timer = window.setTimeout(() => show(index + 1), interval);
    }
    function setStopped(v: boolean) {
      stopped = v;
      if (pauseBtn) {
        pauseBtn.setAttribute('aria-pressed', String(v));
        pauseBtn.setAttribute('aria-label', v ? 'Play slideshow' : 'Pause slideshow');
      }
      schedule();
    }
    function interact() { if (!stopped) setStopped(true); }
    const hold = (reason: string, on: boolean) => { if (on) holds.add(reason); else holds.delete(reason); schedule(); };

    prev?.addEventListener('click', () => { interact(); show(index - 1); });
    next?.addEventListener('click', () => { interact(); show(index + 1); });
    pauseBtn?.addEventListener('click', () => setStopped(!stopped));
    if (reduce && pauseBtn) pauseBtn.hidden = true;

    // Any interaction inside a slide (e.g. picking a shade) also ends auto-play.
    slides.forEach((s) => s.addEventListener('pointerdown', interact));

    // Touch swipe: a mostly-horizontal swipe changes slide. Vertical movement is left to
    // the browser (touch-action: pan-y on the slides), so page scrolling is never blocked.
    let startX = 0, startY = 0, tracking = false;
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener('touchend', (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      interact();
      show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
    el.addEventListener('keydown', (e) => {
      const t = e.target as HTMLElement;
      if (!t.closest('[data-slide-prev], [data-slide-next], [data-slide-dots]')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); interact(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); interact(); show(index + 1); }
    });
    el.addEventListener('pointerenter', (e) => { if ((e as PointerEvent).pointerType === 'mouse') hold('hover', true); });
    el.addEventListener('pointerleave', () => hold('hover', false));
    el.addEventListener('focusin', () => hold('focus', true));
    el.addEventListener('focusout', (e) => { if (!el.contains(e.relatedTarget as Node)) hold('focus', false); });
    document.addEventListener('visibilitychange', () => hold('hidden', document.hidden));
    new IntersectionObserver(([entry]) => hold('offscreen', !entry.isIntersecting), { threshold: 0.25 }).observe(el);

    setStopped(stopped);
    show(index);
  });
}
