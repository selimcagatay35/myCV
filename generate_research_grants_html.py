#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate research-grants.html with real data from parsed publications.txt
"""

import json
import re
from html import escape

def format_grant_text(text):
    """Format grant text for HTML display"""
    text = escape(text)
    
    # Highlight author name
    text = re.sub(r'\b(Selim Çağatay|S\. Çağatay|Çağatay, S\.?|Cagatay, S\.?)\b', 
                  r'<strong>\1</strong>', text)
    
    # Format project titles in quotes
    text = re.sub(r'"([^"]+)"', r'<em>"\1"</em>', text)
    
    # Format organization names
    text = re.sub(r'\b(TÜBİTAK|BAKA|ICMPD|AFAD|EU|Akdeniz|OSB|ATSO|EBRD|FEMISE|OECD|UNDP|World Bank|FAO)\b', 
                  r'<strong>\1</strong>', text)
    
    return text

def extract_grant_info(grant_text):
    """Extract grant information from text"""
    # Extract project number if present
    project_number = ""
    number_match = re.search(r'\((\d+[A-Z]\d+)\)', grant_text)
    if number_match:
        project_number = number_match.group(1)
    
    # Extract role
    role = ""
    role_patterns = [
        r'(Consultant|Researcher|Project Coordinator|Senior Expert|Key Expert|Principal Expert|Research Economist|Research Assistant)',
        r'(Coordinator of the Partner Country Turkey)',
        r'(Research Assistant)'
    ]
    
    for pattern in role_patterns:
        role_match = re.search(pattern, grant_text)
        if role_match:
            role = role_match.group(1)
            break
    
    # Extract date
    date = ""
    date_patterns = [
        r'(September|March|November|October|June|May|December|January|February|August|July)\s+(\d{4})',
        r'(\d{1,2}(?:st|nd|rd|th)?\s+(?:Oct\.|Dec\.|Jan\.|Feb\.|Mar\.|Apr\.|May|Jun\.|Jul\.|Aug\.|Sep\.)\s+\d{4})',
        r'(\d{4}-\d{4})',
        r'(\d{4})'
    ]
    
    for pattern in date_patterns:
        date_match = re.search(pattern, grant_text)
        if date_match:
            date = date_match.group(0)
            break
    
    return {
        'project_number': project_number,
        'role': role,
        'date': date
    }

def generate_html():
    """Generate the complete HTML for research grants page"""
    
    # Load the research grants data
    with open('/Users/mertcagatay/Web Development Projects/SelimCagatayWebpage/research_grants_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Dr. Selim Çağatay - Research Grants and Funded Projects">
    <meta name="keywords" content="research grants, funded projects, TÜBİTAK, academic funding">
    <meta name="author" content="Dr. Selim Çağatay">
    
    <!-- Cache-busting headers for development -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>Research Grants - Dr. Selim Çağatay</title>
    
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
                        <a href="publications.html" class="nav-link">Publications</a>
                    </li>
                    <li class="nav-item">
                        <a href="research-grants.html" class="nav-link active">Research Grants</a>
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
                <h1 class="page-title">Research Grants</h1>
                <p class="page-subtitle">Funded Research Projects and Grants</p>
            </div>
        </section>

        <!-- Research Grants Statistics -->
        <section class="grants-stats">
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">''' + str(data['total_count']) + '''</span>
                        <span class="stat-label">Total Research Grants</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">TÜBİTAK</span>
                        <span class="stat-label">Primary Funding Agency</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">International</span>
                        <span class="stat-label">Collaborations</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">Ongoing</span>
                        <span class="stat-label">Active Projects</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Research Grants Content -->
        <section class="research-grants-content">
            <div class="container">
                <div class="grants-container">'''
    
    # Generate grants list
    for i, grant in enumerate(data['grants']):
        grant_info = extract_grant_info(grant)
        formatted_text = format_grant_text(grant)
        
        # Split title and translation if present
        lines = grant.split('.')
        title = lines[0] if lines else grant
        translation = ""
        
        if len(lines) > 1 and '(' in lines[1]:
            translation = lines[1].strip()
        
        html += f'''
                    
                    <!-- Grant {i+1} -->
                    <div class="grant-item">
                        <div class="grant-header">
                            <h3 class="grant-title">{escape(title)}</h3>'''
        
        if grant_info['project_number']:
            html += f'''
                            <span class="grant-number">{escape(grant_info['project_number'])}</span>'''
        
        html += f'''
                        </div>'''
        
        if translation:
            html += f'''
                        <p class="grant-translation">{escape(translation)}</p>'''
        
        html += f'''
                        <div class="grant-meta">
                            <span class="grant-role">{escape(grant_info['role'])}</span>
                            <span class="grant-date">{escape(grant_info['date'])}</span>
                        </div>
                        <div class="grant-description">
                            <p>{formatted_text}</p>
                        </div>
                    </div>'''
    
    html += '''
                </div>
            </div>
        </section>

        <!-- Funding Agencies -->
        <section class="funding-agencies">
            <div class="container">
                <h2 class="section-title">Funding Agencies & Partners</h2>
                <div class="agencies-grid">
                    <div class="agency-item">
                        <div class="agency-icon">🔬</div>
                        <h3>TÜBİTAK</h3>
                        <p>The Scientific and Technological Research Council of Turkey</p>
                    </div>
                    <div class="agency-item">
                        <div class="agency-icon">🌍</div>
                        <h3>European Union</h3>
                        <p>Horizon 2020 and other EU funding programs</p>
                    </div>
                    <div class="agency-item">
                        <div class="agency-icon">🏛️</div>
                        <h3>BAKA</h3>
                        <p>Batı Akdeniz Kalkınma Ajansı</p>
                    </div>
                    <div class="agency-item">
                        <div class="agency-icon">🌐</div>
                        <h3>International Organizations</h3>
                        <p>OECD, UNDP, World Bank, FAO, ICMPD</p>
                    </div>
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
</body>
</html>'''
    
    return html

def main():
    """Generate and save the research grants HTML"""
    print("Generating research-grants.html...")
    
    html_content = generate_html()
    
    # Save the HTML file
    output_path = "/Users/mertcagatay/Web Development Projects/SelimCagatayWebpage/research-grants.html"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Research grants page generated: {output_path}")
    print("Features included:")
    print("- Real research grants data from publications.txt")
    print("- Project number extraction")
    print("- Role and date parsing")
    print("- Funding agency highlighting")
    print("- Responsive design")
    print("- Academic styling")

if __name__ == "__main__":
    main()
