import express from 'express';
import { getAllPaymentMethods } from '../controllers/paymentMethodController.js';

const router = express.Router();

// GET: Retrieve all payment methods
router.get('/payment-methods', getAllPaymentMethods);

export default router;
