# SPORT AI — Platform Documentation

## 📁 File Tree & Component Map

```
src/
├── App.tsx                              # Root: routing, providers (AppConfigProvider, QueryClient)
├── main.tsx                             # Entry point
├── index.css                            # Design tokens (HSL), Tailwind layers, animations
│
├── contexts/
│   └── AppConfigContext.tsx              # Central config store (API keys, affiliate, ads, toggles)
│
├── pages/
│   ├── HomePage.tsx                      # Landing: live scores, trending news, daily tips, alerts
│   ├── LivePage.tsx                      # Live Match Center with real-time scores & stats
│   ├── NewsPage.tsx                      # News grid with ad slots and alert signup
│   ├── OddsPage.tsx                      # Odds comparison engine
│   ├── AIToolsPage.tsx                   # AI Slip Generator, Analyzer, Daily Tips
│   ├── AdminPage.tsx                     # Secured admin panel (login gate + config management)
│   ├── Index.tsx                         # Redirect/index
│   └── NotFound.tsx                      # 404 page
│
├── components/
│   ├── shared/
│   │   ├── AppLayout.tsx                 # Shell: Navbar + BottomTabNav + <Outlet>
│   │   ├── Navbar.tsx                    # Desktop nav (NO admin link) + i18n switcher
│   │   ├── BottomTabNav.tsx              # Mobile bottom tabs (NO admin link)
│   │   ├── SocialShareButtons.tsx        # WhatsApp, Telegram, X, Facebook, LinkedIn share
│   │   ├── GlobalAlertSignup.tsx         # Email newsletter/alert capture component
│   │   └── NativeAdSlot.tsx              # Dynamic ad script injection (feed/sidebar/article)
│   │
│   ├── modules/
│   │   ├── ads/
│   │   │   └── AffiliateBanner.tsx       # 1win affiliate CTA (reads config for URL/promo)
│   │   ├── ai-tools/
│   │   │   ├── BetSlipGenerator.tsx      # Interactive AI parlay builder
│   │   │   ├── SlipAnalyzer.tsx          # AI risk analysis for user picks
│   │   │   └── DailyTips.tsx             # Golden Bets of the Day + share buttons
│   │   ├── match-center/
│   │   │   ├── LiveScoreboard.tsx        # Sticky horizontal live score ticker
│   │   │   └── MatchCard.tsx             # Match detail card with stats + share
│   │   ├── news/
│   │   │   └── NewsCard.tsx              # News article card with share buttons
│   │   └── odds/
│   │       └── OddsTable.tsx             # Bookmaker odds comparison table
│   │
│   └── ui/                              # shadcn/ui component library (button, card, dialog, etc.)
│
├── hooks/
│   ├── use-mobile.tsx                    # Mobile breakpoint detection
│   └── use-toast.ts                     # Toast notification hook
│
└── lib/
    └── utils.ts                         # cn() utility for Tailwind class merging
```

---

## 🔄 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        ADMIN PANEL (/admin)                       │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  AppConfigContext (localStorage-persisted)                   │  │
│  │  ├── API Keys: Gemini, API-Football, GNews                  │  │
│  │  ├── Affiliate: URL, Promo Code                             │  │
│  │  ├── Ad Scripts: AdSense, Sidebar, Article                  │  │
│  │  └── Toggles: banners, inline ads, tips, news, AI tools     │  │
│  └─────────────────────────┬───────────────────────────────────┘  │
└────────────────────────────┼──────────────────────────────────────┘
                             │ useAppConfig()
         ┌───────────────────┼───────────────────────┐
         ▼                   ▼                       ▼
  ┌──────────────┐   ┌──────────────┐   ┌────────────────────┐
  │ AffiliateBanner│  │ NativeAdSlot │   │ AI Tools / News    │
  │ (reads URL,   │  │ (injects ad  │   │ (reads API keys    │
  │  promo code,  │  │  scripts if  │   │  for future live   │
  │  visibility)  │  │  provided)   │   │  API integration)  │
  └──────────────┘   └──────────────┘   └────────────────────┘
```

### Future API Integration Flow:

```
API-Football ──► LiveScoreboard / MatchCard (real-time scores)
GNews API ──────► NewsPage / NewsCard (dynamic articles)
Gemini AI ──────► BetSlipGenerator / SlipAnalyzer / DailyTips
                  (AI-powered predictions & risk analysis)
```

---

## 🛡️ Security Architecture

### Admin Panel Access
- **No public links**: The Admin link has been removed from Navbar and BottomTabNav
- **Direct URL only**: `/admin` is accessible only by manually typing the URL
- **Login gate**: A mock authentication screen blocks the dashboard until credentials are entered
- **Note**: This is a client-side mock gate. For production, implement server-side auth with Lovable Cloud

### API Key Storage
- All API keys are stored in `localStorage` via `AppConfigContext`
- Keys are never exposed in the UI after entry (password-type inputs)
- For production: migrate to Lovable Cloud secrets/edge functions

---

## 📖 Owner's Management Guide

### Accessing the Admin Panel
1. Navigate to `yourdomain.com/admin`
2. Enter any credentials on the login screen (mock auth)
3. You'll see the Command Center dashboard

### Managing API Keys (Integrations & API Hub)
1. In the admin panel, find **"Integrations & API Hub"**
2. Enter your keys:
   - **Google Gemini API Key**: Get from [Google AI Studio](https://aistudio.google.com/)
   - **API-Football Key**: Get from [api-football.com](https://www.api-football.com/)
   - **News API Key**: Get from [gnews.io](https://gnews.io/)
3. Keys are saved automatically to browser storage
4. Status badges (top-right) turn green when keys are provided

### Managing Affiliate Links
1. Find **"Affiliate & Monetization"** section
2. Set your **1win Affiliate URL** and **Global Promo Code**
3. These values automatically update all AffiliateBanner components across the site
4. Toggle banners on/off with the switches

### Managing Ads
1. Find **"Ads Management"** section
2. Paste your ad scripts (e.g., Google AdSense `<script>` tags) into:
   - **News Feed Ad Script**: Appears between news articles
   - **Sidebar Ad Script**: Appears in sidebar positions
   - **In-Article Ad Script**: Appears within article content
3. Leave empty to show no ads in that position

### Content & AI Toggles
In **"AI Engine & Content Toggles"**:
- **Auto-Post Daily Tips**: Enable/disable the Golden Bets section
- **Enable AI Slip Generator**: Show/hide the bet slip builder
- **Enable AI Slip Analyzer**: Show/hide the risk analysis tool
- **Auto-Fetch News**: Toggle automatic news updates

---

## 🌍 Internationalization (i18n)

The platform is structured for EN, PT, ES, FR:
- Language switcher in Navbar (desktop) and mobile menu
- GlobalAlertSignup indicates multi-language support
- To implement full i18n: add a translation layer (react-i18next recommended)

---

## 📱 Responsive Design

- **Desktop**: Full Navbar with language switcher
- **Mobile**: Bottom tab navigation (5 tabs: Home, Live, AI, News, Odds)
- **Breakpoint**: `md` (768px) switches between layouts
- All components use responsive Tailwind utilities

---

## 🛠️ Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Framework   | React 18 + Vite 5            |
| Language    | TypeScript                    |
| Styling     | Tailwind CSS 3 + shadcn/ui   |
| Animation   | Framer Motion                 |
| Icons       | Lucide React                  |
| State       | React Context + React Query   |
| Routing     | React Router DOM 6            |

---

## 🚀 Deployment

1. Build: `npm run build`
2. Output: `dist/` directory
3. Deploy to any static host (Lovable publish, Vercel, Netlify, etc.)
4. Backend features require Lovable Cloud activation
