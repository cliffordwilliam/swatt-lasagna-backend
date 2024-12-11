import express from 'express';
import { getAllOrderStatuses } from '../controllers/orderStatusController.js';

const router = express.Router();

// GET: Retrieve all order statuses
router.get('/statuses', getAllOrderStatuses);

export default router;
