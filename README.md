# C5 · Portfolio

Portfolio site for C5, a Lua and Luau scripter. Live at **https://realceedc5.github.io/**

Plain HTML, CSS and JavaScript with no build step. Every page works in English and Thai (switch with the EN / ไทย button in the header).

## Pages
- `index.html` home: intro, Luau code window, latest project with gameplay video, languages
- `portfolios.html` Rai Sukjai case study: gameplay video, screenshot viewer, features and how it's built
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

## Translations
English text sits inside each tag, and the Thai version sits in that tag's `data-th` attribute:

```html
<h1 data-th="ผลงานของผม">My work</h1>
<img alt="The farm" data-th-alt="ไร่ในฤดูร้อน" src="...">
```

Change both when you edit a line. Words the script writes itself (Open / Closed, Copy) are in `WORDS` in `script.js`.
The site opens in Thai for visitors whose browser is set to Thai and remembers the last choice.

## Media
Screenshots, the gameplay video (`rai-sukjai-gameplay.mp4`, H.264, about 600 KB) and the link preview image (`og.jpg`, 1200×630) live in `images/`.
