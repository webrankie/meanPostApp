const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/user");

const app = express();

const uri = "mongodb+srv://316clouds:Ak03170110Kz42@cluster1.ygvxdmz.mongodb.net/node-angular?appName=Cluster1";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use("/api/posts", postsRoutes);
app.use("/api/user", usersRoutes);

module.exports = app;
