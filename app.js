require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { globalErrorHandler } = require('./utils/error');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);
app.use(globalErrorHandler);

// health check
app.get("/ping", (req, res) => {
  res.json({ message : "pong" });
});

const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

start()