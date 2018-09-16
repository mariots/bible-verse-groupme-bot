const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const bot_id = "REPLACE THIS WITH YOUR BOT ID ONCE BOT IS ADDED TO THE CHAT"

app.use(express.json());

app.get('/liveliness', (req, res) => res.send('Alive'))

app.listen(PORT, () => console.log('Example app listening on port 3000!'))
