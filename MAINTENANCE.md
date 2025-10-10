# Website Maintenance Guide

## 🚨 CRITICAL: CSS Loading Prevention

### Why CSS Issues Happen
- **Cache-busting inconsistency**: Different version parameters across pages
- **Resource path changes**: Moving or renaming files without updating links
- **Vercel deployment issues**: Static asset routing problems

### ✅ Prevention Checklist

#### Before Making Any Changes:
1. **Run validation script**: `node validate-build.js`
2. **Check all HTML files** have consistent resource linking
3. **Test locally** before pushing to GitHub

#### When Adding New Pages:
1. **Use template.html** as your starting point
2. **Always include version parameters**:
   - CSS: `css/style.css?v=2.0.0`
   - JS: `js/script.js?v=2.0.0`
3. **Update navigation** in all existing pages
4. **Run validation** before committing

#### When Updating CSS/JS:
1. **Increment version number** in all HTML files
2. **Update template.html** with new version
3. **Run validation script**
4. **Test on Vercel** after deployment

### 🔧 Quick Fixes

#### If CSS Stops Loading:
1. Check browser console for 404 errors
2. Verify CSS file exists: `ls -la css/style.css`
3. Check Vercel deployment logs
4. Run validation script to find inconsistencies

#### Emergency CSS Fix:
```bash
# 1. Find inconsistent links
grep -r "css/style.css" *.html | grep -v "v=2.0.0"

# 2. Update version in all files
find . -name "*.html" -exec sed -i '' 's/css\/style\.css"/css\/style.css?v=2.0.0"/g' {} \;

# 3. Validate fix
node validate-build.js

# 4. Commit and push
git add -A && git commit -m "Emergency CSS fix" && git push
```

### 📋 Version History
- **v2.0.0**: Current version (fixed cache-busting issues)
- **Future**: Increment version when updating CSS/JS

### 🎯 Best Practices
1. **Never edit HTML files manually** without running validation
2. **Always use template.html** for new pages
3. **Keep version numbers synchronized** across all files
4. **Test locally** before pushing to production
5. **Monitor Vercel deployments** for any errors

### 🚨 Warning Signs
- Pages load but look unstyled
- Browser console shows 404 errors for CSS/JS
- Some pages work, others don't
- Inconsistent styling across pages

### 📞 Emergency Contacts
- GitHub: https://github.com/selimcagatay35/myCV
- Vercel Dashboard: Check deployment status
- Validation Script: `node validate-build.js`
