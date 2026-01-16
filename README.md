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

Update these files with your actual contact details:
- `src/components/ContactCTA.astro` - email and Formspree endpoint
- `src/components/Footer.astro` - contact email

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

Before launch, update these placeholders:

- [ ] `astro.config.mjs` - site URL
- [ ] `src/components/ContactCTA.astro` - email, Formspree endpoint
- [ ] `src/components/Footer.astro` - contact email
- [ ] `src/components/Location.astro` - map/coordinates
- [ ] `public/og.jpg` - social preview image
- [ ] `public/docs/rosemary-dream-info-packet.pdf` - actual info packet
- [ ] `public/media/photos/` - property photos
- [ ] `public/media/video/hero.mp4` - hero video

## License

All rights reserved.
