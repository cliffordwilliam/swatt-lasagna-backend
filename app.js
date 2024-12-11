import express from 'express';
import personRoutes from './src/routes/personRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

const app = express();

app.use(express.json()); // Middleware for parsing JSON
app.use('/api', personRoutes); // Use the person routes under /api path
app.use('/api', orderRoutes); // Use the order routes under /api path

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
