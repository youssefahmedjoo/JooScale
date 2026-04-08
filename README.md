# Jooscale — Next.js Marketing Website

## Stack
- **Next.js 14** (App Router + Server Components + ISR)
- **Supabase** — Database & RLS
- **Groq Cloud API** — Llama 3.3 70B AI Chat
- **Tailwind CSS** — Exact brand colors & styles
- **Vercel** — Hosting

## Setup

### 1. Supabase
1. Create project at supabase.com
2. Go to **SQL Editor → New Query**, paste `supabase-schema.sql`, click **Run**
3. Copy keys from **Project Settings → API**

### 2. Groq
1. Sign up at console.groq.com
2. Create API Key

### 3. Environment Variables
```bash
cp .env.local.example .env.local
# Fill in your keys
```

### 4. Run locally
```bash
npm install
npm run dev
```

### 5. Deploy to Vercel
1. Push to GitHub
2. Import repo on vercel.com
3. Add all 4 environment variables in Vercel dashboard
4. Deploy ✓

## Admin Panel
- URL: `/admin`
- Username: `Youssef Ahmed`
- Password: `Youssef#010`

## Logo
Place your logo file as `public/scale logo.png`
