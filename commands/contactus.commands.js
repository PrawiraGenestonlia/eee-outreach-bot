function contactus(bot) {
  bot.command('contactus', (ctx) => {
    ctx.replyWithMarkdown(`If your questions have not been answered, *don’t hesitate to drop us an email or call!*
  
📧: eeeundgrad@ntu.edu.sg / cjlaw@ntu.edu.sg
  
☎️: (65) 6790 5367
  
🔗: http://www.eee.ntu.edu.sg/ContactUs/Pages/Home.aspx`);
  });
}

module.exports = contactus;