# Shaanif Ahmed — Portfolio Website

A modern, recruiter-winning portfolio site built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**. Features live GitHub integration, a Terminal Slate dark theme, and an interactive Fun Zone.

## ✨ Features

- **Dynamic GitHub Integration** — All 63+ public repos fetched live via GitHub API with ISR caching
- **Searchable Project Catalog** — Filter by language, sort by stars/updated/name
- **Terminal Slate Theme** — Dark-mode-first design with amber/teal accents and light mode toggle
- **Interactive Fun Zone** — Fake CLI terminal + random project discovery
- **Open to Work Badge** — Prominent hiring signal with CTAs
- **Resume Download** — Persistent in nav and hero, graceful fallback if PDF missing
- **Mobile-First** — Fully responsive at all breakpoints
- **SEO Optimized** — Meta tags, Open Graph, semantic HTML

## 🛠 Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/shaanlabs/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your GitHub token (optional but recommended)

# Start development server
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | No | GitHub Personal Access Token (read-only, `public_repo` scope). Raises rate limit from 60/hr to 5,000/hr. Get one at [github.com/settings/tokens](https://github.com/settings/tokens) |

### Resume PDF

Place your resume at `public/resume.pdf`. The download button will gracefully show a fallback message if the file is missing.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata
│   ├── page.tsx        # Main page (server component, GitHub data fetching)
│   └── globals.css     # Theme system (Terminal Slate + Warm Neutral)
├── components/
│   ├── Navbar.tsx      # Sticky nav with glassmorphism
│   ├── Hero.tsx        # Hero with "Open to Work" badge
│   ├── About.tsx       # Professional summary
│   ├── Experience.tsx  # Work timeline
│   ├── Projects.tsx    # Full GitHub repo catalog
│   ├── ProjectCard.tsx # Individual repo card
│   ├── ProjectModal.tsx# Expanded project view
│   ├── FunZone.tsx     # Interactive terminal + random project
│   ├── Terminal.tsx    # Fake CLI component
│   ├── Skills.tsx      # Grouped skill categories
│   ├── Education.tsx   # Education section
│   ├── Contact.tsx     # Contact links
│   ├── Footer.tsx      # Site footer
│   ├── ThemeToggle.tsx # Dark/light switch
│   ├── ScrollReveal.tsx# Scroll animations
│   └── DotGrid.tsx     # Animated background
├── lib/
│   ├── github.ts       # GitHub API integration
│   └── types.ts        # TypeScript interfaces
└── data/
    └── featured.json   # Pin order for featured repos
```

## 🎨 Customization

### Featured Projects
Edit `src/data/featured.json` to change pinned projects and their order. All other public repos still appear in the grid below.

### Theme Colors
Edit the CSS custom properties in `src/app/globals.css` under `:root` (light) and `.dark` (dark) to customize the color palette.

## 🚢 Deployment

This project is Vercel-ready:

```bash
# Build for production
npm run build

# Or deploy to Vercel
npx vercel
```

Set `GITHUB_TOKEN` in your Vercel project's environment variables for reliable API access.

## 📄 License

MIT
