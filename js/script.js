// Luccabot Landing Page - Production Ready
// Performance optimized with error handling and analytics

(function() {
  'use strict';

  // Performance optimization: Check if DOM is ready
  function domReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  // Error handling wrapper
  function safeExecute(fn, context = 'Unknown') {
    try {
      fn();
    } catch (error) {
      console.warn(`Luccabot: Error in ${context}:`, error);
      // Send error to analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
          description: `${context}: ${error.message}`,
          fatal: false
        });
      }
    }
  }

  // Enhanced smooth scroll for in-page links
  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          // Track scroll events
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_to_section', {
              section_name: targetId.substring(1)
            });
          }
          
          targetElement.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }
    });
  }

  // Current year in footer
  function updateFooterYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Enhanced scroll-triggered animations with Intersection Observer
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      const animatedElements = document.querySelectorAll('.phone-card, .pill, .feature-art, .hero-art');
      animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Track animation events
          if (typeof gtag !== 'undefined') {
            gtag('event', 'animation_triggered', {
              element_class: entry.target.className
            });
          }
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.phone-card, .pill, .feature-art, .hero-art');
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Enhanced header scroll effect with throttling
  function initHeaderScrollEffect() {
    let ticking = false;
    const header = document.querySelector('.site-header');
    
    if (!header) return;

    function updateHeader() {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.backdropFilter = 'blur(20px)';
      }
      
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // WhatsApp link tracking
  function initWhatsAppTracking() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'whatsapp_click', {
            event_category: 'engagement',
            event_label: link.textContent.trim(),
            value: 1
          });
        }
      });
    });
  }

  // Performance monitoring
  function initPerformanceMonitoring() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData && typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
              load_time: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
              dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)
            });
          }
        }, 1000);
      });
    }
  }

  // Initialize all features when DOM is ready
  domReady(() => {
    safeExecute(initSmoothScroll, 'Smooth Scroll');
    safeExecute(updateFooterYear, 'Footer Year');
    safeExecute(initScrollAnimations, 'Scroll Animations');
    safeExecute(initHeaderScrollEffect, 'Header Scroll Effect');
    safeExecute(initWhatsAppTracking, 'WhatsApp Tracking');
    safeExecute(initPerformanceMonitoring, 'Performance Monitoring');
  });

  // PWA Installation and Service Worker
  let deferredPrompt;
  let isInstalled = false;

  // Service Worker registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                showUpdateNotification();
              }
            });
          });
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  // PWA Install prompt (disabled - no install button)
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA: Install prompt triggered (button disabled)');
    e.preventDefault();
    deferredPrompt = e;
    // Install button functionality removed
  });

  // Track PWA installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA: App installed successfully');
    isInstalled = true;
    
    // Track installation event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install', {
        event_category: 'engagement',
        event_label: 'app_installed'
      });
    }
  });

  // Show update notification
  function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-brand);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        font-size: 14px;
        font-weight: 600;
        max-width: 300px;
      ">
        <div style="margin-bottom: 8px;">New version available!</div>
        <button onclick="window.location.reload()" style="
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          margin-right: 8px;
        ">Update</button>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 12px;
        ">Later</button>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }

  // Check if running as PWA
  function checkPWAStatus() {
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      console.log('PWA: Running as installed app');
      isInstalled = true;
      
      // Track PWA usage
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_usage', {
          event_category: 'engagement',
          event_label: 'running_as_pwa'
        });
      }
    }
  }

  // Partnership Form Modal Functions
  function openPartnershipForm() {
    const modal = document.getElementById('partnershipModal');
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      // Track modal open event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'partnership_modal_open', {
          event_category: 'engagement',
          event_label: 'partnership_form_opened'
        });
      }
    }
  }

  function closePartnershipForm() {
    const modal = document.getElementById('partnershipModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      
      // Reset form
      const form = document.getElementById('partnershipForm');
      if (form) {
        form.reset();
        // Remove loading state from submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      }
    }
  }

  // Partnership form submission
  function initPartnershipForm() {
    const form = document.getElementById('partnershipForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);
      
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      try {
        // Convert FormData to JSON
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }
        
        // Add timestamp and user agent
        data.timestamp = new Date().toISOString();
        data.userAgent = navigator.userAgent;
        data.referrer = document.referrer;
        
        // Send to backend - Uses environment configuration
        const API_BASE_URL = window.ENV?.API_BASE_URL || 'https://your-backend-api.com';
        const API_ENDPOINT = window.ENV?.API_ENDPOINT || '/api/partnership';
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          // Success
          showNotification('Thank you! Your partnership interest has been submitted successfully. We\'ll get back to you soon.', 'success');
          closePartnershipForm();
          
          // Track successful submission
          if (typeof gtag !== 'undefined') {
            gtag('event', 'partnership_form_submit', {
              event_category: 'conversion',
              event_label: 'partnership_interest_submitted',
              value: 1
            });
          }
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Partnership form error:', error);
        showNotification('Sorry, there was an error submitting your form. Please try again or contact us directly.', 'error');
        
        // Track error
        if (typeof gtag !== 'undefined') {
          gtag('event', 'partnership_form_error', {
            event_category: 'error',
            event_label: 'form_submission_failed'
          });
        }
      } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  }

  // Show notification
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'var(--brand)' : type === 'error' ? '#ef4444' : 'var(--ink-light)';
    
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        font-size: 14px;
        font-weight: 500;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
      ">
        ${message}
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 18px;
          margin-left: 12px;
          float: right;
        ">×</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }

  // Close modal when clicking outside
  function initModalClickOutside() {
    const modal = document.getElementById('partnershipModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closePartnershipForm();
        }
      });
    }
  }

  // Close modal with Escape key
  function initModalKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('partnershipModal');
        if (modal && modal.classList.contains('show')) {
          closePartnershipForm();
        }
      }
    });
  }

  // Initialize PWA features
  domReady(() => {
    safeExecute(checkPWAStatus, 'PWA Status Check');
    safeExecute(initPartnershipForm, 'Partnership Form');
    safeExecute(initModalClickOutside, 'Modal Click Outside');
    safeExecute(initModalKeyboard, 'Modal Keyboard');
    safeExecute(initMobileMenuClose, 'Mobile Menu Close');
    safeExecute(initMobileMenuClickOutside, 'Mobile Menu Click Outside');
  });

  // Mobile menu toggle
  function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && toggle) {
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      // Track menu toggle
      if (typeof gtag !== 'undefined') {
        gtag('event', 'mobile_menu_toggle', {
          event_category: 'engagement',
          event_label: nav.classList.contains('active') ? 'menu_opened' : 'menu_closed'
        });
      }
    }
  }

  // Close mobile menu when clicking on nav links
  function initMobileMenuClose() {
    const nav = document.getElementById('mainNav');
    const navLinks = nav?.querySelectorAll('.nav-link');
    
    if (navLinks) {
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      });
    }
  }

  // Close mobile menu when clicking outside
  function initMobileMenuClickOutside() {
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && toggle) {
      document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !toggle.contains(e.target)) {
          nav.classList.remove('active');
          toggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // Make functions globally available
  window.openPartnershipForm = openPartnershipForm;
  window.closePartnershipForm = closePartnershipForm;
  window.toggleMobileMenu = toggleMobileMenu;

})();
