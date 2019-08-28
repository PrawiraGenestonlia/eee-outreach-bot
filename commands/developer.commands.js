function developer(bot) {
  bot.command('developer', (ctx) => {
    ctx.replyWithMarkdown("You can obtain the source code by \
```sh\
 $ git clone https://github.com/PrawiraGenestonlia/eee-outreach-bot\n\
$ cd eee-outreach-bot\n\
$ npm install\n\
$ touch .env \
```\
Then you can edit the .env with three parameters:\
```sh\
 TELEGRAM_BOT_API = XXXXXX:XXXXXXXXXXXXXXXX\n\
OUTREACH_GROUP_ID = XXXXXXXX\n\
OUTREACH_BOT_ID = XXXXXXXX\
```\
Save the file and once you are ready, you can always start the server by running\
```sh\
 npm run server\
```");
  });
}

module.exports = developer;