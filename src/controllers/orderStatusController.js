import { prisma } from '../lib/prisma.js';

// GET: Retrieve all order statuses
export const getAllOrderStatuses = async (req, res) => {
  try {
    const statuses = await prisma.orderStatus.findMany();
    res.json(statuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve order statuses' });
  }
};
