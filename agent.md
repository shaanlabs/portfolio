# agent.md — Portfolio Website Build Instructions

## Who this is for
This file is a build brief for an autonomous coding agent (Google Antigravity). It contains
everything needed to design, build, and deploy a personal portfolio website with zero further
clarification. Follow it in order. Where a decision isn't specified, prefer clean, modern,
recruiter-friendly defaults over cleverness.

---

## 1. Owner / Content Source of Truth

- **Name:** Shaanif Ahmed
- **Location:** Karnataka, India
- **Email:** shaaniffakki@gmail.com
- **Phone:** +91 7019874600 (optional to display publicly — put behind a "Contact" click-to-reveal, don't render as raw text in HTML to avoid scraper spam)
- **GitHub:** https://github.com/shaanlabs (username: `shaanlabs`, lowercase)
- **LinkedIn:** https://www.linkedin.com/in/shaanif-ahmed-765934233/
- **Title / role:** Backend / Full-Stack / ERP Developer — open to any of these, currently job-hunting
- **Status: ACTIVELY LOOKING FOR A FULL-TIME ROLE.** This must be visible near the top of the site (hero or a small badge/banner), e.g. "Open to work" or "Actively seeking backend/full-stack roles" with a clear CTA to contact/resume. This is the single most important call-to-action on the whole site — don't bury it.

### Professional summary (rewrite for hero section, don't paste verbatim)
Backend-focused developer with production experience shipping REST APIs, SaaS backends, and
ERPNext/Frappe customizations across Python, JavaScript/Node.js, and SQL. Co-founded and helped
scale an AI automation startup (AtomNext Solutions) from Jan 2025 to Jun 2026, owning delivery
end-to-end for multiple clients, then stepped away to focus on a full-time engineering role.
Comfortable across backend, full-stack, and ERP customization work — looking for a team to build
with next.

### Experience (for an "Experience" timeline section)
1. **Intern — Sada Smart Solutions LLP** | May 2025 – Nov 2025 | Bhatkal, Karnataka (On-site)
   - Built backend logic + REST APIs for a SaaS gym management platform (Node.js)
   - On-page/off-page SEO for client products
   - Customized ERPNext & Frappe modules for workflow automation
2. **Mentor & Open Source Contributor — GirlScript Summer of Code** | Aug 2025 – Oct 2025
   - Guided contributors, ran code reviews, structured projects
   - Supported community-driven open-source contributions
3. **Co-Founder — AtomNext Solutions** | Jan 2025 – Jun 2026 | Karnataka, India
   - Chatbot integration & AI-driven automation for clients
   - End-to-end delivery: client discovery → deployment → support
   - Wound down in June 2026 to pursue a full-time role — frame this positively on the site (entrepreneurial ownership experience), not as a gap

### Education
Bachelor's of Computer Application (BCA) — Anjuman Institute of Management and Computer
Application, Bhatkal, Karnataka. CGPA 8.64. Oct 2023 – July 2026 (in progress).

### Skills (group these into categories on the site, don't dump as one flat list)
- **Languages:** Python, SQL, Core Java, JavaScript
- **ERP & Business Apps:** ERPNext, Odoo, Frappe, HRMS, CRM
- **Databases:** PostgreSQL, MySQL, MariaDB, SQLite
- **Cloud & DevOps:** AWS, Docker, Nginx
- **Web Development:** FastAPI, Django, Flask, Node.js, HTML, CSS, Vercel, cPanel, SEO
- **Tools:** Git, Postman, VS Code, Google Colab, Cursor
- **Gen AI:** HuggingFace, Ollama

### Confirmed live repos (verified against github.com/shaanlabs — use these exact slugs)
| Project | Repo slug | Stack | One-liner |
|---|---|---|---|
| Voltix | `shaanlabs/Voltix` | Python, Django, DRF, Docker | EV charging ecosystem: real-time station availability, GPS discovery, load balancing |
| YentraSetu | `shaanlabs/yentrasetu` | TypeScript, Frappe, ERPNext | Heavy machinery marketplace: quotations, roles, REST API |
| AtomNext Solutions site | `shaanlabs/atomnext` | HTML, CSS, JS | Company site for AI-powered automation & digital transformation |
| Nextomic | `shaanlabs/Nextomic` | HTML | AI-powered budgeting, investment insights, money management |
| VisionNetX | `shaanlabs/VisionNetX` | Python, TensorFlow, CNN | Modular image classification pipeline, data prep → deployment |
| BookHive | `shaanlabs/BookHive` | Python, Django | Library management system: books, members, borrowings, overdue reminders |

### On resume but not currently pinned/found in the public repo list
- **City Traders ERP System** (ERPNext, Frappe, Python, JS, MariaDB)
- **Tekista** (Flask, SQLite, Shell — RBAC, audit logging, Docker)

These may be private repos, unpinned, or under a different name. **Before running this build:**
either (a) make these public and note their exact repo slugs in `featured.json`, or (b) the agent
should just proceed with the 6 confirmed repos above and treat these two as manually-added cards
with static content from the resume (no live GitHub data) if they can't be found via the API.

---

## 2. Objective

This site needs to win Shaanif a job. Build the **best portfolio site in its category** —
fast, visually distinctive, mobile-first, memorable — that:
1. Opens with a strong hero (name, role, one-line value prop, "open to work" signal, CTA to GitHub/resume/contact)
2. Shows work experience as a clean timeline
3. **Dynamically showcases ALL public GitHub repos** — pulled live from the GitHub API, not a hand-picked subset (see Section 4 — this changed from an earlier "featured only" draft; full catalog is now required, with featured ones pinned to the top)
4. For each project, shows a **working demo if a live URL exists**, otherwise falls back to a screenshot + live GitHub stats (stars, last updated, primary language, README summary)
5. Has a skills section grouped by category
6. Has a **Fun Zone** — a lighthearted interactive section that makes the site memorable to a recruiter skimming 50 portfolios a day (see Section 4.5)
7. Has a **prominent, reliable resume download** (see Section 4.6)
8. Has a simple contact section (email + LinkedIn + GitHub, no exposed phone number in raw HTML)
9. Loads fast, works great on mobile, and doesn't look like a generic template — this is the bar to hold the whole build to

---

## 3. Tech Stack

- **Framework:** Next.js (App Router, latest stable), TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (subtle — scroll-reveal, hover states; do not overdo it)
- **Icons:** lucide-react
- **Deployment target:** Vercel (repo should be Vercel-deployable with zero config beyond env vars)
- **Data fetching:** GitHub REST API v3, server-side (Next.js server components / route handlers), with revalidation (ISR, e.g. `revalidate: 3600` — refresh hourly, don't hit GitHub's rate limit on every request)

---

## 4. GitHub Integration (core feature — build this carefully)

### 4.1 Fetching repos — FULL ACCESS, not a curated subset
- Use `GET https://api.github.com/users/shaanlabs/repos?sort=updated&per_page=100` (lowercase username), paginating if there are more than 100 (there are currently 63, so one page covers it, but paginate defensively).
- **Show all public, non-fork repos on the site** — this is a full portfolio catalog, not a hand-picked highlight reel. Use a searchable/filterable grid (filter by language, sort by stars/updated/name) rather than hiding anything.
- Forks are excluded from the main grid by default (`fork: false`) since they're not original work, but add a small "forked projects" toggle/tab so a viewer can see them too if curious — don't fully hide them.
- Optionally use a `GITHUB_TOKEN` env var (personal access token, read-only, `public_repo` scope) to raise the rate limit from 60/hr to 5,000/hr. Store it in `.env.local`, never commit it. If no token is provided, fall back gracefully to unauthenticated requests and cache aggressively (ISR, see below).
- Sort by `updated_at` descending by default, with manual pinning of top picks via `featured.json` (Section 4.4) — pinned repos float to the top of the grid, everything else still appears below them.

### 4.2 Per-repo data to display
For each featured repo, fetch and show:
- Name, description, primary language, stars, forks, last updated
- README (fetch via `GET /repos/shaanlabs/{repo}/readme`, render as Markdown, truncate to a short summary — first paragraph or first ~40 words — with a "Read more on GitHub" link, not the full README dumped on the card)
- Topics/tags if set (`GET /repos/shaanlabs/{repo}/topics`)

### 4.3 Live demo logic (embed-if-available, fallback otherwise)
For each repo, determine a demo URL in this priority order:
1. The repo's `homepage` field from the GitHub API, if set and it's a valid URL
2. A manual override in `featured.json` (e.g. for projects hosted elsewhere, or where the homepage field is empty)
3. If neither exists → no live demo

If a demo URL exists:
- Try embedding it in an `<iframe>` inside the project card/modal, with a "Open full demo in new tab" fallback link (some sites block iframes via `X-Frame-Options` — detect load failure and gracefully fall back to a screenshot + external link instead of showing a broken embed)
- Take a static screenshot as a poster/thumbnail (can be manually added to `/public/screenshots/{repo-slug}.png`, or generated at build time with a headless browser if the agent wants to automate it)

If no demo URL exists:
- Show the GitHub stats card (stars, language, last commit, README excerpt) instead, with a prominent "View source on GitHub" button

### 4.4 `featured.json` (local config the agent should create)
Create a small JSON config at the project root so featured order, manual demo links, and
overrides don't require touching component code:

```json
{
  "featured": [
    { "repo": "Voltix", "demoUrl": null, "pin": 1 },
    { "repo": "yentrasetu", "demoUrl": null, "pin": 2 },
    { "repo": "atomnext", "demoUrl": null, "pin": 3 },
    { "repo": "Nextomic", "demoUrl": null, "pin": 4 },
    { "repo": "VisionNetX", "demoUrl": null, "pin": 5 },
    { "repo": "BookHive", "demoUrl": null, "pin": 6 }
  ]
}
```
These slugs are verified against the live github.com/shaanlabs profile. `City Traders ERP` and
`Tekista` from the resume were not found as public repos at time of writing — if they exist under
different slugs or are made public later, add them here; otherwise the agent should render them as
static resume-sourced cards without live GitHub data. If any repo in this list 404s at build time
(renamed/deleted), skip it silently rather than breaking the build.

**Reminder: `featured.json` only controls pin order, not visibility.** Every other public,
non-fork repo returned by the API must still render in the grid below the pinned ones — do not
filter the grid down to only this list.

### 4.5 Fun Zone
Add a distinct, clearly-labeled section (e.g. "🎮 Fun Zone" or "Beyond the Code") that gives
recruiters a reason to remember this portfolio. Keep it lightweight, on-brand, and fast — this
should feel like a fun bonus, never slow down or distract from the core hiring pitch above it.
Pick 1–2 of the following (don't try to cram in all of them):
- **A tiny playable game** — e.g. a simple terminal-themed typing game, a mini snake/pong clone, or a "guess the output" code-snippet quiz using real snippets from Shaanif's own repos
- **An interactive terminal easter egg** — a fake CLI prompt (`shaanif@portfolio:~$`) where typing commands like `whoami`, `skills`, `sudo hire-me`, or `coffee --brew` returns fun canned responses
- **A live GitHub stats playground** — an interactive widget where a visitor can pick a language/repo and watch a small animated chart of Shaanif's contribution activity or language breakdown
- **A "random project" button** — shuffles to a random repo from the full catalog with a fun transition, good for encouraging exploration of the full repo list from Section 4.1

Whatever is chosen, it must not block or precede the serious hiring content (hero, experience,
projects, resume download) — place it after Projects and before or alongside Contact, clearly
optional to engage with.

### 4.6 Resume Download (must be rock-solid — this is a job-search site)
- Place `resume.pdf` at `/public/resume.pdf` (Shaanif will supply the actual file after the site is scaffolded)
- Add a persistent, high-visibility "Download Resume" button — in the hero AND in the nav/header so it's reachable from anywhere on the page, not just one spot
- The button should trigger a real file download (`<a href="/resume.pdf" download>`), not just open a viewer tab, though opening in a new tab as a secondary option is fine too
- Add a fallback: if `resume.pdf` is missing at build/runtime, don't 404 silently — show a "Resume coming soon, email me directly" message instead so the button never dead-ends
- Bonus: track download clicks with a simple analytics event if analytics are already wired up, but don't add a new analytics dependency just for this

---

## 5. Visual Design & Color Palette

Avoid generic "AI-generated portfolio" look (no default indigo-to-purple gradient hero, no
Inter-font-on-white-card cliché). Go for a **developer-credible, slightly technical aesthetic**
that still feels warm and approachable — this is a backend/ERP developer, not a designer, so lean
into "clean systems" rather than "flashy agency."

### Recommended palette — "Terminal Slate" (dark-mode-first, with light mode toggle)

| Role | Color | Hex |
|---|---|---|
| Background (dark) | Deep slate | `#0B0F14` |
| Surface / cards | Slightly lifted slate | `#131A22` |
| Primary accent | Amber/gold | `#F2B84B` |
| Secondary accent | Teal | `#2DD4BF` |
| Text primary | Off-white | `#E8EDF2` |
| Text secondary | Muted slate-gray | `#8B98A5` |
| Border/divider | Subtle slate line | `#1F2933` |
| Success/live indicator | Green | `#4ADE80` |

Rationale: amber-on-slate reads as "terminal / systems engineer" without being a literal
green-on-black cliché; teal as a second accent keeps it from feeling monochrome; plenty of
contrast for accessibility (verify AA contrast on all text/background pairs).

### Alternative palette if a lighter/friendlier feel is preferred — "Warm Neutral"

| Role | Color | Hex |
|---|---|---|
| Background | Warm off-white | `#FAF7F2` |
| Surface / cards | White | `#FFFFFF` |
| Primary accent | Deep coral | `#E85D4C` |
| Secondary accent | Ink navy | `#1A2740` |
| Text primary | Near-black | `#1C1C1C` |
| Text secondary | Warm gray | `#6B6459` |
| Border | Soft tan | `#E8E1D6` |

Default to **Terminal Slate in dark mode** as the primary experience, implement a light-mode
toggle using the Warm Neutral palette or a light variant of Terminal Slate. Store the CSS custom
properties in `globals.css` as variables (`--bg`, `--surface`, `--accent`, etc.) so both themes
share the same component code.

### Typography
- Headings: a geometric sans with personality — e.g. `Space Grotesk` or `Sora` (Google Fonts)
- Body: a clean readable sans — e.g. `Inter` or `IBM Plex Sans`
- Code/mono accents (for stats, tags, terminal-style flourishes): `JetBrains Mono` or `IBM Plex Mono`

### Layout notes
- Hero: left-aligned headline, subtle animated grid/dot background (very low opacity, don't distract), CTA buttons for "View Projects", "Download Resume", "GitHub"
- Projects: card grid (2–3 columns desktop, 1 column mobile), each card expandable to a modal/detail view with the embedded demo or stats
- Use micro-interactions (hover lift on cards, smooth scroll, fade-in on scroll) — subtle, not gimmicky
- Include a live "GitHub activity" strip (contribution-style, can use the GitHub contributions SVG or a simple stat row: public repos, followers, top languages)

---

## 6. Pages / Sections (single-page scroll site, unless agent judges multi-page better)

1. **Hero** — name, role, one-liner, "open to work" badge/banner, CTAs (View Projects / Download Resume / Contact)
2. **About** — 2–3 sentence rewritten summary (not a copy-paste of resume text)
3. **Experience** — timeline from Section 1
4. **Projects** — dynamic, full-catalog GitHub-powered grid, searchable/filterable (Section 4.1–4.4)
5. **Fun Zone** — interactive bonus section (Section 4.5)
6. **Skills** — grouped categories with simple icon or tag chips
7. **Education**
8. **Contact** — email (mailto link), LinkedIn, GitHub, optional contact form (if a form, use a simple serverless handler or a service like Formspree — do not require a backend database for this)
9. **Footer** — small, links repeated, resume download link repeated here too, no clutter

---

## 7. Non-functional requirements
- Mobile-first, responsive at all breakpoints
- Lighthouse performance score ≥ 90 on the built site
- Accessible: semantic HTML, alt text on images, sufficient color contrast, keyboard-navigable
- SEO: proper meta tags, Open Graph image, page title/description
- No hardcoded secrets in the repo; GitHub token via env var only
- Include a `README.md` explaining setup, env vars, and deploy steps
- Resume should be downloadable as a PDF from the site (place in `/public/resume.pdf`, link it — the agent doesn't need to generate this, just wire up the link; user will supply the file)

## 8. Deliverable checklist for the agent
- [ ] Next.js + TypeScript + Tailwind project scaffolded
- [ ] Theme system (CSS variables) implementing Section 5 palette with dark/light toggle
- [ ] GitHub API integration with ISR caching and graceful fallback if rate-limited/no token
- [ ] `featured.json` config created and wired up (pin order only — does not filter the grid)
- [ ] **Full repo catalog rendered** — all public non-fork repos visible, searchable/filterable, not just the featured six
- [ ] Project cards with embed-or-fallback demo logic
- [ ] "Open to work" signal visible in the hero and/or a persistent banner
- [ ] Fun Zone section built (pick 1–2 from Section 4.5)
- [ ] Resume download button in hero + nav, with graceful fallback if the file is missing
- [ ] All sections from Section 6 built and populated with content from Section 1
- [ ] Fully responsive, tested at mobile/tablet/desktop widths
- [ ] Deployed or deploy-ready for Vercel with a documented `.env.example`
