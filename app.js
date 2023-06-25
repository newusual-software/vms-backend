const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error")

// import route
const visitorRoute = require('./routes/visitor');
const adminRoutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');


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
app.use(bodyParser.json());


// Routes
app.use('/api/admin', adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api", visitorRoute);

app.use(errorHandler);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
