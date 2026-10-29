// Site-wide progressive enhancement. Every feature here degrades gracefully:
// links still navigate, <details> still open, forms still validate natively.

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ---------- Header: scrolled state ---------- */
function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  const chat = $('.whatsapp');
  const update = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 8);
    chat?.toggleAttribute('data-collapsed', window.scrollY > 240);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Desktop menus ---------- */
function initMenus() {
  const items = $$('[data-menu]');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  let closeTimer: number | undefined;

  const setOpen = (item: HTMLElement, open: boolean) => {
    item.toggleAttribute('data-open', open);
    $('button', item)?.setAttribute('aria-expanded', String(open));
  };
  const closeAll = (except?: HTMLElement) => items.forEach((i) => i !== except && setOpen(i, false));

  items.forEach((item) => {
    const trigger = $<HTMLButtonElement>('button', item)!;
    trigger.addEventListener('click', () => {
      const open = !item.hasAttribute('data-open');
      closeAll(item);
      setOpen(item, open);
    });
    item.addEventListener('pointerenter', (e) => {
      if (!hoverCapable.matches || (e as PointerEvent).pointerType !== 'mouse') return;
      window.clearTimeout(closeTimer);
      closeAll(item);
      setOpen(item, true);
    });
    item.addEventListener('pointerleave', (e) => {
      if (!hoverCapable.matches || (e as PointerEvent).pointerType !== 'mouse') return;
      closeTimer = window.setTimeout(() => setOpen(item, false), 160);
    });
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget as Node)) setOpen(item, false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = items.find((i) => i.hasAttribute('data-open'));
    if (open) {
      setOpen(open, false);
      $<HTMLButtonElement>('button', open)?.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('[data-menu]')) closeAll();
  });
}

/* ---------- Dialogs ---------- */
function initDialogs() {
  document.addEventListener('click', (e) => {
    const target = e.target as Element;
    const opener = target.closest<HTMLElement>('[data-open-dialog]');
    if (opener) {
      const dialog = document.getElementById(opener.dataset.openDialog!) as HTMLDialogElement | null;
      if (dialog) {
        e.preventDefault();
        $$<HTMLDialogElement>('dialog[open]').forEach((d) => d !== dialog && d.close());
        dialog.showModal();
        dialog.dispatchEvent(new CustomEvent('dialog:open', { detail: opener }));
      }
      return;
    }
    if (target.closest('[data-close-dialog]')) {
      target.closest('dialog')?.close();
      return;
    }
    // Click on the backdrop (outside the dialog box) closes it.
    if (target instanceof HTMLDialogElement && target.open) {
      const r = target.getBoundingClientRect();
      const { clientX: x, clientY: y } = e as MouseEvent;
      if (x < r.left || x > r.right || y < r.top || y > r.bottom) target.close();
    }
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  // Lists marked data-reveal-stagger reveal their children in sequence.
  $$('[data-reveal-stagger]').forEach((list) => {
    const step = Number(list.dataset.revealStagger) || 70;
    Array.from(list.children).forEach((child, i) => {
      const el = child as HTMLElement;
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
      el.style.setProperty('--reveal-delay', `${i * step}ms`);
    });
  });
  const els = $$('[data-reveal]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Forms ---------- */
function messageFor(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, label: string) {
  const v = input.validity;
  if (v.valueMissing) return input instanceof HTMLSelectElement ? `Please choose a ${label.toLowerCase()}.` : `Please enter your ${label.toLowerCase()}.`;
  if (v.typeMismatch && input.type === 'email') return 'Please enter a valid email address.';
  if (v.patternMismatch && input.type === 'tel') return 'Please enter a valid phone number (at least 10 digits).';
  return input.validationMessage;
}

function initForms() {
  $$<HTMLFormElement>('form[data-enquiry]').forEach((form) => {
    const controls = $$<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input:not([type=hidden]), select, textarea', form);
    const labelOf = (c: Element) => form.querySelector(`label[for="${c.id}"]`)?.childNodes[0]?.textContent?.trim() ?? 'value';

    const check = (c: (typeof controls)[number]) => {
      const field = c.closest('.field');
      const err = document.getElementById(`${c.id}-error`);
      const ok = c.checkValidity();
      field?.toggleAttribute('data-invalid', !ok);
      c.setAttribute('aria-invalid', String(!ok));
      if (err) err.textContent = ok ? '' : messageFor(c, labelOf(c));
      return ok;
    };

    controls.forEach((c) => {
      c.addEventListener('blur', () => c.value && check(c));
      c.addEventListener('input', () => c.closest('.field')?.hasAttribute('data-invalid') && check(c));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = controls.filter((c) => !check(c));
      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      const status = $('.enquiry__status', form)!;
      const title = $('[data-status-title]', status)!;
      const text = $('[data-status-text]', status)!;
      const submit = $<HTMLButtonElement>('button[type=submit]', form)!;
      const endpoint = form.dataset.endpoint?.trim();
      const to = form.dataset.mailto!;

      const show = (state: 'ok' | 'error', heading: string, body: string) => {
        status.dataset.state = state;
        title.textContent = heading;
        text.textContent = body;
        status.hidden = false;
        status.focus();
      };

      if (endpoint) {
        submit.setAttribute('aria-busy', 'true');
        try {
          const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(String(res.status));
          form.reset();
          show('ok', 'Thank you — we have received your details.', 'Our team will get in touch with you shortly.');
        } catch {
          show('error', 'Sorry, your message could not be sent.', 'Please try again in a moment, or use the contact details below.');
        } finally {
          submit.removeAttribute('aria-busy');
        }
        return;
      }

      // No form endpoint configured: hand the enquiry to the visitor's email app.
      const lines = controls
        .filter((c) => c.type !== 'file' && c.value.trim())
        .map((c) => `${labelOf(c)}: ${c.value.trim()}`);
      const hasFile = controls.some((c) => c.type === 'file');
      if (hasFile) lines.push('', 'Resume: attached to this email.');
      const href = `mailto:${to}?subject=${encodeURIComponent(form.dataset.subject ?? 'Website enquiry')}&body=${encodeURIComponent(lines.join('\n'))}`;
      window.location.href = href;
      show(
        'ok',
        'Your email is ready to send.',
        `We've opened your email app with your details addressed to ${to}.${hasFile ? ' Please attach your resume before sending.' : ''} If nothing opened, please write to us directly.`,
      );
    });
  });
}

/* ---------- Search ---------- */
type Entry = { t: string; u: string; k: string; d?: string };
const KIND_ICON: Record<string, string> = {
  Product: '<path d="M14.5 4.5 19.5 9.5"/><path d="M18 3l3 3-8.5 8.5-3-3L18 3Z"/><path d="M9.5 11.5c-2.5 0-4.5 1.6-4.5 4.5 0 1.5-.8 2.6-2 3 4 2 9 .5 9.5-4.5"/>',
  Document: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/>',
  Job: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"/>',
  News: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17"/>',
  Page: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
function highlight(text: string, terms: string[]) {
  let out = escapeHtml(text);
  terms.forEach((t) => {
    if (t.length < 2) return;
    const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    out = out.replace(re, '<mark>$1</mark>');
  });
  return out;
}

function initSearch() {
  const dialog = document.getElementById('dialog-search') as HTMLDialogElement | null;
  if (!dialog) return;
  const input = $<HTMLInputElement>('[data-search-input]', dialog)!;
  const list = $('[data-search-results]', dialog)!;
  const count = $('[data-search-count]', dialog)!;
  const suggest = $('[data-search-suggest]', dialog)!;
  let index: Entry[] | null = null;
  let loading: Promise<Entry[]> | null = null;

  const load = () =>
    (loading ??= fetch('/search-index.json')
      .then((r) => r.json() as Promise<Entry[]>)
      .then((d) => (index = d)));

  const render = () => {
    const q = input.value.trim().toLowerCase();
    suggest.hidden = Boolean(q);
    if (!q || !index) {
      list.innerHTML = '';
      count.textContent = '';
      return;
    }
    const terms = q.split(/\s+/).filter(Boolean);
    const results = index
      .map((e) => {
        const t = e.t.toLowerCase();
        const d = (e.d ?? '').toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (t.includes(term)) score += t.startsWith(term) ? 6 : 4;
          else if (d.includes(term)) score += 1;
          else return null;
        }
        if (e.k === 'Product' || e.k === 'Page') score += 1;
        return { e, score };
      })
      .filter((r): r is { e: Entry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);

    count.textContent = results.length ? `${results.length} result${results.length === 1 ? '' : 's'}` : `No results for “${input.value.trim()}”`;
    list.innerHTML = results
      .map(({ e }) => {
        const external = /^https?:/.test(e.u);
        return `<li><a href="${escapeHtml(e.u)}"${external ? ' target="_blank" rel="noopener"' : ''}>
          <span class="sr-type"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${KIND_ICON[e.k] ?? KIND_ICON.Page}</svg></span>
          <span><span class="sr-title">${highlight(e.t, terms)}</span>${e.d ? `<span class="sr-meta">${escapeHtml(e.d.length > 110 ? e.d.slice(0, 110) + '…' : e.d)}</span>` : ''}</span>
          <span class="sr-kind">${escapeHtml(e.k)}${external ? ' ↗' : ''}</span>
        </a></li>`;
      })
      .join('');
  };

  let t: number | undefined;
  input.addEventListener('input', () => {
    window.clearTimeout(t);
    t = window.setTimeout(() => (index ? render() : load().then(render)), 60);
  });
  dialog.addEventListener('dialog:open', () => {
    load().then(render);
    window.setTimeout(() => input.focus(), 30);
  });
  $$<HTMLButtonElement>('[data-search-term]', dialog).forEach((b) =>
    b.addEventListener('click', () => {
      input.value = b.dataset.searchTerm!;
      load().then(render);
      input.focus();
    }),
  );
  $<HTMLFormElement>('[data-search-form]', dialog)!.addEventListener('submit', (e) => {
    e.preventDefault();
    const first = $<HTMLAnchorElement>('a', list);
    if (first) first.click();
  });

  // Support the legacy WordPress search URL (/?s=keyword).
  const s = new URLSearchParams(window.location.search).get('s');
  if (s) {
    input.value = s;
    dialog.showModal();
    load().then(render);
  }
}

initHeader();
initMenus();
initDialogs();
initReveal();
initForms();
initSearch();
