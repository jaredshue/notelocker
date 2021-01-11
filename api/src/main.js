require("dotenv").config();

const express = require("express");

const config = require("../knexfile.js")[process.env.NODE_ENV];
const database = require("knex")(config);
const app = express();

app.use(express.json());

const SERVER_LISTEN_PORT = 3001;

app.listen(SERVER_LISTEN_PORT, () => {
    console.log(`Server listening at port ${SERVER_LISTEN_PORT}!`);
});
