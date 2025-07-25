#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Publication Parser for Prof. Dr. Selim Çağatay's CV
Extracts and organizes publications by category and year
"""

import re
import json
from datetime import datetime
from collections import defaultdict

def extract_year_from_text(text):
    """Extract publication year from text using various patterns"""
    # Look for 4-digit years
    year_patterns = [
        r'\b(20\d{2})\b',  # 2000-2099
        r'\b(19\d{2})\b',  # 1900-1999
        r'Vol\.?\s*\d+.*?(\d{4})',  # Volume patterns
        r'cilt\.?\s*\d+.*?(\d{4})',  # Turkish volume patterns
        r'pp?\.\s*\d+-\d+,?\s*(\d{4})',  # Page patterns
        r's[sa]?\.\s*\d+-\d+,?\s*(\d{4})',  # Turkish page patterns
    ]
    
    for pattern in year_patterns:
        matches = re.findall(pattern, text)
        if matches:
            years = [int(year) for year in matches if 1990 <= int(year) <= 2025]
            if years:
                return max(years)  # Return most recent year if multiple found
    
    return None

def clean_text(text):
    """Clean and normalize text"""
    text = re.sub(r'\s+', ' ', text)  # Multiple spaces to single
    text = text.strip()
    return text

def parse_journal_articles(text):
    """Parse journal articles section"""
    articles = []
    lines = text.split('\n')
    current_article = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            if current_article:
                articles.append(clean_text(current_article))
                current_article = ""
            continue
        
        # Start of new article (usually starts with quote or author name)
        if (line.startswith('"') or 
            any(name in line for name in ['Çağatay', 'Cagatay']) or
            re.match(r'^[A-Z]', line)):
            if current_article:
                articles.append(clean_text(current_article))
            current_article = line
        else:
            if current_article:
                current_article += " " + line
    
    if current_article:
        articles.append(clean_text(current_article))
    
    return articles

def parse_books_and_volumes(text):
    """Parse books and edited volumes section"""
    books = []
    lines = text.split('\n')
    current_book = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            if current_book:
                books.append(clean_text(current_book))
                current_book = ""
            continue
        
        # Start of new book entry
        if (re.match(r'^[A-Z]', line) or 
            'eds.' in line or
            any(publisher in line.lower() for publisher in ['routledge', 'elma', 'tepge', 'lambert'])):
            if current_book:
                books.append(clean_text(current_book))
            current_book = line
        else:
            if current_book:
                current_book += " " + line
    
    if current_book:
        books.append(clean_text(current_book))
    
    return books

def parse_book_chapters(text):
    """Parse book chapters section"""
    chapters = []
    lines = text.split('\n')
    current_chapter = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            if current_chapter:
                chapters.append(clean_text(current_chapter))
                current_chapter = ""
            continue
        
        # Start of new chapter (usually starts with quote)
        if (line.startswith('"') or 
            'in ' in line.lower() or
            any(name in line for name in ['Çağatay', 'Cagatay'])):
            if current_chapter:
                chapters.append(clean_text(current_chapter))
            current_chapter = line
        else:
            if current_chapter:
                current_chapter += " " + line
    
    if current_chapter:
        chapters.append(clean_text(current_chapter))
    
    return chapters

def parse_research_reports(text):
    """Parse research reports and discussion papers section"""
    reports = []
    lines = text.split('\n')
    current_report = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            if current_report:
                reports.append(clean_text(current_report))
                current_report = ""
            continue
        
        # Start of new report
        if (any(name in line for name in ['Çağatay', 'Cagatay']) or
            re.match(r'^[A-Z]', line)):
            if current_report:
                reports.append(clean_text(current_report))
            current_report = line
        else:
            if current_report:
                current_report += " " + line
    
    if current_report:
        reports.append(clean_text(current_report))
    
    return reports

def parse_conference_papers(text):
    """Parse conference papers section"""
    papers = []
    lines = text.split('\n')
    current_paper = ""
    
    for line in lines:
        line = line.strip()
        if not line:
            if current_paper:
                papers.append(clean_text(current_paper))
                current_paper = ""
            continue
        
        # Start of new conference paper
        if (any(name in line for name in ['Çağatay', 'Cagatay']) or
            re.match(r'^[A-Z]', line) or
            'presented' in line.lower()):
            if current_paper:
                papers.append(clean_text(current_paper))
            current_paper = line
        else:
            if current_paper:
                current_paper += " " + line
    
    if current_paper:
        papers.append(clean_text(current_paper))
    
    return papers

def organize_by_year(publications, category):
    """Organize publications by year"""
    year_dict = defaultdict(list)
    
    for pub in publications:
        if not pub.strip():
            continue
            
        year = extract_year_from_text(pub)
        if year:
            year_dict[year].append({
                'text': pub,
                'category': category,
                'year': year
            })
        else:
            # If no year found, put in 'unknown' category
            year_dict['unknown'].append({
                'text': pub,
                'category': category,
                'year': 'unknown'
            })
    
    return year_dict

def read_cv_file():
    """Read and parse the CV file"""
    cv_path = "/Users/mertcagatay/Web Development Projects/SelimCagatayWebpage/images/gallery/Profile /CVtext.txt"
    
    try:
        with open(cv_path, 'r', encoding='utf-8') as file:
            content = file.read()
    except UnicodeDecodeError:
        with open(cv_path, 'r', encoding='latin-1') as file:
            content = file.read()
    
    # Find section markers
    sections = {}
    lines = content.split('\n')
    
    current_section = None
    section_content = []
    
    for i, line in enumerate(lines):
        line = line.strip()
        
        if line == "Journal Articles:":
            if current_section:
                sections[current_section] = '\n'.join(section_content)
            current_section = "journal_articles"
            section_content = []
        elif line == "Books and Edited Volumes:":
            if current_section:
                sections[current_section] = '\n'.join(section_content)
            current_section = "books"
            section_content = []
        elif line == "Chapters in Books:":
            if current_section:
                sections[current_section] = '\n'.join(section_content)
            current_section = "chapters"
            section_content = []
        elif line == "Research Reports and Discussion Papers:":
            if current_section:
                sections[current_section] = '\n'.join(section_content)
            current_section = "reports"
            section_content = []
        elif line == "Conference Papers:":
            if current_section:
                sections[current_section] = '\n'.join(section_content)
            current_section = "conference"
            section_content = []
        elif line in ["Technical Works:", "Invited Speaker:"]:
            if current_section:
                sections[current_section] = '\n'.join(section_content)
            current_section = None
            section_content = []
        elif current_section:
            section_content.append(line)
    
    # Don't forget the last section
    if current_section:
        sections[current_section] = '\n'.join(section_content)
    
    return sections

def main():
    """Main function to parse CV and organize publications"""
    print("Parsing CV file...")
    
    # Read CV sections
    sections = read_cv_file()
    
    # Parse each section
    all_publications = defaultdict(list)
    
    if 'journal_articles' in sections:
        articles = parse_journal_articles(sections['journal_articles'])
        year_dict = organize_by_year(articles, 'journal')
        for year, pubs in year_dict.items():
            all_publications[year].extend(pubs)
    
    if 'books' in sections:
        books = parse_books_and_volumes(sections['books'])
        year_dict = organize_by_year(books, 'book')
        for year, pubs in year_dict.items():
            all_publications[year].extend(pubs)
    
    if 'chapters' in sections:
        chapters = parse_book_chapters(sections['chapters'])
        year_dict = organize_by_year(chapters, 'chapter')
        for year, pubs in year_dict.items():
            all_publications[year].extend(pubs)
    
    if 'reports' in sections:
        reports = parse_research_reports(sections['reports'])
        year_dict = organize_by_year(reports, 'report')
        for year, pubs in year_dict.items():
            all_publications[year].extend(pubs)
    
    if 'conference' in sections:
        papers = parse_conference_papers(sections['conference'])
        year_dict = organize_by_year(papers, 'conference')
        for year, pubs in year_dict.items():
            all_publications[year].extend(pubs)
    
    # Sort years in descending order
    sorted_years = sorted([year for year in all_publications.keys() if year != 'unknown'], reverse=True)
    
    # Create output structure
    organized_publications = {
        'years': sorted_years,
        'publications': dict(all_publications),
        'total_count': sum(len(pubs) for pubs in all_publications.values()),
        'categories': {
            'journal': sum(1 for year_pubs in all_publications.values() 
                          for pub in year_pubs if pub['category'] == 'journal'),
            'book': sum(1 for year_pubs in all_publications.values() 
                       for pub in year_pubs if pub['category'] == 'book'),
            'chapter': sum(1 for year_pubs in all_publications.values() 
                          for pub in year_pubs if pub['category'] == 'chapter'),
            'conference': sum(1 for year_pubs in all_publications.values() 
                             for pub in year_pubs if pub['category'] == 'conference'),
            'report': sum(1 for year_pubs in all_publications.values() 
                         for pub in year_pubs if pub['category'] == 'report')
        }
    }
    
    # Save to JSON file for use in HTML generation
    output_path = "/Users/mertcagatay/Web Development Projects/SelimCagatayWebpage/publications_data.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(organized_publications, f, ensure_ascii=False, indent=2)
    
    print(f"Parsed {organized_publications['total_count']} publications:")
    print(f"- Journal Articles: {organized_publications['categories']['journal']}")
    print(f"- Books/Edited Volumes: {organized_publications['categories']['book']}")
    print(f"- Book Chapters: {organized_publications['categories']['chapter']}")
    print(f"- Conference Papers: {organized_publications['categories']['conference']}")
    print(f"- Research Reports: {organized_publications['categories']['report']}")
    print(f"Years covered: {min(sorted_years)} - {max(sorted_years)}")
    print(f"Data saved to: {output_path}")

if __name__ == "__main__":
    main()