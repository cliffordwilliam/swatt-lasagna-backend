import { prisma } from '../lib/prisma.js';

// GET: Retrieve all delivery methods
export const getAllDeliveryMethods = async (req, res) => {
  try {
    const deliveryMethods = await prisma.deliveryMethod.findMany();
    res.json(deliveryMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve delivery methods' });
  }
};
