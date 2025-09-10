// Modules are loaded via <script> tags in the HTML now.

/**
 * Initializes the privacy page.
 */
async function initPrivacyPage() {
    // Populate shared layout components
    populateHeader();
    initBaseEventListeners();

    // Fetch site data for the footer
    try {
        const response = await fetch('/data/site-config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        populateFooter(data.site);

    } catch (error) {
        console.error("Failed to load site configuration:", error);
    }
}

document.addEventListener('DOMContentLoaded', initPrivacyPage);
