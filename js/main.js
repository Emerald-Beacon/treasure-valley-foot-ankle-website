/**
 * Treasure Valley Foot & Ankle
 * Main JavaScript File
 */

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contact-form');

// ========================================
// Navigation
// ========================================

/**
 * Show mobile menu
 */
function showMenu() {
    navMenu.classList.add('show-menu');
    document.body.style.overflow = 'hidden';
}

/**
 * Hide mobile menu
 */
function hideMenu() {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = '';
}

// Toggle menu on hamburger click
if (navToggle) {
    navToggle.addEventListener('click', showMenu);
}

// Close menu on X click
if (navClose) {
    navClose.addEventListener('click', hideMenu);
}

// Close menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu);
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        hideMenu();
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show-menu') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        hideMenu();
    }
});

// ========================================
// Services Dropdown (Mobile)
// ========================================

/**
 * Toggle dropdown menu on mobile
 */
const dropdownToggles = document.querySelectorAll('.nav__dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only handle click for mobile (when menu is in mobile mode)
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const parent = toggle.parentElement;
            parent.classList.toggle('active');
        }
    });
});

// ========================================
// Category Toggles (within Services dropdown)
// ========================================

/**
 * Toggle category sub-menus within the dropdown
 */
const categoryHeaders = document.querySelectorAll('.nav__category-header');

categoryHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
        e.stopPropagation();
        const category = header.parentElement;
        category.classList.toggle('active');
    });
});

// ========================================
// Header Scroll Effect
// ========================================

/**
 * Add shadow to header on scroll
 */
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// ========================================
// Active Navigation Link
// ========================================

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// Smooth Scrolling
// ========================================

/**
 * Smooth scroll to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Reveal Animation
// ========================================

/**
 * Reveal elements on scroll
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .about__feature, .doctor__education-list li');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('reveal', 'active');
            }
        });
    };

    // Run on load
    revealOnScroll();

    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Initialize scroll reveal
initScrollReveal();

// ========================================
// Contact Form
// ========================================

/**
 * Handle contact form submission
 */
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Show success message
            showFormMessage('success', 'Thank you! We will contact you within 24 hours to confirm your appointment.');

            // Reset form
            this.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

/**
 * Validate form data
 */
function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Please enter your name');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.phone || data.phone.trim() === '') {
        errors.push('Please enter your phone number');
    }

    if (errors.length > 0) {
        showFormMessage('error', errors.join('<br>'));
        return false;
    }

    return true;
}

/**
 * Check if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show form message (success or error)
 */
function showFormMessage(type, message) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.innerHTML = message;

    // Style the message
    messageEl.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        ${type === 'success'
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;

    // Insert before the form
    contactForm.insertBefore(messageEl, contactForm.firstChild);

    // Auto-remove success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// ========================================
// New Patient Intake Form
// ========================================

const intakeForm = document.getElementById('intake-form');
const intakePrintBtn = document.getElementById('intake-print');

if (intakeForm) {
    intakeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;

        const formData = new FormData(this);
        const body = new URLSearchParams(formData).toString();

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Submission failed (' + response.status + ')');
                }
                showIntakeMessage('success', 'Thank you! Your intake form has been submitted. Our team will review it before your visit and follow up if we need anything else.');
                this.reset();
                window.scrollTo({ top: intakeForm.offsetTop - 100, behavior: 'smooth' });
            })
            .catch((err) => {
                console.error('Intake form submission error:', err);
                showIntakeMessage('error', "We couldn't submit your form. Please try again, or call us at (208) 272-9253 so we can help.");
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

if (intakePrintBtn) {
    intakePrintBtn.addEventListener('click', () => window.print());
}

function showIntakeMessage(type, message) {
    if (!intakeForm) return;

    const existing = intakeForm.querySelector('.form-message');
    if (existing) existing.remove();

    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.innerHTML = message;
    messageEl.style.cssText = `
        padding: 1rem 1.25rem;
        margin-bottom: 1.5rem;
        border-radius: 0.5rem;
        font-size: 0.95rem;
        ${type === 'success'
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;

    intakeForm.insertBefore(messageEl, intakeForm.firstChild);
}

// ========================================
// Phone Number Formatting
// ========================================

/**
 * Format phone number as user types
 */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }

        e.target.value = value;
    });
}

// ========================================
// Lazy Loading Images
// ========================================

/**
 * Lazy load images with IntersectionObserver
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// ========================================
// Preloader (Optional)
// ========================================

/**
 * Hide preloader when page is loaded
 */
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

// ========================================
// Back to Top Button
// ========================================

/**
 * Create and handle back to top button
 */
function initBackToTop() {
    // Create button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    `;

    // Style the button
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary, #1e5f8a);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 999;
    `;

    document.body.appendChild(backToTop);

    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-4px)';
        backToTop.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
}

// Initialize back to top
initBackToTop();

// ========================================
// Performance Optimization
// ========================================

/**
 * Debounce function for scroll events
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedHeaderScroll = debounce(handleHeaderScroll, 10);
const debouncedActiveLink = debounce(updateActiveNavLink, 10);

// Replace scroll listeners with debounced versions
window.removeEventListener('scroll', handleHeaderScroll);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedHeaderScroll);
window.addEventListener('scroll', debouncedActiveLink);

// ========================================
// Accessibility Improvements
// ========================================

/**
 * Handle keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    // Skip to main content on Tab
    if (e.key === 'Tab' && !e.shiftKey) {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink && document.activeElement === document.body) {
            skipLink.focus();
        }
    }
});

/**
 * Add focus trap for mobile menu
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// Apply focus trap to mobile menu
if (navMenu) {
    trapFocus(navMenu);
}

// ========================================
// Console Branding
// ========================================

console.log(
    '%c Treasure Valley Foot & Ankle ',
    'background: #1e5f8a; color: white; padding: 10px 20px; font-size: 14px; font-weight: bold;'
);
console.log(
    '%c Website by Emerald Beacon ',
    'background: #2c9676; color: white; padding: 5px 15px; font-size: 12px;'
);
