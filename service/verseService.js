const bibleRegex = require('../model/bibleRegex');
const groupMeService = require('./groupMeService');
const esvProxy = require('../proxy/esvProxy');

function testRegex() { // TODO Delete all this later... EG Write real test cases...
    const regex = new RegExp(bibleRegex.books);
    // console.log(regex);

    const result = regex.exec('Testing for the book of genesis');
    console.log('Regex result', result);

    if (result != null) {
        console.log('Found book: ', result[0]);
    }

    const text = 'In the beginning, God created the heavens and the earth.';
    return text;
}

function sendVerseToGroupMe(req) {
    const message = req.body.text;
    console.log(req.body);
    const response = {};

    const bot = req.query.bot;

    // Gets regex object for all books of the bible
    const regex = new RegExp(bibleRegex.books);

    // Tests against the message
    const result = regex.exec(message.toLowerCase());
    // console.log("Regex result", result)

    if (result != null) {
        // console.log("Found book: ", result[0])

        // 'message' is an object that represents a single GroupMe message.
        // if message contains bible book, and sender is not a bot...
        if (!groupMeService.senderIsBot(req.body)) {
            // Get verse sends the reference and returns the text
            esvProxy.getVerse(message).then((verses) => {
                // console.log(verses)
                const newVerse = verses[0].trim();
                console.log(newVerse);

                groupMeService.reply(newVerse, bot);

                response.status = 200;
                response.data = newVerse;
                return response;
            });
        } else {
            response.status = 200;
            response.data = 'This is a bot';
            return response;
        }
    } else {
        response.status = 200;
        response.data = 'Book is not in the list';
        return response;
    }
}

function getVerses(originVerse) {
    let verses = '';
    let verse = '';
    for (verse in esvProxy.getVerse(originVerse)) {
        verses += verse.strip();
    }
    return verses;
}

module.exports = {
    testRegex,
    sendVerseToGroupMe,
    getVerses,
};
