function sticker(bot) {
  bot.on('sticker', (ctx) => ctx.reply('👍'));
}
module.exports = sticker;