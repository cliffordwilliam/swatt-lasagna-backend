import express from 'express';
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

// CRUD routes for orders
router.get('/orders', getAllOrders);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;
