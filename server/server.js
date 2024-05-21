'use strict';

// Import Libraries
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// Import Subprocesses
const utils = require("./utils/utils.js")
// const openai = require("./neuronal_network/openai.js")
const openai = require("./neuronal_network/openaiAssistant2.js")

// Database connection info (MariaDB) - used from environment variables
var dbInfo = {
    connectionLimit: 10,
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

var connection = mysql.createPool(dbInfo);
console.log("Conecting to database...");

// Check the DB-Connection // 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    if (results[0].solution == 2) {
        console.log("Database connected and works");
    } else {
        console.error("There is something wrong with your database connection! Please check");
        process.exit(5)
    }
});

// Constants for the server connection
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Features for JSON Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS-handling custom settings
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization'
};
app.use(cors(corsOptions));

app.post('/api/v1/getBotMessage', async (req, res) => {
    try {
        var userMessage = req.body.userMessage;
        console.log(userMessage);
        var gptAnswer = await openai.requestGPT(userMessage);

        console.log(gptAnswer);

        // console.log(gptAnswer.message);
        // console.log(gptAnswer.message.content);

        // res.status(200).json({ botMessage: "gptAnswer.message.content" });
        res.status(200).json({ botMessage: gptAnswer });
    } catch (error) {
        console.error("Error in processing request: ", error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Start the actual server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Start database connection
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}