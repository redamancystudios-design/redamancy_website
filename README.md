# Redamancy — Multi-Page Website

The original single-page site has been split into 5 separate pages plus shared
CSS and JS files.

## Project structure

```
redamancy/
├── index.html         ← Home (hero, about-brief, photo snap, OTT snap)
├── about.html         ← About Us page
├── photography.html   ← Photography services + gallery
├── events-ott.html    ← Events OTT features page
├── contact.html       ← Contact form + info
├── styles.css         ← Shared stylesheet for ALL pages
├── script.js          ← Shared JavaScript for ALL pages
└── (your image files: logo2.png, wedding2.png, couple.png, etc.)
```

## How to use

1. Put all the HTML files, `styles.css`, and `script.js` in the **same folder**.
2. Put your image files (`logo2.png`, `wedding2.png`, `wedding3.png`,
   `wedding4.png`, `couple.png`, `events.png`, and the `images/` folder) into
   the same folder as well.
3. Open `index.html` in a browser, or upload the whole folder to your web host.

## What changed from the original

- The nav menu now links to **separate pages** (`about.html`, `photography.html`,
  etc.) instead of in-page anchors (`#about`, `#photography`).
- All inline `<style>...</style>` was moved into `styles.css`.
- All inline `<script>...</script>` was moved into `script.js`.
- Removed duplicate / commented-out blocks from the original CSS and JS.
- The active menu item is now highlighted based on the current page filename.
- Fixed a few small HTML issues from the original (duplicate `<nav>` tags,
  malformed `<body>` placement, duplicate hamburger button).

## Notes

- The `.nav-btn` class on the Contact menu item keeps the gold-button style.
- Mobile menu (hamburger) still works exactly the same way.
- The contact form submit is a demo — wire it up to a backend or a service
  like Formspree / EmailJS when you're ready.
