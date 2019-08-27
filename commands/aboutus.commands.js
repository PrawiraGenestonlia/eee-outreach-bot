function aboutus(bot) {
  bot.command('aboutus', (ctx) => {
    ctx.replyWithMarkdown(`We are a group of students and staff from the Outreach Committee. You might have seen some of us around during our outreach events! 
This bot is a platform for you to ask us any questions that you have regarding NTUEEE or even NTU school life in general! We will try our best to answer your questions in the fastest way possible!`);
  });
}

module.exports = aboutus;