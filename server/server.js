'use strict';

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const utils = require("./utils/utils.js")
const utils_identify_intestion = require("./utils/identify_intestion.js")
// const openai = require("./neuronal_network/openai.js")
const openai = require("./neuronal_models/openai/openaiAssistant.js")

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

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const app = express();

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
        var threadResults;
        var messageResults;
        var gptAnswer = [];
        var gptAnswerString = "";
        var offer = false;

        console.log("user > " + userMessage);

        threadResults = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM `THREADS` ORDER BY timestamp DESC LIMIT 1", function (error, results, fields) {
                if (error) {
                    return reject(error);
                } else {
                    console.log("FIRST SELECT");
                }
                resolve(results);
            });
        });

        connection.query("INSERT INTO `PROTOKOLL` (`THREAD_ID`, `USER`, `MESSAGE`) VALUES ('" + threadResults[0]['THREAD_ID'] + "', 'USER', '" + userMessage + "')", function (error, results, fields) {
            if (error) {
                console.error(error);
            } else {
                console.log("FIRST INSERT");
            }
        });

        gptAnswer = await openai.requestGPT(userMessage, threadResults[0]['THREAD_ID']);

        console.log(gptAnswer);
        
        gptAnswerString = gptAnswer.join("");
        
        console.log(gptAnswerString);

        offer = utils_identify_intestion.searchInitiationWord(gptAnswerString);

        console.log(offer);
        
        if(offer[0] == true) {
            sleep(1000);
            gptAnswer = ["Initialisierung", offer[1]];
        }    

        connection.query("INSERT INTO `PROTOKOLL` (`THREAD_ID`, `USER`, `MESSAGE`) VALUES ('" + threadResults[0]['THREAD_ID'] + "', 'CHATBOT', '" + gptAnswerString + "')", function (error, results, fields) {
            if (error) {
                console.error(error);
            } else {
                console.log('Success answer: ', results);
            }
        });

        res.status(200).json({ botMessage: gptAnswer });
    } catch (error) {
        console.error("Error in processing request: ", error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/v1/createNewThread', async (req, res) => {
    connection.query("INSERT INTO `THREADS` (`THREAD_ID`, `USER`, `TIMESTAMP`) VALUES ('" + await openai.createThread() + "','user', current_timestamp())", function (error, res_buchung, fields) {
        if (error) {
            console.error(error);
            res.status(500).json({ newThreat: false });
        }
        else {
            res.status(200).json({ newThreat: true });
        }
    })
});

// Start the actual server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Start database connection
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}