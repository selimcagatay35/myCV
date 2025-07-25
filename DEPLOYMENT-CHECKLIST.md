# Deployment Checklist

## Before Deployment

### 1. Content Customization
- [ ] Replace `[Professor Name]` with actual name throughout all files
- [ ] Update `[University Name]` and `[Department Name]`
- [ ] Add real contact information (email, phone, address)
- [ ] Update research areas and biography text
- [ ] Replace placeholder publications with actual publications
- [ ] Add real editorial roles and achievements

### 2. Images
- [ ] Replace `images/profile-photo.jpg` with professional photo
- [ ] Add real gallery photos to `images/gallery/`
- [ ] Update image paths and alt text in HTML files
- [ ] Optimize images for web (compress, resize)
- [ ] Create favicon.ico file
- [ ] Create icon-192.png and icon-512.png for PWA

### 3. Documents
- [ ] Replace `assets/cv.pdf` with actual CV
- [ ] Update CV summary information in `cv.html`
- [ ] Test PDF embedding functionality

### 4. SEO & Meta
- [ ] Update sitemap.xml with actual domain
- [ ] Update robots.txt with actual domain
- [ ] Update manifest.json with actual information
- [ ] Add proper meta descriptions
- [ ] Update social media links

### 5. Performance
- [ ] Minify CSS and JavaScript files
- [ ] Optimize and compress images
- [ ] Test page load speeds
- [ ] Validate HTML, CSS, and accessibility

## Deployment Steps

### Option 1: Vercel Deployment
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy with automatic builds
4. Configure custom domain if needed

### Option 2: Netlify Deployment
1. Drag and drop site folder to Netlify
2. Or connect GitHub repository
3. Configure build settings
4. Set up custom domain

### Option 3: Traditional Hosting
1. Upload all files via FTP/SFTP
2. Ensure proper file permissions
3. Configure web server settings
4. Set up SSL certificate

## After Deployment

### 1. Testing
- [ ] Test all pages on different devices
- [ ] Verify all links work correctly
- [ ] Test publication search and filters
- [ ] Test gallery lightbox functionality
- [ ] Test CV PDF viewer
- [ ] Test mobile navigation
- [ ] Check accessibility with screen reader

### 2. Performance
- [ ] Run Google PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Test offline functionality
- [ ] Verify service worker registration

### 3. SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Verify structured data markup
- [ ] Check social media preview cards
- [ ] Test search functionality

### 4. Analytics (Optional)
- [ ] Set up Google Analytics
- [ ] Configure tracking events
- [ ] Set up Search Console
- [ ] Monitor performance metrics

## Security Checklist

- [ ] Ensure no sensitive information in code
- [ ] Verify HTTPS is enabled
- [ ] Check for mixed content warnings
- [ ] Test CORS settings if applicable
- [ ] Validate contact form security (if added)

## Maintenance

### Regular Updates
- [ ] Update publications list
- [ ] Add new gallery photos
- [ ] Update CV when needed
- [ ] Monitor site performance
- [ ] Keep dependencies updated

### Content Updates
- [ ] Add new research projects
- [ ] Update biography as needed
- [ ] Add new achievements/awards
- [ ] Update contact information if changed

## File Structure Check

Ensure all these files are present:
```
├── index.html
├── cv.html
├── publications.html
├── gallery.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile-photo.jpg
│   ├── favicon.ico
│   └── gallery/
│       └── [your-photos.jpg]
├── assets/
│   └── cv.pdf
├── manifest.json
├── sw.js
├── sitemap.xml
├── robots.txt
└── README.md
```

## Common Issues

### PDF Not Loading
- Check file path in cv.html
- Ensure PDF is not corrupted
- Verify server MIME types

### Images Not Displaying
- Check file paths are correct
- Verify image files exist
- Ensure proper file permissions

### Mobile Navigation Issues
- Test on actual mobile devices
- Check CSS media queries
- Verify touch events work

### Search Not Working
- Check JavaScript console for errors
- Verify publication data attributes
- Test with different search terms

## Support

If you encounter issues:
1. Check browser console for errors
2. Validate HTML and CSS
3. Test on different browsers
4. Check file permissions on server

---

**Remember**: Always test thoroughly in a staging environment before deploying to production!