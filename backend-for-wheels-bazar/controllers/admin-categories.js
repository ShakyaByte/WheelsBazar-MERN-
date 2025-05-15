const express = require('express');
const router = express.Router();
const Product = require('../Models/categories'); // Renamed to avoid conflict

// Create a product
router.post('/add', async (req, res) => {
    try {
        const { productid, name, price, image, description, category } = req.body;
        const newProduct = new Product({ 
            productid, 
            name, 
            price, 
            image, 
            description, 
            category 
        });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", newProduct });
    } catch (error) {
        console.error("Add Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get all products
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Get All Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get products by productid
router.get('/all/:productid', async (req, res) => {
    const { productid } = req.params;
    try {
        const products = await Product.find({ productid });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found with this productid" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Get by productid Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Update a product by _id
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete a product by _id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;