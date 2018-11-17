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

    
    let message = req.body.text;
    console.log(req.body);

    let bot = req.query.bot;

    // Gets regex object for all books of the bible
    let regex = new RegExp(bibleRegex.books);

    // Tests against the message
    let result = regex.exec(message.toLowerCase());
    // console.log("Regex result", result)

    if(result != null) {
        // console.log("Found book: ", result[0])

        // 'message' is an object that represents a single GroupMe message.
        if (!sender_is_bot(req.body)) { // if message contains bible book, and sender is not a bot...
            
            // Get verse sends the reference and returns the text
            getVerse(message).then(function(verses) {

                // console.log(verses)
                let newVerse = verses[0].trim();
                console.log(newVerse);

                reply(newVerse, bot);

                return res.status(200).send(newVerse);
            })
        } else {
            return res.status(200).send('This is a bot');
        }

    } else {
        return res.status(200).send('Book is not in the list');
    }
});

app.get('/verse/<string:verse>', (req, res) => {
    verses = '';
    for (verse in getVerse(verse)) {
        verses = verses + verse.strip();
    }

	res.send(verses);
});

function getVerse(message) {

    const API_URL = 'https://api.esv.org/v3/passage/text';
    
    const params = {
        'q': message,
        'include-headings': false,
        'include-footnotes': false,
		'indent-poetry': false,
		'indent-poetry-lines': 1,
        'include-verse-numbers': false,
		'indent-paragraphs': 1,
        'include-short-copyright': false,
		'include-footnote-body': false,
        'include-passage-references': false,
		'include-passage-horizontal-lines': false,
		'include-heading-horizontal-lines': false,
        'horizontal-line-length': 1000
    }

    const config = {
        headers: {
            'Content-Type':'application/json', 
            'Authorization':'Token 70db78fe664b4a05bd20f3322143dabb3660656c'
        },
        params: params
    }

    return new Promise(function(resolve, reject) {
        axios.get(API_URL, config)
            .then(function (res) {
                // console.log("axios response: ", res.data)
                // console.log("axios response: ", res)
                // console.log("VERSE BABAY")
                // console.log(res.data.passages)
                resolve(res.data.passages);
            }).catch(function (err) {
                // console.log("axios error: ", err.response)
                console.log("failed", err);
            })
    })
}

// Checks whether the message sender is a bot
function sender_is_bot(message) {
    return message['sender_type'] == "bot";
}

function reply(msg, bot_id) {
    const url = 'https://api.groupme.com/v3/bots/post';

    const data = {
        'bot_id': bot_id,
        'text': msg
    }

    return new Promise(function(resolve, reject) {
        axios.post(url, data)
            .then(function (res) {
                // console.log("axios response: ", res.data)
                // console.log("axios response: ", res)
                // console.log("VERSE BABAY")
                console.log(bot_id);
                console.log(msg);
                resolve(res);
            }).catch(function (err) {
                // console.log("axios error: ", err.response)
                console.log("failed", err);
            })
    })
}

module.exports = app;