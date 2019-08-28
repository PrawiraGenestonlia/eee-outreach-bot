function status(bot) {
  bot.command('status', (ctx) => {
    if (ctx.update.message.chat.id == process.env.OUTREACH_GROUP_ID) {
      ctx.reply("I am healthy");
    }
  });
}

module.exports = status;