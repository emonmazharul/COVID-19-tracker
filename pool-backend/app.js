require("./db/connection");
const express = require("express");
const path = require("path");
const cors = require("cors");
const poolRouter = require("./router/poolRouter");
const clientRouter = require("./router/clientRouter");

const app = express();
const publicPath = path.join(__dirname, "../", "client", "dist");

app.use(express.static(publicPath));
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(poolRouter);
app.use(clientRouter);

module.exports = app;
