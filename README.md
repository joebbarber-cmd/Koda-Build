# Koda Build - Custom Apps for Small Business

A clean, professional marketing website inspired by minimalist design principles (like Lemonade.com). Built for an app leasing business that provides custom applications to small businesses at affordable monthly rates.

## 🎯 Design Philosophy

- **Minimalist & Clean**: Lots of white space, simple typography, subtle interactions
- **Professional Copy**: Direct, conversational, benefit-focused
- **Clear Value Proposition**: Immediately understand what you get
- **Mobile-First**: Responsive design that works beautifully on all devices

## 💰 Pricing Structure

### Starter - $50/month
- Single custom app
- Up to 10 active users
- Basic automations
- Cloud hosting included
- Email support
- Mobile access

### Professional - $150/month (Most Popular)
- Up to 2 custom apps
- Up to 50 active users
- Advanced automations
- Cloud hosting included
- Priority support
- Advanced analytics
- API integrations

### Enterprise - $300+/month
- Unlimited custom apps
- Unlimited active users
- Complex integrations
- Dedicated support team
- Custom reporting
- Advanced security
- SLA guarantees

**Add-ons:** Additional users for $5/user/month

## ✨ Key Features

- Clean, minimal navigation
- Hero section with clear value prop
- Benefits section explaining why custom apps matter
- "How It Works" 3-step process
- Transparent pricing cards with hover effects
- Collapsible FAQ section
- Modal forms for trials and demos
- Smooth scrolling navigation
- Subtle hover and transition effects
- Mobile-responsive design

## 📁 File Structure

```
/
├── index.html          # Clean HTML structure
├── styles.css          # Minimalist CSS with lots of white space
├── script.js           # Subtle JavaScript interactions
└── README.md          # This file
```

## 🚀 Getting Started

1. Simply open `index.html` in any modern web browser
2. No build process or dependencies required
3. All code is self-contained

## 🎨 Design Details

### Color Palette
- **Primary**: `#1a1a1a` (Near black)
- **Text**: `#666666` (Gray)
- **Background**: `#ffffff` (White)
- **Light Gray**: `#fafafa` (Subtle backgrounds)
- **Borders**: `#e0e0e0` (Light borders)

### Typography
- **Font**: System font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Headings**: 600 weight, tight letter-spacing
- **Body**: 400 weight, comfortable line height (1.6-1.7)

### Interactions
- Subtle hover states (color changes, slight transforms)
- Smooth transitions (0.2s ease)
- Modal animations (fade in, slide up)
- FAQ accordion animation
- Toast notification for form submissions

## 📱 Responsive Breakpoints

- **Desktop**: Full experience
- **Tablet** (≤768px): Adjusted grid layouts
- **Mobile** (≤480px): Single column, full-width buttons

## 🔧 Customization

### Update Company Name
Replace "Koda Build" throughout the HTML files.

### Update Pricing
Edit the pricing cards in the HTML pricing section.

### Connect Forms
Update `handleSubmit()` in `script.js` to send data to your backend:

```javascript
function handleSubmit(event, type) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Add your API call here
    fetch('/api/submit', {
        method: 'POST',
        body: formData
    });
}
```

### Style Adjustments
All styling is in `styles.css` with clear section comments.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari
- Chrome Mobile

## 💡 Content Strategy

The copy focuses on:
1. **Pain points**: Generic software doesn't fit small business needs
2. **Solution**: Custom apps at affordable prices
3. **Value**: Save time, save money, gain competitive edge
4. **Trust**: Transparent pricing, no hidden fees, cancel anytime
5. **Social proof**: Built for real businesses (add testimonials later)

## 📈 Next Steps

1. Add your actual contact information
2. Set up form backend (Netlify Forms, Formspree, or custom API)
3. Add analytics (Google Analytics, Plausible, etc.)
4. Add customer testimonials once you have clients
5. Create case studies section
6. Set up hosting (Netlify, Vercel, GitHub Pages)
7. Connect custom domain
8. Set up SSL (automatic with most hosts)

## 🎯 Conversion Optimization

- Multiple CTAs throughout the page
- Free trial option (no credit card required)
- Clear pricing with no hidden costs
- FAQ section to address objections
- Simple 2-step process: trial or demo
- Mobile-friendly forms

---

**Inspired by:** Clean, minimalist design principles from companies like Lemonade, Stripe, and Linear.

**Built for:** Small business owners who need custom apps without the enterprise price tag.
