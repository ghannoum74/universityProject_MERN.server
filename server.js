const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const WebModel = require("./models/webSchema");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_STRING;

const app = express();

app.use(express.json());

// Allow requests from your Netlify front-end
const allowedOrigins = ["https://universityprojectofficial.netlify.app/"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

//connect to data-base
mongoose
  .connect(connectionString)
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/allUsers", (req, res) => {
  WebModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/eachUser", (req, res) => {
  WebModel.findById("664dda555a50c9e67f2a1dd7")
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.post("/create", (req, res) => {
  const webInstance = new WebModel(req.body);
  webInstance
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`server is listening on port ${port} using express...`);
});
