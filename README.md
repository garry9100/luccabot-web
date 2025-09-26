# Luccabot Landing Page

**Money Made Simple | WhatsApp Financial Assistant**

A production-ready landing page for Luccabot, your AI-powered WhatsApp financial assistant that helps users track spending, plan savings, and grow wealth.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Mobile-First**: Fully responsive design optimized for all devices
- **PWA Ready**: Progressive Web App with install prompts and offline support
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Performance**: Optimized loading, caching, and offline support
- **Analytics Ready**: Google Analytics integration with custom event tracking
- **Security**: Security headers and best practices implemented
- **WhatsApp Integration**: Direct links to start using Luccabot
- **Render Deploy**: Ready for deployment on Render.com

## 📁 Project Structure

```
luccabot-site/
├── index.html          # Main landing page
├── css/
│   └── style.css      # Complete styling with animations
├── js/
│   └── script.js       # Enhanced JavaScript with analytics
├── images/
│   ├── hero-1.jpg      # Hero section image
│   └── feature-1.jpg   # Features section image
├── sw.js              # Service worker for PWA and offline support
├── manifest.json      # PWA manifest file
├── server.py          # Python server for Render deployment
├── requirements.txt   # Python dependencies
├── render.yaml        # Render deployment configuration
├── robots.txt         # SEO robots file
├── sitemap.xml        # SEO sitemap
├── .htaccess          # Apache server configuration
├── package.json       # Project configuration
└── README.md          # This file
```

## 🛠️ Setup & Deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/luccabot/landing-page.git
   cd luccabot-landing
   ```

2. **Start local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Production Deployment

#### Option 1: Render.com (Recommended)
1. **Create Render Account**: Sign up at [render.com](https://render.com)
2. **Connect Repository**: Link your GitHub repository
3. **Create Static Site**: Choose "Static Site" service
4. **Configure Settings**:
   - Build Command: `echo 'Static site - no build required'`
   - Publish Directory: `/` (root)
   - Start Command: `python server.py`
5. **Deploy**: Click "Create Static Site"
6. **Custom Domain**: Add your domain in settings

#### Option 2: Other Static Hosting
- **Netlify**: Drag & drop the folder or connect GitHub
- **Vercel**: Connect repository for automatic deployments
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3**: Upload files to S3 bucket with static hosting

#### Option 3: Traditional Web Hosting
1. Upload all files to your web server
2. Ensure `.htaccess` is supported (Apache)
3. Configure SSL certificate
4. Update Google Analytics ID in `index.html`

#### Option 4: CDN Deployment
- Upload to CloudFlare, AWS CloudFront, or similar
- Configure caching rules for optimal performance

## ⚙️ Configuration

### Google Analytics
Replace `GA_MEASUREMENT_ID` in `index.html` with your actual Google Analytics tracking ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  gtag('config', 'YOUR_GA_ID');
</script>
```

### WhatsApp Bot Integration
Update the WhatsApp links in `index.html` if your bot number changes:

```html
href="https://wa.me/YOUR_PHONE_NUMBER?text=Start"
```

### Domain Configuration
Update all references to `luccabot.com` in:
- `index.html` (meta tags, canonical URL)
- `sitemap.xml`
- `robots.txt`

## 📊 SEO Features

- **Meta Tags**: Comprehensive title, description, and keywords
- **Open Graph**: Facebook and social media optimization
- **Twitter Cards**: Twitter sharing optimization
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Prevent duplicate content issues

## 🔒 Security Features

- **Content Security Policy**: XSS protection
- **Security Headers**: Clickjacking and MIME sniffing protection
- **HTTPS Enforcement**: Secure connections (when configured)
- **File Access Control**: Prevent access to sensitive files

## 📱 PWA Features

- **App Installation**: Users can install Luccabot as a native app
- **Offline Support**: Works without internet connection
- **Service Worker**: Background caching and updates
- **App Manifest**: Native app-like experience
- **Install Prompts**: Smart installation suggestions
- **Update Notifications**: Automatic update alerts
- **Push Notifications**: Ready for future messaging features

## 📈 Performance Optimizations

- **Service Worker**: Offline support and caching
- **Image Optimization**: Compressed and optimized images
- **CSS/JS Minification**: Reduced file sizes
- **Browser Caching**: Optimized cache headers
- **Compression**: Gzip compression enabled
- **Lazy Loading**: Images load as needed
- **PWA Caching**: Intelligent resource caching

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Analytics Events

The page tracks the following events:
- `whatsapp_click`: When users click WhatsApp links
- `scroll_to_section`: When users navigate to sections
- `animation_triggered`: When scroll animations activate
- `page_load_time`: Performance metrics
- `exception`: JavaScript errors
- `pwa_install`: When users install the PWA
- `pwa_usage`: When users run the app as PWA
- `pwa_update`: When PWA updates are available

## 🔧 Customization

### Colors
Update CSS custom properties in `css/style.css`:
```css
:root {
  --brand: #1f8a4c;        /* Primary green */
  --brand-strong: #166a3c; /* Darker green */
  --brand-light: #2ba85a;  /* Lighter green */
}
```

### Content
Update text content in `index.html`:
- Hero section title and subtitle
- Feature descriptions
- Call-to-action buttons
- Footer information

### Images
Replace images in `/images/` folder:
- `hero-1.jpg`: Hero section image
- `feature-1.jpg`: Features section image

## 📞 Support

For technical support or questions about Luccabot:
- **Website**: https://luccabot.com
- **WhatsApp**: https://wa.me/918360103306?text=Start
- **Email**: support@luccabot.com

## 📄 License

MIT License - see LICENSE file for details.

---

**Made with ❤️ for Luccabot**
# luccabot-web
