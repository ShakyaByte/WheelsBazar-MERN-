require('dotenv').config();
const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5500;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // ✅ Allow frontend origin
  credentials: true, // ✅ Allow cookies and authentication headers
  methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed headers
}));

app.use(express.json()); // ✅ Middleware to parse JSON

// Route for product creation
app.use('/admin', require('./controllers/admin-products')); 

//For authentication (login-signup) For Admins
app.use('/admin', require('./AdminRoutes/Adminauth')); 

//For users authntications
app.use ('/user', require ('./Routes/UserAuth'));

//For products listings 
app.use ('/product', require ('./Routes/ProductRoutes'));


//start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });