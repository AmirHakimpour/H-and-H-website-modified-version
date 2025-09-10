// Modules are loaded via <script> tags in the HTML now.

/**
 * Initializes the services page.
 */
async function initServicesPage() {
    // Populate shared layout components
    populateHeader();
    initBaseEventListeners();

    // Fetch data to populate the page
    try {
        const response = await fetch('/data/site-config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.site) {
            populateFooter(data.site);
        }
        if (data.services) {
            populateServices(data.services);
        }
    } catch (error) {
        console.error("Failed to load site configuration:", error);
    }
}

document.addEventListener('DOMContentLoaded', initServicesPage);
