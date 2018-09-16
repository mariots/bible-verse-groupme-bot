const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const axios = require('axios')

const bot_id = "REPLACE THIS WITH YOUR BOT ID ONCE BOT IS ADDED TO THE CHAT"

app.use(express.json());

app.get('/', (req, res) => res.send('In the beginning, God created the heavens and the earth.'))

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

    let books = ['genesis', 
                'exodus',
                'leviticus',
                'numbers',
                'deuteronomy',
                'joshua',
                'judges',
                'ruth',
                '1 samuel',
                '2 samuel',
                '1 kings',
                '2 kings',
                '1 chronicles',
                '2 chronicles',
                'ezra',
                'nehemiah',
                'esther',
                'job',
                'psalms',
                'proverbs',
                'ecclesiastes',
                'song of solomon',
                'isaiah',
                'jeremiah',
                'lamentations',
                'ezekiel',
                'daniel',
                'hosea',
                'joel',
                'amos',
                'obadiah',
                'jonah',
                'micah',
                'nahum',
                'habakkuk',
                'zephaniah',
                'haggai',
                'zechariah',
                'malachi',
                'matthew',
                'mark',
                'luke',
                'john',
                'acts',
                'romans',
                '1 corinthians',
                '2 corinthians',
                'galatians',
                'ephesians',
                'philippians',
                'colossians',
                '1 thessalonians',
                '2 thessalonians',
                '1 timothy',
                '2 timothy',
                'titus',
                'philemon',
                'hebrews',
                'james',
                '1 peter',
                '2 peter',
                '1 john',
                '2 john',
                '3 john',
                'jude',
                'Revelation',
                'samuel',
                'kings',
                'chronicles',
                'corinthians',
                'thessalonians',
                'timothy',
                'peter',
                'john']

    // TODO search all pieces of text in string, find bible books and pull them out
    let splitMessage = message.split(" ")
    console.log(splitMessage)

    // After we find the bible books, find the verses with it relative to all the other text

    let foundBook = books.includes(splitMessage[0]) || books.includes(splitMessage[1])
    console.log("found book: ", foundBook)

    if (foundBook) {
        console.log("Bible book is in the list")
    }

    // 'message' is an object that represents a single GroupMe message.
    if (!sender_is_bot(req.body) && foundBook) { // if message contains bible book, and sender is not a bot...
        
        // console.log(verse)

        getVerse(message).then(function(verses) {

            // console.log(verses)
            let newVerse = verses[0].trim()
            console.log(newVerse)

            //reply(verses)

            return res.status(200).send(newVerse)
        })
    } else {
        return res.status(200).send('OK')
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

function reply(msg) {
    const url = 'https://api.groupme.com/v3/bots/post'

    data = {
        'bot_id': bot_id,
        'text': msg
    }

    return new Promise(function(resolve, reject) {
        axios.post(url, data)
            .then(function (res) {
                // console.log("axios response: ", res.data)
                // console.log("axios response: ", res)
                // console.log("VERSE BABAY")
                //console.log(res.data.passages)
                resolve(res)
            }).catch(function (err) {
                // console.log("axios error: ", err.response)
                console.log("failed", err)
            })
    })

}

// # Send a message in the groupchat
// def reply(msg):
// 	
// 	data = {
// 		'bot_id'		: bot_id,
// 		'text'			: msg
// 	}

// 	urllib3.disable_warnings()
// 	http = urllib3.PoolManager()
// 	r = http.request('POST',
// 					url,
// 					fields=data)

// 	return json.loads(r.data.decode('utf-8'))
	

// # Send a message with an image attached in the groupchat
// def reply_with_image(msg, imgURL):
// 	url = 'https://api.groupme.com/v3/bots/post'
// 	urlOnGroupMeService = upload_image_to_groupme(imgURL)
// 	data = {
// 		'bot_id'		: bot_id,
// 		'text'			: msg,
// 		'picture_url'	: urlOnGroupMeService
// 	}
// 	request = Request(url, urlencode(data).encode())
// 	json = urlopen(request).read().decode()
	
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