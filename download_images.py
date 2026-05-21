#!/usr/bin/env python3
"""
HyperFit Product Images Auto-Downloader
Downloads all 20 product images to correct folders
"""

import os
import requests
from pathlib import Path
import time

# Image URLs mapping
IMAGES = {
    'supplements': {
        'on-gold-whey.jpg': 'https://m.media-amazon.com/images/I/71gNiWfR4IL._AC_SY879_.jpg',
        'myprotein-whey.jpg': 'https://images.myprotein.com/mblogs/content/uploads/2021/05/23100605/NEW-PRODUCT-LAUNCH.jpg',
        'on-creatine.jpg': 'https://m.media-amazon.com/images/I/71kKmWqmyHL._AC_SY879_.jpg',
        'c4-preworkout.jpg': 'https://m.media-amazon.com/images/I/91kq5qbT1QL._AC_SY879_.jpg',
        'bcaa.jpg': 'https://m.media-amazon.com/images/I/812WOqH30qL._AC_SY879_.jpg',
        'on-isolate.jpg': 'https://m.media-amazon.com/images/I/81LvLpEyVVL._AC_SY879_.jpg',
        'on-casein.jpg': 'https://m.media-amazon.com/images/I/71L8k5FEwWL._AC_SY879_.jpg',
    },
    'apparel': {
        'gymshark-joggers.jpg': 'https://images.gymshark.com/files/cdn/v1659009471/cms/c_crop,h_600,w_500,x_0,y_0/6b51fc6f-9e5e-44a5-b7b1-f635e959bda2.jpeg',
        'gymshark-tank.jpg': 'https://images.gymshark.com/files/cdn/v1659108836/cms/c_crop,h_600,w_500,x_0,y_0/d22e6d12-2c2c-4a9f-bbea-1abb18e14c77.jpeg',
        'lululemon-pants.jpg': 'https://images.lululemon.com/c_crop,h_600,w_500,x_0,y_0/f/collab_img/abc-pants-tall-warp-knit-black/LW9APTS_0_BHEATH.jpg',
        'ua-compression.jpg': 'https://images.underarmour.com/is/image/Underarmour/SS21_1327033_001_00_1280x960.jpg',
        'nike-shorts.jpg': 'https://images.nike.com/is/image/DotCom_PDP_PHON_800x800_1600/CJ2158_010_A_PREM.jpg',
    },
    'equipment': {
        'rogue-bar.jpg': 'https://www.roguefitness.com/media/catalog/product/cache/1/image/650x650/e9c3970ab036de1ea8c930bead280715/e/c/echo_bar_1_4.jpg',
        'adj-dumbbells.jpg': 'https://www.roguefitness.com/media/catalog/product/cache/1/image/650x650/e9c3970ab036de1ea8c930bead280715/a/d/adi_adjustable_dumbbells_5_50_1.jpg',
        'yoga-mat.jpg': 'https://images-cdn.ubuy.co.in/634f7a44880fc50d0b0e33f2-liforme-yoga-mat-yoga-mats-amazon.jpg',
        'kettlebell.jpg': 'https://m.media-amazon.com/images/I/71a8p8vB-6L._AC_SY879_.jpg',
        'foam-roller.jpg': 'https://images-na.ssl-images-amazon.com/images/I/81f5G7s9z4L._AC_SY879_.jpg',
    },
    'accessories': {
        'schiek-straps.jpg': 'https://images-na.ssl-images-amazon.com/images/I/51vb0lI1mIL._AC_SY879_.jpg',
        'sbd-belt.jpg': 'https://cdn.shopify.com/s/files/1/0023/0102/8844/products/ipf-belt-2lb-_1_1024x1024.jpg',
        'gripgenie.jpg': 'https://m.media-amazon.com/images/I/61e2OG8a6QL._AC_SY879_.jpg',
    }
}

def download_images():
    """Download all product images"""

    # Get base path (frontend public/images)
    base_path = Path(__file__).parent / 'frontend' / 'public' / 'images'

    total = 0
    success = 0
    failed = 0

    print("🚀 Starting HyperFit Product Image Download...\n")

    for category, images in IMAGES.items():
        category_path = base_path / category

        print(f"\n📁 {category.upper()} ({len(images)} images)")
        print("=" * 50)

        for filename, url in images.items():
            total += 1
            file_path = category_path / filename

            try:
                print(f"  ⏳ Downloading: {filename}...", end=" ")

                # Download with timeout and headers
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
                response = requests.get(url, timeout=10, headers=headers, stream=True)
                response.raise_for_status()

                # Save file
                with open(file_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)

                file_size = os.path.getsize(file_path) / 1024  # KB
                print(f"✅ ({file_size:.1f} KB)")
                success += 1

            except Exception as e:
                print(f"❌ ERROR: {str(e)}")
                failed += 1
                # Create placeholder if download fails
                with open(file_path, 'wb') as f:
                    f.write(b'placeholder')

            time.sleep(0.5)  # Be respectful to servers

    # Summary
    print("\n" + "=" * 50)
    print("\n📊 DOWNLOAD SUMMARY")
    print(f"  Total: {total}")
    print(f"  ✅ Success: {success}")
    print(f"  ❌ Failed: {failed}")
    print(f"\n✨ Images saved to: {base_path}")
    print("\n🎉 Ready for Phase 2: Premium UI Upgrade!")

if __name__ == '__main__':
    try:
        download_images()
    except KeyboardInterrupt:
        print("\n\n⚠️  Download cancelled by user")
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
