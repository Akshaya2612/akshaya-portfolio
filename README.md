# Akshaya Portfolio

A portfolio where the scoring system is the navigation. React + TypeScript + Vite.

## Edit content
Everything lives in `src/data/content.ts`: copy, awards, posts, projects.

- **Publish a post:** fill in its `body` paragraphs (replace the [bracketed prompts]),
  then flip `draft: false`. It renders on-site at `#/writing/<slug>`.
  Posts with `external` set (e.g. Medium) link out instead.
- **Add a project:** append to `building.cards`: real link or don't list it.
- Score totals self-compute; the tally can never drift.

TODOs before going live (search "TODO" in content.ts):
- GitHub username/repo links
- Medium write-up URL for the transformers project

## Run locally
```
npm install
npm run dev
```

## Deploy (GitHub Pages)
1. Create a repo (either `YOUR-USERNAME.github.io`, or any name like `portfolio`).
2. Push this folder to `main`.
3. Repo Settings → Pages → Source: **GitHub Actions**.
4. Push again (or re-run the action). The included workflow builds and deploys automatically.

The Vite `base: './'` setting makes the build work at both a root domain and a project subpath.
