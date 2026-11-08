# WebsiteC5

Portfolio site for C5, a Lua and Luau scripter. Live at **https://realceedc5.github.io/WebsiteC5/**

## Pages
- `index.html` home: intro, Luau code window, featured project, languages
- `portfolios.html` projects with screenshots
- `about.html` about me
- `contact.html` contacts and commission status
- `404.html` page-not-found screen for GitHub Pages

## Updating the site
Open `script.js` and edit the `SITE` settings at the top. Every page updates from these:

```js
const SITE = {
  commissionsOpen: false,          // true shows "Open" everywhere, including the code window
  contacts: {
    github: 'https://github.com/RealCeedC5',
    discord: '',                   // your Discord username
    twitter: ''                    // full link to your Twitter / X profile
  }
};
```

Empty contacts are hidden. Colors and fonts are set at the top of `styles.css`.
Project screenshots live in `images/`.
