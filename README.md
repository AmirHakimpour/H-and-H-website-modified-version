# H&H Business Insights - Rebuilt from Scratch

This repository contains the source code for the H&H Business Insights website, rebuilt from the ground up using vanilla HTML, CSS, and JavaScript.

**Live Site:** [https://hnhbi.com](https://hnhbi.com) (Note: This link points to the original site. This rebuild is a separate project.)

## 🚀 Project Overview

This project is a complete, modern, and performant rebuild of the H&H Business Insights website. It was built with a focus on accessibility, SEO, and performance, using only vanilla web technologies as per the project requirements.

### Key Features:
- **Dark Mode First:** A sleek, modern dark theme with an optional light mode toggle.
- **Fully Responsive:** Designed to work beautifully on all devices, from mobile phones to desktops.
- **Dynamic Content:** Page content is loaded from local JSON files, making updates easy and safe.
- **Interactive Data Visualizations:** A "Data Lab" page featuring interactive charts powered by Chart.js.
- **Mini-Game:** A "Strategy Sprint" matching game to engage users.
- **Zero Frameworks:** Built with 100% vanilla JavaScript (ES modules), HTML5, and SCSS. No React, Vue, Tailwind, or Bootstrap.

## 🛠️ Technologies Used

-   **HTML5:** Semantic and accessible markup.
-   **SCSS:** Modular and maintainable stylesheets, compiled to vanilla CSS.
-   **JavaScript (ES Modules):** Clean, modular, and framework-free client-side logic.
-   **Chart.js:** For interactive and accessible data charts.
-   **Node.js / npm:** For dependency management (Sass compiler) and running scripts.

## Local Development

To preview the site locally, you need a simple web server to handle JSON fetching via `fetch()`.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AmirHakimpour/H-and-H-website-modified-version.git
    cd H-and-H-website-modified-version
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Compile SCSS:**
    The project uses SCSS for styling. You can compile it once or watch for changes.
    ```bash
    # Compile once
    npm run scss -- --no-watch

    # Watch for changes and re-compile automatically
    npm run scss
    ```

4.  **Start a local server:**
    The easiest way is to use Python's built-in HTTP server.
    ```bash
    python3 -m http.server
    ```
    You can then access the site at `http://localhost:8000`.

## ⚙️ Configuration

-   **Content:** All text content for the site can be edited in `/data/site-config.json` and `/data/case-studies.json`.
-   **Graph Data:** The data for the charts on the Data Lab page is located in `/data/graphs/`.
-   **Analytics:** To enable Google Analytics, uncomment the GA script in the `<head>` of each HTML file and replace `GA_MEASUREMENT_ID` with your actual ID.
-   **Contact Form:** The contact form in `contact.html` is set up to POST to a placeholder endpoint: `YOUR_SERVERLESS_ENDPOINT`. You will need to replace this with the URL of your form handling service (e.g., a serverless function on Netlify, Vercel, or AWS).

## 🔒 Content Security Policy (CSP) Suggestions

For production deployment, you should implement a Content Security Policy to enhance security. Here is a recommended starting point to be included in your server's headers or the `<meta>` tag:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';
```

This policy restricts content sources to your own domain, with exceptions for the Chart.js CDN and Google Fonts.

## 📬 Contact

For business inquiries:
**support@hnhbi.com**
