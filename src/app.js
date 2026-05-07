const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./modules/auth/auth.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bidaea API is running"
  });
});


app.use("/api/v1/auth", authRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

module.exports = app;
