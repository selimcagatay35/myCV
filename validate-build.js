#!/usr/bin/env node

/**
 * Build Validation Script
 * Ensures consistent resource linking across all HTML files
 */

const fs = require('fs');
const path = require('path');

const HTML_FILES = [
    'index.html',
    'cv.html', 
    'publications.html',
    'research-grants.html',
    'gallery.html'
];

const REQUIRED_CSS_LINK = 'css/style.css?v=2.0.0';
const REQUIRED_JS_LINK = 'js/script.js?v=2.0.0';

function validateHTMLFile(filename) {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filename}`);
        return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    let isValid = true;
    
    // Check CSS link
    if (!content.includes(REQUIRED_CSS_LINK)) {
        console.error(`❌ ${filename}: Missing or incorrect CSS link`);
        console.error(`   Expected: ${REQUIRED_CSS_LINK}`);
        isValid = false;
    }
    
    // Check JS link
    if (!content.includes(REQUIRED_JS_LINK)) {
        console.error(`❌ ${filename}: Missing or incorrect JS link`);
        console.error(`   Expected: ${REQUIRED_JS_LINK}`);
        isValid = false;
    }
    
    if (isValid) {
        console.log(`✅ ${filename}: All resource links are correct`);
    }
    
    return isValid;
}

function validateBuild() {
    console.log('🔍 Validating build consistency...\n');
    
    let allValid = true;
    
    for (const htmlFile of HTML_FILES) {
        if (!validateHTMLFile(htmlFile)) {
            allValid = false;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    
    if (allValid) {
        console.log('✅ All HTML files have consistent resource linking!');
        process.exit(0);
    } else {
        console.log('❌ Build validation failed! Please fix the issues above.');
        process.exit(1);
    }
}

// Run validation
validateBuild();
