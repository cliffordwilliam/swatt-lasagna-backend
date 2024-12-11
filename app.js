import express from 'express';
import personRoutes from './src/routes/personRoutes.js';

const app = express();

app.use(express.json()); // Middleware for parsing JSON
app.use('/api', personRoutes); // Use the person routes under /api path

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
