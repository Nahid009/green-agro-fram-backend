const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connection Successful! 🎉'))
  .catch(err => console.log(err));

app.use('/products', productRoutes); 

app.get('/', (req, res) => {
  res.send('Server is Clean and Running! 🚀');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Fixing deployment error