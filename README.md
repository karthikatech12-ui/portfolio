# Karthika A — Portfolio

A React + Vite single-page portfolio built from your resume content, in the same
moody dark→amber gradient style as your reference, with a continuously
scrolling skills marquee.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — upload that folder to Netlify, Vercel, GitHub Pages, etc.

## Where to customize

- **All content** (name, projects, education, skills) lives in `src/App.jsx` —
  edit the `SKILLS`, `EDUCATION`, `PROJECTS`, and `SKILL_GROUPS` arrays near the top.
- **Colors, fonts, spacing, the marquee speed/animation** live in `src/App.css`
  (see the `:root` variables at the top, and `.marquee-track` for the scroll speed —
  currently `26s`, lower = faster).
- **Your photo**: the hero currently uses a "KA" initials avatar
  (`.avatar` in App.css + the `StatusCard` component in App.jsx). To swap in a
  real photo, replace the `<div className="avatar">KA</div>` with an
  `<img src="/your-photo.jpg" className="avatar" />` and drop the image file into
  the `public/` folder.

## Note on the reference site

This design is inspired by the layout rhythm of the Framer template you linked
(dark hero → amber gradient, status card, marquee) but rebuilt from scratch with
original code and your own content — the original is a commercial Framer
template, so its exact images and packaged code aren't something I can copy
directly. Fonts used here (Fraunces, Space Grotesk, JetBrains Mono, all free on
Google Fonts) were chosen to hit a similar confident-serif-plus-mono feel.
