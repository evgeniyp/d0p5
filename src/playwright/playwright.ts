import { chromium } from "playwright";
import { abstractLogger } from "../logger/logger";

const logger = abstractLogger.child({ name: "playwright" });

export const playwright = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://example.com");
  await page.screenshot({ path: "screenshot.png" });
  await browser.close();
  logger.info("Done");
};
