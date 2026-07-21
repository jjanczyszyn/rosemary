# Rosemary Dream

A single-page property website for Rosemary Dream, an eco property in Florianopolis, Brazil.

**Build the village. Surf every morning. Host the future.**

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding Media

### Photos

1. Add images to `public/media/photos/`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Recommended: Name files `01.jpg`, `02.jpg`, etc. for consistent ordering
   - Optimize images for web (under 500KB each)

2. Generate the media manifest:
   ```bash
   npm run build:manifest
   ```

3. The gallery will automatically display all images

### Videos

1. Add video files to `public/media/video/`
   - For hero section: name the file `hero.mp4`
   - Supported formats: `.mp4`, `.webm`
   - Recommended: 1920x1080 or 1280x720, under 20MB

2. The hero and video tour sections will automatically use available videos

### Information Packet

Replace `public/docs/rosemary-dream-info-packet.pdf` with the actual PDF.

### Social Preview Image

Replace `public/og.jpg` with a 1200x630 image for social sharing.

## Configuration

### Site URL and Base Path

Edit `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://yourusername.github.io',  // Your GitHub Pages URL
  base: '/rosemary',                        // Your repo name
});
```

### Contact Information

Contact email is `hello@justinalydia.com`, set in:
- `src/components/ContactCTA.astro` — form, direct-email button, and the Convex endpoint the form POSTs to
- `src/components/Footer.astro` — contact email and `justinalydia.com` link

## Architecture

The site itself is a static Astro build hosted on **GitHub Pages**. The only
dynamic piece is the contact form, which sends an email server-side so visitors
never have to open their own mail client.

```mermaid
flowchart LR
  visitor([Visitor]) -->|fills form| site[Astro static site\nGitHub Pages]
  site -->|POST /sendInquiry JSON| convex[Convex HTTP action\nmoonlit-loris-768.convex.site]
  convex -->|Resend API| resend[Resend]
  resend -->|email| inbox[hello@justinalydia.com]
```

### Contact form backend (Convex + Resend)

- **Convex project:** `rosemary` (deployment `moonlit-loris-768`).
- **Function:** `convex/http.ts` exposes an HTTP action at
  `POST /sendInquiry`. It validates the payload, then sends the inquiry via the
  Resend API to `hello@justinalydia.com` with the visitor's address as
  `reply_to`. CORS is open (`*`) since it's a public form that only ever emails
  the owner.
- **Sender:** `rosemary@popoyo.co` (a domain already verified in Resend).
- **No database tables / schema** — this deployment runs a single stateless
  HTTP action; there is no Convex data model to document.
- **Secrets:** `RESEND_API_KEY` is stored as a Convex environment variable
  (`npx convex env set RESEND_API_KEY …`), never committed.

Deploy the backend (uses `CONVEX_TEAM_ACCESS_TOKEN` from `~/.claude/settings.json`):

```bash
CONVEX_OVERRIDE_ACCESS_TOKEN=$CONVEX_TEAM_ACCESS_TOKEN \
CONVEX_DEPLOYMENT=prod:moonlit-loris-768 \
npx convex deploy -y
```

### Cost

| Service | Plan | Cost |
|---|---|---|
| GitHub Pages | Public repo | Free |
| Convex | Free tier (well under 1M function calls/mo) | $0 |
| Resend | Free tier (3,000 emails/mo, 100/day) | $0 |

Expected running cost for this site is **$0/month** at contact-form volumes. A
custom domain (if used) is the only potential cost, billed by the registrar.

## Deploy to GitHub Pages

### Automatic Deployment

The site automatically deploys when you push to the `main` branch.

### Deploy Checklist

1. Update `astro.config.mjs` with your GitHub username and repo name
2. Enable GitHub Pages in repo Settings > Pages > Source: GitHub Actions
3. Push to `main` branch
4. Wait for the Actions workflow to complete
5. Visit `https://yourusername.github.io/rosemary/`

### Manual Build

```bash
npm run build:manifest  # Generate media manifest
npm run build           # Build static site
```

Output is in the `dist/` folder.

## Project Structure

```
rosemary/
├── public/
│   ├── docs/
│   │   └── rosemary-dream-info-packet.pdf
│   ├── media/
│   │   ├── photos/
│   │   │   └── README.md
│   │   └── video/
│   │       └── README.md
│   ├── favicon.svg
│   └── og.jpg
├── src/
│   ├── components/
│   │   ├── BayAreaTranslation.astro
│   │   ├── ContactCTA.astro
│   │   ├── Footer.astro
│   │   ├── Gallery.astro
│   │   ├── Hero.astro
│   │   ├── Investment.astro
│   │   ├── KeyFigures.astro
│   │   ├── Lifestyle.astro
│   │   ├── Location.astro
│   │   ├── MultiUse.astro
│   │   ├── Navigation.astro
│   │   ├── Process.astro
│   │   ├── Residency.astro
│   │   ├── VideoTour.astro
│   │   └── Vision.astro
│   ├── data/
│   │   └── media-manifest.json
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── scripts/
│   └── build-media-manifest.mjs
├── .github/
│   └── workflows/
│       └── deploy.yml
├── astro.config.mjs
├── package.json
└── README.md
```

## Customization

### Styling

Global styles are in `src/styles/global.css`. Key variables:

```css
:root {
  --color-bg: #faf9f7;
  --color-accent: #2d5a3d;
  --color-text: #1a1a1a;
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'Playfair Display', serif;
}
```

### Sections

Each section is a separate component in `src/components/`. Edit individual files to modify content.

### Property Details

Key property facts are in these components:
- `Hero.astro` - headline, price, tagline
- `BayAreaTranslation.astro` - size comparisons
- `KeyFigures.astro` - numbers grid
- `Lifestyle.astro` - cost of living data

## TODO

Remaining before launch:

- [ ] `public/og.jpg` — real 1200x630 social preview image (currently a placeholder)
- [ ] Point the `rosemary.queenvibes.com` custom domain at GitHub Pages via DNS,
      or remove `public/CNAME` to use the plain `*.github.io` URL

## License

All rights reserved.
