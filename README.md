# SPORT AI — Global Sports & AI Betting Intelligence Platform

> A world-class sports media platform combining live scores, AI-powered betting intelligence, real-time odds comparison, and a multi-language news hub.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── modules/          # Feature modules (AI tools, ads, match center, news, odds)
│   ├── shared/           # Layout, navigation, SEO, social sharing, alerts
│   └── ui/               # shadcn/ui component library
├── contexts/             # Global state (AppConfig, I18n)
├── hooks/                # Custom React hooks
├── pages/                # Route-level page components
└── lib/                  # Utility functions
```

## 🌍 Features

- **Live Match Center** — Real-time scores with minute-by-minute stats
- **AI Bet Slip Generator** — Risk-profiled parlay generation (Safe/Balanced/Aggressive)
- **AI Slip Analyzer** — Trap game detection & value bet identification
- **Daily Golden Picks** — AI-curated betting tips with confidence scores
- **News & Gossip Hub** — Dynamic sports news feed with social sharing
- **Odds Comparison** — Multi-bookmaker odds tables
- **Multi-language** — EN, PT, ES, FR with instant switching
- **Dynamic SEO** — Per-page meta tags via react-helmet-async
- **Admin Command Center** — API keys, affiliate links, ad scripts, content toggles

## 🔐 Admin Panel

Access at `/admin` (hidden from public navigation). See [DOCS.md](./DOCS.md) for the full management guide.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Animation | Framer Motion |
| Routing | React Router 6 |
| SEO | react-helmet-async |
| State | React Context API |
| Icons | Lucide React |

## 📄 License

Private — All rights reserved.
