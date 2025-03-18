const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function generateIcon(size) {
  // Create canvas with the desired size
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Load the SVG
  const image = await loadImage(path.join(__dirname, '../public/icons/icon-base.svg'));
  
  // Draw the image on the canvas
  ctx.drawImage(image, 0, 0, size, size);
  
  // Save the canvas as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, `../public/icons/icon-${size}x${size}.png`), buffer);
  
  console.log(`Generated icon-${size}x${size}.png`);
}

async function main() {
  // Create the sizes we need
  await generateIcon(192);
  await generateIcon(512);
}

main().catch(console.error);
