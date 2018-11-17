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

module.exports = {
    testRegex: testRegex
}