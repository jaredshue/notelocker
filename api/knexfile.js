require("dotenv").config();

module.exports = {

    development: {
        client: "pg",
        connection: {
            host: process.env.DEV_DB_HOST,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASSWORD,
            database: process.env.DEV_DB_NAME
        },
        migrations: {
            directory: "./migrations"
        },
        seeds: {
            directory: "./seeds"
        }
    },

    test: {
        client: "pg",
        connection: {
            host: process.env.TEST_DB_HOST,
            user: process.env.TEST_DB_USER,
            password: process.env.TEST_DB_PASSWORD,
            database: process.env.TEST_DB_NAME
        },
        migrations: {
            directory: "./migrations"
        },
        seeds: {
            directory: "./seeds"
        }
    },

    production: {
        client: "pg",
        connection: {
            host: process.env.PROD_DB_HOST,
            user: process.env.PROD_DB_USER,
            password: process.env.PROD_DB_PASSWORD,
            database: process.env.PROD_DB_NAME
        },
        migrations: {
            directory: "./migrations"
        },
        seeds: {
            directory: "./seeds"
        }
    }

};
