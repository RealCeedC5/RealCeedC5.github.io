# WebsiteC5

Portfolio site for C5, a Lua and Luau scripter. Live at **https://realceedc5.github.io/WebsiteC5/**

## Pages
- `index.html` home
- `portfolios.html` projects
- `about.html` about me
- `contact.html` contacts

## Updating the site
Open `script.js` and edit the `SITE` settings at the top:

```js
const SITE = {
  commissionsOpen: false,          // true shows "Open" on every page
  contacts: {
    github: 'https://github.com/RealCeedC5',
    discord: '',                   // your Discord username
    twitter: ''                    // full link to your Twitter / X profile
  }
};
```

Empty contacts are hidden. Colors live at the top of `styles.css`.
