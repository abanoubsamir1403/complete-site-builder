import sharp from 'sharp';
import fs from 'fs';

async function optimize() {
  console.log('Optimizing all images with aggressive compression for mobile...');

  // 1. Optimize Hero Image (public/HomePage.jpeg)
  const homeHero = 'public/HomePage.jpeg';
  const homeHeroAvifQuality = 45;
  if (fs.existsSync(homeHero)) {
    // Desktop variant (1600px)
    await sharp(homeHero)
      .resize({ width: 1600, withoutEnlargement: true })
      .avif({ quality: homeHeroAvifQuality, effort: 6 })
      .toFile('public/HomePage.avif');

    await sharp(homeHero)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 60, effort: 6 })
      .toFile('public/HomePage.webp');

    // Mobile-targeted variant (800px) - ideal for mobile viewports up to 414px @ 2x DPR
    await sharp(homeHero)
      .resize({ width: 800, withoutEnlargement: true })
      .avif({ quality: homeHeroAvifQuality, effort: 6 })
      .toFile('public/HomePage-mobile.avif');

    await sharp(homeHero)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 60, effort: 6 })
      .toFile('public/HomePage-mobile.webp');

    console.log('✓ Generated HomePage AVIF & WebP (Desktop & Mobile variants)');
  }

  // 2. Optimize Services and Contact images
  const otherImages = [
    { src: 'public/Services.jpeg', width: 1400 },
    { src: 'public/contact us.jpeg', width: 1400 },
  ];

  for (const item of otherImages) {
    if (fs.existsSync(item.src)) {
      const baseName = item.src.replace(/\.(jpeg|jpg|png)$/i, '');
      await sharp(item.src)
        .resize({ width: item.width, withoutEnlargement: true })
        .avif({ quality: 48, effort: 6 })
        .toFile(`${baseName}.avif`);

      await sharp(item.src)
        .resize({ width: item.width, withoutEnlargement: true })
        .webp({ quality: 60, effort: 6 })
        .toFile(`${baseName}.webp`);

      console.log(`✓ Generated AVIF & WebP for ${item.src}`);
    }
  }

  // 3. Optimize Logo variants
  const logo = 'src/assets/logo-mark.png';
  if (fs.existsSync(logo)) {
    await sharp(logo).resize(32, 32).webp({ quality: 80 }).toFile('src/assets/logo-32.webp');
    await sharp(logo).resize(64, 64).webp({ quality: 80 }).toFile('src/assets/logo-64.webp');
    await sharp(logo).resize(56, 56).webp({ quality: 80 }).toFile('src/assets/logo-56.webp');
    await sharp(logo).resize(112, 112).webp({ quality: 80 }).toFile('src/assets/logo-112.webp');
    await sharp(logo).resize(56, 56).avif({ quality: 75 }).toFile('src/assets/logo-56.avif');
    await sharp(logo).resize(112, 112).avif({ quality: 75 }).toFile('src/assets/logo-112.avif');
    console.log('✓ Generated logo variants');
  }

  console.log('All image optimizations completed!');
}

optimize().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
