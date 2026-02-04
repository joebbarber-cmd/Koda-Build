// ===================================
// Koda Build Website JavaScript
// ===================================

// Modal Management
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Trap focus within modal
        const focusableElements = modal.querySelectorAll('button, input, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
}

function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
        document.body.style.overflow = '';
    }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const modalId = modal.id.replace('Modal', '');
            closeModal(modalId);
        });
    }
});

// FAQ Toggle
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't already open
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Form Submission Handler
async function handleSubmit(event, type) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Log submission
    console.log(`${type} submission:`, data);

    // Send to form endpoint if configured
    const hasAction = form.getAttribute('action');
    if (hasAction) {
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            showNotification("Something went wrong. Please try again or email us directly.", { variant: 'error' });
            return;
        }
    }
    
    // Show success notification
    const message = type === 'trial'
        ? "🎉 Congrats—you're in! We’re excited to shape an amazing app with you."
        : "🎉 Congrats! We’re excited to shape an amazing app with you.";
    const nextSteps = type === 'trial'
        ? `
            <ul class="confirmation-steps">
                <li>We’ll review your details and outline a quick plan.</li>
                <li>We’ll reach out within 24 hours by email or phone.</li>
                <li>We’ll map the build and get your app moving fast.</li>
            </ul>
        `
        : `
            <ul class="confirmation-steps">
                <li>We’ll review your details and prep next steps.</li>
                <li>We’ll reach out directly by email or phone.</li>
                <li>We’ll map a clear path to your launch‑ready app.</li>
            </ul>
        `;

    showNotification(message, { variant: 'success', steps: nextSteps });
    
    // Reset form and close modal
    form.reset();
    closeModal(type);
}

// Notification System
function showNotification(message, options = {}) {
    const { variant = 'success', steps = '' } = options;
    const isError = variant === 'error';

    // Remove existing confirmation modals
    const existing = document.querySelectorAll('.confirmation-modal');
    existing.forEach(modal => modal.remove());

    const modal = document.createElement('div');
    modal.className = 'modal show confirmation-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-overlay" data-confirm-close="true"></div>
        <div class="modal-content confirmation-content">
            <button class="modal-close" data-confirm-close="true" aria-label="Close">×</button>
            <div class="confirmation-icon ${isError ? 'confirmation-icon--error' : ''}" aria-hidden="true">${isError ? '!' : '✓'}</div>
            <h2 class="modal-title">${isError ? 'Something went wrong' : 'You’re all set'}</h2>
            <p class="modal-subtitle">${message}</p>
            ${isError ? '' : steps}
            <button class="btn btn-primary btn-full" data-confirm-close="true">${isError ? 'Close' : 'Amazing!'}</button>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target && e.target.dataset && e.target.dataset.confirmClose) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Enhanced navbar on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
        nav.style.padding = '0.75rem 0';
    } else {
        nav.style.boxShadow = 'none';
        nav.style.padding = '1rem 0';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.modal-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            input.addEventListener('input', () => {
                if (input.style.borderColor === 'rgb(239, 68, 68)') {
                    input.style.borderColor = '';
                }
            });
        });
    });
});

// Analytics tracking (placeholder for production)
function trackEvent(eventName, eventData = {}) {
    console.log('Analytics Event:', eventName, eventData);
    // In production, send to your analytics service
    // Example: gtag('event', eventName, eventData);
}

// Track modal opens
const originalOpenModal = openModal;
window.openModal = function(type) {
    trackEvent('modal_opened', { modal_type: type });
    originalOpenModal(type);
};

// Track form submissions
const originalHandleSubmit = handleSubmit;
window.handleSubmit = function(event, type) {
    trackEvent('form_submitted', { form_type: type });
    originalHandleSubmit(event, type);
};

// Console welcome message
console.log(
    '%cKoda Build%c\nWebsite loaded successfully ✓\nBuilt with modern web technologies',
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
    'font-size: 12px; color: #6b7280; margin-top: 8px;'
);
