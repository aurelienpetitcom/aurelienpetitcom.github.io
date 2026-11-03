# Shared site components

Add these placeholders to each page where the shared header and footer should appear:

```html
<body>
  <site-header></site-header>

  <main>
    <!-- Page content -->
  </main>

  <site-footer></site-footer>

  <script src="site-components.js"></script>
  <script src="i18n.js"></script>
  <script src="script.js"></script>
</body>
```

Keep the shared stylesheet in the page `<head>`:

```html
<link rel="stylesheet" href="style.css">
```

`site-components.js` supplies the header, responsive navigation, search panel, and footer. Load it before `i18n.js` so the shared markup is available for translation, and load both before `script.js` so the search and menu controls can be initialized.

Edit `site-components.js` to change shared markup, `style.css` to change its presentation, and `i18n.js` to add or update translations.

`productions.html` is an example of a page using the shared header and footer with a year-filtered carousel. When adding a production, add its index link and carousel card there, set the card's `data-year`, and add its translated strings to `i18n.js`.
