const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Connect MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define Routes

//Maleen
app.use("/api/vehicleOwner", require("./routes/api/vehicleOwner"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.use("/api/products", require("./routes/api/products"));
app.use("/api/inquiries", require("./routes/api/inquiries"));
app.use("/api/cardpayments", require("./routes/api/cardpayments"));
app.use("/api/invoice", require("./routes/api/invoice"));
app.use("/api/rentalVehicles", require("./routes/api/rentalVehicles"));

//chamiG
app.use('/api/jobs', require('./routes/api/jobRoutes'));
app.use('/api/candidates', require('./routes/api/candidateRoutes'));
app.use('/api/advertisements', require('./routes/api/advertisementRoutes'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
