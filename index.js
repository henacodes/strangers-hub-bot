import { Bot, session } from "grammy";
import dotenv from "dotenv";
import { initialState, extractParams, postChannel } from "./utills.js";

// load environments
dotenv.config();

// connect to the bot
const bot = new Bot(process.env.BOT_TOKEN);

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
  const { task, title, content, comment } = ctx.session;
  if (task === "post") {
    if (ctx.session.title && ctx) {
      ctx.reply("Now, give me the content of the post");
    }
  } else if (task === "comment") {
    ctx.reply("comment state");
  } else {
    ctx.reply(
      "What did you send the text for? \n if you want post click /post"
    );
  }
});

bot.start();
