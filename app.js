const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require("cookie-parser")
const errorHandler = require("./middlewares/error")
const cors = require("cors")

// import route
const userRoute = require('./routes/user');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser({
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // Set the expiration to one day from now
}));
app.use(cors())

// Route middleware
app.use('/api', userRoute);

app.use(errorHandler)

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
