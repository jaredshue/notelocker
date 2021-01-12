const knex = require("knex");

const config = require("../knexfile.js");
const environment = process.env.NODE_ENV || "test";

module.exports = knex(config[environment]);
