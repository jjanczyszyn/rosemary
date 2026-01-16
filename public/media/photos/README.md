# Photo Gallery Instructions

This folder contains photos for the Rosemary Dream property gallery.

## How to add photos

1. Download images you have rights to use from the Instagram post:
   https://www.instagram.com/p/DTWNaXwiaae/

2. Rename files to `01.jpg`, `02.jpg`, etc. (or keep any descriptive names you prefer).
   Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

3. Drop the files into this folder (`public/media/photos/`).

4. (Optional) Run the media manifest script to generate a JSON index:
   ```bash
   node scripts/build-media-manifest.mjs
   ```

5. Rebuild the site. The gallery will automatically display all images.

## Notes

- Images should be optimized for web (ideally under 500KB each).
- Recommended aspect ratios: 4:3, 16:9, or 1:1.
- The gallery supports mixed aspect ratios via masonry layout.
- For best results, include at least 6-12 images.
