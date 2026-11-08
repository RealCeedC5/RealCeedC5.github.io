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

/* ---------- commission status ---------- */
const open = SITE.commissionsOpen;
document.querySelectorAll('[data-status]').forEach(el => {
  el.textContent = open ? 'Open' : 'Closed';
  el.classList.toggle('status-open', open);
  el.classList.toggle('status-closed', !open);
});
document.querySelectorAll('[data-status-pill]').forEach(el => el.classList.toggle('is-open', open));
document.querySelectorAll('[data-status-bool]').forEach(el => { el.textContent = String(open); });
document.querySelectorAll('[data-status-copy]').forEach(el => {
  el.textContent = open
    ? "I'm taking new work. Message me with what you need."
    : "I'm not taking new work right now, but you can still reach me.";
});

/* ---------- current page in the nav ---------- */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href').split('/').pop() === page) a.setAttribute('aria-current', 'page');
});

/* ---------- footer year ---------- */
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

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
      btn.textContent = 'Copy';
      btn.addEventListener('click', () => {
        const done = () => { btn.textContent = 'Copied'; setTimeout(() => { btn.textContent = 'Copy'; }, 1600); };
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
