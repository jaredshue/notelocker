require("dotenv").config();

module.exports = {

    development: {
        client: "pg",
        connection: {
            host: process.env.DEV_DB_HOST,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASSWORD,
            database: process.env.DEV_DB_NAME
        }
    },

    production: {
        client: "pg",
        connection: {
            host: process.env.PROD_DB_HOST,
            user: process.env.PROD_DB_USER,
            password: process.env.PROD_DB_PASSWORD,
            database: process.env.PROD_DB_NAME
        }
    }

};
