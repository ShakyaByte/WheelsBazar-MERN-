require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
connectToMongo();

const app = express();
const port = 5500;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Import Routes
app.use('/admin', require('./controllers/admin-products')); //admin control
app.use('/admin/categories', require('./controllers/admin-categories')); //admin control
app.use('/admin', require('./AdminRoutes/Adminauth')); //admin auth
app.use('/user', require('./Routes/UserAuth'));
app.use('/product', require('./Routes/ProductRoutes'));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
