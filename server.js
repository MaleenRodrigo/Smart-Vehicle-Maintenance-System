const express = require('express');
const connectDB = require('./config/db')

const app = express();

// Connect MongoDB
connectDB();

app.get('/', (req, res) => res.send('API running'));

// Define Routes
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/inquiries', require('./routes/api/inquiries'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));