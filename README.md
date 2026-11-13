# BetterInabanga 🇵🇭

> **Digital Civic Transparency & Public Services Guide for the Municipality of Inabanga, Bohol**  
> Built under the [BetterGov.ph LGU Directory Initiative](https://lgu.bettergov.ph/GUIDE) and modeled after [Better San Fernando, La Union](https://github.com/alvindemesadev/better-san-fernando-lu).

---

## 🌟 Overview

**BetterInabanga** is a community-maintained, open-source digital civic portal that makes local government information—citizen's charter services, elected officials, 50 barangays, municipal budgets, 20% development fund infrastructure projects, and 24/7 disaster hotlines—instantly accessible to all Inabangnons and the public.

---

## 🚀 Key Pages & Functionalities

- **Interactive Command Palette (`Ctrl+K` / `Cmd+K`):** Instant fuzzy-search modal across all municipal services, offices, barangays, news, and civic guides.
- **Citizen's Charter & Services Directory (`/services`):**
  - Full catalog grouped into 12 categories: Business & Permits, Taxes & Property, Certificates & Civil Registry, Health & Wellness, Social Services & Welfare, Agriculture & Fisheries, Infrastructure, Environment, Emergency & Safety, Employment & Livelihood, Youth & Education, and Civic Governance.
  - Dedicated service pages (`/services/:category/:slug`) with step-by-step procedures, documentary requirements, fees, processing turnaround, legal bases, downloadable forms, and a **local storage bookmark/save toggle**.
- **Digital Online Services Hub (`/online-services`):** Direct links to verified e-government platforms including eGov PH, PhilGEPS, DTI Business Name Registration, PSA Serbilis, SSS, Pag-IBIG Virtual, and PhilHealth.
- **Municipal Government Directory (`/government`):**
  - **Officials (`/government/officials`):** Profiles of Municipal Mayor Hon. Dexter M. Ancla, Municipal Vice Mayor Hon. Hermogenes C. Cenabre, Jr., Sangguniang Bayan councilors, ABC President, and SK Federation President.
  - **Offices (`/government/offices` & `/government/offices/:slug`):** Municipal department heads, physical offices, telephone locals, emails, and direct service charters.
  - **50 Barangays Directory (`/government/barangays` & `/government/barangays/:slug`):** Complete index of all 50 barangays of Inabanga with 2024 PSA population counts, distance from Poblacion, Punong Barangay rosters, and community highlights.
  - **24/7 Emergency Hotlines (`/government/hotlines`):** One-tap dialing for MDRRMO ((038) 510-8164 / 0917-814-4117), PNP Inabanga ((038) 512-9039), BFP Fire Station (0927-528-1232), and Bohol TaRSIER 117.
  - **Local Legislation (`/government/legislation`):** Searchable municipal ordinances and Sangguniang Bayan resolutions.
- **Town & Living Guide (`/city`):**
  - **Town Profile (`/city`):** Historical milestones, geography, land area (168.49 km²), economy, and the historic Inabanga River.
  - **Life & Tourism (`/city/life`):** Town Fiesta of Saint Paul the Apostle, Inabanga River boat cruises, handloom raffia weaving, and coastal cuisine.
  - **Places Directory (`/city/places`):** Verified landmarks including Saint Paul the Apostle Parish Church, Macaban Cave, Mt. Ilihan Shrine, Port of U-og, and Cuaming & Hambongan Island Marine Sanctuaries.
  - **Business & Investment (`/city/business`):** Doing business in Inabanga, BPLO permits, tax incentives, and agriculture/aquaculture opportunities.
- **Full Disclosure Policy & Transparency Hub (`/transparency`):**
  - **Budget Visualizer (`/transparency/budget`):** Transparent breakdown of the ₱248.6M+ annual municipal budget, NTA/IRA allocation, and 20% Municipal Development Fund.
  - **Procurement & Bids (`/transparency/procurement`):** PhilGEPS contract awards, Invitations to Bid, and BAC notices.
  - **Infrastructure Projects Tracker (`/transparency/projects`):** Real-time monitoring of priority DPWH and municipal capital projects (Port of U-og expansion, river revetment walls, farm-to-market roads).
  - **Open Data (`/transparency/open-data`):** Downloadable machine-readable JSON/CSV datasets.
- **Civic News & Advisories (`/news`, `/news/:slug`, `/news/archive`):** Announcements, DRRMO flood alerts, and agricultural distribution schedules.
- **Multi-Language Internationalization (i18n):** Live switching between **English (`en`)**, **Filipino (`fil`)**, and authentic Boholano **Sinugboanon / Cebuano (`ceb`)**.
- **Progressive Web App (PWA) & Offline Caching:** Built with service worker support for offline access during emergencies.

---

## 🛠️ Tech Stack

- **Framework:** [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom Inabanga Bohol oceanic blues (`#0284c7`) and golden raffia accents (`#f59e0b`)
- **Typography:** Figtree via Google Fonts
- **Icons:** [Lucide React](https://lucide.dev/)
- **Smooth Scrolling & Motion:** [Lenis](https://lenis.darkroom.engineering/) + [Motion](https://motion.dev/)
- **PWA & Caching:** [Vite PWA](https://vite-pwa-org.netlify.app/)
- **SEO & Prerendering:** Route metadata plugin prerendering 416 static routes and generating `sitemap.xml` and `robots.txt`

---

## 💻 Getting Started Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🤝 Contributing & Community

BetterInabanga is an independent, non-partisan civic tech project developed by community volunteers under the **BetterGov.ph** ecosystem. To contribute data corrections, submit new services, or report issues, please visit our [GitHub repository](https://github.com/gerardosocias29/betterinabanga).
