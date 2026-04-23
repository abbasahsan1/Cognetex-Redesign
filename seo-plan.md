# Professional SEO Optimization Plan: Cognetex Redesign

This plan outlines the strategic roadmap to transform Cognetex into a search-optimized powerhouse, targeting both traditional search engines (Google, Bing) and AI-generative search engines (ChatGPT, Perplexity, Google AI Overviews).

## 1. Executive Summary
**Current Status:** The website is a modern, high-performance React application with a strong visual identity. However, it currently lacks page-level SEO depth, structured data, and automated search-engine discovery tools.
**Primary Goal:** To rank for high-intent keywords like "AI Agency", "Autonomous Agent Development", and "Enterprise Software Solutions" while establishing E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) in the AI space.

---

## 2. Technical SEO Audit & Implementation

### 2.1 Meta Management
- **Issue:** All pages share the same static title and description from `index.html`.
- **Solution:** Implement `react-helmet-async` to manage dynamic metadata.
- **Action Plan:**
    - [ ] Install `react-helmet-async`.
    - [ ] Create a `PageSEO` component to handle `<title>`, `<meta name="description">`, and Open Graph tags.
    - [ ] **Data Sync:** Extend the Firestore schema to include `seoTitle` and `seoDescription` fields for services, projects, and careers.

### 2.2 Search Discovery
- **Issue:** No `sitemap.xml` or `robots.txt`.
- **Solution:** Automated generation.
- **Action Plan:**
    - [ ] Add a `robots.txt` in the root allowing all crawlers but disallowing private `/ghq` routes.
    - [ ] Implement a dynamic sitemap generator that includes static routes and dynamic service/project routes.

### 2.3 Performance (Core Web Vitals)
- **Current State:** Cloudinary integration is excellent for image optimization.
- **Optimization:** Ensure **INP (Interaction to Next Paint)** is optimized by minimizing main-thread blocking during animations (Framer Motion).
- [ ] Implement lazy loading for off-screen Three.js/Cobe components to improve initial TBT (Total Blocking Time).

---

## 3. Structured Data (Schema.org) Implementation

Structured data is critical for winning rich snippets and feeding AI models with structured facts.

| Schema Type | Placement | Purpose |
|-------------|-----------|---------|
| `Organization` | Home | Defines Cognetex, logo, social profiles, and contact info. |
| `ProfessionalService` | Home/Services | Specifies AI & Software development capabilities. |
| `Service` | Service Pages | Detailed capabilities and outcomes for specific AI services. |
| `CaseStudy` | Project Pages | Formalizes ROI and project success stories. |
| `Person` | Team Members | Establishes E-E-A-T for leadership. |
| `BreadcrumbList` | All Pages | Improves crawl path understanding. |

---

## 4. Content Strategy & E-E-A-T

### 4.1 Keyword Pillars
Based on the current offering, we will target four main clusters:
1. **AI Agents:** "Custom AI Agents", "Autonomous Workflows", "LangChain Development".
2. **Enterprise Software:** "Scalable Web Apps", "React Enterprise Solutions".
3. **Data Science:** "Predictive Analytics", "Enterprise Data Strategy".
4. **AI Upskilling:** "AI Training for Builders", "Practical AI Workshops".

### 4.2 GEO (Generative Engine Optimization)
To optimize for Perplexity and ChatGPT:
- [ ] **Information Density:** Ensure service pages provide deep, factual technical details (Tech Stack, Integration methods).
- [ ] **Source Citation:** Use transparent data in "PROVEN ROI" sections (already a strength) to encourage AI citation.
- [ ] **AI-Friendly Files:** Create `/llms.txt` and `/llms-full.txt` to provide concise context for AI crawlers.

---

## 5. /ghq Panel Enhancements (Admin)

To make the SEO plan sustainable, the admin panel must support it.
- [ ] **SEO Fields:** Add dedicated SEO tabs in the Service, Project, and Team editors.
- [ ] **Validation:** Add character count indicators for Title (60 chars) and Description (160 chars).
- [ ] **Image Alt Text:** Ensure every image upload in Admin requires an Alt text field for accessibility and Image SEO.

---

## 6. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Technical infra: `react-helmet-async`, `robots.txt`, `sitemap.xml`.
- Global `Organization` schema.
- Per-page Title/Meta overhaul.

### Phase 2: Engagement & E-E-A-T (Weeks 3-4)
- Automated Schema deployment for Services and Projects.
- Enhance Team bios with expert signals.
- Implementation of Open Graph tags for social sharing.

### Phase 3: Authority & AI Readiness (Weeks 5-8)
- Content pillar expansion (Blog or Resource section).
- Integration of GEO signals (`llms.txt`).
- Backlink outreach based on Case Study success.

---

## 7. Success Metrics (KPIs)
- **Organic CTR:** Increase by 30% through optimized title tags.
- **Search Presence:** Indexing 100% of dynamic services/projects within 2 weeks of creation.
- **Rich Results:** Achieving "Service" and "CaseStudy" rich results in Google Search Console.
- **AI Citation:** Appear in relevant Perplexity/ChatGPT queries for AI Agency services.

---
*Created as part of the Cognetex Professional SEO Skill Implementation.*
