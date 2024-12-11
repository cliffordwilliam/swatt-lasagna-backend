import express from 'express';
import {
  getOrderItems,
  addItemToOrder,
  updateOrderItem,
  deleteOrderItem,
} from '../controllers/orderItemController.js';

const router = express.Router();

// Routes for managing order items
router.get('/orders/:orderId/items', getOrderItems); // Retrieve all items for an order
router.post('/orders/:orderId/items', addItemToOrder); // Add an item to an order
router.put('/orders/:orderId/items/:itemId', updateOrderItem); // Update quantity of an item in an order
router.delete('/orders/:orderId/items/:itemId', deleteOrderItem); // Remove an item from an order

export default router;
