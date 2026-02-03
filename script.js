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
function handleSubmit(event, type) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Log submission (in production, send to backend)
    console.log(`${type} submission:`, data);
    
    // Show success notification
    const message = type === 'trial' 
        ? "🎉 Thank you! We'll contact you within 24 hours to start your free trial."
        : "📅 Thank you! We'll reach out soon to schedule your demo.";
    
    showNotification(message, 'success');
    
    // Reset form and close modal
    form.reset();
    closeModal(type);
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    const styles = `
        .notification {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 10000;
            min-width: 320px;
            max-width: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            animation: slideInRight 0.3s ease;
            border-left: 4px solid #6366f1;
        }
        
        .notification-success {
            border-left-color: #10b981;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.5rem;
            gap: 1rem;
        }
        
        .notification-message {
            color: #1f2937;
            font-size: 0.9375rem;
            line-height: 1.5;
        }
        
        .notification-close {
            flex-shrink: 0;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f3f4f6;
            border: none;
            border-radius: 6px;
            font-size: 1.25rem;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.15s;
        }
        
        .notification-close:hover {
            background: #e5e7eb;
            color: #374151;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @media (max-width: 640px) {
            .notification {
                bottom: 1rem;
                right: 1rem;
                left: 1rem;
                min-width: auto;
            }
        }
    `;
    
    // Inject styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
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
