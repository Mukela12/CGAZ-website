const fs = require('fs');
const path = require('path');

// Files that need updating
const files = [
  'app/(app)/about/story/page.tsx',
  'app/(app)/about/partners/page.tsx',
  'app/(app)/about/leadership/page.tsx',
  'app/(app)/farmers/training/page.tsx',
  'app/(app)/farmers/stories/page.tsx',
];

// Regular expression to find OptimizedImage with fill but no sizes
const fillWithoutSizesRegex = /<OptimizedImage\s+([^>]*?)\bfill\b([^>]*?)\/>/gs;

function hasSizesProp(imageTag) {
  return /\bsizes\s*=/.test(imageTag);
}

function addSizesProp(imageTag) {
  // If it already has sizes, return unchanged
  if (hasSizesProp(imageTag)) {
    return imageTag;
  }

  // Add sizes prop before the closing />
  // Default sizes: full width on mobile, 80vw on tablet, fixed large size on desktop
  const sizesValue = 'sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"';

  // Insert before /> or >
  if (imageTag.includes('/>')) {
    return imageTag.replace(/\/>\s*$/, `\n            ${sizesValue}\n          />`);
  } else {
    return imageTag.replace(/>\s*$/, `\n            ${sizesValue}\n          >`);
  }
}

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Find all OptimizedImage tags with fill
  const matches = [...content.matchAll(fillWithoutSizesRegex)];

  if (matches.length === 0) {
    console.log(`✅ ${file} - No images with fill prop found or all already have sizes`);
    return;
  }

  let updatedCount = 0;

  matches.forEach(match => {
    const fullMatch = match[0];

    // Check if this image already has sizes
    if (!hasSizesProp(fullMatch)) {
      const updated = addSizesProp(fullMatch);
      content = content.replace(fullMatch, updated);
      updatedCount++;
    }
  });

  if (updatedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file} - Added sizes prop to ${updatedCount} image(s)`);
  } else {
    console.log(`✅ ${file} - All images already have sizes prop`);
  }
});

console.log('\n✨ Done! All images with fill prop now have sizes prop.');
