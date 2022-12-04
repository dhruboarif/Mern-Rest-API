
const express = require('express');
const app = new express();
const cors = require("cors");
const { readdirSync } = require('fs')

const mongoose = require("mongoose");
require('dotenv').config()


app.use(cors());
app.use(express.json());



const MONGO_URI = process.env.MONGO_URI;


// Connecting to the database
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });


//Routing Implement
const aa = readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)));


module.exports = app; 