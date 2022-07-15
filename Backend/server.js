require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const users = require("./router/users");
const listings = require("./router/listings")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB(process.env.MONGODB_URI);

app.use("/users", users); // {{server}}/users/
app.use("/listings", listings) // {{server}}/listings/

const PORT = process.env.PORT || 5001;
app.listen(PORT);
