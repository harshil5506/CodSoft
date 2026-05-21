const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');

async function recreateAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing admin if exists
    await User.deleteOne({ email: 'admin@hyperfit.com' });
    console.log('🗑️  Deleted old admin user');

    // Create fresh admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@hyperfit.com',
      password: 'Admin@12345',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📌 Login credentials:');
    console.log('   Email: admin@hyperfit.com');
    console.log('   Password: Admin@12345');
    console.log('   Role: admin');
    console.log('');
    console.log('🔗 Access admin at: http://localhost:5178/admin');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

recreateAdmin();
