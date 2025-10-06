// Environment Configuration Loader
// This script loads environment variables and makes them available to the application

(function() {
  'use strict';

  // Default environment configuration
  const defaultEnv = {
    API_BASE_URL: 'https://your-backend-api.com',
    API_ENDPOINT: '/api/partnership',
    NODE_ENV: 'development',
    SITE_URL: 'https://luccabot.com',
    SITE_NAME: 'Luccabot',
    GOOGLE_ANALYTICS_ID: 'GA_MEASUREMENT_ID',
    CONTACT_EMAIL: 'partnerships@luccabot.com',
    WHATSAPP_NUMBER: '+918360103306',
    ENABLE_PWA: true,
    ENABLE_ANALYTICS: true,
    ENABLE_PARTNERSHIP_FORM: true
  };

  // Load environment variables from meta tags, server endpoint, or use defaults
  async function loadEnvironmentConfig() {
    const env = { ...defaultEnv };
    
    // Try to load from meta tags (set by server-side rendering)
    const envMeta = document.querySelector('meta[name="env-config"]');
    if (envMeta) {
      try {
        const metaConfig = JSON.parse(envMeta.getAttribute('content'));
        Object.assign(env, metaConfig);
      } catch (e) {
        console.warn('Failed to parse environment config from meta tag:', e);
      }
    }
    
    // Try to load from server endpoint (for dynamic configuration)
    try {
      const response = await fetch('/api/env');
      if (response.ok) {
        const serverConfig = await response.json();
        Object.assign(env, serverConfig);
      }
    } catch (e) {
      // Server endpoint not available, use meta/default config
      console.debug('Server env endpoint not available, using meta/default config');
    }
    
    // Override with any environment-specific values
    // This allows for runtime configuration in different environments
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      env.NODE_ENV = 'development';
      env.API_BASE_URL = 'http://localhost:8000'; // Default to local server for development
    } else if (window.location.hostname.includes('staging')) {
      env.NODE_ENV = 'staging';
    } else {
      env.NODE_ENV = 'production';
    }
    
    return env;
  }

  // Make environment variables globally available
  loadEnvironmentConfig().then(env => {
    window.ENV = env;
    
    // Log environment info in development
    if (window.ENV.NODE_ENV === 'development') {
      console.log('Environment Configuration:', window.ENV);
    }
    
    // Dispatch event when environment is loaded
    window.dispatchEvent(new CustomEvent('envLoaded', { detail: env }));
  }).catch(error => {
    console.error('Failed to load environment configuration:', error);
    // Fallback to default configuration
    window.ENV = defaultEnv;
  });
})();
