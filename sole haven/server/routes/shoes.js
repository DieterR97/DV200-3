const express = require('express');
const ShoeSchema = require('../models/shoes');
const router = express.Router();

//Create shoe
router.post('/api/shoe', async (req, res) => {
    const shoe = new ShoeSchema({ ...req.body })
    await shoe.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

// Read all shoes
router.get('/api/shoes', async (req, res) => {
    try {
        const shoes = await ShoeSchema.find();
        res.json(shoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single shoe
router.get('/api/shoe/:id', async (req, res) => {
    try {
        const shoe = await ShoeSchema.findById(req.params.id);
        res.json(shoe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a shoe
router.put('/api/shoe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ShoeSchema.findByIdAndUpdate(id, req.body);
        res.json({ message: 'Shoe updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a shoe
router.delete('/api/shoe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ShoeSchema.findByIdAndDelete(id);
        res.json({ message: 'Shoe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
