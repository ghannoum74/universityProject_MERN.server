const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { WebModel, validationForm } = require("./models/webSchema");
const cors = require("cors");
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_STRING;

// Allow requests from your Netlify front-end

app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://main--universityprojectofficial.netlify.app",
      "https://universityproject-mern-server.onrender.com",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// app.use(cors());

app.use(express.json());

//connect to data-base
mongoose
  .connect(connectionString)
  .then(() => console.log("data base login successfuly..."))
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
  console.log("Incoming request data:", req.body); // Log request data

  const { error } = validationForm.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const webInstance = new WebModel(req.body);
  webInstance
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.error("Error saving to database:", err.message); // Log the error message
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port} using express...`);
});
