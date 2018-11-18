const bibleRegex = require('../model/bibleRegex');

function testRegex() { // TODO Delete all this later... EG Write real test cases...
    let regex = new RegExp(bibleRegex.books);
    // console.log(regex);

    let result = regex.exec('Testing for the book of genesis');
    console.log('Regex result', result);

    if(result != null) {
        console.log('Found book: ', result[0]);
    }

    let text = 'In the beginning, God created the heavens and the earth.';

    return text;
}

function sendVerseToGroupMe() {

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
}

function getVerses() {
    verses = '';
    for (verse in getVerse(verse)) {
        verses = verses + verse.strip();
    }
    return verses;
}

module.exports = {
    testRegex: testRegex,
    sendVerseToGroupMe: sendVerseToGroupMe,
    getVerses: getVerses
}