import fs from 'fs';
import path from 'path';

// This is a simplified version that assumes content might be static or fetched.
// For a real production app, you'd fetch from Firestore here.
// Since we want this to be part of the build, we'll try to read from the compiled data if possible,
// or just fetch from Firestore directly using a simple fetch call.

const SITE_URL = 'https://cognetex.com';

const staticRoutes = [
  '',
  '/approach',
  '/ai-services',
  '/team',
  '/careers',
  '/contact',
];

async function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static Routes
  staticRoutes.forEach((route) => {
    xml += `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // For dynamic routes (Services/Projects), in a real scenario we'd query Firestore.
  // Here we'll provide a placeholder or instructions to the user to add the API key for build-time fetching.
  // For now, I'll just use the static routes to ensure it works.
  
  xml += `
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('Sitemap generated successfully in public/sitemap.xml');
}

generateSitemap();
