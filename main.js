/**
 * Main application script for the H&H Business Insights homepage.
 */
// Modules are loaded via <script> tags in the HTML now.

/**
 * Populates the hero section with data from the config file.
 * @param {object} heroData - The hero data object from site-config.json.
 */
function populateHero(heroData) {
    document.querySelector('[data-content="hero-headline"]').textContent = heroData.headline;
    document.querySelector('[data-content="hero-subhead"]').textContent = heroData.subhead;

    const primaryCta = document.querySelector('[data-content="hero-primaryCta"]');
    primaryCta.textContent = heroData.primaryCta.text;
    primaryCta.href = heroData.primaryCta.url;

    const secondaryCta = document.querySelector('[data-content="hero-secondaryCta"]');
    secondaryCta.textContent = heroData.secondaryCta.text;
    secondaryCta.href = heroData.secondaryCta.url;
}

/**
 * Initializes the application.
 * Fetches site data and populates the page.
 */
async function initHomepage() {
  populateHeader();
  initBaseEventListeners();

  try {
    const [siteConfigRes, caseStudiesRes] = await Promise.all([
        fetch('/data/site-config.json'),
        fetch('/data/case-studies.json')
    ]);

    if (!siteConfigRes.ok) throw new Error(`Failed to load site-config.json: ${siteConfigRes.status}`);
    if (!caseStudiesRes.ok) throw new Error(`Failed to load case-studies.json: ${caseStudiesRes.status}`);

    const siteConfig = await siteConfigRes.json();
    const caseStudiesData = await caseStudiesRes.json();

    // Populate sections
    if (siteConfig.homepage && siteConfig.homepage.hero) {
        populateHero(siteConfig.homepage.hero);
    }
    if (siteConfig.services) {
        populateServices(siteConfig.services);
    }
    if (siteConfig.homepage && siteConfig.homepage.whyChooseUs) {
        populateWhyChooseUs(siteConfig.homepage.whyChooseUs);
    }
    if (siteConfig.site) {
        populateFooter(siteConfig.site);
    }
    if (caseStudiesData.caseStudies) {
        populateCaseStudies(caseStudiesData.caseStudies);
    }

  } catch (error) {
    console.error("Failed to load site configuration:", error);
  }
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', initHomepage);
