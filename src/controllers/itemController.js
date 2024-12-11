import { prisma } from '../lib/prisma.js';

// GET: Retrieve all items
export const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
};
