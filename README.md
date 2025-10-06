# Luccabot Website

**Money Made Simple | WhatsApp Financial Assistant**

A modern, responsive website for Luccabot, your AI-powered WhatsApp financial assistant that helps users track spending, plan savings, and grow wealth.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Mobile-First**: Fully responsive design optimized for all devices
- **Partnership Page**: Dedicated page for potential partners and investors
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Performance**: Optimized loading and caching
- **Analytics Ready**: Google Analytics integration with custom event tracking
- **WhatsApp Integration**: Direct links to start using Luccabot
- **Static Site**: Pure client-side website, no server required

## 📁 Project Structure

```
luccabot-web/
├── index.html              # Main homepage
├── partnership.html         # Partnership page
├── css/
│   ├── style.css           # Main styles
│   └── partnership.css     # Partnership page styles
├── js/
│   └── script.js           # JavaScript functionality
├── images/
│   ├── hero-1.jpg          # Hero section image
│   ├── feature-1.jpg       # Features section image
│   └── partnership-hero.svg # Partnership hero image
├── manifest.json           # PWA manifest file
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
├── package.json            # Project configuration
└── README.md               # This file
```

## 🛠️ Setup & Deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/luccabot-web.git
   cd luccabot-web
   ```

2. **Start local server**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
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

#### Option 1: Netlify (Recommended)
1. **Create Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Deploy**: Drag & drop the folder or connect GitHub
3. **Custom Domain**: Add your domain in settings

#### Option 2: Vercel
1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Connect Repository**: Link your GitHub repository
3. **Deploy**: Automatic deployment on every push

#### Option 3: GitHub Pages
1. **Enable GitHub Pages**: Go to repository settings
2. **Select Source**: Choose main branch
3. **Access**: Your site will be available at `https://username.github.io/repository-name`

#### Option 4: Other Static Hosting
- **AWS S3**: Upload files to S3 bucket with static hosting
- **CloudFlare Pages**: Connect GitHub for automatic deployments
- **Traditional Web Hosting**: Upload all files to your web server

## ⚙️ Configuration

### Backend API Integration
Update the API URL in `js/script.js` to point to your backend:

```javascript
const API_BASE_URL = 'https://your-backend-api.com'; // Change this to your backend URL
```

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
- `partnership.html` (meta tags, canonical URL)
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

## 📈 Performance Optimizations

- **Image Optimization**: Compressed and optimized images
- **CSS/JS Minification**: Reduced file sizes
- **Browser Caching**: Optimized cache headers
- **Compression**: Gzip compression enabled
- **Lazy Loading**: Images load as needed

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
- `partnership_form_submit`: When users submit the partnership form

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
# Updated by ajitkushawaha
