const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const axios = require('axios')

const bot_id = "REPLACE THIS WITH YOUR BOT ID ONCE BOT IS ADDED TO THE CHAT"

app.use(express.json());

app.get('/liveliness', (req, res) => res.send('Alive'))

app.listen(PORT, () => console.log('Example app listening on port 3000!'))

// Called whenever the app's callback URL receives a POST request
// That'll happen every time a message is sent in the group
app.post('/verse', (req, res) => {

    // console.log(req.body)

    // 'message' is an object that represents a single GroupMe message.
    if (!sender_is_bot(req.body)) { // if message contains 'groot', ignoring case, and sender is not a bot...
        verse = req.body.message
        // console.log(verse)

        let response = getVerse(verse);
        console.log(response)
        return res.status(500).send(response)
        
        //reply(verses)
        // return res.status(200).send('Message')
    }
    return res.status(200).send('ok')
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

    axios.get(API_URL, config)
    .then(function (res) {
        console.log("axios response: ", res.data)
        console.log("axios response: ", res)
        console.log("VERSE BABAY")
        console.log(res.data.passages)
    }).catch(function (err) {
        // console.log("axios error: ", err.response)
        console.log("failed", err)
        // return 'true'
    })

	// urllib3.disable_warnings()
	// http = urllib3.PoolManager()
	// r = http.request('GET',
	// 				API_URL,
	// 				fields=params,
	// 				headers=headers)

	// res = json.loads(r.data.decode('utf-8'))

	// return res['passages']
}



// # Send a message in the groupchat
// def reply(msg):
// 	url = 'https://api.groupme.com/v3/bots/post'
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