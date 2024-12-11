import { prisma } from '../lib/prisma.js';

// GET: Retrieve all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        buyer: true,
        recipient: true,
        deliveryMethod: true,
        payment: true,
        status: true,
      },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

// POST: Create a new order
export const createOrder = async (req, res) => {
  const {
    buyerId,
    recipientId,
    orderDate,
    deliveryDate,
    totalPurchase,
    deliveryMethodId,
    shippingCost,
    grandTotal,
    paymentMethodId,
    statusId,
    note,
  } = req.body;

  if (
    !buyerId ||
    !recipientId ||
    !orderDate ||
    !deliveryDate ||
    !totalPurchase ||
    !deliveryMethodId ||
    !shippingCost ||
    !grandTotal ||
    !paymentMethodId ||
    !statusId
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const order = await prisma.order.create({
      data: {
        buyerId,
        recipientId,
        orderDate: new Date(orderDate),
        deliveryDate: new Date(deliveryDate),
        totalPurchase,
        deliveryMethodId,
        shippingCost,
        grandTotal,
        paymentMethodId,
        statusId,
        note,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// GET: Retrieve an order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        buyer: true,
        recipient: true,
        deliveryMethod: true,
        payment: true,
        status: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
};

// PUT: Update an existing order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    buyerId,
    recipientId,
    orderDate,
    deliveryDate,
    totalPurchase,
    deliveryMethodId,
    shippingCost,
    grandTotal,
    paymentMethodId,
    statusId,
    note,
  } = req.body;

  try {
    const order = await prisma.order.update({
      where: { id },
      data: {
        buyerId,
        recipientId,
        orderDate: orderDate ? new Date(orderDate) : undefined,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
        totalPurchase,
        deliveryMethodId,
        shippingCost,
        grandTotal,
        paymentMethodId,
        statusId,
        note,
      },
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// DELETE: Delete an order by ID
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.delete({
      where: { id },
    });

    res.json({ message: 'Order deleted successfully', order });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
