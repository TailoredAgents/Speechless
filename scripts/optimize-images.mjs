import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageDirectory = path.join(projectRoot, "public", "images");
const storefrontImages = [
  "speechless-fashion-portrait-v3",
  "speechless-hero-more-than-words-v3",
  "speechless-more-than-words-flat-v2",
  "speechless-nonverbal-flat-v2",
  "speechless-nonverbal-portrait-v3",
  "speechless-print-detail-v3",
  "speechless-product-hero-more-than-words-v3",
  "speechless-same-respect-back-flat-v2",
  "speechless-same-respect-front-flat-v2",
  "speechless-speech-isnt-flat-v2",
  "speechless-supporter-back-v3",
  "tee-black-blank",
  "tee-cream-blank",
];

for (const name of storefrontImages) {
  const input = path.join(imageDirectory, `${name}.png`);
  const output = path.join(imageDirectory, `${name}.webp`);
  await sharp(input).webp({ quality: 88, smartSubsample: true, effort: 4 }).toFile(output);
  const [before, after] = await Promise.all([fs.stat(input), fs.stat(output)]);
  const reduction = Math.round((1 - after.size / before.size) * 100);
  console.log(`${name}: ${Math.round(after.size / 1024)} KB (${reduction}% smaller)`);
}
