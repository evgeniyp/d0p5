import { chromium } from "playwright";
import { abstractLogger } from "../logger/logger";

const logger = abstractLogger.child({ name: "playwright" });

export const makeScreenshot = async (address: string) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(address);
  const buffer = await page.screenshot();
  await browser.close();
  return buffer;
};
