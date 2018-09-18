const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const axios = require('axios')
const bibleRegex = require('./bibleRegex')

const marios_bot_id = "6cab5b4f50b68ac9df58f04296"

app.use(express.json());

app.get('/', (req, res) => {
    
    let regex = new RegExp(bibleRegex.books) 
    // console.log(regex);

    let result = regex.exec("Testing for the book of genesis")
    console.log("Regex result", result)

    if(result != null) {
        console.log("Found book: ", result[0])
    }

    res.send('In the beginning, God created the heavens and the earth.')
})

app.get('/test-groupme', (req, res) => {
    reply("In the beginning was the Word, and the Word was with God, and the Word was God.", marios_bot_id)
})

app.get('/bible', (req, res) => {
    res.sendfile("./images/bible.png")
})

app.get('/liveliness', (req, res) => res.send('Alive'))

app.listen(PORT, () => console.log('Example app listening on port 3000!'))

// Called whenever the app's callback URL receives a POST request
// That'll happen every time a message is sent in the group
app.post('/verse', (req, res) => {

    let message = req.body.text
    console.log(req.body)

    let bot = req.query.bot;

    // Gets regex object for all books of the bible
    let regex = new RegExp(bibleRegex.books) 

    // Tests against the message
    let result = regex.exec(message.toLowerCase())
    // console.log("Regex result", result)

    if(result != null) {
        // console.log("Found book: ", result[0])

        // 'message' is an object that represents a single GroupMe message.
        if (!sender_is_bot(req.body)) { // if message contains bible book, and sender is not a bot...
            
            // Get verse sends the reference and returns the text
            getVerse(message).then(function(verses) {

                // console.log(verses)
                let newVerse = verses[0].trim()
                console.log(newVerse)

                reply(newVerse, bot)

                return res.status(200).send(newVerse)
            })
        } else {
            return res.status(200).send('This is a bot')
        }

    } else {
        return res.status(200).send('Book is not in the list')
    }
})

app.get('/verse/<string:verse>', (req, res) => {
    verses = ''
    for (verse in getVerse(verse)) {
        verses = verses + verse.strip()
    }

	res.send(verses)
})

// Checks whether the message sender is a bot
function sender_is_bot(message) {
    return message['sender_type'] == "bot"
}

function getVerse(message) {

    const API_URL = 'https://api.esv.org/v3/passage/text'
    
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
                resolve(res.data.passages)
            }).catch(function (err) {
                // console.log("axios error: ", err.response)
                console.log("failed", err)
            })
    })
}

function reply(msg, bot_id) {
    const url = 'https://api.groupme.com/v3/bots/post'

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
                console.log(bot_id)
                console.log(msg)
                resolve(res)
            }).catch(function (err) {
                // console.log("axios error: ", err.response)
                console.log("failed", err)
            })
    })
}



// # Uploads image to GroupMe's services and returns the new URL
// def upload_image_to_groupme(imgURL):
// 	imgRequest = requests.get(imgURL, stream=True)
// 	filename = 'temp.png'
// 	postImage = None
// 	if imgRequest.status_code == 200:
// 		# Save Image
// 		with open(filename, 'wb') as image:
// 			for chunk in imgRequest:
// 				image.write(chunk)
// 		# Send Image
// 		headers = {'content-type': 'application/json'}
// 		url = 'https://image.groupme.com/pictures'
// 		files = {'file': open(filename, 'rb')}
// 		payload = {'access_token': 'eo7JS8SGD49rKodcvUHPyFRnSWH1IVeZyOqUMrxU'}
// 		r = requests.post(url, files=files, params=payload)
// 		imageurl = r.json()['payload']['url']
// 		os.remove(filename)
// 		return imageurl