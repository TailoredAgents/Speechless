import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicPath = (...parts) => path.join(projectRoot, "public", ...parts);

const jobs = [
  {
    name: "More Than Words flat front",
    base: publicPath("images", "tee-cream-blank.png"),
    artwork: publicPath("artwork", "more-than-words-front.svg"),
    output: publicPath("images", "speechless-more-than-words-flat-v2.png"),
    width: 470,
    left: 392,
    top: 274,
    opacity: 0.93,
    texture: 0.46,
  },
  {
    name: "I'm Nonverbal flat front",
    base: publicPath("images", "tee-black-blank.png"),
    artwork: publicPath("artwork", "im-nonverbal-front.svg"),
    output: publicPath("images", "speechless-nonverbal-flat-v2.png"),
    width: 470,
    left: 392,
    top: 270,
    opacity: 0.91,
    texture: 0.62,
  },
  {
    name: "Same Respect flat front",
    base: publicPath("images", "tee-black-blank.png"),
    artwork: publicPath("artwork", "same-respect-front.svg"),
    output: publicPath("images", "speechless-same-respect-front-flat-v2.png"),
    width: 176,
    left: 650,
    top: 300,
    opacity: 0.9,
    texture: 0.62,
  },
  {
    name: "Same Respect flat back",
    base: publicPath("images", "tee-black-back-blank-v1.png"),
    artwork: publicPath("artwork", "same-respect-back.svg"),
    output: publicPath("images", "speechless-same-respect-back-flat-v2.png"),
    width: 455,
    left: 400,
    top: 270,
    opacity: 0.91,
    texture: 0.62,
  },
  {
    name: "Speech Isn't the Only Way flat front",
    base: publicPath("images", "tee-black-blank.png"),
    artwork: publicPath("artwork", "speech-isnt-the-only-way-front.svg"),
    output: publicPath("images", "speechless-speech-isnt-flat-v2.png"),
    width: 365,
    left: 444,
    top: 318,
    opacity: 0.91,
    texture: 0.62,
  },
  {
    name: "More Than Words homepage hero",
    base: publicPath("images", "speechless-hero-blank-v5.png"),
    artwork: publicPath("artwork", "more-than-words-front.svg"),
    output: publicPath("images", "speechless-hero-more-than-words-v2.png"),
    width: 286,
    left: 1050,
    top: 314,
    opacity: 0.89,
    texture: 0.48,
  },
  {
    name: "I'm Nonverbal model front",
    base: publicPath("images", "speechless-nonverbal-portrait-blank-v2.png"),
    artwork: publicPath("artwork", "im-nonverbal-front.svg"),
    output: publicPath("images", "speechless-nonverbal-portrait-v2.png"),
    width: 344,
    left: 340,
    top: 424,
    opacity: 0.88,
    texture: 0.64,
  },
  {
    name: "Same Respect model back",
    base: publicPath("images", "speechless-supporter-back-blank-v1.png"),
    artwork: publicPath("artwork", "same-respect-back.svg"),
    output: publicPath("images", "speechless-supporter-back-v2.png"),
    width: 420,
    left: 351,
    top: 350,
    opacity: 0.88,
    texture: 0.64,
  },
  {
    name: "Speech Isn't the Only Way model front",
    base: publicPath("images", "speechless-fashion-portrait-blank-v1.png"),
    artwork: publicPath("artwork", "speech-isnt-the-only-way-front.svg"),
    output: publicPath("images", "speechless-fashion-portrait-v2.png"),
    width: 248,
    left: 367,
    top: 378,
    opacity: 0.87,
    texture: 0.66,
  },
  {
    name: "More Than Words fabric detail",
    base: publicPath("images", "speechless-print-detail-blank-v2.png"),
    artwork: publicPath("artwork", "more-than-words-front.svg"),
    output: publicPath("images", "speechless-print-detail-v3.png"),
    width: 520,
    left: 760,
    top: 204,
    rotate: -12,
    opacity: 0.88,
    texture: 0.72,
  },
  {
    name: "More Than Words shop hero",
    base: publicPath("images", "speechless-product-hero-v2.png"),
    artwork: publicPath("artwork", "more-than-words-front.svg"),
    output: publicPath("images", "speechless-product-hero-more-than-words-v3.png"),
    width: 330,
    left: 1050,
    top: 235,
    opacity: 0.9,
    texture: 0.5,
  },
];

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

async function renderArtwork(job) {
  let pipeline = sharp(job.artwork, { density: 300 }).resize({ width: job.width });
  if (job.rotate) {
    pipeline = pipeline.rotate(job.rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }
  return pipeline.ensureAlpha().blur(0.3).raw().toBuffer({ resolveWithObject: true });
}

async function renderMockup(job) {
  const artwork = await renderArtwork(job);
  const { width, height, channels } = artwork.info;
  const baseMetadata = await sharp(job.base).metadata();
  if (job.left < 0 || job.top < 0 || job.left + width > baseMetadata.width || job.top + height > baseMetadata.height) {
    throw new Error(`${job.name} artwork falls outside the base image.`);
  }

  const baseCrop = await sharp(job.base)
    .extract({ left: job.left, top: job.top, width, height })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let luminanceTotal = 0;
  let sampleCount = 0;
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    const artIndex = pixel * channels;
    if (artwork.data[artIndex + 3] < 12) continue;
    const baseIndex = pixel * baseCrop.info.channels;
    const luminance = 0.2126 * baseCrop.data[baseIndex] + 0.7152 * baseCrop.data[baseIndex + 1] + 0.0722 * baseCrop.data[baseIndex + 2];
    luminanceTotal += luminance;
    sampleCount += 1;
  }
  const averageLuminance = luminanceTotal / Math.max(sampleCount, 1);

  const integrated = Buffer.from(artwork.data);
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    const artIndex = pixel * channels;
    const alpha = artwork.data[artIndex + 3];
    if (alpha === 0) continue;
    const baseIndex = pixel * baseCrop.info.channels;
    const luminance = 0.2126 * baseCrop.data[baseIndex] + 0.7152 * baseCrop.data[baseIndex + 1] + 0.0722 * baseCrop.data[baseIndex + 2];
    const textureDelta = clamp((luminance - averageLuminance) * job.texture, -34, 28);
    integrated[artIndex] = clamp(Math.round(artwork.data[artIndex] + textureDelta), 0, 255);
    integrated[artIndex + 1] = clamp(Math.round(artwork.data[artIndex + 1] + textureDelta), 0, 255);
    integrated[artIndex + 2] = clamp(Math.round(artwork.data[artIndex + 2] + textureDelta), 0, 255);
    integrated[artIndex + 3] = Math.round(alpha * job.opacity);
  }

  const printLayer = await sharp(integrated, { raw: artwork.info }).png().toBuffer();
  await sharp(job.base)
    .composite([{ input: printLayer, left: job.left, top: job.top }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(job.output);
  console.log(`Rendered ${job.name}: ${path.relative(projectRoot, job.output)}`);
}

for (const job of jobs) {
  await renderMockup(job);
}
