const express = require('express');
const OrderSchema = require('../models/orders');
const ShoeSchema = require('../models/shoes');

const router = express.Router();

// // Read all orders
// router.get('/api/orders', async (req, res) => {
//     try {
//         const orders = await OrderSchema.find().populate('items.shoe', 'brand model size color');
//         res.json(orders);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Read all orders
router.get('/api/orders', async (req, res) => {
    try {
        const orders = await OrderSchema.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Create orders
router.post('/api/order', async (req, res) => {
    const order = new OrderSchema({ ...req.body })
    await order.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

// // Create an order
// router.post('/api/order', async (req, res) => {
//     try {
//         const { customerName, items } = req.body;

//         // Validate if all requested shoes exist and have sufficient quantity
//         for (const item of items) {
//             const shoe = await ShoeSchema.findById(item.shoe);
//             if (!shoe || item.stock > shoe.stock) {
//                 return res.status(400).json({ error: 'Invalid shoe or insufficient quantity' });
//             }
//         }

//         // Create the order
//         const order = new OrderSchema({ customerName, items });
//         await order.save();

//         // Update shoe quantities
//         for (const item of items) {
//             const shoe = await ShoeSchema.findById(item.shoe);
//             shoe.stock -= item.stock;
//             await shoe.save();
//         }

//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Delete a order
router.delete('/api/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await OrderSchema.findByIdAndDelete(id);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
