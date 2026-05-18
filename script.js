// ==========================================
// PACKERS & MOVERS LANDING PAGE - SCRIPT
// ==========================================

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==========================================
// FORM VALIDATION & SUBMISSION
// ==========================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const serviceInput = document.getElementById('service');
const messageInput = document.getElementById('message');
const submitButton = document.querySelector('.submit-button');
const successMessage = document.getElementById('successMessage');

// Form validation functions
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    return nameRegex.test(name);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
}

function validateEmail(email) {
    if (email === '') return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateService(service) {
    return service !== '';
}

// Show error message
function showError(inputElement, errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    inputElement.style.borderColor = '#e74c3c';
    errorElement.textContent = message;
}

// Clear error message
function clearError(inputElement, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    inputElement.style.borderColor = '#e0e0e0';
    errorElement.textContent = '';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (nameInput.value && !validateName(nameInput.value)) {
        showError(nameInput, 'nameError', 'Enter a valid name (min 3 characters)');
    } else {
        clearError(nameInput, 'nameError');
    }
});

phoneInput.addEventListener('blur', () => {
    if (phoneInput.value && !validatePhone(phoneInput.value)) {
        showError(phoneInput, 'phoneError', 'Enter a valid phone number (min 10 digits)');
    } else {
        clearError(phoneInput, 'phoneError');
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
        showError(emailInput, 'emailError', 'Enter a valid email address');
    } else {
        clearError(emailInput, 'emailError');
    }
});

serviceInput.addEventListener('change', () => {
    if (serviceInput.value) {
        clearError(serviceInput, 'serviceError');
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear all previous error messages
    clearError(nameInput, 'nameError');
    clearError(phoneInput, 'phoneError');
    clearError(emailInput, 'emailError');
    clearError(serviceInput, 'serviceError');
    successMessage.style.display = 'none';

    let isValid = true;

    // Validate all fields
    if (!nameInput.value || !validateName(nameInput.value)) {
        showError(nameInput, 'nameError', 'Enter a valid name (min 3 characters)');
        isValid = false;
    }

    if (!phoneInput.value || !validatePhone(phoneInput.value)) {
        showError(phoneInput, 'phoneError', 'Enter a valid phone number (min 10 digits)');
        isValid = false;
    }

    if (emailInput.value && !validateEmail(emailInput.value)) {
        showError(emailInput, 'emailError', 'Enter a valid email address');
        isValid = false;
    }

    if (!validateService(serviceInput.value)) {
        showError(serviceInput, 'serviceError', 'Please select a service');
        isValid = false;
    }

    if (isValid) {
        // Prepare form data
        const formData = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value || 'Not provided',
            service: serviceInput.value,
            message: messageInput.value || 'N/A',
            timestamp: new Date().toLocaleString()
        };

        // Log the submission (In real scenario, send to server)
        console.log('Form submitted:', formData);

        // Show success message
        submitButton.style.backgroundColor = '#27ae60';
        submitButton.textContent = '✓ Quote Sent Successfully!';
        submitButton.disabled = true;

        successMessage.textContent = 'Thank you! We will contact you shortly with a personalized quote.';
        successMessage.style.display = 'block';

        // Optional: Store in localStorage for demonstration
        localStorage.setItem('lastQuoteRequest', JSON.stringify(formData));

        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            submitButton.style.backgroundColor = '';
            submitButton.textContent = 'Get Free Quote';
            submitButton.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }, 2000);
    } else {
        // Focus on first invalid field
        if (!validateName(nameInput.value)) {
            nameInput.focus();
        } else if (!validatePhone(phoneInput.value)) {
            phoneInput.focus();
        } else if (!validateService(serviceInput.value)) {
            serviceInput.focus();
        }
    }
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observe feature cards
document.querySelectorAll('.feature').forEach(feature => {
    observer.observe(feature);
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// NAVBAR SHADOW ON SCROLL
// ==========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '';
    }
});

// ==========================================
// SERVICE CARD CLICK HANDLER
// ==========================================

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceTitle = this.querySelector('h3').textContent;
        
        // Map service titles to form values
        const serviceMap = {
            'Home Shifting': 'home-shifting',
            'Office Relocation': 'office-relocation',
            'Packing & Unpacking': 'packing-unpacking',
            'Vehicle Transport': 'vehicle-transport'
        };
        
        serviceInput.value = serviceMap[serviceTitle];
        
        // Scroll to form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        
        // Focus on form for better UX
        nameInput.focus();
    });
    
    // Add pointer cursor to indicate clickability
    card.style.cursor = 'pointer';
});

// ==========================================
// PAGE LOAD ANIMATIONS
// ==========================================

window.addEventListener('load', () => {
    // Ensure animations start properly
    document.body.style.opacity = '1';
});

// ==========================================
// RESPONSIVE NAVBAR ADJUSTMENTS
// ==========================================

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==========================================
// PREFETCH RESOURCES FOR PERFORMANCE
// ==========================================

// Preload Font Awesome icons
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Fonts are already loaded via CDN link
    });
}

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Navigation keyboard support
navLinks.forEach(link => {
    link.setAttribute('role', 'menuitem');
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy loading setup (if needed in future for images)
if ('IntersectionObserver' in window) {
    // Can be used for lazy loading images
    const lazyImages = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('PackersMovers Pro - Landing Page Loaded');
    
    // Initialize tooltips or any other setup here
    // Example: Initialize form with localStorage data if available
    const lastRequest = localStorage.getItem('lastQuoteRequest');
    if (lastRequest) {
        console.log('Previous quote request found:', JSON.parse(lastRequest));
    }
});

// ==========================================
// DEBUG MODE (Remove in production)
// ==========================================

// Uncomment to enable debug mode
// window.DEBUG = true;
// if (window.DEBUG) {
//     console.log('Debug mode enabled');
// }
