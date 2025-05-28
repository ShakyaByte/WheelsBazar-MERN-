const express = require('express');
const router = express.Router();
const Product = require('../Models/productlist');
const { authMiddleware } = require('../middleware/authmiddleware'); 


  // Get all products listed without login, token is not required//
router.get('/my-products', async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


//Get products which requires token which will be displayed in user profile//

router.get('/token/products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }); // Fetch only the logged-in user's products
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Add a new product
router.post('/add', authMiddleware, async (req, res) => {
  const { title, description, price, images, condition, year, owners, location, contact, category } = req.body;

  try {
    console.log("Request body:", req.body);  // Log the incoming data

    const newProduct = new Product({
      title,
      description,
      price,
      images,
      condition,
      year,
      owners,
      location,
      contact,
      category,
      user: req.user.id,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (err) {
    console.error("Error saving product:", err); // <-- Add this line
    res.status(500).json({ message: 'Server error while saving product' });
  }
});



// **Update a product (Only if it belongs to the user)**
router.put('/update/:id', authMiddleware, async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (product.user.toString() !== req.user.id) {
          return res.status(403).json({ message: "Unauthorized" });
      }

      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ message: "Product updated", updatedProduct });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});

// **Delete a product (Only if it belongs to the user)**
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (product.user.toString() !== req.user.id) {
          return res.status(403).json({ message: "Unauthorized" });
      }

      await product.deleteOne();
      res.json({ message: "Product deleted" });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router