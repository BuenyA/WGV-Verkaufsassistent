'use strict';

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const utils = require("./utils/utils.js")
const openai = require("./neuronal_models/openai/openaiAssistant.js")

const consolelog = true;

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
        console.log("Database connected and works with server.js");
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
    
    var userMessage = req.body.userMessage;
    var threadResults;
    var messageResults;
    var gptAnswer = [];
    var gptAnswerString = "";
    var offer = false;
    var manualChatbot = false;

    if(consolelog) {
        console.log("user > " + userMessage);
    }

    try {
        threadResults = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM `THREADS` ORDER BY timestamp DESC LIMIT 1", function (error, results, fields) {
                if (error) {
                    return reject(error);
                } else {
                    if(consolelog) {
                        console.log("FIRST SELECT");
                    }
                }
                resolve(results);
            });
        });

        messageResults = await new Promise((resolve, reject) => {
            connection.query("SELECT USER, PRODUCT FROM `PROTOKOLL` WHERE THREAD_ID = '" + threadResults[0]['THREAD_ID'] + "' AND USER != 'USER' ORDER BY timestamp DESC LIMIT 1", function (error, results, fields) {
                if (error) {
                    return reject(error);
                } else {
                    if(consolelog) {
                        console.log("SECOND SELECT");
                    }
                }
                resolve(results);
                if(consolelog) {
                    console.log(results);
                }
            });
        });

        connection.query("INSERT INTO `PROTOKOLL` (`THREAD_ID`, `USER`, `MESSAGE`) VALUES ('" + threadResults[0]['THREAD_ID'] + "', 'USER', '" + userMessage + "')", function (error, results, fields) {
            if (error) {
                console.error(error);
            } else {
                if(consolelog) {
                    console.log("FIRST INSERT");
                }
            }
        });

        if (messageResults.length > 0) {
            if (messageResults[0]['USER'] === "MANUAL_CHATBOT") {
                if (messageResults[0]['PRODUCT'] === "moped" || messageResults[0]['PRODUCT'] === "haftpflicht") {
                    await sleep(1000);
                    var chatbotType = "MANUAL_CHATBOT";
                    gptAnswer = await utils.manualChatbot(messageResults[0]['PRODUCT'], threadResults[0]['THREAD_ID'], false, userMessage);
                    gptAnswerString = gptAnswer[0].join("");
                    if (gptAnswer[1] === true) {
                        chatbotType = "CHATBOT";
                    }
                    gptAnswer = gptAnswer[0];
                    connection.query("INSERT INTO `PROTOKOLL` (`THREAD_ID`, `USER`, `MESSAGE`, `PRODUCT`) VALUES ('" + threadResults[0]['THREAD_ID'] + "', '" + chatbotType + "', '" + gptAnswerString + "', '" + messageResults[0]['PRODUCT'] + "')", function (error, results, fields) {
                        if (error) {
                            console.error(error);
                        } else {
                            if(consolelog) {
                                console.log('Success answer: ', results);
                            }
                        }
                    });
                    manualChatbot = true;
                    if(consolelog) {
                        console.log("True Manual_Chatbot");
                    }
                }
            }
        }

        if (!manualChatbot) {
            gptAnswer = await openai.requestGPT(userMessage, threadResults[0]['THREAD_ID']);
            if(consolelog) {
                console.log(gptAnswer);
            }
            gptAnswerString = gptAnswer.join("");
            if(consolelog) {
                console.log(gptAnswerString);
            }
            offer = utils.searchInitiationWord(gptAnswerString);
            if(consolelog) {
                console.log(offer);
            }
            
            if(offer[0] == true) {
                gptAnswer = await utils.manualChatbot(offer[1], threadResults[0]['THREAD_ID'], true);
                gptAnswerString = gptAnswer[0].join("");
                gptAnswer = gptAnswer[0];

                connection.query("INSERT INTO `PROTOKOLL` (`THREAD_ID`, `USER`, `MESSAGE`, `PRODUCT`) VALUES ('" + threadResults[0]['THREAD_ID'] + "', 'MANUAL_CHATBOT', '" + gptAnswerString + "', '" + offer[1] + "')", function (error, results, fields) {
                    if (error) {
                        console.error(error);
                    } else {
                        if(consolelog) {
                            console.log('Success answer: ', results);
                        }
                    }
                });
            } else {
                connection.query("INSERT INTO `PROTOKOLL` (`THREAD_ID`, `USER`, `MESSAGE`) VALUES ('" + threadResults[0]['THREAD_ID'] + "', 'CHATBOT', '" + gptAnswerString + "')", function (error, results, fields) {
                    if (error) {
                        console.error(error);
                    } else {
                        if(consolelog) {
                            console.log('Success answer: ', results);
                        }
                    }
                });
            }
        }

        if(gptAnswer.indexOf("\nfile_search\n\n") !== -1) {
            gptAnswer[gptAnswer.indexOf("\nfile_search\n\n")] = "";
        }

        let positions = gptAnswer
                .map((element, index) => ({ elementIndex: index, charIndex: element.indexOf('【') }))
                .filter(position => position.charIndex !== -1);

        if(positions.length > 0) {
            positions.forEach(element => {
                gptAnswer[element['elementIndex']] = "";
            });
        }

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