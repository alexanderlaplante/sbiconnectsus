# SBI Connects — Complete Site Changelog

This document describes every major change made to the SBI Connects website from the initial build through the current version. It's written in plain language so anyone on the team can understand what was built, what was changed, and why.

---

## Table of Contents

1. [Site Foundation](#site-foundation)
2. [Pages & Navigation](#pages--navigation)
3. [Homepage](#homepage)
4. [About Page](#about-page)
5. [Services Overview Page](#services-overview-page)
6. [Service Pillar Pages](#service-pillar-pages)
7. [Contact Page](#contact-page)
8. [Design System & Visual Identity](#design-system--visual-identity)
9. [Animations & Interactions](#animations--interactions)
10. [SEO & AI Readiness](#seo--ai-readiness)
11. [Technical Architecture](#technical-architecture)

---

## Site Foundation

### What was built
The entire SBI Connects website was built from scratch as a modern, single-page web application. This means the site loads once and then navigates between pages instantly without full page reloads — making it feel fast and smooth.

### Technology choices
- **React** — The framework that powers the entire user interface
- **TypeScript** — A stricter version of JavaScript that catches errors before they reach users
- **Tailwind CSS** — A styling system that keeps the design consistent across every page
- **Framer Motion** — The animation library that powers all the smooth transitions and scroll effects
- **Vite** — The build tool that makes development fast and produces optimized files for production

### Why it matters
These technologies are industry-standard for modern websites. They ensure the site is fast, maintainable, and easy for developers to work on in the future.

---

## Pages & Navigation

### What was built
The site has **8 pages** connected through a clear navigation structure:

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Company introduction, capabilities overview, four-pillar preview |
| About | `/about` | Company story, veteran-owned credentials, why choose SBI |
| Services Overview | `/services` | Parent page linking to all four service pillars |
| Network Infrastructure | `/services/network-infrastructure` | Core 1 — Structured cabling, fiber, data centers |
| Wireless & Mobility | `/services/wireless-mobility` | Core 2 — Enterprise Wi-Fi, DAS, private LTE |
| Security & Life-Safety | `/services/security-access` | Core 3 — Video surveillance, access control, intrusion |
| Audio-Visual Systems | `/services/audio-visual` | Core 4 — Conference AV, mass notification, sound masking |
| Contact | `/contact` | Contact information and consultation request form |

### Navigation
- **Desktop:** Fixed top navigation bar with a dropdown menu for Services that shows all four pillars
- **Mobile:** Hamburger menu that slides open with all navigation links
- **Services dropdown:** Hovering over "Services" in the desktop nav reveals links to all four pillar pages
- **Active state highlighting:** The current page is highlighted in the navigation so visitors always know where they are

### 404 Page
A custom "Page Not Found" page was created so visitors who land on a broken link see a branded experience with a way to get back to the site.

### Scroll to Top
A `ScrollToTop` component ensures that when visitors navigate between pages, they start at the top of the new page instead of staying at their previous scroll position.

---

## Homepage

### What was built
The homepage consists of five major sections:

1. **Hero Section** — Full-width hero with the company tagline, a call-to-action button, and a background image with overlay effects
2. **Stats Bar** — A row of key company statistics (years of experience, projects completed, etc.)
3. **Capabilities Section** — Overview of what SBI does, presented in a visually engaging layout
4. **Four Pillars Section** — Preview cards for each of the four service areas, each linking to its dedicated page. Cards include service highlights as small badges (e.g., "Structured Cabling," "Fiber Rings")
5. **Mission Section** — Company mission statement and values

### Key details
- The hero uses a real photograph with a dark overlay to ensure text readability
- Pillar cards use a "glass card" design with hover effects that lift the card and reveal a "Learn more" link
- All sections animate into view as the visitor scrolls down the page

---

## About Page

### What was built
A four-section page that tells the SBI story:

1. **Hero** — "We Are Leaders in Innovation" with SDVOSB certification badge
2. **Why Choose SBI** — Four numbered cards covering: Engineered Design Authority, Single-Source Accountability, Standards-Driven Execution, and Veteran-Led Discipline
3. **Who We Are** — Detailed company description with a bullet list of capabilities and a team photo
4. **CTA** — "Ready to Build Something That Lasts?" with links to Contact and Services

### Key details
- The page emphasizes SBI's veteran-owned status (SDVOSB certification)
- RCDD and Professional Engineer oversight are highlighted as differentiators
- The page links visitors to both the Contact page and the Services overview

---

## Services Overview Page

### What was built
A comprehensive parent page with **seven sections** that introduces SBI's integrated approach before linking to individual service pillars:

1. **Hero** — "Integrated Infrastructure. Engineered for Performance." with RCDD/BICSI/PE credentials badge
2. **Four-Pillar Approach** — Cards for each service pillar with descriptions and direct links
3. **Converged Systems Value** — Explains why integrated infrastructure matters, with an interactive diagram showing how all four pillars connect
4. **Delivery Model** — A five-step process (Assess → Design → Integrate → Deploy → Support) displayed as a horizontal timeline on desktop and vertical steps on mobile
5. **Industries Served** — Grid of industry icons: Enterprise, Data Centers, Healthcare, Manufacturing, Education, Government
6. **Documentation & Accountability** — Three columns covering Standards Alignment, Validation & Testing, and Operational Clarity
7. **Final CTA** — "Let's Engineer Your Next Project" with consultation link

### Key details
- The "Explore Services" button on the homepage links directly to this parent page
- The pillar cards use the "Core X — [Name]" naming convention
- The integration diagram visually shows how all four services connect under a "Unified Infrastructure Platform"

---

## Service Pillar Pages

### What was built
Each of the four service pillar pages follows a **standardized layout** built on a reusable `ServicePageTemplate` component. This ensures a consistent experience across all service pages while allowing unique content for each.

### Shared structure (all four pages)
Every service page includes these sections in order:

| Section | What it contains |
|---------|-----------------|
| **Hero with Parallax** | Full-width background image with parallax scroll effect, breadcrumb navigation, animated service icon, Core label, headline, and description |
| **What's Included** | Grid of service offerings with checkmark icons |
| **Why It Matters** | Two-column layout explaining operational risks and the engineered approach, with contextual links to related pillars |
| **Standards & Compliance** | Grid of relevant industry standards (BICSI, ANSI/TIA, NFPA, etc.) |
| **Delivery Approach** | Five-step timeline (horizontal on desktop, vertical on mobile) customized per service |
| **Complex Environments** | Capabilities list for challenging deployment scenarios |
| **Documentation & Performance** | Testing, certification, and documentation deliverables |
| **Risk Mitigation** | How SBI reduces project and operational risk |
| **Four Core Integration** | Cross-links to related service pillars with explanations of how they connect |
| **Industries Served** | Relevant industries with icons |
| **FAQ** | 6–8 frequently asked questions with expandable accordion answers |
| **AEO Section** | Answer Engine Optimization content (see SEO section) |
| **Tagline** | Italicized service tagline |
| **Navigation** | Previous/Next service links for sequential browsing |
| **Final CTA** | "Ready to Get Started?" with consultation link |

### Floating side navigation
On desktop (large screens), floating "Previous" and "Next" buttons appear on the left and right sides of the screen after scrolling past the hero. These let visitors quickly jump between service pages without scrolling back to the top.

### Content unique to each page

**Network Infrastructure (Core 1)**
- 8 service items (structured cabling, MDF/IDF, fiber, OSP, migrations, troubleshooting, field services, testing)
- 7 FAQs covering structured cabling, fiber testing, certifications, cutovers, standards
- 3 AEO entities: structured cabling, fiber backbone, MDF/IDF integration
- Standards: ANSI/TIA-568, BICSI, ISO/IEC 11801, manufacturer specifications

**Wireless & Mobility (Core 2)**
- 4 service items (enterprise Wi-Fi, Public Safety DAS, cellular DAS & private LTE, point-to-point)
- 8 FAQs covering DAS, RF modeling, high-density Wi-Fi, private LTE, validation
- 3 AEO entities: enterprise Wi-Fi engineering, Public Safety DAS, cellular DAS
- Standards: IEEE 802.11ax, NFPA 72/1221, IFC Section 510, FCC Part 90

**Security & Life-Safety (Core 3)**
- 4 service items (IP surveillance, access control, intrusion/duress, unified platforms)
- 8 FAQs covering access control, IP video, system integration, compliance, scalability
- 3 AEO entities: access control systems, IP video surveillance, unified security platforms
- Standards: UL 294, NFPA 101, ONVIF, NDAA, ASIS International

**Audio-Visual Systems (Core 4)**
- 3 service items (conference/collaboration, paging/mass notification, sound masking)
- 8 FAQs covering AV integration, mass notification, sound masking, standardization, documentation
- 3 AEO entities: commercial AV integration, mass notification systems, sound masking
- Standards: AVIXA, BICSI, ANSI/TIA-568, NFPA 72, UL 2572, ASTM E1130

---

## Contact Page

### What was built
A two-column layout with:

- **Left column:** Contact information cards (address, phone, email, hours) with clickable phone and email links
- **Right column:** A consultation request form with fields for name, email, company, phone, service interest (dropdown), and message

### Key details
- The phone number and email are clickable — tapping them on mobile opens the dialer or email app
- The service interest dropdown lists all four pillars plus "Other / Not Sure"
- The form currently prevents default submission (ready for backend integration)

---

## Design System & Visual Identity

### Theme system
The site supports **four visual themes** that users can switch between using a theme toggle in the navigation:

| Theme | Description |
|-------|-------------|
| **Dark Gold** (default) | Dark navy background with gold accents — professional and premium |
| **Dark Blue** | Dark background with blue accents — technical and modern |
| **Light** | White/light gray background with gold accents — clean and bright |
| **Light Blue** | White/light gray background with blue accents — fresh and corporate |

### Design tokens
All colors are defined as CSS custom properties (variables) in `index.css` and mapped through Tailwind CSS. This means changing a color in one place updates it everywhere on the site. Key tokens include:
- `--primary` — The main accent color (gold or blue depending on theme)
- `--background` / `--foreground` — Page background and text colors
- `--card` — Card background color
- `--muted` / `--muted-foreground` — Subdued elements and secondary text
- `--border` — Border colors throughout the site

### Typography
- **Display font:** Space Grotesk — Used for headings, bold and geometric
- **Body font:** Inter — Used for paragraph text, clean and highly readable

### Glass card effect
A signature visual element used throughout the site. Cards have a semi-transparent background with a subtle blur effect and border, creating a "frosted glass" appearance.

### Logo
The SBI logo is implemented as an inline SVG component (`SbiLogo.tsx`) that adapts its colors to the current theme using CSS custom properties.

---

## Animations & Interactions

### Scroll animations
Every major content section uses a "fade up" animation — elements start slightly below their final position and invisible, then smoothly slide up and fade in as the visitor scrolls them into view. This is powered by Framer Motion's `whileInView` feature.

### Parallax hero images
Service page hero sections use a parallax effect where the background image scrolls at a slower rate than the content, creating a sense of depth. The image also subtly scales up as you scroll.

### Hover effects
- **Cards:** Lift slightly (translate up) on hover with a subtle border color change
- **Buttons:** Brightness increase on hover with smooth transitions
- **Navigation links:** Color transitions from muted to primary color
- **Pillar cards:** Reveal "Learn more" text on hover

### Mobile adaptations
- Timeline sections switch from horizontal (desktop) to vertical (mobile) layout
- Grid layouts adjust from multi-column to single-column
- Touch-friendly tap targets (minimum 44px)
- The floating side navigation is hidden on smaller screens

---

## SEO & AI Readiness

For a complete breakdown of all SEO and AI Overview optimizations, see the **[SEO & AI Updates Wiki](SEO-AND-AI-UPDATES.md)**.

### Summary of SEO features
- **Custom `usePageSEO` hook** — Every page has unique title, meta description, keywords, canonical URL, and Open Graph tags
- **JSON-LD structured data** — Organization, LocalBusiness, WebSite, Service, FAQPage, and BreadcrumbList schemas
- **Breadcrumb navigation** — Visual breadcrumbs on all service pages with matching schema markup
- **Sitemap** (`sitemap.xml`) — Lists all pages with priority and update frequency
- **Robots file** (`robots.txt`) — Welcomes all search engines and AI crawlers (Google, Bing, ChatGPT, Claude, Perplexity)
- **Internal linking** — Entity-rich contextual links between all four service pillars
- **Descriptive link text** — No generic "Learn more" links; all links describe where they go
- **FAQ sections** — Expandable Q&A on every service page with FAQ schema
- **AEO sections** — Answer Engine Optimization content formatted for AI extraction
- **Image optimization** — Descriptive alt text, eager loading for heroes, lazy loading for below-the-fold images

---

## Technical Architecture

### Component structure
The project uses a modular component architecture:

```
src/
├── components/
│   ├── home/           → Homepage-specific sections (Hero, Stats, Pillars, etc.)
│   ├── layout/         → Shared layout components (Navbar, Footer, Layout wrapper)
│   ├── seo/            → SEO components (AeoSection, ServiceSchemaJsonLd)
│   ├── ui/             → Reusable UI primitives (Button, Card, Accordion, etc.)
│   ├── JsonLd.tsx      → Homepage structured data
│   ├── NavLink.tsx     → Navigation link component
│   ├── SbiLogo.tsx     → SVG logo component
│   ├── ScrollToTop.tsx → Scroll position management
│   ├── ServicePageTemplate.tsx → Reusable service page layout
│   └── ThemeSwitcher.tsx → Theme toggle component
├── contexts/
│   └── ThemeContext.tsx → Theme state management
├── hooks/
│   ├── usePageSEO.ts   → SEO meta tag management
│   └── use-mobile.tsx  → Mobile detection hook
├── pages/
│   ├── services/       → Four service pillar pages
│   ├── Index.tsx        → Homepage
│   ├── About.tsx        → About page
│   ├── Contact.tsx      → Contact page
│   ├── Services.tsx     → Services overview page
│   └── NotFound.tsx     → 404 page
├── lib/
│   ├── animations.ts   → Shared animation variants
│   └── utils.ts        → Utility functions
└── assets/             → Images (heroes, service photos, logo)
```

### Key architectural decisions
- **`ServicePageTemplate`** — A single reusable component that defines the shared layout for all four service pages. This means updating the page structure (e.g., adding a new section) only requires changing one file.
- **`usePageSEO` hook** — Centralizes all meta tag management so every page gets proper SEO without duplicating logic.
- **Theme system** — Uses React Context and CSS custom properties, meaning themes can be switched instantly without reloading.
- **`ServiceSchemaJsonLd`** — A reusable component that generates proper JSON-LD structured data for any service page.

### Routing
Client-side routing with React Router. All routes are defined in `App.tsx`. The `ScrollToTop` component ensures proper scroll behavior between page transitions.

### Assets
- **Hero images** — High-quality photographs for each page hero section
- **Service images** — Supporting photographs for content sections
- **Logo** — SVG implementation that adapts to theme colors

---

## Summary of All Changes

| Area | What Was Done |
|------|--------------|
| **Foundation** | Built complete React/TypeScript web application with Vite, Tailwind, and Framer Motion |
| **8 Pages** | Homepage, About, Services Overview, 4 Service Pillars, Contact |
| **Navigation** | Fixed navbar with services dropdown, mobile hamburger menu, floating side nav on service pages |
| **Design System** | 4 switchable themes (dark/light × gold/blue), glass card effects, Space Grotesk + Inter typography |
| **Animations** | Scroll-triggered fade-up animations, parallax heroes, hover interactions |
| **Service Template** | Reusable 15-section layout for all service pages with standardized structure |
| **Content** | Detailed service descriptions, FAQs, AEO content, industry standards, delivery models |
| **Internal Linking** | Entity-rich cross-links between all four service pillars |
| **Breadcrumbs** | Visual breadcrumb navigation on all service pages |
| **SEO** | Custom meta tags, canonical URLs, Open Graph, JSON-LD schemas, sitemap, robots.txt |
| **AI Readiness** | AEO sections, FAQ schema, question-answer content patterns, AI crawler access |
| **Responsive** | Fully responsive across desktop, tablet, and mobile viewports |
| **Accessibility** | Semantic HTML, descriptive alt text, proper heading hierarchy, keyboard-navigable |

---

*Last updated: February 2026*
