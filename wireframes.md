# Wireframes

This document outlines the wireframe and structure for the key pages of the new hnhbi.com website.

---

## 1. Homepage (`index.html`)

The homepage is designed to be a comprehensive entry point, guiding users to key areas of the site.

- **`<header>`:**
  - **Logo:** Left-aligned.
  - **Navigation:** Right-aligned links: `Home`, `Services`, `Case Studies`, `Data Lab`, `About`, `Contact`.
  - **Primary CTA:** "Book Strategy Call" button, styled distinctively.

- **`<main>`:**
  - **Hero Section:**
    - Full-viewport-height section.
    - Background: Subtle, interactive particle/SVG animation.
    - Content (centered):
      - `<h1>`: Strong, concise headline (e.g., "Smarter Strategy. Faster Growth. Powered by AI.")
      - `<p>` (subhead): Short descriptive text.
      - **Buttons:**
        - Primary CTA: "Book Strategy Call"
        - Secondary CTA: "View Dashboard"

  - **Stats Band:**
    - A narrow, full-width band separating the hero from the next section.
    - Contains 3-4 key metrics with animated counters (e.g., "Projects Completed," "Client ROI," "AI Models Deployed").

  - **Services Section:**
    - `<h2>`: "Our Services"
    - A 3-column grid of cards on desktop (1 column on mobile).
    - **Each card:**
      - 3D tilt effect on hover.
      - Icon, Service Title, Short Description.
      - "Learn More" link pointing to the specific `service-[slug].html` page.

  - **Case Studies Section:**
    - `<h2>`: "Success Stories"
    - **Filter bar:** A set of buttons to filter case studies by industry tags (e.g., "E-commerce," "SaaS").
    - **Horizontal Carousel:**
      - Each item is a card with a client logo, project title, key "before/after" metrics, and a "Read Case Study" link.

  - **Data Dashboard Preview:**
    - `<h2>`: "Explore Our Data Dashboard"
    - A 2-column layout.
    - **Left:** An interactive line or bar chart (from Chart.js).
    - **Right:** KPI tiles with sparklines.
    - A "View Full Dashboard" CTA linking to `data-lab.html`.

  - **"Why Choose Us" Section:**
    - `<h2>`: "Why H&H Business Insights"
    - A grid of 4 items, each with an icon, a title (e.g., "AI-Powered Insights"), and a short descriptive paragraph.

  - **Mini-Game Widget:**
    - A visually distinct, compact section.
    - `<h2>`: "Test Your Strategy"
    - A short, engaging sentence about the game.
    - A "Play Now" button that either opens a modal or links to `play.html`.

- **`<footer>`:**
  - Multi-column layout.
  - **Column 1:** Contact Info (Email, Phone).
  - **Column 2:** Newsletter signup form (simple email field and submit button).
  - **Column 3:** Sitemap (links to all main pages).
  - **Column 4:** Social Media Icons (LinkedIn, Instagram).
  - **Bottom Bar:** Copyright notice and links to `privacy.html` and `terms.html`.

---

## 2. Service Page Template (`service-template.html`)

This template will be used for all individual service pages.

- **`<header>`:**
  - Identical to the homepage header for consistency.

- **`<main>`:**
  - **Page Header:**
    - A simple, clean header section (not full-bleed).
    - `<h1>`: The name of the service (e.g., "Strategic Business Planning").
    - `<p>`: A concise, one-sentence summary of the service.

  - **Main Content (2-column layout):**
    - **Left Column (2/3 width):**
      - `<h2>`: "What We Do"
      - Detailed description of the service, using subheadings (`<h3>`) for different aspects like "Our Process," "Key Deliverables," etc.
      - Use of lists and blockquotes for readability.
    - **Right Column (1/3 width):**
      - A "sticky" sidebar that remains in view on scroll.
      - **CTA Box:** A prominent box with a "Book This Service" button.
      - **"Related Services" List:** Links to 2-3 other relevant services.
      - **"Featured Case Study" Snippet:** A small card linking to a case study that used this service.

  - **Related Case Studies Section:**
    - `<h2>`: "See It In Action"
    - A simple grid or 3-item carousel showing case studies directly related to this service.

- **`<footer>`:**
  - Identical to the homepage footer.
