
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