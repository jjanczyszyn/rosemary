#!/usr/bin/env node

/**
 * Build Media Manifest Script
 *
 * Scans public/media/photos/ and public/media/video/ directories
 * and generates src/data/media-manifest.json for the gallery component.
 *
 * Usage: node scripts/build-media-manifest.mjs
 */

import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Supported file extensions
const photoExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const videoExtensions = ['.mp4', '.webm'];

// Directories
const photosDir = join(rootDir, 'public', 'media', 'photos');
const videosDir = join(rootDir, 'public', 'media', 'video');
const outputDir = join(rootDir, 'src', 'data');
const outputFile = join(outputDir, 'media-manifest.json');

function getFilesWithExtensions(dir, extensions) {
  if (!existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return [];
  }

  try {
    const files = readdirSync(dir);
    return files
      .filter(file => {
        const ext = file.toLowerCase().slice(file.lastIndexOf('.'));
        return extensions.includes(ext);
      })
      .filter(file => !file.startsWith('.')) // Exclude hidden files
      .filter(file => file !== 'README.md')   // Exclude README
      .sort((a, b) => {
        // Natural sort for numbered files (01.jpg, 02.jpg, etc.)
        const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
        if (numA !== numB) return numA - numB;
        return a.localeCompare(b);
      });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
    return [];
  }
}

function main() {
  console.log('Building media manifest...\n');

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Get photos
  const photos = getFilesWithExtensions(photosDir, photoExtensions);
  console.log(`Found ${photos.length} photos:`);
  photos.forEach(p => console.log(`  - ${p}`));

  // Get videos
  const videos = getFilesWithExtensions(videosDir, videoExtensions);
  console.log(`\nFound ${videos.length} videos:`);
  videos.forEach(v => console.log(`  - ${v}`));

  // Build manifest
  const manifest = {
    photos,
    videos,
    generatedAt: new Date().toISOString()
  };

  // Write manifest
  writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to: ${outputFile}`);

  // Summary
  console.log('\n--- Summary ---');
  console.log(`Photos: ${photos.length}`);
  console.log(`Videos: ${videos.length}`);

  if (photos.length === 0) {
    console.log('\nTip: Add photos to public/media/photos/ and run this script again.');
  }
}

main();
