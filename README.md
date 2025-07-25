# Academic Professor Website

A professional, responsive academic website built with HTML, CSS, and JavaScript. Perfect for university professors to showcase their research, publications, and academic achievements.

## Features

### 🎨 Professional Design
- Clean, modern academic styling with blue/gray color scheme
- Mobile-first responsive design
- Professional typography using Inter font
- Smooth animations and transitions
- Accessible design with proper contrast ratios

### 📱 Responsive Layout
- Optimized for all devices (desktop, tablet, mobile)
- Mobile hamburger navigation menu
- Flexible grid layouts
- Touch-friendly interface

### 🔍 Advanced Functionality
- **Publications Search & Filter**: Search publications by title, author, or keyword
- **Photo Gallery**: Lazy-loaded image gallery with lightbox viewer
- **CV Viewer**: Embedded PDF viewer with download option
- **Interactive Navigation**: Smooth scrolling and active page highlighting

### ♿ Accessibility Features
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus indicators for interactive elements

## Pages

### 1. Home Page (`index.html`)
- Hero section with profile photo and bio
- Research areas showcase
- Editorial roles section
- Recent publications preview
- Contact information

### 2. CV Page (`cv.html`)
- Embedded PDF viewer
- Download CV functionality
- Professional summary cards
- Contact information

### 3. Publications Page (`publications.html`)
- Searchable publication list
- Filter by year, type, and category
- Publication statistics
- Links to academic profiles

### 4. Gallery Page (`gallery.html`)
- Photo grid with categories
- Lightbox image viewer
- Lazy loading for performance
- Filter by category (conferences, research, teaching, events, awards)

## Directory Structure

```
professor-website/
├── index.html              # Home page
├── cv.html                 # CV page
├── publications.html       # Publications page
├── gallery.html           # Gallery page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # Main JavaScript file
├── images/
│   ├── profile-photo.jpg  # Profile photo
│   └── gallery/           # Gallery images
├── assets/
│   └── cv.pdf            # CV PDF file
└── README.md             # This file
```

## Setup Instructions

### 1. Content Customization
Replace placeholder content with your actual information:

#### Profile Information
- Update `[Professor Name]` throughout all files
- Replace `[University Name]` and `[Department Name]`
- Add your actual contact information
- Update research areas and bio text

#### Images
- Replace `images/profile-photo.jpg` with your professional photo
- Add your photos to `images/gallery/` directory
- Update image paths in HTML files

#### CV
- Replace `assets/cv.pdf` with your actual CV
- Update CV summary information in `cv.html`

#### Publications
- Replace sample publications with your actual publications
- Update publication statistics
- Add links to your academic profiles

### 2. Styling Customization
The website uses CSS custom properties for easy color customization:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1a365d;
    --accent-color: #667eea;
    --text-color: #333;
    --light-bg: #f7fafc;
}
```

### 3. Deployment Options

#### Static Hosting (Recommended)
- **Vercel**: Deploy directly from GitHub repository
- **Netlify**: Drag and drop deployment or GitHub integration
- **GitHub Pages**: Host directly from GitHub repository

#### Traditional Web Hosting
- Upload all files to your web server
- Ensure proper file permissions
- Test all functionality

## Performance Optimization

### Images
- Compress images before uploading
- Use WebP format for better compression
- Implement lazy loading (already included)

### JavaScript
- Minify JavaScript for production
- Enable gzip compression on server
- Use CDN for external resources

### CSS
- Minify CSS for production
- Remove unused CSS rules
- Enable browser caching

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile Safari 12+
- Chrome Mobile 60+

## SEO Optimization

The website includes:
- Proper meta tags and descriptions
- Semantic HTML structure
- Open Graph tags for social sharing
- Structured data markup
- Sitemap-friendly URLs

## Accessibility Compliance

- WCAG 2.1 AA compliance
- Screen reader optimization
- Keyboard navigation
- High contrast support
- Focus indicators

## Content Management

### Adding New Publications
1. Edit `publications.html`
2. Add new publication entries following the existing format
3. Update publication statistics
4. Test search and filter functionality

### Adding Gallery Photos
1. Add images to `images/gallery/` directory
2. Update `gallery.html` with new image entries
3. Include proper alt text and captions
4. Test lazy loading functionality

### Updating CV
1. Replace `assets/cv.pdf` with new version
2. Update CV summary in `cv.html`
3. Update "Last updated" date

## Technical Details

### CSS Features
- CSS Grid and Flexbox layouts
- CSS custom properties
- Media queries for responsive design
- Smooth animations and transitions
- Print styles

### JavaScript Features
- Vanilla JavaScript (no frameworks)
- Event delegation
- Intersection Observer API
- Local storage for preferences
- Service worker ready

### Performance Features
- Lazy loading images
- Debounced search
- Efficient DOM manipulation
- Minimal HTTP requests
- Optimized asset loading

## Customization Guide

### Color Scheme
Update the CSS custom properties in `css/style.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other colors */
}
```

### Fonts
The website uses Inter font from Google Fonts. To change:
1. Update the Google Fonts import in HTML files
2. Update the font-family in CSS

### Layout
- Modify grid layouts in CSS
- Adjust breakpoints for responsive design
- Update container max-widths

## Support

For customization help or questions:
1. Check the code comments for guidance
2. Review the CSS and JavaScript files
3. Test changes in a development environment first

## License

This template is free to use for academic and personal purposes. Please maintain attribution in the footer.

---

**Note**: This website template is designed for academic professionals. All placeholder content should be replaced with actual information before deployment.