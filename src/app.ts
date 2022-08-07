import { config } from "src/config/config";
import { Telegraf } from "telegraf";

const bot = new Telegraf(config.BOT_TOKEN);

let interval: NodeJS.Timer | undefined = undefined;

bot.command(["ping", "start", "stop", "status"], (ctx) => {
  if (ctx.message.from.id !== config.USER_ID) {
    return;
  }

  if (ctx.message.text === "/ping") {
    ctx.reply("pong");
  } else if (ctx.message.text === "/start") {
    ctx.reply("started");
    interval = setInterval(() => {
      ctx.reply(".");
    }, 30000);
  } else if (ctx.message.text === "/stop") {
    ctx.reply("stopped");
    clearInterval(interval);
  } else if (ctx.message.text === "/status") {
    ctx.reply(interval ? "running" : "stopped");
  }
});

bot.on("text", (ctx) => {
  if (ctx.message.from.id !== config.USER_ID) {
    return;
  }

  ctx.reply(
    `Hello ${ctx.message.from.username || ctx.message.from.first_name}`
  );
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
