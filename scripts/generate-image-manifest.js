import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const facilitiesDir = path.join(__dirname, '../public/assets/facilities');
const manifestPath = path.join(facilitiesDir, 'manifest.json');

if (!fs.existsSync(facilitiesDir)) {
  console.error(`Directory not found: ${facilitiesDir}`);
  process.exit(1);
}

// Category metadata — order matches folder numbering
const categoryMeta = {
  '01_sauna': {
    id: 'sauna',
    label: 'サウナ',
    description: 'プライベートサウナで極上のリラックスタイムを',
  },
  '02_living': {
    id: 'living',
    label: 'リビング',
    description: '広々としたリビングで寛ぎのひとときを',
  },
  '03_bathroom': {
    id: 'bathroom',
    label: 'バスルーム',
    description: '清潔感あふれるバスルームで旅の疲れを癒す',
  },
  '04_bedroom': {
    id: 'bedroom',
    label: 'ベッドルーム',
    description: '上質な眠りをお約束するプライベート空間',
  },
  '05_kitchen': {
    id: 'kitchen',
    label: 'キッチン',
    description: '本格的な調理器具を備えたフルキッチン',
  },
  '06_other': { id: 'other', label: 'その他', description: '細部にまでこだわったインテリアと設備' },
};

const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;

// Read top-level directories in sorted order
const dirs = fs
  .readdirSync(facilitiesDir)
  .filter((name) => {
    const full = path.join(facilitiesDir, name);
    return fs.statSync(full).isDirectory();
  })
  .sort((a, b) => a.localeCompare(b));

const categories = [];

for (const dir of dirs) {
  const meta = categoryMeta[dir];
  if (!meta) continue; // skip unknown folders

  const dirPath = path.join(facilitiesDir, dir);
  const images = fs
    .readdirSync(dirPath)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => `${dir}/${f}`.replace(/\\/g, '/'));

  if (images.length > 0) {
    categories.push({ ...meta, images });
  }
}

const manifest = { categories };

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Manifest generated: ${categories.length} categories`);
categories.forEach((c) => console.log(`  ${c.label}: ${c.images.length} images`));
