const Product = require('../models/Product');

// ১. তৈরি করা
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ২. দেখা
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ৩. আপডেট করা
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ৪. ডিলিট করা
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'প্রোডাক্ট ডিলিট করা হয়েছে' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };