function history(bot, unreplied_people) {
  bot.command('history', (ctx) => {
    if (ctx.update.message.chat.id == process.env.OUTREACH_GROUP_ID) {
      for (let i = 0; i < unreplied_people.length; i++) {
        if (unreplied_people[i].name.toLowerCase() == ctx.state.command.person.toLowerCase()) {
          ctx.reply("Unreplied message from " + unreplied_people[i].name + "\n" + unreplied_people[i].message);
        }
        // if (unreplied_people[i].name == ctx.state.command.person) {
        //   ctx.reply("Unreplied message from " + unreplied_people[i].name + "\n" + unreplied_people[i].message);
        // }
        else {
          ctx.reply("There is no unreplied message");
        }
        break;
      }
    }
  });
}

module.exports = history;