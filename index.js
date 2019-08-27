const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const util = require('util');
const commandArgsMiddleware = require('./middleware/commandArg.middleware');
const { start, sticker, contactus } = require('./commands');
require('dotenv').config();

const unreplied_people = [];

const bot = new Telegraf(process.env.TELEGRAM_BOT_API);
const telegram = new Telegram(process.env.TELEGRAM_BOT_API, {
  agent: null,        // https.Agent instance, allows custom proxy, certificate, keep alive, etc.
  webhookReply: true  // Reply via webhook
});

bot.use(commandArgsMiddleware());

start(bot);
sticker(bot);
contactus(bot);

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

bot.command('reply', (ctx) => {
  if (ctx.update.message.chat.id == process.env.OUTREACH_GROUP_ID) {
    console.log("reply", ctx.state.command);
    var reply_id = "";
    for (let i = 0; i < unreplied_people.length; i++) {
      if (unreplied_people[i].name.toLowerCase() == ctx.state.command.person.toLowerCase()) {
        reply_id = unreplied_people[i].chatId;
      }
    }
    if (reply_id && ctx.state.command.message) {
      telegram.sendMessage(reply_id, ctx.state.command.message).then().catch(err => { console.log(err) });
    }
  }
});

bot.command('close', (ctx) => {
  if (ctx.update.message.chat.id == process.env.OUTREACH_GROUP_ID) {
    for (let i = 0; i < unreplied_people.length; i++) {
      if (unreplied_people[i].name.toLowerCase() == ctx.state.command.person.toLowerCase()) {
        unreplied_people.splice(i, 1);
        if (unreplied_people.length) {
          ctx.reply("List of unreplied individuals").then(() => {
            unreplied_people.map((unreplied_people, index) => { ctx.reply(index + 1 + ". " + unreplied_people.name) });
          }
          ).catch(err => { console.log(err) });
        }
        else {
          ctx.reply("There is no unreplied message");
        }
        break;
      }
    }
  }
});

bot.command('status', (ctx) => {
  if (ctx.update.message.chat.id == process.env.OUTREACH_GROUP_ID) {
    ctx.reply("I am healthy");
  }
});

bot.command('history', (ctx) => {
  if (ctx.update.message.chat.id == process.env.OUTREACH_GROUP_ID) {
    for (let i = 0; i < unreplied_people.length; i++) {
      if (unreplied_people[i].name.toLowerCase() == ctx.state.command.person.toLowerCase()) {
        ctx.reply("Unreplied message from " + unreplied_people[i].name + "\n" + unreplied_people[i].message);
      }
      else {
        ctx.reply("There is no unreplied message");
      }
      break;
    }
  }
});

bot.command('fullhistory', (ctx) => {
  if (ctx.update.message.chat.id == process.env.OUTREACH_GROUP_ID) {
    ctx.reply("Full history: " + JSON.stringify(unreplied_people));
  }
});

bot.hears((ctx) => { return true }, (ctx) => {
  // ctx.reply("I have forwarded your message to the ambassadors.");
  console.log(util.inspect(ctx, false, null, true));
  // console.log("~~~~~ Bot hears sth ~~~~");
  if (ctx.update.message.from.id != process.env.OUTREACH_BOT_ID && ctx.update.message.chat.id != process.env.OUTREACH_GROUP_ID) {
    let new_query = { name: ctx.update.message.from.first_name, chatId: ctx.update.message.from.id, message: [] };
    let new_income_message = new_query;
    let new_message = "";
    if (ctx.update) {
      if (ctx.update.message) {
        if (ctx.update.message.text) {
          new_income_message.message.push(ctx.update.message.text);
          new_message = ctx.update.message.text;
        }
      }
    }
    let hasFound = false;
    for (var i = 0; i < unreplied_people.length; i++) {
      if (unreplied_people[i].chatId === ctx.update.message.from.id) {
        unreplied_people[i].message.push(new_message);
        hasFound = true;
        break;
      }
    }
    if (!hasFound) {
      unreplied_people.push(new_income_message);
    }
    telegram.forwardMessage(process.env.OUTREACH_GROUP_ID, ctx.update.message.from.id, ctx.update.message.message_id)
      .then()
      .catch(err => { console.log(err) });
  }
});

bot.launch();