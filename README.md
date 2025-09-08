# H&H Business Insights - Osmo Redesign

This project is a complete, from-scratch redesign of the H&H Business Insights website, inspired by the futuristic and animation-rich design of Osmo.supply. The goal was to create a modern, performant, and visually engaging static site while preserving the core functionality of the original booking form.

## Implementation Notes

The site is built with vanilla HTML, CSS, and JavaScript. No build tools are required to run it, though a simple server is recommended for local development to handle asset paths correctly.

### Key Features
- **Futuristic Design:** A dark theme with neon accents, bold typography, and generous whitespace, inspired by Osmo.supply.
- **Scroll Animations:** Elements like service cards and section titles animate into view as the user scrolls down the page. This is implemented using the `IntersectionObserver` API for performance.
- **Parallax Hero:** The hero section features a subtle parallax effect on the background image to create a sense of depth.
- **Preserved Booking Form:** The original booking form's JavaScript connections (using EmailJS) have been preserved exactly. The form's HTML `id` and `name` attributes are identical to the original to ensure seamless integration.
- **AI Growth Charts:** A new section has been added featuring animated charts, powered by Chart.js, to visualize the impact of AI on business growth.

### File Structure
```
.
├── assets/
│   └── logo.png
├── index.html
├── lighthouse-report/
│   └── placeholder.txt
├── README.md
├── screenshots/
│   └── placeholder.txt
├── scripts/
│   └── main.js
└── styles/
    └── main.css
```

---

## How It Works

### Animations
- **Scroll-Reveal:** The file `scripts/main.js` uses an `IntersectionObserver` to monitor when certain elements (e.g., `.service-card`, `.section-title`) enter the viewport. When an element is visible, its opacity and transform are transitioned via CSS to create a smooth "fade-in and slide-up" effect.
- **Parallax:** The hero section's background image has its `transform: translateY()` property updated on the `window.scroll` event, moving it at a slower rate than the page scroll to create the parallax effect.
- **Prefers Reduced Motion:** All animations are disabled if the user has the `prefers-reduced-motion` media query active in their system or browser settings.

### AI Graphs (Chart.js)
- The chart is located in the "How AI Accelerates Startup Growth" section.
- To improve performance, the chart is lazy-initialized. Another `IntersectionObserver` in `scripts/main.js` waits until the chart's `<canvas>` element is visible before creating and rendering the chart.
- The chart is a grouped bar chart showing "Before AI" vs. "After AI" metrics.
- It is styled with custom gradient fills and tooltips to match the site's futuristic aesthetic. The data is hard-coded in `scripts/main.js` as per the requirements.

### Logo Integration
- The logo is the best available PNG asset from the original site (`HandH_logowhite.png`), saved as `assets/logo.png`.
- It is placed in the navbar (top-left) and the footer.
- A subtle hover effect (`transform: scale(1.1)`) is applied to the navbar logo via CSS for a small, interactive touch.

### New Sections Added
- **About Us / Our Mission:** A brief introduction to the company's mission.
- **Why Choose Us:** A grid of cards highlighting key value propositions.
- **Case Studies / Success Stories:** A section showcasing metrics-driven results.
- **Testimonials:** Client feedback presented in styled cards.
- **FAQ Section:** An interactive, collapsible Q&A section built with the `<details>` and `<summary>` elements.
- **Insights Hub / Blog Preview:** A grid of placeholder blog posts.
- **Free Resource Download:** A CTA section with an email capture form for a whitepaper.

---

## How to Test

### Local Setup
To run the site locally, you can use any simple HTTP server. For example, with Node.js installed:
```bash
npx serve
```
Then open the provided URL (e.g., `http://localhost:3000`) in your browser.

### Testing the Booking Form
The booking form is connected to an EmailJS account. The credentials are included in `scripts/main.js` and should work for testing purposes.

**1. Test Success Flow:**
   - Fill out all the required fields in the booking form.
   - Check the "I agree to the Terms of Service" box.
   - Click "Send Booking Request".
   - **Expected Result:** You should see a browser `alert()` with the message: "Booking request sent! A confirmation email is on its way." The form should then reset.

**2. Test Failure Flow:**
   - The current form does not have an easy way to simulate a network failure without developer tools.
   - To test the error handling, you could temporarily change the `SERVICE_ID` in `scripts/main.js` to an invalid string (e.g., `'invalid_id'`) and reload the page.
   - Submit the form again.
   - **Expected Result:** You should see a browser `alert()` with the message: "Sorry, something went wrong. Please try again later." A more detailed error will be logged in the browser's developer console.

### Testing Checklist
- [ ] **Visual QA:** Hero, nav, services, AI graphs, and footer look correct on desktop, tablet, and mobile.
- [ ] **Booking Form:** Success and failure flows work as described above.
- [ ] **Console:** No uncaught JS errors on load or on form submission.
- [ ] **Accessibility:** Keyboard navigation is logical, focus states are visible.
- [ ] **SEO:** Meta tags and JSON-LD can be verified by inspecting the page source of `index.html`.
- [ ] **Performance:** Run a Lighthouse test and confirm a score of ≥ 90.
- [ ] **Responsiveness:** Check the layout at 320px, 768px, 1024px, and 1440px widths.
- [ ] **Charts:** Tooltips show correct values on hover; charts animate on scroll.
- [ ] **Images:** All images have `loading="lazy"` where appropriate.
