# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JavaScript website for Treasure Valley Foot & Ankle, a podiatry clinic in Meridian, Idaho. No build process or package manager - files are served directly to the browser.

**Deployment:** Netlify (auto-deploys on push to main)

## Development

This is a static site with no build tools. To develop:
- Open HTML files directly in a browser, or
- Use any local server (e.g., `python -m http.server 8000`)

No npm, build steps, or test frameworks exist.

## Architecture

### File Structure
- `index.html` - Main home page
- `meet-the-doctor.html` - About the podiatrist
- `services/` - 25 individual service pages (e.g., `plantar-fasciitis.html`, `bunion-treatment.html`)
- `css/styles.css` - Single stylesheet for all pages (~2,500 lines)
- `js/main.js` - Vanilla JS for all interactivity (~500 lines)
- `images/` - All media assets; `images/real/` contains actual clinic photos and logos

### CSS Variables (Brand Colors)
- Primary navy: `#002e5e`
- Secondary gold: `#fecf06`
- Fonts: Playfair Display (headings), Inter (body)

### JavaScript Features
- Mobile hamburger menu with focus trapping
- Header shadow on scroll
- Lazy image loading via IntersectionObserver
- Contact form validation with phone auto-formatting
- Scroll reveal animations
- Back-to-top button

### Page Template Pattern
All service pages follow identical structure:
1. Header with navigation
2. Breadcrumb
3. Service hero section
4. Content sections
5. CTA buttons
6. Footer

## Netlify Configuration

`netlify.toml` sets security headers and caching for static assets.

## Notes

- Contact form currently simulates submission (no backend)
- Images use modern formats (AVIF, WebP) with JPG fallbacks
- BEM naming convention for CSS classes
