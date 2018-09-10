# RESOURCE: http://www.apnorton.com/blog/2017/02/28/How-I-wrote-a-Groupme-Chatbot-in-24-hours/


# IMPORTS
import os
import json
import urllib3
from flask import Flask, request
from pprint import pprint

app = Flask(__name__)
bot_id = "REPLACE THIS WITH YOUR BOT ID ONCE BOT IS ADDED TO THE CHAT"

# Called whenever the app's callback URL receives a POST request
# That'll happen every time a message is sent in the group
@app.route('/', methods=['POST'])
def webhook():
	# 'message' is an object that represents a single GroupMe message.
	message = request.get_json()

	verses = ''
	for verse in getVerse(message):
		verses = verses + verse.strip()

	reply(verses)

	return "ok", 200


def getVerse(message):
	headers = {'content-type':'application/json', 
				'Authorization':'Token 2981cf218fa90ffb3a422350cc586275b4617213'}

	API_URL = 'https://api.esv.org/v3/passage/text/'
	
	params = {
        'q': message,
        'include-headings': False,
        'include-footnotes': False,
		'indent-poetry': False,
		'indent-poetry-lines': 1,
        'include-verse-numbers': False,
		'indent-paragraphs': 1,
        'include-short-copyright': False,
		'include-footnote-body': False,
        'include-passage-references': False,
		'include-passage-horizontal-lines': False,
		'include-heading-horizontal-lines': False,
		'horizontal-line-length': 1000
    }

	urllib3.disable_warnings()
	http = urllib3.PoolManager()
	r = http.request('GET',
					API_URL,
					fields=params,
					headers=headers)

	res = json.loads(r.data.decode('utf-8'))

	return res['passages']

################################################################################

# Send a message in the groupchat
def reply(msg):
	url = 'https://api.groupme.com/v3/bots/post'
	data = {
		'bot_id'		: bot_id,
		'text'			: msg
	}

	urllib3.disable_warnings()
	http = urllib3.PoolManager()
	r = http.request('POST',
					url,
					fields=data)

	return json.loads(r.data.decode('utf-8'))
	

# Send a message with an image attached in the groupchat
def reply_with_image(msg, imgURL):
	url = 'https://api.groupme.com/v3/bots/post'
	urlOnGroupMeService = upload_image_to_groupme(imgURL)
	data = {
		'bot_id'		: bot_id,
		'text'			: msg,
		'picture_url'	: urlOnGroupMeService
	}
	request = Request(url, urlencode(data).encode())
	json = urlopen(request).read().decode()
	
# Uploads image to GroupMe's services and returns the new URL
def upload_image_to_groupme(imgURL):
	imgRequest = requests.get(imgURL, stream=True)
	filename = 'temp.png'
	postImage = None
	if imgRequest.status_code == 200:
		# Save Image
		with open(filename, 'wb') as image:
			for chunk in imgRequest:
				image.write(chunk)
		# Send Image
		headers = {'content-type': 'application/json'}
		url = 'https://image.groupme.com/pictures'
		files = {'file': open(filename, 'rb')}
		payload = {'access_token': 'eo7JS8SGD49rKodcvUHPyFRnSWH1IVeZyOqUMrxU'}
		r = requests.post(url, files=files, params=payload)
		imageurl = r.json()['payload']['url']
		os.remove(filename)
		return imageurl

# Checks whether the message sender is a bot
def sender_is_bot(message):
	return message['sender_type'] == "bot"
