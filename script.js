/* =========================================================
   Site settings — edit these to update every page at once
   ========================================================= */
const SITE = {
  // true = "Open", false = "Closed"
  commissionsOpen: false,

  // Leave a value empty ('') to hide that contact.
  contacts: {
    github: 'https://github.com/RealCeedC5',
    discord: '',   // your Discord username, e.g. 'c5dev'
    twitter: ''    // full link, e.g. 'https://x.com/yourname'
  }
};

/* Words the script writes itself, in both languages.
   Page text lives in the HTML: English inside each tag, Thai in its data-th attribute. */
const WORDS = {
  en: {
    open: 'Open', closed: 'Closed',
    copyOpen: "I'm taking new work. Message me with what you need.",
    copyClosed: "I'm not taking new work right now, but you can still reach me.",
    copy: 'Copy', copied: 'Copied'
  },
  th: {
    open: 'เปิดรับ', closed: 'ปิดรับ',
    copyOpen: 'ตอนนี้เปิดรับงานอยู่ ทักมาบอกได้เลยว่าต้องการอะไร',
    copyClosed: 'ตอนนี้ยังไม่รับงานใหม่ แต่ทักมาคุยได้นะ',
    copy: 'คัดลอก', copied: 'คัดลอกแล้ว'
  }
};

/* ---------- language ---------- */
const LANG_KEY = 'c5-lang';
let lang = 'en';
try { lang = localStorage.getItem(LANG_KEY) || ''; } catch (e) { lang = ''; }
if (lang !== 'en' && lang !== 'th') lang = /^th\b/i.test(navigator.language || '') ? 'th' : 'en';
const w = key => WORDS[lang][key];

const TH_ATTRS = ['alt', 'aria-label', 'title'];

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-th]').forEach(el => {
    if (!el.hasAttribute('data-en')) el.setAttribute('data-en', el.innerHTML);
    el.innerHTML = el.getAttribute(lang === 'th' ? 'data-th' : 'data-en');
  });
  for (const a of TH_ATTRS) {
    document.querySelectorAll('[data-th-' + a + ']').forEach(el => {
      if (!el.hasAttribute('data-en-' + a)) el.setAttribute('data-en-' + a, el.getAttribute(a) || '');
      el.setAttribute(a, el.getAttribute((lang === 'th' ? 'data-th-' : 'data-en-') + a));
    });
  }
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  applyStatus();
  applyYear();
  document.querySelectorAll('[data-copy-btn]').forEach(b => { b.textContent = w('copy'); });
  document.querySelectorAll('.vid').forEach(syncVideoButton);
  if (typeof lbRender === 'function' && lb && lb.open) lbRender();
}

document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage blocked: still switch for this page */ }
  applyLang();
}));

/* ---------- commission status ---------- */
function applyStatus() {
  const open = SITE.commissionsOpen;
  document.querySelectorAll('[data-status]').forEach(el => {
    el.textContent = open ? w('open') : w('closed');
    el.classList.toggle('status-open', open);
    el.classList.toggle('status-closed', !open);
  });
  document.querySelectorAll('[data-status-pill]').forEach(el => el.classList.toggle('is-open', open));
  document.querySelectorAll('[data-status-bool]').forEach(el => { el.textContent = String(open); });
  document.querySelectorAll('[data-status-copy]').forEach(el => { el.textContent = open ? w('copyOpen') : w('copyClosed'); });
}

/* ---------- footer year ---------- */
function applyYear() {
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ---------- current page in the nav ---------- */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href').split('/').pop() === page) a.setAttribute('aria-current', 'page');
});

/* ---------- contact cards ---------- */
const strip = url => url.replace(/^https?:\/\/(www\.)?/, '');
const list = document.getElementById('contact-list');
if (list) {
  const c = SITE.contacts;
  const cards = [];
  if (c.discord) cards.push({ icon: 'discord-icon.png', name: 'Discord', value: c.discord, copy: true });
  if (c.twitter) cards.push({ icon: 'twitter-icon.png', name: 'Twitter / X', value: strip(c.twitter), href: c.twitter });
  if (c.github)  cards.push({ icon: 'github-icon.png', name: 'GitHub', value: strip(c.github), href: c.github });

  list.innerHTML = '';
  for (const card of cards) {
    const el = document.createElement(card.href ? 'a' : 'div');
    el.className = 'contact-card';
    if (card.href) { el.href = card.href; el.target = '_blank'; el.rel = 'noopener'; }
    el.innerHTML =
      '<img class="badge" src="' + card.icon + '" alt="">' +
      '<span class="contact-text"><span class="contact-name"></span><span class="contact-value"></span></span>';
    el.querySelector('.contact-name').textContent = card.name;
    el.querySelector('.contact-value').textContent = card.value;
    if (card.copy) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-small';
      btn.setAttribute('data-copy-btn', '');
      btn.textContent = w('copy');
      btn.addEventListener('click', () => {
        const done = () => { btn.textContent = w('copied'); setTimeout(() => { btn.textContent = w('copy'); }, 1600); };
        const select = () => {
          const r = document.createRange(); r.selectNodeContents(el.querySelector('.contact-value'));
          const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(card.value).then(done, select);
        else select();
      });
      el.appendChild(btn);
    } else {
      const go = document.createElement('span');
      go.className = 'go'; go.setAttribute('aria-hidden', 'true'); go.textContent = '↗';
      el.appendChild(go);
    }
    list.appendChild(el);
  }
}

/* ---------- footer icons ---------- */
const base = document.querySelector('link[href$="styles.css"]').getAttribute('href').replace('styles.css', '');
document.querySelectorAll('.social-icons').forEach(box => {
  const c = SITE.contacts, links = [];
  if (c.github) links.push([c.github, 'github-icon.png', 'GitHub']);
  if (c.twitter) links.push([c.twitter, 'twitter-icon.png', 'Twitter / X']);
  if (c.discord) links.push([base + 'contact.html', 'discord-icon.png', 'Discord: ' + c.discord]);
  box.innerHTML = '';
  for (const [href, img, label] of links) {
    const a = document.createElement('a');
    a.href = href; a.setAttribute('aria-label', label); a.title = label;
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    a.innerHTML = '<img src="' + base + img + '" alt="">';
    box.appendChild(a);
  }
});

/* ---------- gameplay video: pause button, reduced motion ---------- */
const calm = matchMedia('(prefers-reduced-motion: reduce)');
function syncVideoButton(box) {
  const v = box.querySelector('video'), b = box.querySelector('.vid-toggle');
  if (!v || !b) return;
  const paused = v.paused;
  const key = 'data-label-' + (paused ? 'play' : 'pause') + (lang === 'th' ? '-th' : '');
  b.setAttribute('aria-label', b.getAttribute(key));
  b.classList.toggle('is-paused', paused);
}
document.querySelectorAll('.vid').forEach(box => {
  const v = box.querySelector('video'), b = box.querySelector('.vid-toggle');
  if (!v || !b) return;
  if (calm.matches) { v.removeAttribute('autoplay'); v.pause(); }
  b.addEventListener('click', () => { if (v.paused) v.play().catch(() => {}); else v.pause(); });
  v.addEventListener('play', () => syncVideoButton(box));
  v.addEventListener('pause', () => syncVideoButton(box));
  syncVideoButton(box);
});

/* ---------- screenshot lightbox ---------- */
const lb = document.querySelector('.lightbox');
const shots = [...document.querySelectorAll('.thumb')];
let lbIndex = 0;
function lbRender() {
  const a = shots[lbIndex], img = lb.querySelector('img');
  img.src = a.getAttribute('href');
  img.alt = a.querySelector('img').getAttribute('alt');
  lb.querySelector('.lb-cap').textContent = a.getAttribute(lang === 'th' ? 'data-cap-th' : 'data-cap');
  lb.querySelector('.lb-count').textContent = (lbIndex + 1) + ' / ' + shots.length;
}
function lbGo(step) { lbIndex = (lbIndex + step + shots.length) % shots.length; lbRender(); }
if (lb && shots.length && typeof lb.showModal === 'function') {
  shots.forEach((a, i) => a.addEventListener('click', e => {
    e.preventDefault();
    lbIndex = i; lbRender(); lb.showModal();
  }));
  lb.querySelector('.lb-prev').addEventListener('click', () => lbGo(-1));
  lb.querySelector('.lb-next').addEventListener('click', () => lbGo(1));
  lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'FIGURE') lb.close(); });
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); lbGo(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); lbGo(1); }
  });
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) lbGo(dx < 0 ? 1 : -1);
  });
}

applyLang();
