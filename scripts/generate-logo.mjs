import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoDir = path.join(__dirname, "..", "Logo");
const pngDir = path.join(logoDir, "png");
const publicDir = path.join(__dirname, "..", "public");
const appDir = path.join(__dirname, "..", "src", "app");

const exports = [
  { input: "excelify-logo.svg", outputs: [512, 256, 128, 64] },
  { input: "excelify-logo-dark.svg", outputs: [512] },
  { input: "excelify-wordmark.svg", outputs: [512, 256] },
  { input: "excelify-icon.svg", outputs: [512, 192, 128, 64, 32, 16] },
];

async function renderSvgToPng(svgPath, outputPath, size) {
  const svg = await readFile(svgPath);
  const basename = path.basename(outputPath, ".png");

  if (basename.includes("logo") && !basename.includes("icon")) {
    await sharp(svg, { density: 300 })
      .resize({ width: size, withoutEnlargement: false })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
    return;
  }

  await sharp(svg, { density: 300 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

async function main() {
  await mkdir(pngDir, { recursive: true });
  await mkdir(path.join(publicDir, "logo"), { recursive: true });

  for (const item of exports) {
    const svgPath = path.join(logoDir, item.input);
    const stem = path.basename(item.input, ".svg");

    for (const size of item.outputs) {
      const outputPath = path.join(pngDir, `${stem}-${size}.png`);
      await renderSvgToPng(svgPath, outputPath, size);
      console.log(`Created ${outputPath}`);
    }
  }

  const icon512 = path.join(pngDir, "excelify-icon-512.png");
  const logo256 = path.join(pngDir, "excelify-logo-256.png");
  const icon16Path = path.join(pngDir, "excelify-icon-16.png");
  const icon32Path = path.join(pngDir, "excelify-icon-32.png");
  const icon192Path = path.join(pngDir, "excelify-icon-192.png");

  await copyFile(icon512, path.join(publicDir, "logo", "excelify-icon.png"));
  await copyFile(path.join(pngDir, "excelify-icon-192.png"), path.join(publicDir, "logo", "excelify-icon-192.png"));
  await copyFile(icon32Path, path.join(publicDir, "logo", "excelify-icon-32.png"));
  await copyFile(icon16Path, path.join(publicDir, "logo", "excelify-icon-16.png"));
  await copyFile(logo256, path.join(publicDir, "logo", "excelify-logo.png"));
  await copyFile(path.join(logoDir, "excelify-logo.svg"), path.join(publicDir, "logo", "excelify-logo.svg"));
  await copyFile(path.join(logoDir, "excelify-wordmark.svg"), path.join(publicDir, "logo", "excelify-wordmark.svg"));
  await copyFile(path.join(logoDir, "excelify-icon.svg"), path.join(publicDir, "logo", "excelify-icon.svg"));

  await copyFile(icon512, path.join(appDir, "icon.png"));
  await copyFile(icon192Path, path.join(appDir, "apple-icon.png"));

  const { default: toIco } = await import("to-ico");
  const icon16 = await readFile(icon16Path);
  const icon32 = await readFile(icon32Path);
  const faviconBuffer = await toIco([icon16, icon32]);

  await writeFile(path.join(publicDir, "favicon.ico"), faviconBuffer);
  await writeFile(path.join(appDir, "favicon.ico"), faviconBuffer);

  console.log("Logo PNG export complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
