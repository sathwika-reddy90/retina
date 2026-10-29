import stripsJson from '@/data/shades.json';

type Shade = { code: string; hex: string; rgb: string; name?: string };
type Strip = { id: string; family: string; shades: Shade[] };
type Tone = 'all' | 'light' | 'medium' | 'dark';
const strips = stripsJson as Strip[];

/** CIE L* (perceived lightness, 0–100) from a hex colour. */
function lightness(hex: string) {
  const lin = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const y = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  return 116 * (y > 0.008856 ? Math.cbrt(y) : 7.787 * y + 16 / 116) - 16;
}
// These cut points split the 1,002-shade catalogue into near-equal thirds.
const toneOf = (hex: string): Exclude<Tone, 'all'> => {
  const l = lightness(hex);
  return l >= 84 ? 'light' : l >= 66 ? 'medium' : 'dark';
};
const inkOf = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? 'dark' : 'light';
};

const byCode = new Map<string, Shade & { family: string; tone: Exclude<Tone, 'all'> }>();
for (const s of strips) for (const sh of s.shades) byCode.set(sh.code, { ...sh, family: s.family, tone: toneOf(sh.hex) });

const CHECK_SVG =
  '<svg class="icon swatch__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

/** Arrow-key navigation for a group of role="radio" buttons (roving tabindex). */
function radioKeys(group: HTMLElement, selector: string, onPick: (el: HTMLElement) => void, columns = 0) {
  group.addEventListener('keydown', (e) => {
    const items = Array.from(group.querySelectorAll<HTMLElement>(selector)).filter((el) => el.offsetParent !== null);
    const cur = (e.target as HTMLElement).closest<HTMLElement>(selector);
    if (!cur) return;
    const i = items.indexOf(cur);
    let next = -1;
    if (e.key === 'ArrowRight') next = i + 1;
    else if (e.key === 'ArrowLeft') next = i - 1;
    else if (e.key === 'ArrowDown') next = columns ? nextInColumn(items, i, 1) : i + 1;
    else if (e.key === 'ArrowUp') next = columns ? nextInColumn(items, i, -1) : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;
    e.preventDefault();
    const el = items[Math.max(0, Math.min(items.length - 1, next))];
    if (el) {
      el.focus();
      onPick(el);
    }
  });
}
/** In the shade grid each row is one shade strip, so Up/Down keep the column position. */
function nextInColumn(items: HTMLElement[], i: number, dir: 1 | -1) {
  const cur = items[i];
  const row = cur.parentElement!;
  const col = Array.from(row.children).indexOf(cur);
  let r = dir === 1 ? row.nextElementSibling : row.previousElementSibling;
  while (r && !r.children.length) r = dir === 1 ? r.nextElementSibling : r.previousElementSibling;
  if (!r) return i;
  const target = r.children[Math.min(col, r.children.length - 1)] as HTMLElement;
  return items.indexOf(target);
}
function setRadio(group: ParentNode, selector: string, match: (el: HTMLElement) => boolean) {
  group.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const on = match(el);
    el.setAttribute('aria-checked', String(on));
    el.tabIndex = on ? 0 : -1;
  });
}

function initOne(root: HTMLElement) {
  const isPage = root.dataset.variant === 'full';
  const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const stage = $('[data-stage]');
  const deck = $('[data-deck]');
  const deckWrap = $('[data-deck-wrap]');
  const count = $('[data-count]');
  const search = $<HTMLInputElement>('[data-search]');
  const clear = $<HTMLButtonElement>('[data-clear]');
  const roomsEl = $('[data-rooms]');
  const familiesEl = $('[data-families]');
  const tonesEl = $('[data-tones]');
  const split = $<HTMLInputElement>('[data-split]');
  const compareBtn = $<HTMLButtonElement>('[data-compare]');
  const steps = $('[data-steps]');
  const roomImg = $<HTMLImageElement>('[data-layer="room"]');
  const shadeImg = root.querySelector<HTMLImageElement>('[data-layer="shade"]');
  const lightImg = $<HTMLImageElement>('[data-layer="light"]');

  const initial = root.dataset.initial!;
  const state = {
    current: initial,
    family: byCode.get(initial)?.family ?? 'yellows',
    tone: 'all' as Tone,
    query: '',
    compare: false,
    a: initial,
    b: initial,
    room: roomsEl.querySelector<HTMLElement>('[aria-checked="true"]')?.dataset.room ?? '',
  };

  const roomLabel = () => roomsEl.querySelector('[aria-checked="true"] .room__label')?.textContent?.trim() ?? 'Room';
  const describe = (code: string) => {
    const s = byCode.get(code)!;
    return s.name ? `${s.name} · ${s.code}` : s.code;
  };

  /* ---------- Steps ---------- */
  const setSteps = (touched: boolean) => {
    const set = (n: number, st: string) => {
      const li = steps.querySelector<HTMLElement>(`[data-step="${n}"]`)!;
      li.dataset.state = st;
      if (st === 'current') li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
    };
    set(1, 'done');
    set(2, touched ? 'done' : 'current');
    set(3, touched ? 'done' : 'todo');
    root.toggleAttribute('data-touched', touched);
  };

  /* ---------- Painting ---------- */
  const paint = () => {
    const a = byCode.get(state.compare ? state.a : state.current)!;
    const b = byCode.get(state.compare ? state.b : state.current)!;
    stage.style.setProperty('--wall-a', a.hex);
    stage.style.setProperty('--wall-b', b.hex);
    roomsEl.style.setProperty('--wall-a', (state.compare ? b : a).hex);
    $('[data-stage-code-text]').textContent = a.code;

    const cur = byCode.get(state.current)!;
    $('[data-current-chip]').style.background = cur.hex;
    $('[data-current-name]').textContent = cur.name ?? cur.code;
    $('[data-current-code]').textContent = cur.name ? cur.code : '';
    $('[data-current-code-sep]').hidden = !cur.name;
    $('[data-current-rgb]').textContent = `RGB ${cur.rgb.replaceAll(',', ', ')}`;
    $('[data-copy-label]').textContent = 'Copy code';

    $('[data-label-a]').textContent = describe(state.a);
    $('[data-label-b]').textContent = describe(state.b);
    $('[data-mini-a]').style.background = byCode.get(state.a)!.hex;
    $('[data-mini-b]').style.background = byCode.get(state.b)!.hex;
    $('[data-mini-a-code]').textContent = state.a;
    $('[data-mini-b-code]').textContent = state.b;

    roomImg.alt = state.compare
      ? `${roomLabel()} compared in ${describe(state.a)} (left) and ${describe(state.b)} (right)`
      : `${roomLabel()} with walls painted in ${describe(state.current)}`;
    setRadio(deck, '.swatch', (el) => el.dataset.code === state.current);
    if (!deck.querySelector('.swatch[tabindex="0"]')) deck.querySelector<HTMLElement>('.swatch')?.setAttribute('tabindex', '0');
  };

  const select = (code: string, opts: { hash?: boolean; touch?: boolean } = {}) => {
    if (!byCode.has(code)) return;
    state.current = code;
    if (state.compare) state.b = code;
    else state.a = state.b = code;
    paint();
    if (opts.touch !== false) setSteps(true);
    if (isPage && opts.hash !== false) history.replaceState(null, '', `#${code}`);
  };

  /* ---------- Shade grid ---------- */
  const render = () => {
    const q = state.query.toLowerCase();
    const matches = new Set<string>();
    const rows: Shade[][] = [];
    for (const s of strips) {
      if (!q && s.family !== state.family) continue;
      const list = s.shades.filter((sh) => {
        const meta = byCode.get(sh.code)!;
        if (state.tone !== 'all' && meta.tone !== state.tone) return false;
        if (!q) return true;
        const hit = sh.code.toLowerCase().includes(q) || Boolean(sh.name?.toLowerCase().includes(q));
        if (hit) matches.add(sh.code);
        return true;
      });
      if (q && !list.some((sh) => matches.has(sh.code))) continue;
      if (list.length) rows.push(list);
    }

    deck.replaceChildren();
    if (!rows.length) {
      const p = document.createElement('p');
      p.className = 'deck__empty';
      p.textContent = q ? `No shades match “${state.query}”. Try a code such as QC0131.` : 'No shades in this depth for this family. Try another tone.';
      deck.append(p);
    }
    const frag = document.createDocumentFragment();
    for (const list of rows) {
      const row = document.createElement('div');
      row.className = 'deck__row';
      row.setAttribute('role', 'presentation');
      for (const sh of list) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'swatch';
        b.setAttribute('role', 'radio');
        b.style.setProperty('--c', sh.hex);
        b.dataset.code = sh.code;
        b.dataset.ink = inkOf(sh.hex);
        b.title = sh.name ? `${sh.name} · ${sh.code}` : sh.code;
        b.setAttribute('aria-label', sh.name ? `${sh.name}, ${sh.code}` : sh.code);
        b.setAttribute('aria-checked', String(sh.code === state.current));
        b.tabIndex = sh.code === state.current ? 0 : -1;
        if (matches.has(sh.code)) b.dataset.match = '';
        b.innerHTML = `<span class="swatch__code" aria-hidden="true">${sh.code}</span>${CHECK_SVG}`;
        row.append(b);
      }
      frag.append(row);
    }
    deck.append(frag);
    if (!deck.querySelector('.swatch[tabindex="0"]')) deck.querySelector<HTMLElement>('.swatch')?.setAttribute('tabindex', '0');

    const n = rows.reduce((t, r) => t + r.length, 0);
    count.textContent = q
      ? `${matches.size} matching shade${matches.size === 1 ? '' : 's'}`
      : `${n} shade${n === 1 ? '' : 's'} available`;
    deck.scrollTop = 0;
    if (!q) revealSelected();
    updateMore();
  };

  /** Scrolls the shade grid (not the page) so the selected swatch is in view. */
  const revealSelected = () => {
    const el = deck.querySelector<HTMLElement>('.swatch[aria-checked="true"]');
    if (!el || deck.scrollHeight <= deck.clientHeight) return;
    const top = el.getBoundingClientRect().top - deck.getBoundingClientRect().top + deck.scrollTop;
    deck.scrollTop = Math.max(0, top - deck.clientHeight / 2 + el.offsetHeight / 2);
  };

  const updateMore = () => {
    deckWrap.toggleAttribute('data-end', deck.scrollTop + deck.clientHeight >= deck.scrollHeight - 8);
  };
  deck.addEventListener('scroll', updateMore, { passive: true });
  new ResizeObserver(updateMore).observe(deck);

  const showFamily = (f: string) => {
    state.family = f;
    state.query = '';
    search.value = '';
    clear.hidden = true;
    setRadio(familiesEl, '[data-family]', (el) => el.dataset.family === f);
    render();
  };
  const showTone = (t: Tone) => {
    state.tone = t;
    setRadio(tonesEl, '[data-tone]', (el) => el.dataset.tone === t);
    render();
  };

  /* ---------- Rooms ---------- */
  const switchRoom = (btn: HTMLElement) => {
    if (btn.dataset.room === state.room) return;
    state.room = btn.dataset.room!;
    setRadio(roomsEl, '[data-room]', (el) => el === btn);
    stage.setAttribute('data-loading', '');
    const srcs = [btn.dataset.src!, btn.dataset.shade ?? '', btn.dataset.light ?? ''];
    Promise.all(
      srcs.filter(Boolean).map(
        (src) =>
          new Promise<void>((done) => {
            const img = new Image();
            img.onload = img.onerror = () => done();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (state.room !== btn.dataset.room) return;
      const w = btn.dataset.w!;
      const h = btn.dataset.h!;
      roomImg.src = srcs[0];
      roomImg.width = Number(w);
      roomImg.height = Number(h);
      if (shadeImg) {
        shadeImg.hidden = !srcs[1];
        if (srcs[1]) shadeImg.src = srcs[1];
      }
      lightImg.hidden = !srcs[2];
      if (srcs[2]) lightImg.src = srcs[2];
      stage.removeAttribute('data-loading');
      paint();
    });
  };

  /* ---------- Events ---------- */
  root.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const sw = t.closest<HTMLElement>('.swatch');
    if (sw) return select(sw.dataset.code!);
    const fam = t.closest<HTMLElement>('[data-family]');
    if (fam) return showFamily(fam.dataset.family!);
    const tone = t.closest<HTMLElement>('[data-tone]');
    if (tone) return showTone(tone.dataset.tone as Tone);
    const room = t.closest<HTMLElement>('[data-room]');
    if (room) return switchRoom(room);
  });
  radioKeys(deck, '.swatch', (el) => select(el.dataset.code!), 7);
  radioKeys(familiesEl, '[data-family]', (el) => showFamily(el.dataset.family!));
  radioKeys(tonesEl, '[data-tone]', (el) => showTone(el.dataset.tone as Tone));
  radioKeys(roomsEl, '[data-room]', (el) => switchRoom(el));

  let typing: number | undefined;
  search.addEventListener('input', () => {
    clear.hidden = !search.value;
    window.clearTimeout(typing);
    typing = window.setTimeout(() => {
      state.query = search.value.trim();
      setRadio(familiesEl, '[data-family]', (el) => !state.query && el.dataset.family === state.family);
      if (state.query) familiesEl.querySelector<HTMLElement>('[data-family]')!.tabIndex = 0;
      render();
    }, 120);
  });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const first = deck.querySelector<HTMLElement>('.swatch[data-match]');
      if (first) {
        select(first.dataset.code!);
        first.focus();
      }
    }
  });
  clear.addEventListener('click', () => {
    showFamily(state.family);
    search.focus();
  });

  $('[data-copy]').addEventListener('click', async () => {
    const label = $('[data-copy-label]');
    try {
      await navigator.clipboard.writeText(state.current);
      label.textContent = 'Copied';
    } catch {
      label.textContent = state.current;
    }
  });

  const setCompare = (on: boolean) => {
    state.compare = on;
    root.toggleAttribute('data-compare', on);
    compareBtn.setAttribute('aria-pressed', String(on));
    $('[data-compare-label]').textContent = on ? 'Exit compare' : 'Compare';
    $('[data-compare-summary]').hidden = !on;
    $('[data-current-label]').textContent = 'Current wall colour';
    split.tabIndex = on ? 0 : -1;
    if (on) {
      state.a = state.b = state.current;
      split.value = '50';
      stage.style.setProperty('--split', '50%');
    } else {
      state.a = state.b = state.current;
    }
    paint();
  };
  compareBtn.addEventListener('click', () => setCompare(!state.compare));
  $('[data-swap]').addEventListener('click', () => {
    [state.a, state.b] = [state.b, state.a];
    state.current = state.b;
    paint();
  });
  split.addEventListener('input', () => stage.style.setProperty('--split', `${split.value}%`));

  $('[data-reset]').addEventListener('click', () => {
    if (state.compare) setCompare(false);
    state.tone = 'all';
    setRadio(tonesEl, '[data-tone]', (el) => el.dataset.tone === 'all');
    const fam = byCode.get(initial)!.family;
    showFamily(fam);
    select(initial, { touch: false, hash: false });
    setSteps(false);
    if (isPage) history.replaceState(null, '', location.pathname + location.search);
  });

  /* ---------- Initial state + shareable #QC… links ---------- */
  const applyHash = () => {
    const code = decodeURIComponent(location.hash.slice(1)).toUpperCase();
    if (!byCode.has(code) || code === state.current) return;
    if (byCode.get(code)!.family !== state.family || state.query) showFamily(byCode.get(code)!.family);
    select(code, { hash: false });
    revealSelected();
  };
  if (isPage) {
    applyHash();
    window.addEventListener('hashchange', applyHash);
  }
  requestAnimationFrame(revealSelected);
  updateMore();
}

export function initVisualizers() {
  document.querySelectorAll<HTMLElement>('[data-viz]').forEach((root) => {
    if (root.dataset.vizReady) return;
    root.dataset.vizReady = '1';
    initOne(root);
  });
}
