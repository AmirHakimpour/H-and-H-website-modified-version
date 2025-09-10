/**
 * layout.js
 *
 * Contains shared functions for populating common layout elements
 * like the header and footer.
 */

function populateHeader() {
    const headerContainer = document.getElementById('main-header');
    if (!headerContainer) return;

    const headerHTML = `
        <div class="container nav-container">
            <a href="/" class="logo" aria-label="H&H Business Insights Home">
                <img src="/assets/images/logo-white.png" alt="H&H Business Insights Logo" class="logo-img logo-white">
                <img src="/assets/images/logo-red.png" alt="H&H Business Insights Logo" class="logo-img logo-red">
                <span class="logo-text">H&H Business Insights</span>
            </a>
            <nav class="nav" data-nav>
                <ul class="nav-list" data-container="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services.html">Services</a></li>
                    <li><a href="/case-studies.html">Case Studies</a></li>
                    <li><a href="/data-lab.html">Data Lab</a></li>
                    <li><a href="/contact.html">Contact</a></li>
                </ul>
            </nav>
            <a href="/contact.html" class="btn btn-primary nav-cta">Book Strategy Call</a>
            <button class="nav-toggle" data-nav-toggler aria-label="Toggle menu" aria-expanded="false">
                <span class="hamburger"></span>
            </button>
        </div>
    `;
    headerContainer.innerHTML = headerHTML;
}

function populateFooter(siteData) {
    const footerContainer = document.getElementById('main-footer');
    if (!footerContainer) return;

    const footerHTML = `
        <div class="container footer-container">
            <div class="footer-brand">
                <img src="/assets/images/logo-white.png" alt="H&H Business Insights Logo" class="footer-logo">
                <p>Your partner in AI-powered strategic planning & marketing solutions.</p>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services.html">Services</a></li>
                    <li><a href="/case-studies.html">Case Studies</a></li>
                    <li><a href="/contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-contact">
                <h4>Contact Us</h4>
                <address>
                    <a href="mailto:${siteData.contact.email}">${siteData.contact.email}</a><br>
                    <a href="tel:${siteData.contact.phone}">${siteData.contact.phone}</a>
                </address>
                <div class="social-icons" data-container="social-links">
                    <!-- Social links can be populated here -->
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ${siteData.title}. All rights reserved.</p>
        </div>
    `;
    footerContainer.innerHTML = footerHTML;
}

function initBaseEventListeners() {
    const toggler = document.querySelector('[data-nav-toggler]');
    const nav = document.querySelector('[data-nav]');

    if(toggler && nav) {
        toggler.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggler.classList.toggle('open');
            const isOpen = nav.classList.contains('active');
            toggler.setAttribute('aria-expanded', isOpen);
        });
    }

    const header = document.querySelector('.site-header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}
