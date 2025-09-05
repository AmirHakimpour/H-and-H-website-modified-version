document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('[data-nav]');
    const toggler = document.querySelector('[data-nav-toggler]');
    const navLinks = document.querySelectorAll('.nav-list a');

    // --- Sticky Header ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // --- Mobile Menu Toggle ---
    const toggleNav = () => {
        nav.classList.toggle('active');
        toggler.classList.toggle('open');
        const isOpen = nav.classList.contains('active');
        toggler.setAttribute('aria-expanded', isOpen);
    };

    // --- Active Nav Link Highlighting ---
    const handleActiveLink = () => {
        let currentSection = '';
        const sections = document.querySelectorAll('main section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    };

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleNav();
            }
        });
    });

    // --- Event Listeners ---
    window.addEventListener('scroll', () => {
        handleScroll();
        handleActiveLink();
    });
    toggler.addEventListener('click', toggleNav);


    // --- Chart.js Implementation ---
    const chartSection = document.getElementById('insights');
    let chartsInitialized = false;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#0a0a0a',
                titleColor: '#f5f5f5',
                bodyColor: '#b3b3b3',
                borderColor: '#333333',
                borderWidth: 1,
            }
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#b3b3b3',
                    font: {
                        size: 12,
                    },
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#b3b3b3',
                    font: {
                        size: 12,
                    }
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutCubic'
        }
    };

    const createCharts = () => {
        // 1. Profitability Chart (Bar)
        const profitabilityCtx = document.getElementById('profitabilityChart');
        if (profitabilityCtx) {
            new Chart(profitabilityCtx, {
                type: 'bar',
                data: {
                    labels: ['Average Startup', 'AI-Powered Startup'],
                    datasets: [{
                        label: 'Profitability Increase',
                        data: [6, 13],
                        backgroundColor: ['rgba(229, 57, 53, 0.5)', '#e53935'],
                        borderColor: ['#e53935', '#e53935'],
                        borderWidth: 1
                    }]
                },
                options: chartOptions
            });
        }

        // 2. Sales Chart (Doughnut)
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            new Chart(salesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Sales Increase', 'Remaining'],
                    datasets: [{
                        data: [30, 70],
                        backgroundColor: ['#e53935', 'rgba(229, 57, 53, 0.2)'],
                        borderColor: 'transparent',
                    }]
                },
                options: { ...chartOptions, cutout: '70%' }
            });
        }

        // 3. Productivity Chart (Doughnut)
        const productivityCtx = document.getElementById('productivityChart');
        if (productivityCtx) {
            new Chart(productivityCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Businesses with Productivity Gains', 'Other'],
                    datasets: [{
                        data: [77, 23],
                        backgroundColor: ['#e53935', 'rgba(229, 57, 53, 0.2)'],
                        borderColor: 'transparent',
                    }]
                },
                options: { ...chartOptions, cutout: '70%' }
            });
        }
    };

    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chartsInitialized) {
                createCharts();
                chartsInitialized = true;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (chartSection) {
        chartObserver.observe(chartSection);
    }

    // --- EmailJS Booking Form ---
    (function () {
        emailjs.init('U1Ivr5jUgrrQjxibM');
    })();

    const SERVICE_ID = 'service_6xd2q1g';
    const BOOKING_TEMPLATE = 'template_etf97vp';
    const AUTO_REPLY_TEMPLATE = 'template_hj0k37e';
    const USER_ID = 'U1Ivr5jUgrrQjxibM';

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (this['bot-field'].value) {
                console.warn('Spam bot caught – submission aborted.');
                return;
            }

            emailjs.sendForm(SERVICE_ID, BOOKING_TEMPLATE, this, USER_ID)
                .then(() => {
                    const name = this.from_name.value;
                    const title = this.service_type.value;
                    const reply_to = this.reply_to.value;

                    return emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE, { name, title, reply_to }, USER_ID);
                })
                .then(() => {
                    alert('Booking request sent! A confirmation email is on its way.');
                    this.reset();
                })
                .catch(err => {
                    console.error('EmailJS error', err);
                    alert('Sorry, something went wrong. Please try again later.');
                });
        });
    }

    // --- TOS Modal ---
    const tosModal = document.getElementById('tos-modal');
    const openBtns = document.querySelectorAll('[data-modal-open]');
    const closeBtns = document.querySelectorAll('[data-modal-close], .modal-close');

    const openModal = () => tosModal.classList.add('active');
    const closeModal = () => tosModal.classList.remove('active');

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeBtns.forEach(el => el.addEventListener('click', closeModal));
    document.addEventListener('keyup', e => {
        if (e.key === 'Escape' && tosModal.classList.contains('active')) {
            closeModal();
        }
    });
});
