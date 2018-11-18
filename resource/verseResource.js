const express = require('express');
const axios = require('axios');
const verseService = require('../service/verseService');

let app = express.Router();

app.get('/', (req, res) => {
    let text = verseService.testRegex();
    res.status(200).send(text);
});

app.get('/test-groupme', (req, res) => {
    reply("In the beginning was the Word, and the Word was with God, and the Word was God.", process.env.TEST_BOT_ID);
    res.status(200).send('Successful');
});

app.get('/bible', (req, res) => {
    res.sendfile("./images/bible.png");
});

// Called whenever the app's callback URL receives a POST request
// That'll happen every time a message is sent in the group
app.post('/verse', (req, res) => {
    let request = verseService.sendVerseToGroupMe();
    return res.status(request.status).send(request.data);
});

app.get('/verse/<string:verse>', (req, res) => {
    let request = verseService.

	res.send(verses);
});

module.exports = app;