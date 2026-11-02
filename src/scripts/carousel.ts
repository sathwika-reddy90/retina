// Scroll-snap carousels: the track scrolls natively (touch, trackpad, keyboard), the
// arrow buttons step by one card, and optional dots track the current slide.
//
//   <div data-carousel>
//     <div data-carousel-track> …items… </div>
//     <button data-carousel-prev> <button data-carousel-next>
//     <div data-carousel-dots></div>   (optional; one button per item is generated)
//   </div>

export function initCarousels(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-carousel]').forEach((el) => {
    if (el.dataset.carouselReady) return;
    el.dataset.carouselReady = '1';
    const track = el.querySelector<HTMLElement>('[data-carousel-track]')!;
    const prev = el.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = el.querySelector<HTMLButtonElement>('[data-carousel-next]');
    const dotsEl = el.querySelector<HTMLElement>('[data-carousel-dots]');
    const items = Array.from(track.children) as HTMLElement[];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const step = () => {
      const a = items[0]?.getBoundingClientRect();
      const b = items[1]?.getBoundingClientRect();
      return a && b ? b.left - a.left : track.clientWidth;
    };
    const current = () => Math.round(track.scrollLeft / step());
    const go = (i: number) => track.scrollTo({ left: Math.max(0, i) * step(), behavior: reduce.matches ? 'auto' : 'smooth' });

    const dots = dotsEl
      ? items.map((_, i) => {
          const d = document.createElement('button');
          d.type = 'button';
          d.className = 'carousel-dot';
          d.setAttribute('aria-label', `Go to slide ${i + 1} of ${items.length}`);
          d.addEventListener('click', () => go(i));
          dotsEl.append(d);
          return d;
        })
      : [];

    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      const i = current();
      dots.forEach((d, j) => d.setAttribute('aria-current', String(i === j)));
    };

    prev?.addEventListener('click', () => go(current() - 1));
    next?.addEventListener('click', () => go(current() + 1));
    track.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(update).observe(track);
    update();
  });
}
