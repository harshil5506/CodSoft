const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');

async function setAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    let user = await User.findOne({ email: 'admin@hyperfit.com' });
    
    if (!user) {
      console.log('👤 Admin user not found, creating...');
      user = await User.create({
        name: 'Admin User',
        email: 'admin@hyperfit.com',
        password: 'Admin@12345'
      });
    }

    user.role = 'admin';
    await user.save();

    console.log('✅ User role set to admin!');
    console.log('');
    console.log('📌 Login credentials:');
    console.log('   Email: admin@hyperfit.com');
    console.log('   Password: Admin@12345');
    console.log('');
    console.log('🔗 Access admin at: http://localhost:5178/admin');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

setAdmin();
