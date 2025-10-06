const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = 'docs';
const SITE_DIR = 'site';

// Files to copy from docs to site
const FILES_TO_COPY = [
  'manifest.json',
  'offline.html'
];

// Copy files from docs to site
function copyFiles() {
  console.log('📁 Copying files from docs to site...');
  
  // Ensure site directory exists
  if (!fs.existsSync(SITE_DIR)) {
    console.error('❌ Site directory not found. Run "mkdocs build" first.');
    process.exit(1);
  }
  
  let copiedCount = 0;
  
  FILES_TO_COPY.forEach(file => {
    const sourcePath = path.join(DOCS_DIR, file);
    const destPath = path.join(SITE_DIR, file);
    
    if (fs.existsSync(sourcePath)) {
      try {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copied: ${file}`);
        copiedCount++;
      } catch (error) {
        console.error(`❌ Failed to copy ${file}:`, error.message);
      }
    } else {
      console.warn(`⚠️  Source file not found: ${sourcePath}`);
    }
  });
  
  console.log(`📋 Copied ${copiedCount} files successfully`);
}

// Run the copy operation
if (require.main === module) {
  copyFiles();
}

module.exports = { copyFiles };
