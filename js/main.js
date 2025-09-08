document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  if (window.animations && typeof window.animations.init === 'function') {
    window.animations.init();
  }

  // Navbar scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  const nav = document.querySelector('[data-nav]');
  const toggler = document.querySelector('[data-nav-toggler]');
  if (nav && toggler) {
    toggler.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggler.classList.toggle('open');
      const isOpen = nav.classList.contains('active');
      toggler.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          toggler.classList.remove('open');
          toggler.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Feature card logic
  document.querySelectorAll('.feature-card').forEach(card => {
    const readMore = card.querySelector('.feature-card__readmore');
    const closeBtn = card.querySelector('.feature-card__close');

    if (readMore && closeBtn) {
      readMore.addEventListener('click', () => {
        card.classList.add('expanded');
      });

      closeBtn.addEventListener('click', () => {
        card.classList.remove('expanded');
      });
    }
  });

  // Carousel
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('[data-carousel-button-next]');
    const prevButton = carousel.querySelector('[data-carousel-button-prev]');
    const dotsNav = carousel.querySelector('[data-carousel-nav]');
    const slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
      track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
      currentSlide.classList.remove('current-slide');
      targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
      currentDot.classList.remove('current-slide');
      targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
      if (targetIndex === 0) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'block';
      } else if (targetIndex === slides.length - 1) {
        prevButton.style.display = 'block';
        nextButton.style.display = 'none';
      } else {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
      }
    };

    // create nav dots
    if (dotsNav) {
      slides.forEach((slide, index) => {
        const button = document.createElement('button');
        button.classList.add('carousel-nav-button');
        if (index === 0) {
          button.classList.add('current-slide');
        }
        dotsNav.appendChild(button);
      });
      const dots = Array.from(dotsNav.children);

      // when I click the nav indicators, move to that slide
      dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
      });
    }


    // when I click left, move slides to the left
    prevButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide') || slides[0];
      const prevSlide = currentSlide.previousElementSibling;
      if (prevSlide) {
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide);
        if (dotsNav) {
          updateDots(currentDot, prevDot);
        }
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
      }
    });

    // when I click right, move slides to the right
    nextButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide') || slides[0];
      const nextSlide = currentSlide.nextElementSibling;
      if (nextSlide) {
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        if (dotsNav) {
          updateDots(currentDot, nextDot);
        }
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
      }
    });

    // set initial state
    hideShowArrows(slides, prevButton, nextButton, 0);
    slides[0].classList.add('current-slide');
  });


  // Booking form
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    (function () {
      emailjs.init('U1Ivr5jUgrrQjxibM');
    })();

    const SERVICE_ID = 'service_6xd2q1g';
    const BOOKING_TEMPLATE = 'template_etf97vp';
    const AUTO_REPLY_TEMPLATE = 'template_hj0k37e';
    const USER_ID = 'U1Ivr5jUgrrQjxibM';

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (this['bot-field'].value) {
        console.warn('Spam bot caught – submission aborted.');
        return;
      }

      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      emailjs.sendForm(SERVICE_ID, BOOKING_TEMPLATE, this, USER_ID)
        .then(() => {
          const name = this.from_name.value;
          const title = this.service_type.value;
          const reply_to = this.reply_to.value;
          return emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE, { name, title, reply_to }, USER_ID);
        })
        .then(() => {
          showNotification('Booking request sent! A confirmation email is on its way.', 'success');
          this.reset();
        })
        .catch(err => {
          console.error('EmailJS error', err);
          showNotification('Sorry, something went wrong. Please try again later.', 'error');
        })
        .finally(() => {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
    });
  }

  // Terms of Service Modal
  const tosModal = document.getElementById('tos-modal');
  if (tosModal) {
    const openBtns = document.querySelectorAll('[data-modal-open]');
    const closeBtns = document.querySelectorAll('[data-modal-close], .modal-close');

    openBtns.forEach(btn => btn.addEventListener('click', () => tosModal.classList.add('active')));
    closeBtns.forEach(el => el.addEventListener('click', () => tosModal.classList.remove('active')));

    document.addEventListener('keyup', e => {
      if (e.key === 'Escape' && tosModal.classList.contains('active')) {
        tosModal.classList.remove('active');
      }
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 5000);
  }
});

// Add some basic styles for the notification
const notificationStyles = `
  .notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    padding: 1rem 2rem;
    border-radius: var(--radius);
    color: var(--color-surface);
    font-weight: 500;
    box-shadow: var(--shadow-lg);
    transition: transform var(--transition);
    opacity: 0;
    z-index: 9999;
  }
  .notification.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  .notification--success {
    background-color: var(--color-success);
  }
  .notification--error {
    background-color: var(--color-primary);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = notificationStyles;
document.head.appendChild(styleSheet);
