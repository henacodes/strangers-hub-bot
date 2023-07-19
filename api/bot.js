import { Bot, session, webhookCallback } from "grammy";
import dotenv from "dotenv";
import {
  initialState,
  extractParams,
  postChannel,
  generateTags,
} from "./utills.js";

// load environments
dotenv.config();

// connect to the bot
const bot = new Bot(process.env.BOT_TOKEN);

const channelID = process.env.CHANNEL_ID;

// create a session
bot.use(session({ initial: initialState }));

bot.command("start", (ctx) => {
  //console.log(ctx.match);
  ctx.reply(
    "Welcome to <b>strangers-hub</b> bot. \n \n\n To post a post, use /post \n for help /help ",
    {
      parse_mode: "HTML",
    }
  );
});

bot.command("help", (ctx) => {
  ctx.reply(
    'This is <a href="t.me\\/hena_bot_test">strangers hub</a> bot. \n. \n\n You can create anonymous posts with /post \n\n\n you can comment anonyously by clicking on the button below the post.'
  );
});

bot.command("post", (ctx) => {
  ctx.session.task = "post";
  ctx.reply("Give me the title of the post ");
});

bot.on("message:text", async (ctx) => {
  ctx.deleteMessage();
  // check if its in the bot
  if (ctx.chat.type == "private") {
    const { task, title, content, comment, postToReply, tags } = ctx.session;
    const { text } = ctx.message;
    if (task === "post") {
      if (title && content == null) {
        ctx.session.content = text;
        ctx.reply("give me some tags, comma separated ()");
      } else if (title && content && tags == null) {
        const tag = generateTags(text);
        const post = `<b>${title}</b>\n\n${content}\n\n ${tag} `;
        const channel = await ctx.api.getChat(channelID);
        await bot.api.sendMessage(channel.id, post, {
          parse_mode: "HTML",
        });
        ctx.reply("posted✅✅");
        ctx.session = initialState();
        // set  tags and post to the channels
      } else {
        ctx.session.title = text;
        ctx.reply("Now, give me the content of your post");
      }
    } else {
      ctx.reply("What is the text for? \n if you want post click /post");
    }
    // the below code works for for messages in a group
  } else {
    //check if its a reply to a message
    if (ctx.message.reply_to_message) {
      // delete the message and send the text by the bot
      const originalMessageId = ctx.message.reply_to_message.message_id;
      const replyMessage = ctx.message.text;
      try {
        await ctx.reply(replyMessage, {
          reply_to_message_id: originalMessageId,
        });
      } catch (error) {
        ctx.reply(error.message);
      }
    } else {
      ctx.reply("CAUTION⚠️: this group is only for reply purposes‼️‼️‼️‼️");
    }
  }
});

bot.start();
export default webhookCallback(bot, "http");
