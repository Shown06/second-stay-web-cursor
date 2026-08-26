import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const FACILITIES_DIR = path.resolve('public/assets/facilities');
const MAX_WIDTH = 2400;
const WEBP_QUALITY = 92;

const CATEGORY_DIRS = fs.readdirSync(FACILITIES_DIR).filter(d =>
  fs.statSync(path.join(FACILITIES_DIR, d)).isDirectory()
);

let totalOriginal = 0;
let totalConverted = 0;
let fileCount = 0;

async function convertFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const outPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const originalSize = fs.statSync(filePath).size;

  const metadata = await sharp(filePath).metadata();
  let pipeline = sharp(filePath);

  if (metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(outPath);

  const newSize = fs.statSync(outPath).size;
  totalOriginal += originalSize;
  totalConverted += newSize;
  fileCount++;

  const ratio = ((1 - newSize / originalSize) * 100).toFixed(1);
  console.log(`  ✓ ${path.basename(filePath)} → .webp  (${fmt(originalSize)} → ${fmt(newSize)}, -${ratio}%)`);
  return outPath;
}

function fmt(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

async function main() {
  console.log('🔄 WebP 変換開始...\n');

  for (const dir of CATEGORY_DIRS) {
    const dirPath = path.join(FACILITIES_DIR, dir);
    const files = fs.readdirSync(dirPath).filter(f =>
      /\.(jpg|jpeg|png)$/i.test(f)
    );

    if (files.length === 0) continue;
    console.log(`📁 ${dir}/ (${files.length} files)`);

    for (const file of files) {
      await convertFile(path.join(dirPath, file));
    }
    console.log('');
  }

  console.log('─'.repeat(50));
  console.log(`✅ 完了: ${fileCount} files converted`);
  console.log(`   元サイズ:   ${fmt(totalOriginal)}`);
  console.log(`   WebPサイズ: ${fmt(totalConverted)}`);
  console.log(`   削減率:     ${((1 - totalConverted / totalOriginal) * 100).toFixed(1)}%`);

  // manifest.json を WebP 参照に更新
  const manifestPath = path.join(FACILITIES_DIR, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    manifest.categories.forEach(cat => {
      cat.images = cat.images.map(img => img.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('\n📝 manifest.json を WebP 参照に更新しました');
  }
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
