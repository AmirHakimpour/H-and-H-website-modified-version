# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-09

### Added
- Complete rebuild of the website from scratch using vanilla HTML, CSS, and JavaScript.
- New dark-mode-first design system with CSS variables for colors, fonts, and spacing.
- Modular SCSS architecture for maintainable styles.
- Dynamic content loading from JSON files for most page content.
- New pages: `services.html`, `data-lab.html`, `play.html`, `about.html`, `contact.html`, `privacy.html`.
- Interactive Data Lab with charts powered by Chart.js (Timeseries, Bar, Funnel).
- "Strategy Sprint" mini-game on the `play.html` page.
- `sitemap.xml` and `robots.txt` for SEO.
- Comprehensive `README.md` with setup and deployment instructions.

### Changed
- Replaced the original single-page site with a multi-page architecture.
- Removed all traces of the old green accent color, replacing it with the new brand red (`#7A0B0B`).
- Swapped the site's font from Roboto to Inter and Sora.
- Refactored all JavaScript to use ES modules initially, then refactored again to use global script loading to accommodate CDN-based libraries without a bundler.

### Removed
- Removed all third-party dependencies from the original site (Font Awesome, EmailJS).
- Removed the old light-theme CSS.
