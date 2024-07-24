const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { WebModel, validationForm } = require("./models/webSchema");
const cors = require("cors");
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const connectionString = process.env.CONNECTION_STRING;

//connect to data-base
const maxRetries = 5;
const retryDelay = 5000; // 5 seconds

// Function to connect to MongoDB with retry
function connectWithRetry(retries = 0) {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection successful...");
    })
    .catch((err) => {
      if (retries < maxRetries) {
        console.log(
          `Failed to connect to database. Retrying in ${
            retryDelay / 1000
          } seconds...`
        );
        setTimeout(() => connectWithRetry(retries + 1), retryDelay);
      } else {
        console.error(
          "Max retries reached. Could not connect to the database."
        );
        console.error(err);
        process.exit(1); // Exit the process with failure code
      }
    });
}

// Start the connection attempt
connectWithRetry();
// Allow requests from your Netlify front-end

app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "https://main--universityprojectofficial.netlify.app/",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

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
  const { error } = validationForm.validate(req.body);
  if (error) {
    return error;
  }
  const webInstance = new WebModel(req.body);
  webInstance
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`server is listening on port ${port} using express...`);
});
