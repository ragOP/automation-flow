const fs = require("fs");
const path = require("path");

console.log("Running copy-template.js...");

// ABSOLUTE PATHS FOR DEBUGGING
const srcDir = path.join(__dirname, "src", "template");
const destDir = path.join(__dirname, "dist", "template");

console.log("SRC DIR:", srcDir);
console.log("DEST DIR:", destDir);

// CHECK IF SOURCE EXISTS
if (!fs.existsSync(srcDir)) {
  console.error("❌ ERROR: Source folder does NOT exist!");
  process.exit(1);
}

// ENSURE DEST EXISTS
if (!fs.existsSync(destDir)) {
  console.log("Creating destination folder...");
  fs.mkdirSync(destDir, { recursive: true });
}

// READ FILES
const files = fs.readdirSync(srcDir);
console.log("FOUND FILES:", files);

if (files.length === 0) {
  console.error("❌ ERROR: Source folder is EMPTY.");
  process.exit(1);
}

// COPY FILES
files.forEach((file) => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);

  console.log(`Copying ${srcFile} → ${destFile}`);
  fs.copyFileSync(srcFile, destFile);
});

console.log("✔ Template successfully copied!");