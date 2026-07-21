# Changelog

## [Unreleased]

### Changed
- **Info packet** now links to the shared Google Doc instead of the bundled PDF (Process and Contact sections). Links open in a new tab.
- **Contact** updated throughout to `hello@justinalydia.com` (contact form, direct-email button, footer). The "Send Request" form now composes a pre-filled email to that address, with a link to `justinalydia.com` added to the footer.

### Added
- **About the founder** section (`#about`) with Justina Lydia's bio — digital nomad since 2016, community builder, fluent Portuguese, a year in Brazil, and two stays living at Rosemary Dream — plus a portrait and a link to `justinalydia.com`. This fills the previously dead `#about` nav/hero anchor.

### Performance
- Optimized all media, cutting `public/media` from ~111 MB to ~23 MB:
  - Hero background video re-encoded (1080p portrait, muted, web-optimized): 84 MB → 8.8 MB.
  - Video tour re-encoded with faststart: 12 MB → 8.4 MB.
  - Aerial map images converted PNG → WebP: 9.7 MB → 1.25 MB.
  - Founder portrait added as an optimized 48 KB WebP.
