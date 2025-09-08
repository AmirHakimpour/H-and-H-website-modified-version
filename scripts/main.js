document.addEventListener('DOMContentLoaded', () => {

    // --- PRESERVED BOOKING FORM LOGIC ---
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
            if (this['bot-field'] && this['bot-field'].value) {
                console.warn('Spam bot caught – submission aborted.');
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;

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
                })
                .finally(() => {
                    submitButton.disabled = false;
                });
        });
    }

    // --- NEW INTERACTIVITY (Hamburger Menu & Modal) ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.navbar-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    const tosLink = document.querySelector('.tos-link');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');

    if (tosLink && modal && modalClose) {
        tosLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // --- ANIMATIONS ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Scroll Animations with Intersection Observer
        const animatedElements = document.querySelectorAll('.service-card, .section-title, .booking-form');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });

        // Parallax Hero Background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const offset = window.pageYOffset;
                heroBackground.style.transform = `translateY(${offset * 0.4}px)`;
            });
        }
    }

    // --- CHART.JS INTEGRATION ---
    const chartCanvas = document.getElementById('aiGrowthChart');
    if (chartCanvas) {
        const chartObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    renderAiChart(chartCanvas);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        chartObserver.observe(chartCanvas);
    }
});

function renderAiChart(canvas) {
    const ctx = canvas.getContext('2d');

    // Gradient fills for the bars
    const beforeAiGradient = ctx.createLinearGradient(0, 0, 0, 400);
    beforeAiGradient.addColorStop(0, 'rgba(106, 13, 173, 0.8)');
    beforeAiGradient.addColorStop(1, 'rgba(106, 13, 173, 0.2)');

    const afterAiGradient = ctx.createLinearGradient(0, 0, 0, 400);
    afterAiGradient.addColorStop(0, 'rgba(0, 245, 212, 0.9)');
    afterAiGradient.addColorStop(1, 'rgba(0, 245, 212, 0.3)');

    const chartData = {
        labels: [
            'Startup Revenue Growth (%)',
            'Operational Cost Reduction (%)',
            'Time-to-Market (months)',
            'Customer Acquisition (avg users)',
            'Employee Productivity Increase (%)'
        ],
        datasets: [
            {
                label: 'Before AI',
                data: [12, 5, 14, 1200, 10],
                backgroundColor: beforeAiGradient,
                borderColor: 'rgba(106, 13, 173, 1)',
                borderWidth: 1,
                borderRadius: 5,
            },
            {
                label: 'After AI',
                data: [32, 27, 6, 3500, 45],
                backgroundColor: afterAiGradient,
                borderColor: 'rgba(0, 245, 212, 1)',
                borderWidth: 1,
                borderRadius: 5,
            }
        ]
    };

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#A0A0A0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#A0A0A0'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#E0E0E0',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#000',
                    titleFont: { size: 16 },
                    bodyFont: { size: 14 },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                                if(context.label.includes('%')) label += '%';
                                if(context.label.includes('months')) label += ' months';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}
