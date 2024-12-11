import { prisma } from '../lib/prisma.js';

// GET: Retrieve all items for a specific order
export const getOrderItems = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId },
      include: {
        item: true, // Include item details
      },
    });

    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve order items' });
  }
};

// POST: Add an item to an order
export const addItemToOrder = async (req, res) => {
  const { orderId } = req.params;
  const { itemId, quantity } = req.body;

  if (!itemId || !quantity || quantity < 1) {
    return res.status(400).json({ error: 'Missing required fields or invalid quantity' });
  }

  try {
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId,
        itemId,
        quantity,
      },
      include: {
        item: true, // Include item details
      },
    });

    res.status(201).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add item to order' });
  }
};

// PUT: Update the quantity of an item in an order
export const updateOrderItem = async (req, res) => {
  const { orderId, itemId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  try {
    const orderItem = await prisma.orderItem.update({
      where: {
        orderId_itemId: { orderId, itemId },
      },
      data: { quantity },
      include: {
        item: true, // Include item details
      },
    });

    res.json(orderItem);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.status(500).json({ error: 'Failed to update order item' });
  }
};

// DELETE: Remove an item from an order
export const deleteOrderItem = async (req, res) => {
  const { orderId, itemId } = req.params;

  try {
    const orderItem = await prisma.orderItem.delete({
      where: {
        orderId_itemId: { orderId, itemId },
      },
    });

    res.json({ message: 'Order item deleted successfully', orderItem });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.status(500).json({ error: 'Failed to delete order item' });
  }
};
