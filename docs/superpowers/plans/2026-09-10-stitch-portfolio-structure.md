# Stitch Portfolio Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose the portfolio so its routes follow the supplied Stitch project’s dossier, blueprint, systems matrix, and production track-record structure.

**Architecture:** Keep the existing Vite/React single-page app and hash router, but introduce route-specific editorial sections rather than one shared content flow. Keep all claims in `src/data/content.ts`, use reusable React components in `src/App.tsx`, and express the Stitch visual hierarchy through CSS in `src/styles.css`.

**Tech Stack:** React 18, TypeScript, Vite, CSS, React Leaflet for the existing geographic map.

**Spec:** User-approved structure from `/Users/akshayajonnalagadda/Downloads/stitch_minimalist_senior_engineer_portfolio/` and the supplied PRD/reference HTML.

## Global Constraints

- Preserve verified claims and use qualified language for projected or unmeasured outcomes.
- Do not copy fictional names, metrics, technologies, or claims from the reference.
- Keep the existing GitHub Pages workflow and relative asset paths working.
- Keep the home page concise and route detailed material to Featured Work, Systems, Experience, Projects, and About.

### Task 1: Recompose the overview route

**Files:** Modify `src/App.tsx`, `src/styles.css`.

- [ ] Replace the current overview sequence with a dossier ribbon, executive-summary split, compact metrics, terminal, and capability chips.
- [ ] Keep the existing concise work preview, experience snapshot, and contact CTA below the overview.
- [ ] Add responsive rules for the desktop split and mobile stack.
- [ ] Run `npm run build` and confirm TypeScript and Vite compilation pass.

### Task 2: Recompose Featured Work

**Files:** Modify `src/App.tsx`, `src/styles.css`.

- [ ] Keep the numbered architectural blueprint list and make each case study a structured two-column card with constraint, contribution, result, and pattern tags.
- [ ] Feature the configuration platform and event-driven workflow first, followed by onboarding and operations assistant.
- [ ] Run `npm run build`.

### Task 3: Recompose Systems & Architecture

**Files:** Modify `src/App.tsx`, `src/styles.css`, `src/data/content.ts`.

- [ ] Add the `CAPABILITY DOMAIN :: DECOUPLED SYSTEMS ARCHITECTURE` header treatment.
- [ ] Present the Architectural & Core Skill Matrix, topology blueprint, stack, and philosophy rows as one systems dossier.
- [ ] Keep event-driven workflow design, idempotency, auditability, and visible failure modes explicit and grounded.
- [ ] Run `npm run build`.

### Task 4: Recompose Career Experience

**Files:** Modify `src/App.tsx`, `src/styles.css`.

- [ ] Replace the sparse map-only route with production track-record cards using the existing verified experience data.
- [ ] Keep the current Head of Strategy role present-tense and avoid claiming outcomes that have not happened.
- [ ] Keep the visual map available as a secondary chronological accent rather than the only experience presentation.
- [ ] Run `npm run build`.

### Task 5: Verify and publish

**Files:** `.github/workflows/deploy.yml` and generated build output only.

- [ ] Run `npm run build` from the repository root.
- [ ] Commit the route restructure and push `main`.
- [ ] Wait for the GitHub Pages workflow to succeed.
- [ ] Fetch the hosted HTML and confirm it references compiled `assets/index-*.js` rather than `src/main.tsx`.
