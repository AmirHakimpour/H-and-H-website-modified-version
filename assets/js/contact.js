// Modules are loaded via <script> tags in the HTML now.

/**
 * Populates the services dropdown in the contact form.
 * @param {Array<object>} servicesData - The array of service objects.
 */
function populateServicesDropdown(servicesData) {
    const select = document.getElementById('contact-service');
    if (!select) return;

    servicesData.forEach(service => {
        const option = document.createElement('option');
        option.value = service.slug;
        option.textContent = service.title;
        select.appendChild(option);
    });
}

/**
 * Initializes the contact page.
 */
async function initContactPage() {
    // Populate shared layout components
    populateHeader();
    initBaseEventListeners();

    // Fetch data to populate the page
    try {
        const [siteConfigRes, servicesRes] = await Promise.all([
            fetch('/data/site-config.json').then(res => res.json()),
            fetch('/data/site-config.json').then(res => res.json()) // Re-using site-config for services
        ]);

        populateFooter(siteConfigRes.site);
        populateServicesDropdown(servicesRes.services);

    } catch (error) {
        console.error("Failed to load page data:", error);
    }
}

document.addEventListener('DOMContentLoaded', initContactPage);
