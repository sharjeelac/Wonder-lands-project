let initdata = require('./data.js'); // Ensure data.js exports an array
const mongoose = require('mongoose');
const listingModel = require('../models/listing.js');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb://127.0.0.1:27017/wonderlands',
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const insert = async () => {
  try {
    await listingModel.deleteMany({});
    initdata = initdata.map((obj) => ({
      ...obj,
      owner: '67c7276157ffd3a138c076e5',
    }));
    await listingModel.insertMany(initdata);

    console.log('✅ Data inserted successfully!');
  } catch (error) {
    console.error(`❌ Insertion Error: ${error.message}`);
  } finally {
    await mongoose.disconnect(); // Ensure DB connection is closed
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

const start = async () => {
  await connectDB();
  await insert();
};

start();
