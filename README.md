# UBC BIOMOD 2026

Website for the UBC BIOMOD 2026 team, built with React, TypeScript, Vite, and Tailwind CSS.

## Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and bundler
- **Tailwind CSS v4**
- **react-router-dom** — client-side routing

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Opens at **http://localhost:5173** (Vite picks the next available port if 5173 is busy).

### Build for production

```bash
npm run build
```

Output is in `dist/`.

### Preview the production build

```bash
npm run preview
```

## Pages

| Route | Page |
|---|---|
| `/` | Landing page (DNA Abundance Sorter hero) |
| `/project-ideas` | Project Ideas |
| `/team` | Team |
| `/sponsors` | Sponsors |
| `/elsi` | ELSI |

## Project structure

```
src/
  assets/images/   # logo, DNA helix image
  components/      # shared components (Footer)
  pages/           # one file per route
  App.tsx          # router
  main.tsx         # entry point
  index.css        # Tailwind import
```
