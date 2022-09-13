const express = require("express");
const compression = require("compression");
const db = require("./db/db").default;
const cors = require("cors");
const rateLimit = require("express-rate-limit");

require("./models/relations");

const dotenv = require("dotenv");
dotenv.config();

const morgan = require("./logging/morgan");

// import routes
const customer = require("./routes/customerRoute");

const app = express();

// connection
app.locals.db = db;

app.set("trust proxy", 1);

const limiter = rateLimit({
    windowMs: process.env.RATE_LIMITTING_TIME, // 15 minutes
    max: process.env.RATE_LIMITTING_MAX,
});

//  apply to all requests

// Middlewares
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(limiter);

// Logging
app.use(morgan);

app.get("/", (req, res) => {
    const timestamp = Math.floor(Date.now() / 1000);
    res.send({ message: "Version 1.0", timestamp });
});

// Mount routes
app.use("/customer", customer);

module.exports = app;