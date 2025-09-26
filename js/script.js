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

  // PWA Install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA: Install prompt triggered');
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  // Track PWA installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA: App installed successfully');
    isInstalled = true;
    hideInstallButton();
    
    // Track installation event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install', {
        event_category: 'engagement',
        event_label: 'app_installed'
      });
    }
  });

  // Show install button
  function showInstallButton() {
    const installButton = createInstallButton();
    document.body.appendChild(installButton);
  }

  // Hide install button
  function hideInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.remove();
    }
  }

  // Create install button
  function createInstallButton() {
    const button = document.createElement('div');
    button.id = 'pwa-install-button';
    button.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-brand);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        box-shadow: var(--shadow-lg);
        cursor: pointer;
        z-index: 1000;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Install Luccabot
        <button onclick="this.parentElement.remove()" style="
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          margin-left: 8px;
        ">×</button>
      </div>
    `;
    
    button.addEventListener('click', installPWA);
    return button;
  }

  // Install PWA
  function installPWA() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA: User accepted install prompt');
        } else {
          console.log('PWA: User dismissed install prompt');
        }
        deferredPrompt = null;
      });
    }
  }

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

  // Initialize PWA features
  domReady(() => {
    safeExecute(checkPWAStatus, 'PWA Status Check');
  });

})();
