// 🌐 server.js — AdptNXT E-commerce Backend Entry Point

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/dbInit');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🛒 Welcome to AdptNXT E-commerce API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
