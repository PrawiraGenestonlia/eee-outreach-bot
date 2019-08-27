function start(bot) {
  bot.start((ctx) => {
    // console.log(util.inspect(ctx, false, null, true));
    ctx.reply('Hello! Feel free to ask me any questions. Expect a delay in the reply because I will connect you to our ambassador');
  });
}
module.exports = start;