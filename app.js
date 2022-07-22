import express from "express";
import productRoutes from './api/routes/product.js';
import orderRoutes from './api/routes/orders.js';
const app = express();

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

export default app;