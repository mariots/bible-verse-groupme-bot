const axios = require('axios');

// Checks whether the message sender is a bot
function senderIsBot(message) {
    return message.sender_type === 'bot';
}

function reply(msg, botId) {
    const url = 'https://api.groupme.com/v3/bots/post';

    const data = {
        'bot_id': botId,
        'text': msg,
    };

    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then((res) => {
                // console.log("axios response: ", res.data)
                // console.log("axios response: ", res)
                // console.log("VERSE BABAY")
                console.log(botId);
                console.log(msg);
                resolve(res);
            }).catch((err) => {
                // console.log("axios error: ", err.response)
                console.log('failed: ', err);
                reject(err);
            });
    });
}

module.exports = {
    senderIsBot,
    reply,
};
