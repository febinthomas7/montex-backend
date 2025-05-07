require("dotenv").config();
require("./Models/db");

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const AuthRouter = require("./Routes/AuthRouter");

const corsOptions = {
  origin: process.env.BASE_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  // Corrected from "method" to "methods"
};
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/auth", AuthRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
