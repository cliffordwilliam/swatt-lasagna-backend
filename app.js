import express from 'express';
import itemRoutes from './src/routes/itemRoutes.js';
import paymentMethodRoutes from './src/routes/paymentMethodRoutes.js';
import orderStatusRoutes from './src/routes/orderStatusRoutes.js';
import deliveryMethodRoutes from './src/routes/deliveryMethodRoutes.js';

const app = express();

app.use(express.json());

// Use the routes
app.use('/api', itemRoutes);
app.use('/api', paymentMethodRoutes);
app.use('/api', orderStatusRoutes);
app.use('/api', deliveryMethodRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
