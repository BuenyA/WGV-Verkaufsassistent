'use strict';

const express = require('express');

// CORS handling package, to allow http requests for the client
const cors = require('cors');

// Database MariaDB
const mysql = require('mysql');

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

// Check the connection   // 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error; // <- this will throw the error and exit normally
    // check the solution - should be 2
    if (results[0].solution == 2) {
        // everything is fine with the database
        console.log("Database connected and works");
    } else {
        // connection is not fine - please check
        console.error("There is something wrong with your database connection! Please check");
        process.exit(5); // <- exit application with error code e.g. 5
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

app.post('/api/v1/getBotMessage', (req, res) => {
    var userMessage = req.body.userMessage;
    // connection.query("SELECT AKTIE_NAME FROM `AKTIE` WHERE AKTIE_TICKERSYMBOL = '" + req.params.stockSymbol + "'", function (error, results, fields) {
    //     if (error) {
    //         console.error(error);
    //         res.status(500).json(error);
    //     } else {
    //         console.log('Success answer from DB: ', results);
    //         res.status(200).json(results);
    //     }
    // });
    res.status(200).json({ botMessage: "Was diese: " + userMessage + "?" });
});

// Start the actual server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Start database connection
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}