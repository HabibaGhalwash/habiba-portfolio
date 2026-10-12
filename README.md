# Habiba Ghalwash — Portfolio

React + Vite portfolio (animated avatar, draggable sticky notes, parallax hero, case studies).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production files go to /dist
npm run preview
```

## Edit your content
- All text, links and project data: `src/data/content.js`
- Images / videos: `src/assets/img/` (keep the same file names, or update the imports in `content.js`)
- Colors and styling: `src/styles.css` (tokens at the top)
- Avatar animation: `src/components/Avatar.jsx` + `src/assets/avatar/`

## Get a free link (no domain needed)

### Option A — Netlify drag & drop (fastest, ~2 min, no Git)
1. `npm install && npm run build`
2. Go to https://app.netlify.com/drop (sign up free) and drag the **`dist`** folder in.
3. Site settings → Change site name → e.g. `habiba-ghalwash` → **https://habiba-ghalwash.netlify.app**

### Option B — Vercel (auto-updates on every push)
1. Push this folder to a new GitHub repo.
2. https://vercel.com → Add New → Project → import the repo → Deploy (settings are in `vercel.json`).
3. Settings → Domains → edit to e.g. `habiba-ghalwash.vercel.app`.

### Option C — GitHub Pages
1. Push this folder to a repo's `main` branch.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Live at `https://habibaghalwash.github.io/<repo-name>/` (the workflow is in `.github/workflows/deploy.yml`).

If a name is taken, add something like `-portfolio` or your graduation year.
