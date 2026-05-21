require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const Product = require("../models/Product");
const connectDB = require("../config/db");

const image = (category, filename) => ({
  url: `/images/${category}/${filename}`,
  publicId: filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9]+/g, "_"),
});

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const apparel = [
  ["Allen Solly Performance Tee - Black", 1299, 1799, "allen_a-1.jpeg", true],
  ["Allen Solly Training Tee - Navy", 1299, 1799, "allen_a-2.jpeg", false],
  ["Allen Solly Active Polo - Grey", 1499, 2099, "allen_a-3.jpeg", false],
  ["Allen Solly Flex Joggers - Charcoal", 2299, 2999, "allen_a-4.jpeg", true],
  ["Allen Solly Gym Shorts - Black", 1199, 1599, "allen_a-5.jpeg", false],
  ["Allen Solly Sleeveless Tank - White", 999, 1399, "allen_a-6.jpeg", false],
  ["Allen Solly Training Hoodie - Olive", 2499, 3299, "allen_a-7.jpeg", true],
  ["Allen Solly Track Pants - Navy", 2199, 2899, "allen_a-8.jpeg", false],
  ["Allen Solly Dry Fit Tee - Red", 1299, 1699, "allen_a-9.jpeg", false],
  ["Gymshark Central Joggers - Black", 2999, 3899, "gymshark-joggers.jpg", true],
  ["Gymshark Fit Tank Top", 1499, 1999, "gymshark-tank.jpg", true],
].map(([name, price, comparePrice, filename, isFeatured], index) => ({
  name,
  description:
    "Premium training apparel designed for comfort, sweat control, and daily gym performance.",
  price,
  comparePrice,
  category: "Apparel",
  stock: 70 + index * 4,
  isFeatured,
  brand: name.split(" ").slice(0, name.startsWith("Under Armour") ? 2 : 1).join(" "),
  ratings: 4.5 + (index % 5) / 10,
  numReviews: 80 + index * 17,
  images: [image("apparel", filename)],
  attributes: [
    { key: "Sizes", value: "S, M, L, XL, XXL" },
    { key: "Colors", value: "Black, Grey, Navy, White" },
  ],
}));

const supplements = [
  ["MuscleBlaze Biozyme Whey Protein - Chocolate", 2799, 3499, "muscleblaze_s-1.jpg", true],
  ["MuscleBlaze Creatine Monohydrate - 250g", 899, 1299, "muscleblaze_s-2.jpg", true],
  ["MuscleBlaze Pre Workout - Fruit Fury", 1599, 2199, "muscleblaze_s-3.jpg", false],
  ["MuscleBlaze Mass Gainer - Chocolate", 2199, 2999, "muscleblaze_s-4.jpg", false],
  ["Optimum Nutrition Gold Standard Whey - 2lb", 3499, 4299, "optimum_s-1.jpeg", true],
  ["Optimum Nutrition Whey Isolate - Vanilla", 4299, 5299, "optimim_s-2.jpeg", true],
  ["Optimum Nutrition Casein Protein - Chocolate", 3599, 4499, "optimim_s-3.jpeg", false],
  ["Optimum Nutrition Micronized Creatine", 1299, 1799, "optimim_s-4.jpeg", true],
  ["Optimum Nutrition Amino Energy", 1899, 2499, "optimim_s-5.jpeg", false],
  ["Optimum Nutrition Serious Mass", 3299, 4199, "optimim_s-6.jpeg", false],
  ["Optimum Nutrition BCAA 1000 Caps", 1499, 1999, "optimim_s-7.jpeg", false],
].map(([name, price, comparePrice, filename, isFeatured], index) => ({
  name,
  description:
    "Science-backed sports nutrition for strength, recovery, endurance, and lean performance goals.",
  price,
  comparePrice,
  category: "Supplements",
  stock: 95 + index * 7,
  isFeatured,
  brand: name.startsWith("MuscleBlaze") ? "MuscleBlaze" : "Optimum Nutrition",
  ratings: 4.6 + (index % 4) / 10,
  numReviews: 120 + index * 28,
  images: [image("supplements", filename)],
  attributes: [
    { key: "Flavors", value: "Chocolate, Vanilla, Strawberry" },
    { key: "Servings", value: "30, 60" },
  ],
}));

const equipment = [
  ["Cosco Treadmill Pro Runner", 28999, 34999, "cosco_e-1.jpeg", true],
  ["Cosco Exercise Bike", 15999, 19999, "cosco_e-2.jpeg", true],
  ["Cosco Home Gym Bench", 7999, 9999, "cosco_e-4.jpeg", false],
  ["Cosco Boxing Gloves", 1499, 1999, "cosco_e-5.jpeg", false],
  ["Cosco Medicine Ball", 1199, 1699, "cosco_e-6.jpeg", false],
  ["Cosco Skipping Rope", 399, 699, "cosco_e-7.jpeg", false],
  ["PowerMax Fitness Treadmill", 32999, 42999, "powermax_e-1.jpeg", true],
  ["PowerMax Elliptical Trainer", 26999, 32999, "powermax_e-2.jpeg", true],
  ["PowerMax Spin Bike", 18999, 24999, "powermax_e-3.jpeg", false],
  ["Adjustable Dumbbell Set 5-50kg", 24999, 29999, "adj-dumbbells.jpg", true],
  ["Kettlebell 16kg Cast Iron", 1299, 1799, "kettlebell.jpg", true],
  ["Yoga Mat Premium TPE 6mm", 2299, 3299, "yoga-mat.jpg", false],
].map(([name, price, comparePrice, filename, isFeatured], index) => ({
  name,
  description:
    "Durable fitness equipment selected for home gyms, strength training, conditioning, and recovery work.",
  price,
  comparePrice,
  category: "Equipment",
  stock: 28 + index * 5,
  isFeatured,
  brand: name.startsWith("PowerMax") ? "PowerMax" : name.split(" ")[0],
  ratings: 4.4 + (index % 5) / 10,
  numReviews: 45 + index * 13,
  images: [image("equipment", filename)],
  attributes: [
    { key: "Use", value: "Home Gym, Strength, Conditioning" },
    { key: "Warranty", value: "6 Months, 1 Year" },
  ],
}));

const accessories = [
  ["Nike Training Duffel Bag", 1899, 2499, "nikebag_a-1.jpeg", true, "Nike"],
  ["Fitnesstack Gym Backpack", 1499, 1999, "fitnesstackbag_a-2.jpeg", false, "Fitnesstack"],
  ["MikeFit Lifting Gloves", 799, 1199, "mikefit_a-3.jpeg", false, "MikeFit"],
  ["ActiveGear Shaker Bottle", 499, 799, "activegear_a-4.jpeg", false, "ActiveGear"],
  ["Yoga Mat Carry Strap", 399, 699, "yoyamat_a-5.jpeg", false, "YogaMat"],
  ["YogaMat Eco Mat - Blue", 999, 1499, "yogamat_a-6.jpeg", true, "YogaMat"],
  ["YogaMat Eco Mat - Black", 999, 1499, "yogamat_a-7.jpeg", false, "YogaMat"],
  ["Resistance Bands Light Set", 699, 999, "bands_a-8.jpeg", true, "ActiveGear"],
  ["Resistance Bands Pro Set", 999, 1399, "bands_a-9.jpeg", false, "ActiveGear"],
  ["Resistance Bands Heavy Set", 1299, 1699, "bands_a-10.jpeg", false, "ActiveGear"],
  ["Powerlifting Belt 10mm", 2499, 3299, "belt_a-11.jpeg", true, "ActiveGear"],
  ["Powerlifting Belt 13mm", 2999, 3999, "belt_a-12.jpeg", false, "ActiveGear"],
  ["Schiek Lifting Straps Pair", 899, 1199, "schiek-straps.jpg", false, "Schiek"],
].map(([name, price, comparePrice, filename, isFeatured, brand], index) => ({
  name,
  description:
    "Training accessories built for better grip, organization, support, and repeatable workout performance.",
  price,
  comparePrice,
  category: "Accessories",
  stock: 75 + index * 9,
  isFeatured,
  brand,
  ratings: 4.3 + (index % 6) / 10,
  numReviews: 52 + index * 16,
  images: [image("accessories", filename)],
  attributes: [
    { key: "Type", value: "Gym Accessory" },
    { key: "Colors", value: "Black, Grey, Blue" },
  ],
}));

const products = [...supplements, ...apparel, ...equipment, ...accessories];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();

    const productsWithSlugs = products.map((product) => ({
      ...product,
      slug: slugify(product.name),
    }));

    await Product.insertMany(productsWithSlugs);
    console.log(`Products seeded successfully: ${productsWithSlugs.length}`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
