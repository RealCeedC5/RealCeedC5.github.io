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
document.querySelectorAll('[data-status]').forEach(el => {
  el.textContent = SITE.commissionsOpen ? 'Open' : 'Closed';
  el.classList.toggle('status-open', SITE.commissionsOpen);
  el.classList.toggle('status-closed', !SITE.commissionsOpen);
});

/* ---------- current page in the nav ---------- */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.setAttribute('aria-current', 'page');
});

/* ---------- footer year ---------- */
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

/* ---------- contact cards ---------- */
const list = document.getElementById('contact-list');
if (list) {
  const c = SITE.contacts;
  const cards = [];
  if (c.discord) cards.push({ icon: 'discord-icon.png', name: 'Discord', value: c.discord, copy: true });
  if (c.twitter) cards.push({ icon: 'twitter-icon.png', name: 'Twitter / X', value: c.twitter.replace(/^https?:\/\/(www\.)?/, ''), href: c.twitter });
  if (c.github)  cards.push({ icon: 'github-icon.png', name: 'GitHub', value: c.github.replace(/^https?:\/\/(www\.)?/, ''), href: c.github });

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
        if (navigator.clipboard) navigator.clipboard.writeText(card.value).then(done, () => {});
        else {
          const r = document.createRange(); r.selectNodeContents(el.querySelector('.contact-value'));
          const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        }
      });
      el.appendChild(btn);
    }
    list.appendChild(el);
  }
}

/* ---------- footer icons ---------- */
document.querySelectorAll('.social-icons').forEach(box => {
  const c = SITE.contacts, links = [];
  if (c.github) links.push([c.github, 'github-icon.png', 'GitHub']);
  if (c.twitter) links.push([c.twitter, 'twitter-icon.png', 'Twitter / X']);
  if (c.discord) links.push(['contact.html', 'discord-icon.png', 'Discord: ' + c.discord]);
  box.innerHTML = '';
  for (const [href, img, label] of links) {
    const a = document.createElement('a');
    a.href = href; a.setAttribute('aria-label', label); a.title = label;
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    a.innerHTML = '<img src="' + img + '" alt="">';
    box.appendChild(a);
  }
});
