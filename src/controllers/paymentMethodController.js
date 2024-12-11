import { prisma } from '../lib/prisma.js';

// GET: Retrieve all payment methods
export const getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await prisma.paymentMethod.findMany();
    res.json(paymentMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve payment methods' });
  }
};
