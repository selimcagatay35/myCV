#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate publications.html with real data from parsed CV
Updated to include Research Grants navigation
"""

import json
import re
from html import escape

def format_publication_text(text, category):
    """Format publication text for HTML display"""
    text = escape(text)
    
    # Highlight author name
    text = re.sub(r'\b(Selim Çağatay|S\. Çağatay|Çağatay, S\.?|Cagatay, S\.?)\b', 
                  r'<strong>\1</strong>', text)
    
    # Format journal/venue names in italics (text in quotes or after "in")
    if category == 'journal':
        # Journal names often in italics or after comma
        text = re.sub(r'"([^"]+)"', r'<em>"\1"</em>', text)
    elif category == 'chapter':
        # Book titles after "in"
        text = re.sub(r'\bin\s+([^,]+),', r'in <em>\1</em>,', text)
    
    # Format DOIs as links
    text = re.sub(r'DOI:\s*(10\.\d+/[^\s,]+)', 
                  r'DOI: <a href="https://doi.org/\1" target="_blank">\1</a>', text)
    
    return text

def get_category_display_name(category):
    """Get display name for category"""
    category_names = {
        'journal': 'Journal Article',
        'book': 'Book/Edited Volume', 
        'chapter': 'Book Chapter',
        'conference': 'Conference Paper',
        'report': 'Research Report'
    }
    return category_names.get(category, category.title())

def get_category_icon(category):
    """Get icon for category"""
    icons = {
        'journal': '📄',
        'book': '📚',
        'chapter': '📖',
        'conference': '🎤',
        'report': '📊'
    }
    return icons.get(category, '📋')

def generate_html():
    """Generate the complete HTML for publications page"""
    
    # Load the publications data
    with open('/Users/mertcagatay/Web Development Projects/SelimCagatayWebpage/publications_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Dr. Selim Çağatay - Publications and Research Papers">
    <meta name="keywords" content="publications, research papers, academic articles, journals">
    <meta name="author" content="Dr. Selim Çağatay">
    
    <!-- Cache-busting headers for development -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>Publications - Dr. Selim Çağatay</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css?v=2.0.0">
    
    <!-- Favicon placeholder -->
    <link rel="icon" type="image/x-icon" href="images/favicon.ico">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <!-- Header Navigation -->
    <header class="header">
        <nav class="nav">
            <div class="nav-container">
                <div class="nav-brand">
                    <h1>Prof. Dr. Selim Çağatay</h1>
                </div>
                
                <!-- Mobile Menu Toggle -->
                <div class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <!-- Navigation Menu -->
                <ul class="nav-menu" id="navMenu">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="cv.html" class="nav-link">CV</a>
                    </li>
                    <li class="nav-item">
                        <a href="publications.html" class="nav-link active">Publications</a>
                    </li>
                    <li class="nav-item">
                        <a href="research-grants.html" class="nav-link">Research Grants</a>
                    </li>
                    <li class="nav-item">
                        <a href="gallery.html" class="nav-link">Gallery</a>
                    </li>
                    <li class="nav-item">
                        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                            <span class="theme-icon" id="themeIcon">🌙</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="main">
        <!-- Page Header -->
        <section class="page-header">
            <div class="container">
                <h1 class="page-title">Publications</h1>
                <p class="page-subtitle">Research Papers, Articles, and Academic Contributions</p>
            </div>
        </section>

        <!-- Publications Filter and Search -->
        <section class="publications-controls">
            <div class="container">
                <div class="controls-wrapper">
                    <!-- Search Bar -->
                    <div class="search-container">
                        <input 
                            type="text" 
                            id="publicationSearch" 
                            class="search-input" 
                            placeholder="Search publications by title, author, or keyword..."
                            aria-label="Search publications">
                        <button class="search-btn" onclick="searchPublications()" aria-label="Search">
                            <span class="search-icon">🔍</span>
                        </button>
                    </div>
                    
                    <!-- Filters -->
                    <div class="filters-container">
                        <div class="filter-group">
                            <label for="yearFilter">Year:</label>
                            <select id="yearFilter" class="filter-select" aria-label="Filter by year">
                                <option value="">All Years</option>'''
    
    # Add year options
    for year in data['years']:
        html += f'\n                                <option value="{year}">{year}</option>'
    
    html += '''
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label for="typeFilter">Type:</label>
                            <select id="typeFilter" class="filter-select" aria-label="Filter by publication type">
                                <option value="">All Types</option>
                                <option value="journal">Journal Articles</option>
                                <option value="book">Books/Edited Volumes</option>
                                <option value="chapter">Book Chapters</option>
                                <option value="conference">Conference Papers</option>
                                <option value="report">Research Reports</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label for="sortFilter">Sort by:</label>
                            <select id="sortFilter" class="filter-select" aria-label="Sort publications">
                                <option value="year-desc">Newest First</option>
                                <option value="year-asc">Oldest First</option>
                                <option value="title-asc">Title A-Z</option>
                                <option value="title-desc">Title Z-A</option>
                            </select>
                        </div>
                        
                        <button class="btn btn-secondary" onclick="clearFilters()" aria-label="Clear all filters">
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Publications Statistics -->
        <section class="publications-stats">
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number" id="totalPublications">''' + str(data['total_count']) + '''</span>
                        <span class="stat-label">Total Publications</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="journalArticles">''' + str(data['categories']['journal']) + '''</span>
                        <span class="stat-label">Journal Articles</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="conferencePapers">''' + str(data['categories']['conference']) + '''</span>
                        <span class="stat-label">Conference Papers</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="bookChapters">''' + str(data['categories']['chapter'] + data['categories']['book']) + '''</span>
                        <span class="stat-label">Books & Chapters</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Publications List -->
        <section class="publications-list">
            <div class="container">
                <div class="publications-results">
                    <div class="results-header">
                        <h2>Publications</h2>
                        <div class="results-info">
                            <span id="resultsCount">Showing all publications</span>
                        </div>
                    </div>
                    
                    <div class="publications-container" id="publicationsContainer">'''
    
    # Generate publications by year
    for year in data['years']:
        if str(year) in data['publications'] and data['publications'][str(year)]:
            html += f'''
                        <!-- {year} Publications -->
                        <div class="year-section" data-year="{year}">
                            <h3 class="year-title">{year}</h3>
                            <div class="publications-year">'''
            
            # Get publications for this year
            year_pubs = data['publications'][str(year)]
            
            for pub in year_pubs:
                category_icon = get_category_icon(pub['category'])
                category_name = get_category_display_name(pub['category'])
                formatted_text = format_publication_text(pub['text'], pub['category'])
                
                html += f'''
                                <article class="publication-item" data-year="{year}" data-type="{pub['category']}">
                                    <div class="publication-header">
                                        <div class="publication-meta">
                                            <span class="publication-type">{category_icon} {category_name}</span>
                                        </div>
                                    </div>
                                    <div class="publication-content">
                                        <p class="publication-text">{formatted_text}</p>
                                    </div>
                                </article>'''
            
            html += '''
                            </div>
                        </div>'''
    
    html += '''
                    </div>
                    
                    <!-- No Results Message -->
                    <div class="no-results" id="noResults" style="display: none;">
                        <h3>No publications found</h3>
                        <p>Try adjusting your search criteria or filters to find relevant publications.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- External Links -->
        <section class="external-links">
            <div class="container">
                <h2 class="section-title">Academic Profiles</h2>
                <div class="links-grid">
                    <a href="#" class="external-link" target="_blank" rel="noopener noreferrer">
                        <div class="link-icon">🎓</div>
                        <div class="link-content">
                            <h3>Google Scholar</h3>
                            <p>Complete publication list with citations</p>
                        </div>
                    </a>
                    <a href="#" class="external-link" target="_blank" rel="noopener noreferrer">
                        <div class="link-icon">🔬</div>
                        <div class="link-content">
                            <h3>ResearchGate</h3>
                            <p>Research network and collaboration</p>
                        </div>
                    </a>
                    <a href="https://orcid.org/0000-0002-5471-3474" class="external-link" target="_blank" rel="noopener noreferrer">
                        <div class="link-icon">🆔</div>
                        <div class="link-content">
                            <h3>ORCID</h3>
                            <p>Unique researcher identifier</p>
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/selim-%C3%A7a%C4%9Fatay-b34889170/" class="external-link" target="_blank" rel="noopener noreferrer">
                        <div class="link-icon">💼</div>
                        <div class="link-content">
                            <h3>LinkedIn</h3>
                            <p>Professional network and updates</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Office Address</h3>
                    <p>Akdeniz University<br>
                    Faculty of Economics and Administrative Sciences<br>
                    Department of Economics<br>
                    Dumlupınar cad. 07058-Antalya, Turkey</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="cv.html">CV</a></li>
                        <li><a href="publications.html">Publications</a></li>
                        <li><a href="research-grants.html">Research Grants</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Academic Profiles</h3>
                    <ul>
                        <li><a href="#" target="_blank">Google Scholar</a></li>
                        <li><a href="#" target="_blank">ResearchGate</a></li>
                        <li><a href="https://orcid.org/0000-0002-5471-3474" target="_blank">ORCID</a></li>
                        <li><a href="https://www.linkedin.com/in/selim-%C3%A7a%C4%9Fatay-b34889170/" target="_blank">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Prof. Dr. Selim Çağatay. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="js/script.js"></script>
    <script>
        // Enhanced search and filter functionality for publications
        function searchPublications() {
            const searchTerm = document.getElementById('publicationSearch').value.toLowerCase();
            const yearFilter = document.getElementById('yearFilter').value;
            const typeFilter = document.getElementById('typeFilter').value;
            const sortFilter = document.getElementById('sortFilter').value;
            
            filterPublications(searchTerm, yearFilter, typeFilter, sortFilter);
        }
        
        function filterPublications(searchTerm = '', yearFilter = '', typeFilter = '', sortFilter = 'year-desc') {
            const yearSections = document.querySelectorAll('.year-section');
            const noResults = document.getElementById('noResults');
            let visibleCount = 0;
            
            yearSections.forEach(section => {
                const year = section.dataset.year;
                const publications = section.querySelectorAll('.publication-item');
                let sectionVisible = false;
                
                publications.forEach(pub => {
                    const pubYear = pub.dataset.year;
                    const pubType = pub.dataset.type;
                    const pubText = pub.textContent.toLowerCase();
                    
                    let visible = true;
                    
                    // Apply filters
                    if (searchTerm && !pubText.includes(searchTerm)) visible = false;
                    if (yearFilter && pubYear !== yearFilter) visible = false;
                    if (typeFilter && pubType !== typeFilter) visible = false;
                    
                    if (visible) {
                        pub.style.display = 'block';
                        sectionVisible = true;
                        visibleCount++;
                    } else {
                        pub.style.display = 'none';
                    }
                });
                
                // Show/hide year section based on whether it has visible publications
                section.style.display = sectionVisible ? 'block' : 'none';
            });
            
            // Update results count
            document.getElementById('resultsCount').textContent = 
                `Showing ${visibleCount} publication${visibleCount !== 1 ? 's' : ''}`;
            
            // Show/hide no results message
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        
        function clearFilters() {
            document.getElementById('publicationSearch').value = '';
            document.getElementById('yearFilter').value = '';
            document.getElementById('typeFilter').value = '';
            document.getElementById('sortFilter').value = 'year-desc';
            filterPublications();
        }
        
        // Add event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('publicationSearch');
            const yearFilter = document.getElementById('yearFilter');
            const typeFilter = document.getElementById('typeFilter');
            const sortFilter = document.getElementById('sortFilter');
            
            searchInput.addEventListener('input', searchPublications);
            yearFilter.addEventListener('change', searchPublications);
            typeFilter.addEventListener('change', searchPublications);
            sortFilter.addEventListener('change', searchPublications);
            
            // Enter key support for search
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchPublications();
                }
            });
        });
    </script>
</body>
</html>'''
    
    return html

def main():
    """Generate and save the publications HTML"""
    print("Generating publications.html...")
    
    html_content = generate_html()
    
    # Save the HTML file
    output_path = "/Users/mertcagatay/Web Development Projects/SelimCagatayWebpage/publications.html"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Publications page generated: {output_path}")
    print("Features included:")
    print("- Real publication data from publications.txt")
    print("- Search functionality")
    print("- Year and type filtering")
    print("- Publication statistics")
    print("- Research Grants navigation link")
    print("- Responsive design")
    print("- Academic styling")

if __name__ == "__main__":
    main()