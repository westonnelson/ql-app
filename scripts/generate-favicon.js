const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const svgPath = path.join(__dirname, '../public/globe.svg');
  const outputPath = path.join(__dirname, '../public/favicon.ico');

  try {
    await sharp(svgPath)
      .resize(32, 32)
      .toFile(outputPath);
    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 