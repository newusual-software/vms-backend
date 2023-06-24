const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const adminRoutes = require('./routes/adminRoutes');


mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());


// Routes
app.use('/api/admin', adminRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
