const express = require('express');
const verseService = require('../service/verseService');
const reply = require('../service/groupMeService');

const app = express.Router();

app.get('/', (req, res) => {
    const text = verseService.testRegex();
    res.status(200).send(text);
});

// TODO: This should be moved to a test case.
app.get('/test-groupme', (req, res) => {
    reply('In the beginning was the Word, and the Word was with God, and the Word was God.', process.env.TEST_BOT_ID);
    res.status(200).send('Successful');
});

app.get('/bible', (req, res) => {
    res.sendfile('./images/bible.png');
});

// Called whenever the app's callback URL receives a POST request
// That'll happen every time a message is sent in the group
app.post('/verse', (req, res) => {
    const request = verseService.sendVerseToGroupMe();
    return res.status(request.status).send(request.data);
});

app.get('/verse/<string:verse>', (req, res) => {
    const request = verseService.getVerses();

    res.send(request);
});

module.exports = app;
