# Environment Configuration Setup

This document explains how to configure the Luccabot website for different environments.

## Quick Start

1. **Copy the example file:**
   ```bash
   cp env.example .env
   ```

2. **Update the values in `.env` for your environment**

3. **Deploy with your preferred method**

## Configuration Methods

### Method 1: Environment Variables (Recommended for Production)

Set environment variables in your deployment platform:

```bash
# Required
API_BASE_URL=https://your-backend-api.com
API_ENDPOINT=/api/partnership

# Optional
NODE_ENV=production
SITE_URL=https://luccabot.com
CONTACT_EMAIL=partnerships@luccabot.com
WHATSAPP_NUMBER=+918360103306
```

### Method 2: Meta Tag Configuration (Static)

Update the meta tag in `index.html`:

```html
<meta name="env-config" content='{"API_BASE_URL":"https://your-backend-api.com","API_ENDPOINT":"/api/partnership"}' />
```

### Method 3: Direct JavaScript Configuration

Update the default values in `js/env.js`:

```javascript
const defaultEnv = {
  API_BASE_URL: 'https://your-backend-api.com',
  API_ENDPOINT: '/api/partnership',
  // ... other config
};
```

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `API_BASE_URL` | Backend API base URL | `https://your-backend-api.com` | Yes |
| `API_ENDPOINT` | Partnership API endpoint | `/api/partnership` | No |
| `NODE_ENV` | Environment mode | `production` | No |
| `SITE_URL` | Website URL | `https://luccabot.com` | No |
| `SITE_NAME` | Site name | `Luccabot` | No |
| `CONTACT_EMAIL` | Contact email | `partnerships@luccabot.com` | No |
| `WHATSAPP_NUMBER` | WhatsApp number | `+918360103306` | No |
| `ENABLE_PWA` | Enable PWA features | `true` | No |
| `ENABLE_ANALYTICS` | Enable analytics | `true` | No |
| `ENABLE_PARTNERSHIP_FORM` | Enable partnership form | `true` | No |

## Environment-Specific Configurations

### Development
```bash
NODE_ENV=development
API_BASE_URL=http://localhost:8000
SITE_URL=http://localhost:3000
```

### Staging
```bash
NODE_ENV=staging
API_BASE_URL=https://staging-api.luccabot.com
SITE_URL=https://staging.luccabot.com
```

### Production
```bash
NODE_ENV=production
API_BASE_URL=https://api.luccabot.com
SITE_URL=https://luccabot.com
```

## Platform-Specific Setup

### Render.com
1. Go to your service dashboard
2. Navigate to "Environment" tab
3. Add your environment variables
4. Redeploy your service

### Netlify
1. Go to Site settings
2. Navigate to "Environment variables"
3. Add your variables
4. Redeploy your site

### Vercel
1. Go to Project settings
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy your project

### Docker
```dockerfile
ENV API_BASE_URL=https://your-backend-api.com
ENV API_ENDPOINT=/api/partnership
ENV NODE_ENV=production
```

### Docker Compose
```yaml
services:
  luccabot-web:
    environment:
      - API_BASE_URL=https://your-backend-api.com
      - API_ENDPOINT=/api/partnership
      - NODE_ENV=production
```

## Testing Configuration

### Check Environment Variables
Visit `/api/env` to see the current configuration:

```bash
curl https://your-site.com/api/env
```

### Debug in Browser Console
```javascript
console.log('Environment Config:', window.ENV);
```

## Troubleshooting

### Common Issues

1. **API calls failing**
   - Check `API_BASE_URL` is correct
   - Verify backend is running and accessible
   - Check CORS settings on backend

2. **Environment not loading**
   - Check browser console for errors
   - Verify environment variables are set
   - Check network tab for `/api/env` requests

3. **Development vs Production differences**
   - Ensure `NODE_ENV` is set correctly
   - Check hostname detection logic in `env.js`

### Debug Steps

1. **Check environment loading:**
   ```javascript
   // In browser console
   console.log('ENV loaded:', window.ENV);
   ```

2. **Check API endpoint:**
   ```javascript
   // In browser console
   console.log('API URL:', window.ENV.API_BASE_URL + window.ENV.API_ENDPOINT);
   ```

3. **Test API connectivity:**
   ```bash
   curl -X POST https://your-backend-api.com/api/partnership \
     -H "Content-Type: application/json" \
     -d '{"fullName":"Test","email":"test@example.com","partnershipType":"micro-investor"}'
   ```

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for sensitive data
- Validate all environment variables on the backend
- Use HTTPS in production environments

## Migration from Hardcoded Values

If you're migrating from hardcoded values:

1. **Find hardcoded URLs:**
   ```bash
   grep -r "https://your-backend-api.com" .
   ```

2. **Replace with environment variables:**
   ```javascript
   // Before
   const API_URL = 'https://your-backend-api.com';
   
   // After
   const API_URL = window.ENV.API_BASE_URL;
   ```

3. **Test in all environments:**
   - Development
   - Staging
   - Production
