const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const WebModel = require("./models/webSchema");
dotenv.config();
const port = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_STRING;

const app = express();

//connect to data-base
mongoose
  .connect(connectionString)
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/create", (req, res) => {
  //create new instance from model
  const webInstance = new WebModel({
    Fullname: "abdel rahman ghannoum",
    PhoneNumber: 76316965,
    Email: "abdelramangh@gmail.com",
    Details: "This is a realy great webpage thanks.",
  });
  //save it to data-base
  webInstance
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/all-users", (req, res) => {
  WebModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/each-user", (req, res) => {
  WebModel.findById("664dda555a50c9e67f2a1dd7")
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post("/create-user", (req, res) => {
  const webInstance = new WebModel(req.body);
  webInstance
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`server is listening on port ${port} using express...`);
});
