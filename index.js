const app = require('./api/routes');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Bible Verse GroupMe Bot is running on port ${PORT}!`));