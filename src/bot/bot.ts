import { Telegraf } from "telegraf";
import { getConfig } from "../config/config";
import { abstractLogger } from "../logger/logger";
import { makeScreenshot } from "../playwright/playwright";

const logger = abstractLogger.child({ name: "bot" });

export const getBot = () => {
  const favoriteUserId = getConfig().BOT_FAVORITE_USER_ID;
  const bot = new Telegraf(getConfig().BOT_TOKEN);

  // Enable graceful stop
  process.once("SIGINT", () => {
    bot.stop("SIGINT");
  });
  process.once("SIGTERM", () => {
    bot.stop("SIGTERM");
  });

  bot.use(async (ctx, next) => {
    if (ctx.message?.from?.id === favoriteUserId) {
      await next();
    } else {
      logger.warn("Ignoring message from non-favorite user");
    }
  });

  bot.command("screenshot", async (ctx) => {
    const secondParameter = ctx.message.entities?.[1];
    if (secondParameter?.type === "url") {
      let address = ctx.message.text.substring(
        secondParameter.offset,
        secondParameter.offset + secondParameter.length
      );

      if (!address.startsWith("http")) {
        address = "https://" + address;
      }
      ctx.reply(`Taking screenshot of ${address}`);

      try {
        const buffer = await makeScreenshot(address);
        ctx.replyWithPhoto({ source: buffer });
      } catch (error) {
        logger.error(error, "Something went wrong during screenshot");
        ctx.reply("Error");
      }
    }
  });

  return bot;
};
