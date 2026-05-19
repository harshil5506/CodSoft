const mongoose = require('mongoose');

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
