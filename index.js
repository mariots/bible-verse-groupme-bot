const express = require('express');
const verseResource = require('./resource/verseResource');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(verseResource); // Declare routes

app.listen(PORT, () => console.log(`Bible Verse GroupMe Bot is running on port ${PORT}!`));