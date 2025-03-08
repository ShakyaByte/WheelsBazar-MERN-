const express = require('express');
const router = express.Router();
const Bike = require('../Models/bike');

// Create a bike
router.post('/add', async (req, res) => {
    try {
        const { Bikeid, name, price, image, description, category } = req.body;
        const newBike = new Bike({ Bikeid, name, price, image, description, category });
        await newBike.save();
        res.status(201).json({ message: "Bike added successfully", newBike });
    } catch (error) {
        console.error("Add Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get all bikes
router.get('/all', async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.status(200).json(bikes);
    } catch (error) {
        console.error("Get All Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get bikes by Bikeid (this matches the frontend's use of /all/KTM)
router.get('/all/:Bikeid', async (req, res) => {
    const { Bikeid } = req.params;

    try {
        const bikes = await Bike.find({ Bikeid });
        if (bikes.length === 0) {
            return res.status(404).json({ message: "No bikes found with this Bikeid" });
        }
        res.status(200).json(bikes);
    } catch (error) {
        console.error("Get by Bikeid Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Update a bike by _id
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params; // Use _id (MongoDB's unique identifier)
        const updatedBike = await Bike.findByIdAndUpdate(
            id, // Query by _id
            req.body,
            { new: true }
        );

        if (!updatedBike) {
            return res.status(404).json({ error: "Bike not found" });
        }

        res.status(200).json({ message: "Bike updated successfully", updatedBike });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete a bike by _id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params; // Use _id (MongoDB's unique identifier)
        const deletedBike = await Bike.findByIdAndDelete(id);

        if (!deletedBike) {
            return res.status(404).json({ error: "Bike not found" });
        }

        res.status(200).json({ message: "Bike deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;