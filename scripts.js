// The Lantern Fly Guys Website JavaScript

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Phone Number Click Tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track phone number clicks for SEO
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            // Google Analytics phone click tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': this.href,
                    'value': 1
                });
            }
            
            // Optional: Send to your analytics endpoint
            // fetch('/api/track-phone-click', { method: 'POST' });
        });
    });

    // Track form submissions
    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            // Google Analytics form submission tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'contact',
                    'event_label': 'contact_form',
                    'value': 1
                });
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Display thank you message
            alert('Thank you for your inquiry! We will contact you within 24 hours for your free assessment.');
            
            // Reset form
            this.reset();
            
            // Optional: Send to email service like Formspree
            // Replace with your actual form handling service
        });
    }
});

// Scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', observeElements);

// Emergency contact popup (optional)
function showEmergencyContact() {
    alert('24/7 Emergency Service Available!\
\
Call (516) 870-8356 immediately for urgent spotted lanternfly infestations.');
}

// Pricing calculator (basic)
function estimatePrice(propertySize) {
    let basePrice = 350;
    
    switch(propertySize) {
        case 'small':
            return '$350 - $450';
        case 'medium':
            return '$450 - $650';
        case 'large':
            return '$650 - $950';
        case 'estate':
            return '$950 - $1,500';
        default:
            return 'Call for Quote';
    }
}

// SEO enhancements
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', trackPageView);
