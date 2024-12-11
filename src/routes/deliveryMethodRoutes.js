import express from 'express';
import { getAllDeliveryMethods } from '../controllers/deliveryMethodController.js';

const router = express.Router();

// GET: Retrieve all delivery methods
router.get('/delivery-methods', getAllDeliveryMethods);

export default router;
