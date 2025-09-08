# QA Checklist

## Visual & Motion

- [ ] **Hero Section:**
  - [ ] Parallax scroll effect is working smoothly on the hero image.
  - [ ] The effect is subtle and does not cause jank.
  - [ ] The effect is disabled if `prefers-reduced-motion` is enabled.
- [ ] **Scroll-Triggered Reveals:**
  - [ ] Sections and elements fade in and slide up as you scroll down the page.
  - [ ] The animations are staggered for a more dynamic effect.
  - [ ] All animated elements are initially hidden and appear correctly.
- [ ] **"Why Choose Us" Carousel:**
  - [ ] The carousel is working correctly, with next/previous buttons.
  - [ ] The carousel can be navigated using the keyboard (tabbing to buttons and pressing enter).
  - [ ] The navigation dots are working correctly.
  - [ ] The cards have a hover effect (scale, shadow).
  - [ ] The cards have a visible focus state.
- [ ] **General:**
  - [ ] All animations are smooth and performant.
  - [ ] No layout jank or flickering during animations.

## Responsiveness

- [ ] **Desktop (≥ 1200px):**
  - [ ] The layout is correct and all elements are aligned properly.
  - [ ] The carousel is working correctly.
- [ ] **Tablet (≥ 992px):**
  - [ ] The layout adapts correctly to the smaller screen size.
  - [ ] The carousel is working correctly.
- [ ] **Mobile (≥ 768px):**
  - [ ] The mobile navigation is working correctly.
  - [ ] The layout is correct and all elements are aligned properly.
  - [ ] The carousel is working correctly and is touch-friendly.
- [ ] **Small Mobile (≥ 480px):**
  - [ ] The layout is correct and all elements are aligned properly.

## SEO & Accessibility

- [ ] **HTML Structure:**
  - [ ] The page has a single `<h1>`.
  - [ ] The heading hierarchy is logical (H1 → H2 → ...).
  - [ ] Semantic HTML5 tags are used correctly.
- [ ] **Metadata:**
  - [ ] The page has a unique and descriptive `<title>`.
  - [ ] The page has a unique and descriptive `<meta name="description">`.
  - [ ] The page has a `<link rel="canonical">` tag.
  - [ ] The page has JSON-LD structured data for the organization.
- [ ] **Images:**
  - [ ] The hero image uses the `<picture>` element with WebP and JPG sources.
  - [ ] The hero image has `srcset` and `sizes` attributes.
  - [ ] Below-the-fold images are lazy-loaded.
- [ ] **Accessibility:**
  - [ ] The site is navigable using only the keyboard.
  - [ ] All interactive elements have a visible focus state.
  - [ ] ARIA attributes are used where necessary (e.g., for the carousel).
  - [ ] The site respects `prefers-reduced-motion`.

## Booking Form

- [ ] **Functionality:**
  - [ ] The booking form can be submitted with valid data.
  - [ ] A success notification is displayed after successful submission.
  - [ ] An auto-reply email is sent to the user.
  - [ ] An email notification is sent to the site owner.
  - [ ] The form displays validation errors for invalid data (e.g., invalid email format).
  - [ ] The form cannot be submitted if the terms of service are not accepted.
- [ ] **Preserved Functionality:**
  - [ ] The form's `id` (`booking-form`) is preserved.
  - [ ] The names of the form fields are preserved.
  - [ ] The EmailJS service ID, template IDs, and user ID are preserved.
  - [ ] Any global callback functions (if any) are still available.
