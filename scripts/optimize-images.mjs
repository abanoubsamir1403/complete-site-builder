import sharp from 'sharp';
import fs from 'fs';

async function optimize() {
  console.log('Optimizing all images...');

  const imagesToConvert = [
    { src: 'public/HomePage.jpeg', width: 1600 },
    { src: 'public/Services.jpeg', width: 1600 },
    { src: 'public/contact us.jpeg', width: 1600 },
  ];

  for (const item of imagesToConvert) {
    if (fs.existsSync(item.src)) {
      const baseName = item.src.replace(/\.(jpeg|jpg|png)$/i, '');
      await sharp(item.src)
        .resize({ width: item.width, withoutEnlargement: true })
        .avif({ quality: 65 })
        .toFile(`${baseName}.avif`);

      await sharp(item.src)
        .resize({ width: item.width, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(`${baseName}.webp`);

      console.log(`✓ Generated AVIF & WebP for ${item.src}`);
    }
  }

  // Optimize Logo variants
  const logo = 'src/assets/logo-mark.png';
  if (fs.existsSync(logo)) {
    await sharp(logo).resize(32, 32).webp({ quality: 85 }).toFile('src/assets/logo-32.webp');
    await sharp(logo).resize(64, 64).webp({ quality: 85 }).toFile('src/assets/logo-64.webp');
    await sharp(logo).resize(56, 56).webp({ quality: 85 }).toFile('src/assets/logo-56.webp');
    await sharp(logo).resize(112, 112).webp({ quality: 85 }).toFile('src/assets/logo-112.webp');
    await sharp(logo).resize(56, 56).avif({ quality: 80 }).toFile('src/assets/logo-56.avif');
    await sharp(logo).resize(112, 112).avif({ quality: 80 }).toFile('src/assets/logo-112.avif');
    console.log('✓ Generated logo variants');
  }

  console.log('All image optimizations completed!');
}

optimize().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
