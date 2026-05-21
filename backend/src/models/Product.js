
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  images: [{
    url: String,
    publicId: String,
  }],
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  comparePrice: {
    type: Number,
  },
  category: {
    type: String,
    required: [true, 'Please specify category'],
    enum: ['Apparel', 'Supplements', 'Equipment', 'Accessories'],
  },
  images: [{
    url: String,
    publicId: String,
  }],
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  ratings: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  brand: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  priceVariants: [{
    attributeValue: String,
    price: Number,
    comparePrice: Number,
  }],
  attributes: [{
    key: String,
    value: String
  }] // For sizes, flavors, etc.
}, {
  timestamps: true
});

// Create slug from name before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
