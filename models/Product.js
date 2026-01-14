const mongoose = require('mongoose');

// ১. ছাঁচ বা ডিজাইন তৈরি করা (Schema)
const productSchema = new mongoose.Schema({
  name: {
    type: String,     // নাম হবে লেখা (Text)
    required: true,   // নাম দিতেই হবে, খালি রাখা যাবে না
  },
  price: {
    type: Number,     // দাম হবে সংখ্যা (Number)
    required: true,
  },
  description: {
    type: String,     // বর্ণনা
  },
  inStock: {
    type: Boolean,    // আছে কি নাই? (True/False)
    default: true,    // কিছু না বললে ধরে নেব স্টক আছে
  }
});

// ২. ছাঁচ থেকে মডেল বানানো
const Product = mongoose.model('Product', productSchema);

// ৩. মডেলটা অন্য ফাইলে ব্যবহারের জন্য এক্সপোর্ট করা
module.exports = Product;