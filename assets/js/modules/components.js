/**
 * components.js
 *
 * Contains functions for populating specific page components
 * that are reused across different pages.
 */

/**
 * Creates and injects service cards into the DOM.
 * @param {Array<object>} servicesData - The array of service objects.
 */
function populateServices(servicesData) {
    const container = document.querySelector('[data-container="services-grid"]');
    if (!container) return;

    const cardsHtml = servicesData.map(service => `
        <div class="card service-card">
            <div class="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <a href="${service.cta.url}" class="service-cta">${service.cta.text}</a>
        </div>
    `).join('');

    container.innerHTML = cardsHtml;
}

/**
 * Creates and injects feature cards into the "Why Choose Us" section.
 * @param {Array<object>} featureData - The array of feature objects.
 */
function populateWhyChooseUs(featureData) {
    const container = document.querySelector('[data-container="why-choose-us-grid"]');
    if (!container) return;

    const icons = [
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM21 12h-5.5M13.023 3.012l.003-.004L19.5 9.75l-4.285 4.285-3.286-.672Z" /></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-3.74-2.22a3 3 0 0 0-4.682 2.72 8.986 8.986 0 0 0 3.741.479m-4.682-2.72a3 3 0 0 1-4.682-2.72 8.986 8.986 0 0 1 3.741-.479m0 0A9.095 9.095 0 0 1 12 5.572a9.095 9.095 0 0 1 5.572 3.472m0 0a3 3 0 0 1 4.682 2.72 8.986 8.986 0 0 1-3.741.479M12 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>'
    ];

    const cardsHtml = featureData.map((feature, index) => `
        <div class="card feature-card">
            <div class="feature-icon">${icons[index % icons.length]}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');

    container.innerHTML = cardsHtml;
}

/**
 * Populates the case studies section.
 * @param {Array<object>} caseStudies - The array of case study objects.
 */
function populateCaseStudies(caseStudies) {
    const carouselContainer = document.querySelector('[data-container="case-study-carousel"]');
    const filterContainer = document.querySelector('[data-container="case-study-filters"]');
    if (!carouselContainer || !filterContainer) return;

    const allTags = new Set(caseStudies.flatMap(cs => cs.tags));

    let filtersHtml = '<button class="filter-btn active" data-filter="all">All</button>';
    allTags.forEach(tag => {
        filtersHtml += `<button class="filter-btn" data-filter="${tag}">${tag}</button>`;
    });
    filterContainer.innerHTML = filtersHtml;

    const caseStudiesHtml = caseStudies.map(cs => `
        <div class="card case-study-card" data-tags="${cs.tags.join(' ')}">
            <div class="card-image-placeholder"></div>
            <div class="card-body">
                <div class="client-logo-placeholder">${cs.client}</div>
                <h3>${cs.title}</h3>
                <p class="metrics">${cs.metrics.before} → <strong>${cs.metrics.after}</strong></p>
            </div>
        </div>
    `).join('');
    carouselContainer.innerHTML = caseStudiesHtml;

    filterContainer.addEventListener('click', (e) => {
        if (e.target.matches('.filter-btn')) {
            const filter = e.target.dataset.filter;
            filterContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');

            carouselContainer.querySelectorAll('.case-study-card').forEach(card => {
                if (filter === 'all' || card.dataset.tags.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });
}
