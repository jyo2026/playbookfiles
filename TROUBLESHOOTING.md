# Troubleshooting Guide

## "npm: command not found"
Node.js is not installed or not in PATH.
- Go to nodejs.org → download LTS → install
- Restart Terminal after installation
- Try `node --version` — should show v18+

## "Cannot find module" errors
Dependencies not installed.
```bash
npm install
```

## App runs but search returns error
Check your API key:
1. Open `.env.local`
2. Confirm it says: `OPENAI_API_KEY=sk-...` (your real key, no spaces)
3. Confirm your OpenAI account has credit (platform.openai.com/usage)
4. Stop dev server (Ctrl+C) and restart: `npm run dev`

## "Invalid API Key" error
- Key is wrong, expired, or has no credits
- Generate a new key at platform.openai.com/api-keys
- Make sure there are no extra spaces around the key in .env.local

## Search returns no relevant clauses
The keyword search could not match your query.
- Try using exact terms: "liquidation", "anti-dilution", "drag-along", "board seat"
- Or use one of the demo queries

## Vercel deployment failed
1. Run `npm run build` locally first — fix any errors it shows
2. Check Vercel dashboard → your project → Deployments → click failed deployment → read logs
3. Most common cause: missing `OPENAI_API_KEY` environment variable in Vercel settings

## App works locally but not on Vercel
- OPENAI_API_KEY not set in Vercel environment variables
- Go to Vercel → Project → Settings → Environment Variables → Add it

## Cannot find .env.local file on Mac
Mac hides files starting with `.`
- In Finder: press `Cmd + Shift + .` to show hidden files
- Or create/edit via Terminal: `nano .env.local`

## Port 3000 already in use
```bash
# Kill whatever is using port 3000
lsof -ti:3000 | xargs kill -9
# Then restart
npm run dev
```
