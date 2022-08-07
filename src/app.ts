import axios from "axios";
import { config } from "src/config/config";
import { Telegraf } from "telegraf";

const bot = new Telegraf(config.BOT_TOKEN);

let interval: NodeJS.Timer | undefined = undefined;

const isSlotAvailable = async (): Promise<string> => {
  try {
    console.time();
    const headers = JSON.parse(config.HEADERS);
    const { data } = await axios.get(config.URL, { headers: headers });
    console.timeEnd();

    const lastSlot =
      Object.keys(data.slots_data).sort().at(-1)?.toString() || "";

    if (lastSlot !== "2022-08-18") {
      return lastSlot;
    } else {
      return "";
    }
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      console.error(error);
      return "unknown error";
    }
  } finally {
  }
};

bot.command(["ping", "start", "stop", "status"], (ctx) => {
  if (ctx.message.from.id !== config.USER_ID) {
    return;
  }

  if (ctx.message.text === "/ping") {
    ctx.reply("pong");
  } else if (ctx.message.text === "/start") {
    if (!interval) {
      ctx.reply("started");
      interval = setInterval(async () => {
        const result = await isSlotAvailable();
        if (result) {
          ctx.reply(result);
          clearInterval(interval);
        }
      }, 30000);
    }
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
