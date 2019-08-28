require('dotenv').config()

function unreplied(bot, unreplied_people) {
  bot.command('unreplied', (ctx) => {
    if (ctx.update.message.chat.id == process.env.OUTREACH_GROUP_ID) {
      if (unreplied_people.length) {
        ctx.reply("List of unreplied individuals").then(() => {
          unreplied_people.map((unreplied_people, index) => { ctx.reply(index + 1 + ". " + unreplied_people.name) });
        }
        ).catch(err => { console.log(err) });
      }
      else {
        ctx.reply("There is no unreplied message");
      }
    }
  });
}

module.exports = unreplied;