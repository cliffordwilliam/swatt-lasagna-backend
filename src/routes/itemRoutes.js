import express from 'express';
import { getAllItems } from '../controllers/itemController.js';

const router = express.Router();

// GET: Retrieve all items
router.get('/items', getAllItems);

export default router;
