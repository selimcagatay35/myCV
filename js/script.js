// Academic Website JavaScript - Enhanced with Modern Features

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeThemeToggle();
    initializeGallery();
    initializePublications();
    initializeLazyLoading();
    initializeCV();
    initializeScrollEffects();
    initializeAccessibility();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Highlight active navigation link based on current page
    highlightActiveNavLink();
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeToggle && themeIcon) {
        // Load saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

function setTheme(theme) {
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
    }
}

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Gallery functionality
function initializeGallery() {
    if (document.querySelector('.gallery-grid')) {
        initializeGalleryFilters();
        initializeLightbox();
        updatePhotoCount();
        
        // Initialize carousel if on gallery page
        if (document.querySelector('.carousel-container')) {
            initializeCarousel();
        }
        
        // Hide loading spinner after a delay
        setTimeout(() => {
            const loading = document.getElementById('galleryLoading');
            if (loading) {
                loading.style.display = 'none';
            }
        }, 1000);
    }
}

function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update photo count
            updatePhotoCount();
        });
    });
}

function updatePhotoCount() {
    const photoCountElement = document.getElementById('photoCount');
    if (photoCountElement) {
        const visibleItems = document.querySelectorAll('.gallery-item[style*="display: block"], .gallery-item:not([style*="display: none"])');
        const count = visibleItems.length;
        photoCountElement.textContent = `Showing ${count} photo${count !== 1 ? 's' : ''}`;
    }
}

// Lightbox functionality
let currentImageIndex = 0;
let galleryImages = [];

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (!lightbox) return;
    
    // Collect all gallery images
    updateGalleryImages();
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
    
    // Prevent lightbox from closing when clicking on content
    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
        lightboxContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

function updateGalleryImages() {
    galleryImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => ({
        src: img.getAttribute('data-full') || img.src,
        alt: img.alt,
        caption: img.getAttribute('data-caption') || img.alt,
        title: img.closest('.gallery-item').querySelector('.gallery-info h3')?.textContent || ''
    }));
}

function openLightbox(button) {
    const lightbox = document.getElementById('lightbox');
    const img = button.closest('.gallery-item').querySelector('img');
    
    if (!lightbox || !img) return;
    
    updateGalleryImages();
    currentImageIndex = Array.from(document.querySelectorAll('.gallery-item img')).indexOf(img);
    
    displayLightboxImage();
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    displayLightboxImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    displayLightboxImage();
}

function displayLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightboxImage && galleryImages[currentImageIndex]) {
        const image = galleryImages[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        
        if (lightboxTitle) lightboxTitle.textContent = image.title;
        if (lightboxCaption) lightboxCaption.textContent = image.caption;
    }
}

// Load more photos functionality
function loadMorePhotos() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const gallery = document.querySelector('.gallery-grid');
    
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        
        // Simulate loading more photos
        setTimeout(() => {
            // In a real implementation, this would load more photos from a server
            loadMoreBtn.textContent = 'Load More Photos';
            loadMoreBtn.disabled = false;
            
            // Hide the button if no more photos to load
            // loadMoreBtn.style.display = 'none';
        }, 2000);
    }
}

// Publications functionality
function initializePublications() {
    if (document.querySelector('.publications-list')) {
        initializePublicationSearch();
        initializePublicationFilters();
        updatePublicationStats();
        makePublicationsClickable();
    }
}

function initializePublicationSearch() {
    const searchInput = document.getElementById('publicationSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterPublications(searchTerm);
        });
    }
}

function initializePublicationFilters() {
    const filters = ['yearFilter', 'typeFilter', 'sortFilter'];
    
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', function() {
                applyPublicationFilters();
            });
        }
    });
}

function searchPublications() {
    const searchInput = document.getElementById('publicationSearch');
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        filterPublications(searchTerm);
    }
}

function filterPublications(searchTerm = '') {
    const publications = document.querySelectorAll('.publication-item');
    let visibleCount = 0;
    
    publications.forEach(publication => {
        const title = publication.querySelector('.publication-title')?.textContent.toLowerCase() || '';
        const authors = publication.querySelector('.publication-authors')?.textContent.toLowerCase() || '';
        const journal = publication.querySelector('.publication-journal')?.textContent.toLowerCase() || '';
        const abstract = publication.querySelector('.publication-abstract')?.textContent.toLowerCase() || '';
        
        const matchesSearch = !searchTerm || 
            title.includes(searchTerm) || 
            authors.includes(searchTerm) || 
            journal.includes(searchTerm) || 
            abstract.includes(searchTerm);
        
        if (matchesSearch) {
            publication.style.display = 'block';
            visibleCount++;
        } else {
            publication.style.display = 'none';
        }
    });
    
    updateResultsCount(visibleCount);
}

function applyPublicationFilters() {
    const yearFilter = document.getElementById('yearFilter')?.value;
    const typeFilter = document.getElementById('typeFilter')?.value;
    const sortFilter = document.getElementById('sortFilter')?.value;
    const searchTerm = document.getElementById('publicationSearch')?.value.toLowerCase() || '';
    
    const publications = Array.from(document.querySelectorAll('.publication-item'));
    let visibleCount = 0;
    
    publications.forEach(publication => {
        const year = publication.getAttribute('data-year');
        const type = publication.getAttribute('data-type');
        
        const matchesYear = !yearFilter || year === yearFilter || (yearFilter === 'older' && parseInt(year) < 2020);
        const matchesType = !typeFilter || type === typeFilter;
        
        // Search filter
        const title = publication.querySelector('.publication-title')?.textContent.toLowerCase() || '';
        const authors = publication.querySelector('.publication-authors')?.textContent.toLowerCase() || '';
        const journal = publication.querySelector('.publication-journal')?.textContent.toLowerCase() || '';
        const abstract = publication.querySelector('.publication-abstract')?.textContent.toLowerCase() || '';
        
        const matchesSearch = !searchTerm || 
            title.includes(searchTerm) || 
            authors.includes(searchTerm) || 
            journal.includes(searchTerm) || 
            abstract.includes(searchTerm);
        
        if (matchesYear && matchesType && matchesSearch) {
            publication.style.display = 'block';
            visibleCount++;
        } else {
            publication.style.display = 'none';
        }
    });
    
    // Apply sorting
    if (sortFilter) {
        sortPublications(publications, sortFilter);
    }
    
    updateResultsCount(visibleCount);
}

function sortPublications(publications, sortType) {
    const container = document.querySelector('.publications-container');
    if (!container) return;
    
    const sortedPublications = publications.filter(pub => pub.style.display !== 'none');
    
    sortedPublications.sort((a, b) => {
        const titleA = a.querySelector('.publication-title')?.textContent || '';
        const titleB = b.querySelector('.publication-title')?.textContent || '';
        const yearA = parseInt(a.getAttribute('data-year')) || 0;
        const yearB = parseInt(b.getAttribute('data-year')) || 0;
        
        switch(sortType) {
            case 'year-desc':
                return yearB - yearA;
            case 'year-asc':
                return yearA - yearB;
            case 'title-asc':
                return titleA.localeCompare(titleB);
            case 'title-desc':
                return titleB.localeCompare(titleA);
            default:
                return 0;
        }
    });
    
    // Re-append sorted publications
    const yearSections = container.querySelectorAll('.year-section');
    yearSections.forEach(section => {
        const yearContainer = section.querySelector('.publications-year');
        if (yearContainer) {
            // Clear existing publications
            yearContainer.innerHTML = '';
            
            // Add sorted publications that belong to this year
            const sectionYear = section.querySelector('.year-title')?.textContent;
            sortedPublications.forEach(pub => {
                const pubYear = pub.getAttribute('data-year');
                if (sectionYear === pubYear) {
                    yearContainer.appendChild(pub);
                }
            });
        }
    });
}

function clearFilters() {
    // Clear all filter inputs
    const searchInput = document.getElementById('publicationSearch');
    const yearFilter = document.getElementById('yearFilter');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (searchInput) searchInput.value = '';
    if (yearFilter) yearFilter.value = '';
    if (typeFilter) typeFilter.value = '';
    if (sortFilter) sortFilter.value = 'year-desc';
    
    // Show all publications
    const publications = document.querySelectorAll('.publication-item');
    publications.forEach(pub => pub.style.display = 'block');
    
    updateResultsCount(publications.length);
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        if (count === 0) {
            resultsCount.textContent = 'No publications found';
            document.getElementById('noResults').style.display = 'block';
        } else {
            resultsCount.textContent = `Showing ${count} publication${count !== 1 ? 's' : ''}`;
            document.getElementById('noResults').style.display = 'none';
        }
    }
}

function updatePublicationStats() {
    const totalPubs = document.querySelectorAll('.publication-item').length;
    const journalPubs = document.querySelectorAll('.publication-item[data-type="journal"]').length;
    const conferencePubs = document.querySelectorAll('.publication-item[data-type="conference"]').length;
    const bookPubs = document.querySelectorAll('.publication-item[data-type="book"]').length;
    
    const totalElement = document.getElementById('totalPublications');
    const journalElement = document.getElementById('journalArticles');
    const conferenceElement = document.getElementById('conferencePapers');
    const bookElement = document.getElementById('bookChapters');
    
    if (totalElement) totalElement.textContent = totalPubs;
    if (journalElement) journalElement.textContent = journalPubs;
    if (conferenceElement) conferenceElement.textContent = conferencePubs;
    if (bookElement) bookElement.textContent = bookPubs;
}

function makePublicationsClickable() {
    const publications = document.querySelectorAll('.publication-item');
    
    publications.forEach(publication => {
        // Add clickable class for styling
        publication.classList.add('clickable');
        
        // Determine the best link for this publication
        const linkInfo = getBestPublicationLink(publication);
        
        // Update the hover tooltip based on link type
        updatePublicationTooltip(publication, linkInfo.type);
        
        // Add click event listener
        publication.addEventListener('click', function(e) {
            // Prevent default if it's not already a link
            if (publication.tagName !== 'A') {
                e.preventDefault();
                window.open(linkInfo.url, '_blank', 'noopener,noreferrer');
            }
        });
        
        // Add keyboard accessibility
        publication.setAttribute('tabindex', '0');
        publication.setAttribute('role', 'button');
        publication.setAttribute('aria-label', `Click to view publication via ${linkInfo.type}`);
        
        // Handle keyboard events
        publication.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                publication.click();
            }
        });
    });
}

function getBestPublicationLink(publication) {
    const publicationText = publication.querySelector('.publication-text');
    if (!publicationText) {
        return {
            url: 'https://scholar.google.com/citations?hl=en&user=GaoGA7sAAAAJ',
            type: 'Google Scholar Profile'
        };
    }
    
    const text = publicationText.textContent;
    
    // 1. Check for existing DOI links (highest priority)
    const doiLink = publication.querySelector('a[href*="doi.org"]');
    if (doiLink) {
        return {
            url: doiLink.href,
            type: 'Direct DOI Link'
        };
    }
    
    // 2. Check for DOI in text (enhanced detection for multiple formats)
    const doiPatterns = [
        /DOI:\s*([^\s,().]+)/i,                          // Standard DOI: format
        /doi\.org\/([^\s,().]+)/i,                       // Direct doi.org links
        /https?:\/\/doi\.org\/([^\s,().]+)/i,            // Full DOI URLs
        /https?:\/\/dx\.doi\.org\/([^\s,().]+)/i,        // dx.doi.org URLs
        /\bdoi:([^\s,().]+)/i,                           // Simple doi: format
        /digital\s+object\s+identifier[:\s]*([^\s,().]+)/i // Full DOI text
    ];
    
    for (const pattern of doiPatterns) {
        const match = text.match(pattern);
        if (match) {
            let doi = match[1].replace(/[.,;)]+$/, ''); // Remove trailing punctuation
            const doiUrl = doi.startsWith('http') ? doi : `https://doi.org/${doi}`;
            return {
                url: doiUrl,
                type: 'DOI Link'
            };
        }
    }
    
    // 3. Extract journal name and create journal-specific search
    const journalName = extractJournalName(text);
    if (journalName && journalName.length > 5) {
        const title = getPublicationTitle(publication);
        if (title) {
            const searchQuery = encodeURIComponent(`"${title}" site:${getJournalDomain(journalName)}`);
            return {
                url: `https://www.google.com/search?q=${searchQuery}`,
                type: 'Journal Search'
            };
        }
    }
    
    // 4. ResearchGate search (better for academic papers than Google Scholar)
    const title = getPublicationTitle(publication);
    if (title && title.length > 10) {
        const searchQuery = encodeURIComponent(`"${title}" Selim Çağatay`);
        return {
            url: `https://www.researchgate.net/search/publication?q=${searchQuery}`,
            type: 'ResearchGate Search'
        };
    }
    
    // 5. Academia.edu search
    if (title && title.length > 5) {
        const searchQuery = encodeURIComponent(`"${title}" Selim Çağatay`);
        return {
            url: `https://www.academia.edu/search?q=${searchQuery}`,
            type: 'Academia.edu Search'
        };
    }
    
    // 6. Final fallback: Google Scholar profile
    return {
        url: 'https://scholar.google.com/citations?hl=en&user=GaoGA7sAAAAJ',
        type: 'Google Scholar Profile'
    };
}

function extractJournalName(text) {
    // Common journal name patterns
    const patterns = [
        /,\s*([^,]+(?:Journal|Review|Proceedings|Conference)[^,]*),\s*(?:cilt|vol|volume|pp|p\.|ss\.)/i,
        /,\s*([^,]+(?:Dergisi|Araştırmaları)[^,]*),\s*(?:cilt|vol|volume|pp|p\.|ss\.)/i,
        /,\s*([A-Z][^,]*(?:Economics|Agricultural|Tourism|Issues)[^,]*),\s*(?:cilt|vol|volume|pp|p\.|ss\.)/i
    ];
    
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            return match[1].trim();
        }
    }
    
    return null;
}

function getJournalDomain(journalName) {
    // Map common journals to their domains for more targeted searches
    const journalDomains = {
        'Tarım Ekonomisi Araştırmaları Dergisi': 'tarimsalekonomi.org.tr',
        'Journal of Agricultural Sciences': 'agri.ankara.edu.tr',
        'Current Issues in Tourism': 'tandfonline.com',
        'Woman and Criminal Justice Journal': 'tandfonline.com',
        'Sosyoekonomi': 'sosyoekonomi.org'
    };
    
    // Check for exact matches
    if (journalDomains[journalName]) {
        return journalDomains[journalName];
    }
    
    // Check for partial matches
    for (const [journal, domain] of Object.entries(journalDomains)) {
        if (journalName.includes(journal) || journal.includes(journalName)) {
            return domain;
        }
    }
    
    // Default to general academic search
    return 'scholar.google.com';
}

function updatePublicationTooltip(publication, linkType) {
    // Update the CSS tooltip content based on link type
    const tooltips = {
        'Direct DOI Link': '🔗 View Full Paper',
        'DOI Link': '🔗 View Full Paper',
        'Journal Search': '📄 Search Journal',
        'ResearchGate Search': '🔬 Search ResearchGate',
        'Academia.edu Search': '🎓 Search Academia.edu',
        'Google Scholar Profile': '👨‍🏫 View Scholar Profile'
    };
    
    const tooltip = tooltips[linkType] || '🔗 View Publication';
    publication.style.setProperty('--tooltip-text', `"${tooltip}"`);
}

function getPublicationTitle(publication) {
    const publicationText = publication.querySelector('.publication-text');
    if (!publicationText) return null;
    
    const text = publicationText.textContent;
    
    // Try to extract title from quoted text (handles both English and Turkish quotes)
    const quotedMatch = text.match(/["""']([^"""']+)["""']?/);
    if (quotedMatch) {
        return cleanTitle(quotedMatch[1]);
    }
    
    // Try to extract title from the beginning for Turkish/English mixed format
    // Pattern: "Title", Author, Journal/Conference, details
    const titleMatch = text.match(/^([^,]+),\s*[A-ZÇĞIİÖŞÜçğıiöşü][^,]*\s*(?:Ç|[A-Z])/);
    if (titleMatch) {
        let title = titleMatch[1].replace(/^["""']/, '').replace(/["""']$/, '').trim();
        if (title.length > 5) {
            return cleanTitle(title);
        }
    }
    
    // Try to extract title before author name pattern (works for various formats)
    const authorMatch = text.match(/^([^,]+)(?:,\s*(?:in\s+|[A-ZÇĞIİÖŞÜ][^,]*\s+(?:Journal|Conference|Proceedings|Book|Dergisi|Araştırmaları)))/i);
    if (authorMatch) {
        return cleanTitle(authorMatch[1]);
    }
    
    // Handle Turkish conference/book chapter format
    const turkishMatch = text.match(/^([^,]+),\s*[A-ZÇĞIİÖŞÜçğıiöşü][^,]*(?:Çağatay|Koç|Bayaner)/);
    if (turkishMatch) {
        return cleanTitle(turkishMatch[1]);
    }
    
    // Fallback: take meaningful first part (increased length for better searches)
    let fallback = text.substring(0, 80).trim();
    if (fallback.includes(',')) {
        fallback = fallback.substring(0, fallback.indexOf(','));
    }
    
    return cleanTitle(fallback);
}

function cleanTitle(title) {
    return title
        .replace(/^["""']+/, '')       // Remove leading quotes
        .replace(/["""']+$/, '')       // Remove trailing quotes
        .replace(/\s+/g, ' ')          // Normalize whitespace
        .replace(/[.,;:!?]+$/, '')     // Remove trailing punctuation
        .trim();
}

// CV functionality
function initializeCV() {
    if (document.querySelector('.cv-viewer')) {
        initializeCVEmbed();
    }
}

function initializeCVEmbed() {
    const cvEmbed = document.getElementById('cvEmbed');
    const cvFallback = document.getElementById('cvFallback');
    
    if (cvEmbed) {
        // Check if PDF can be loaded
        cvEmbed.onload = function() {
            console.log('CV PDF loaded successfully');
        };
        
        cvEmbed.onerror = function() {
            console.log('CV PDF failed to load, showing fallback');
            if (cvFallback) {
                cvEmbed.style.display = 'none';
                cvFallback.style.display = 'block';
            }
        };
    }
}

function toggleFullscreen() {
    const cvEmbedWrapper = document.getElementById('cvEmbedWrapper');
    if (!cvEmbedWrapper) return;
    
    if (!document.fullscreenElement) {
        cvEmbedWrapper.requestFullscreen().catch(err => {
            console.log('Error entering fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Lazy loading functionality
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Fade in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.research-card, .publication-item, .editorial-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Tab trap for modal dialogs
        if (e.key === 'Tab' && document.querySelector('.lightbox.active')) {
            trapFocusInLightbox(e);
        }
    });
    
    // ARIA live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    // Announce filter changes
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.textContent;
            announceToScreenReader(`Filtering by ${filter}`);
        });
    });
}

function trapFocusInLightbox(e) {
    const lightbox = document.querySelector('.lightbox.active');
    if (!lightbox) return;
    
    const focusableElements = lightbox.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
        }
    }
}

function announceToScreenReader(message) {
    const liveRegion = document.querySelector('[aria-live="polite"]');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const debouncedSearch = debounce(searchPublications, 300);
const throttledScroll = throttle(initializeScrollEffects, 100);

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In a production environment, you might want to send this to an error reporting service
});

// Resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    updatePhotoCount();
    updateGalleryImages();
    // Adjust carousel height on resize
    if (typeof adjustCarouselHeight === 'function') {
        adjustCarouselHeight();
    }
}, 250));

// Photo Carousel functionality
let carouselPhotos = [];
let currentCarouselIndex = 0;
let carouselInterval = null;
let isCarouselPlaying = false;
let progressInterval = null;

function initializeCarousel() {
    // Get all gallery images and randomly select 20
    const allImages = Array.from(document.querySelectorAll('.gallery-item img'));
    carouselPhotos = getRandomPhotos(allImages, 20);
    
    if (carouselPhotos.length === 0) return;
    
    // Build carousel HTML
    buildCarouselSlides();
    buildCarouselIndicators();
    
    // Set up event listeners
    setupCarouselEventListeners();
    
    // Show first slide and adjust height
    goToCarouselSlide(0);
    
    // Start auto-play
    startCarousel();
}

function getRandomPhotos(images, count) {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length)).map(img => ({
        src: img.src,
        alt: img.alt,
        caption: img.getAttribute('data-caption') || img.alt,
        title: img.closest('.gallery-item').querySelector('.gallery-info h3')?.textContent || img.alt
    }));
}

function buildCarouselSlides() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    track.innerHTML = '';
    
    carouselPhotos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
            <div class="carousel-slide-info">
                <h3>${photo.title}</h3>
                <p>${photo.caption}</p>
            </div>
        `;
        
        // Add click handler for modal
        slide.addEventListener('click', () => openCarouselModal(index));
        
        track.appendChild(slide);
    });
}

function buildCarouselIndicators() {
    const indicators = document.getElementById('carouselIndicators');
    if (!indicators) return;
    
    indicators.innerHTML = '';
    
    carouselPhotos.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        indicator.addEventListener('click', () => goToCarouselSlide(index));
        indicators.appendChild(indicator);
    });
}

function setupCarouselEventListeners() {
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const playPauseBtn = document.getElementById('carouselPlayPause');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToCarouselSlide(currentCarouselIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToCarouselSlide(currentCarouselIndex + 1);
        });
    }
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleCarouselPlayPause);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('.carousel-modal.active')) {
            switch(e.key) {
                case 'Escape':
                    closeCarouselModal();
                    break;
                case 'ArrowLeft':
                    goToCarouselSlide(currentCarouselIndex - 1);
                    break;
                case 'ArrowRight':
                    goToCarouselSlide(currentCarouselIndex + 1);
                    break;
            }
        }
    });
}

function goToCarouselSlide(index) {
    if (carouselPhotos.length === 0) return;
    
    // Wrap around
    if (index < 0) {
        currentCarouselIndex = carouselPhotos.length - 1;
    } else if (index >= carouselPhotos.length) {
        currentCarouselIndex = 0;
    } else {
        currentCarouselIndex = index;
    }
    
    // Update slide position
    const track = document.getElementById('carouselTrack');
    if (track) {
        track.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    }
    
    // Update indicators
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentCarouselIndex);
    });
    
    // Adjust carousel height based on current image
    adjustCarouselHeight();
    
    // Reset progress
    resetCarouselProgress();
}

function adjustCarouselHeight() {
    const currentPhoto = carouselPhotos[currentCarouselIndex];
    if (!currentPhoto) return;
    
    const wrapper = document.querySelector('.carousel-wrapper');
    if (!wrapper) return;
    
    // Create a temporary image to get natural dimensions
    const tempImg = new Image();
    tempImg.onload = function() {
        const aspectRatio = this.naturalHeight / this.naturalWidth;
        const containerWidth = wrapper.offsetWidth;
        
        // Calculate ideal height based on aspect ratio
        let idealHeight = containerWidth * aspectRatio;
        
        // Set reasonable bounds
        const minHeight = 300;
        const maxHeight = Math.min(window.innerHeight * 0.8, 800);
        
        // Constrain height within bounds
        idealHeight = Math.max(minHeight, Math.min(idealHeight, maxHeight));
        
        // Apply the calculated height with smooth transition
        wrapper.style.transition = 'height 0.5s ease-in-out';
        wrapper.style.height = `${idealHeight}px`;
    };
    
    tempImg.src = currentPhoto.src;
}

function startCarousel() {
    if (carouselInterval) return;
    
    isCarouselPlaying = true;
    const playPauseBtn = document.getElementById('carouselPlayPause');
    if (playPauseBtn) {
        playPauseBtn.classList.add('playing');
    }
    
    carouselInterval = setInterval(() => {
        goToCarouselSlide(currentCarouselIndex + 1);
    }, 5000);
    
    startCarouselProgress();
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
    
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    
    isCarouselPlaying = false;
    const playPauseBtn = document.getElementById('carouselPlayPause');
    if (playPauseBtn) {
        playPauseBtn.classList.remove('playing');
    }
    
    resetCarouselProgress();
}

function toggleCarouselPlayPause() {
    if (isCarouselPlaying) {
        stopCarousel();
    } else {
        startCarousel();
    }
}

function startCarouselProgress() {
    const progressBar = document.getElementById('carouselProgressBar');
    if (!progressBar) return;
    
    let progress = 0;
    const increment = 100 / (5000 / 100); // 5 seconds in 100ms increments
    
    progressInterval = setInterval(() => {
        progress += increment;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            progress = 0;
        }
    }, 100);
}

function resetCarouselProgress() {
    const progressBar = document.getElementById('carouselProgressBar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    
    if (isCarouselPlaying) {
        startCarouselProgress();
    }
}

function openCarouselModal(index) {
    const modal = document.getElementById('carouselModal');
    const modalImage = document.getElementById('carouselModalImage');
    const modalTitle = document.getElementById('carouselModalTitle');
    const modalCaption = document.getElementById('carouselModalCaption');
    
    if (!modal || !modalImage || !carouselPhotos[index]) return;
    
    const photo = carouselPhotos[index];
    modalImage.src = photo.src;
    modalImage.alt = photo.alt;
    
    if (modalTitle) modalTitle.textContent = photo.title;
    if (modalCaption) modalCaption.textContent = photo.caption;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Pause carousel while modal is open
    if (isCarouselPlaying) {
        stopCarousel();
    }
}

function closeCarouselModal() {
    const modal = document.getElementById('carouselModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Resume carousel
        startCarousel();
    }
}

// Export functions for global access
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.previousImage = previousImage;
window.nextImage = nextImage;
window.loadMorePhotos = loadMorePhotos;
window.searchPublications = searchPublications;
window.clearFilters = clearFilters;
window.toggleFullscreen = toggleFullscreen;
window.setTheme = setTheme;
window.closeCarouselModal = closeCarouselModal;