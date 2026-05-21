const fs = require("fs");
const path = require("path");
const https = require("https");

// Using Unsplash URLs which are reliable and designed for downloads
const IMAGES = {
  supplements: {
    "on-gold-whey.jpg": "https://images.unsplash.com/photo-1577401132379-0e3c6a7bb41a?w=600&h=600&fit=crop",
    "myprotein-whey.jpg": "https://images.unsplash.com/photo-1596267633876-4d18d4e35000?w=600&h=600&fit=crop",
    "on-creatine.jpg": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=600&fit=crop",
    "c4-preworkout.jpg": "https://images.unsplash.com/photo-1609895318053-82ad36b7a4e9?w=600&h=600&fit=crop",
    "bcaa.jpg": "https://images.unsplash.com/photo-1599599810694-b5ac4dd3c2c3?w=600&h=600&fit=crop",
    "on-isolate.jpg": "https://images.unsplash.com/photo-1577401132379-0e3c6a7bb41a?w=600&h=600&fit=crop",
    "on-casein.jpg": "https://images.unsplash.com/photo-1596267633876-4d18d4e35000?w=600&h=600&fit=crop",
  },
  apparel: {
    "gymshark-joggers.jpg": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=600&fit=crop",
    "gymshark-tank.jpg": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    "lululemon-pants.jpg": "https://images.unsplash.com/photo-1552886030-3b4a4d84a9e6?w=600&h=600&fit=crop",
    "ua-compression.jpg": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    "nike-shorts.jpg": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop",
  },
  equipment: {
    "rogue-bar.jpg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop",
    "adj-dumbbells.jpg": "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&h=600&fit=crop",
    "yoga-mat.jpg": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop",
    "kettlebell.jpg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop",
    "foam-roller.jpg": "https://images.unsplash.com/photo-1518611505868-48510c2e2e38?w=600&h=600&fit=crop",
  },
  accessories: {
    "schiek-straps.jpg": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop",
    "sbd-belt.jpg": "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?w=600&h=600&fit=crop",
    "gripgenie.jpg": "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=600&h=600&fit=crop",
  }
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
        file.on("error", reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on("error", reject);
  });
}

async function downloadAllImages() {
  const basePath = path.join(__dirname, "frontend", "public", "images");

  let total = 0;
  let success = 0;
  let failed = 0;

  console.log("\n🚀 Downloading HyperFit Product Images (Unsplash - Reliable)...\n");

  for (const [category, images] of Object.entries(IMAGES)) {
    const categoryPath = path.join(basePath, category);

    console.log(`\n📁 ${category.toUpperCase()} (${Object.keys(images).length} images)`);
    console.log("=".repeat(50));

    for (const [filename, url] of Object.entries(images)) {
      total++;
      const filepath = path.join(categoryPath, filename);

      try {
        process.stdout.write(`  ⏳ Downloading: ${filename}... `);
        await downloadImage(url, filepath);

        const stats = fs.statSync(filepath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`✅ (${sizeKB} KB)`);
        success++;
      } catch (error) {
        console.log(`❌ ERROR: ${error.message}`);
        failed++;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("\n📊 DOWNLOAD SUMMARY");
  console.log(`  Total: ${total}`);
  console.log(`  ✅ Success: ${success}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`\n✨ Images saved to: ${basePath}`);
  console.log("\n✅ Phase 1 Complete! Ready for Phase 2: Premium UI Upgrade!\n");
}

downloadAllImages().catch((error) => {
  console.error("\n❌ Error:", error.message);
  process.exit(1);
});
