# Deployment Guide

## Prerequisites
- Node.js v18+ installed (nodejs.org)
- GitHub account
- Vercel account (vercel.com — sign up with GitHub)
- OpenAI API key (platform.openai.com/api-keys)

## Day 1: Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local
# Open .env.local, replace 'your_openai_api_key_here' with your real key

# 3. Start development server
npm run dev

# 4. Open browser → http://localhost:3000
# Try demo query: "What should I negotiate on liquidation preference?"
```

## Day 2: Deploy to Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit: Term Sheet Playbook"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/termsheet-playbook.git
git push -u origin main
```

Then on Vercel:
1. New Project → Import your GitHub repo
2. Add Environment Variable: `OPENAI_API_KEY` = your key
3. Click Deploy
4. Your app is live at yourdomain.vercel.app

## Day 3: Customise

- Add your firm name in `pages/index.tsx` (header section)
- Add more clauses in `lib/clauseDatabase.ts`
- Push changes → Vercel auto-deploys

## Commands Reference

| Command | What it does |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `git add .` | Stage all changes |
| `git commit -m "..."` | Commit with message |
| `git push` | Push to GitHub (triggers redeploy) |
