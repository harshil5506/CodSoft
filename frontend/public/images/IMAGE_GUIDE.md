# HyperFit Product Image Guide

## Image Organization & Naming Convention

### SUPPLEMENTS (`/supplements/`)

Store product images as JPG/PNG (600x600px recommended)

1. `on-gold-whey.jpg` - Optimum Nutrition Gold Standard Whey
2. `myprotein-whey.jpg` - MyProtein Impact Whey Protein
3. `on-creatine.jpg` - Creatine Monohydrate
4. `c4-preworkout.jpg` - C4 Original Pre-Workout
5. `bcaa.jpg` - BCAAs 2:1:1 Ratio
6. `on-isolate.jpg` - Whey Gold Standard Isolate
7. `on-casein.jpg` - Casein Gold Standard

### APPAREL (`/apparel/`)

1. `gymshark-joggers.jpg` - Gymshark Central Joggers
2. `gymshark-tank.jpg` - Gymshark Fit Tank Top
3. `lululemon-pants.jpg` - Lululemon ABC Pants
4. `ua-compression.jpg` - Under Armour Compression Shirt
5. `nike-shorts.jpg` - Nike Dri-FIT Training Shorts

### EQUIPMENT (`/equipment/`)

1. `rogue-bar.jpg` - Rogue Echo Bar
2. `adj-dumbbells.jpg` - Adjustable Dumbbell Set
3. `yoga-mat.jpg` - Yoga Mat Premium TPE
4. `kettlebell.jpg` - Kettlebell 16kg
5. `foam-roller.jpg` - Foam Roller Pro

### ACCESSORIES (`/accessories/`)

1. `schiek-straps.jpg` - Schiek Lifting Straps
2. `sbd-belt.jpg` - SBD Powerlifting Belt
3. `gripgenie.jpg` - GripGenie Hand Strengthener

### BRANDS (`/brands/`)

1. `on-logo.png` - Optimum Nutrition Logo
2. `myprotein-logo.png` - MyProtein Logo
3. `gymshark-logo.png` - Gymshark Logo
4. etc.

## Image Requirements

- **Format**: JPG or PNG
- **Size**: 600x600px (minimum) for product cards
- **Quality**: High resolution, professional photos
- **Style**: Real product images (not illustrations)
- **Lighting**: Consistent, professional lighting
- **Background**: White or clean neutral background

## How to Source Images

Best sources for real product images:

1. **Amazon** - Right-click product images
2. **Brand Official Websites** - Gymshark.com, Nike.com, etc.
3. **Unsplash** - Professional fitness product photos
4. **Pexels** - Free high-quality product images
5. **Stock Photo Sites** - iStock, Shutterstock (if budget allows)

## Steps

1. Find a real product image matching the product name
2. Download it
3. Rename it according to the naming convention above
4. Place it in the correct category folder
5. Ensure image is 600x600px minimum
6. Optimize size (compress if > 200KB)

## Frontend Implementation

Once images are placed, update `seedProducts.js` to reference local paths:

Example:

```javascript
images: [
  {
    url: "/images/supplements/on-gold-whey.jpg",
    publicId: "on_whey",
  },
];
```

This will load from `frontend/public/images/`
