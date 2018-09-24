# Bible Verse GroupMe Bot
When anyone posts a reference to scripture, this bot will go get the scripture reference and message it to the GroupMe account.

My prayer and the purpose for the design of this bot is for people to read more scripture, and allow it to be easily shared. 

# How to use the bot
Currently, in order to use the bot, you must only send a verse with it's chapter/reference. For example the following messages will return the passages from the ESV:

Genesis 1:1 (Gets a single verse)

Ephesians 2:8-10 (Gets a list of verses)

Psalm 1 (Gets a whole chapter)


There is a character limit of 450 characters, so if the verse(s) you posted are longer than that, it will not send the verse.

# Coming Soon
Getting verses out of any message. For example if someone wrote a long message. "This morning I was reading in Psalm 1:1-4, it really encouraged me!". The bot will go and get the whole passage and put in the GroupMe.

Different Versions. Right now we pull scritpure directly from esv.org, so we know it is a verified version. Currently looking for other verified versions.

If you have any ideas or feedback, please email me at: mariotjimenez@gmail.com.

# How to set up the bot
1. Login with your regular GroupMe account at [dev.groupme.com/](https://dev.groupme.com/session/new).
2. After you're logged in, click on "Bots" in the header or click on this link [dev.groupme.com/bots](https://dev.groupme.com/bots).
3. Click on "Create Bot"
4. Use the dropdown to select the group you want to add the bot to.
5. Choose a name for the bot (eg. Jesus, or Gabriel XD)
6. For the Callback URL use the following: 

    https://bible-verse-groupme.herokuapp.com/verse?bot=

7. For the Image ID use the following (It's the app icon of the Bible):

    https://i.groupme.com/200x200.png.d096c3c5571a4124bf675f1b4d4fafbe

8. Click on Submit.
9. After you click submit, it should take you back to the Bots page. Copy the Bot ID of your new bot (its a big long mix of numbers and letters. Ex. 6avga35ab31b51k6bk1b).
10. After you copied that number, click on Edit.
11. It will take you to the Edit Bot page, In the "Callback URL", paste the Bot ID right after the equal sign. 

    Example: If the Bot ID was 6avga35ab31b51k6bk1b, your new Callback URL will look like: 
https://bible-verse-groupme.herokuapp.com/verse?bot=6avga35ab31b51k6bk1b

    **Be sure that there is no space between the equal sign and the Bot ID.
12. Click on submit and try sending a verse, like Genesis 1:1!

