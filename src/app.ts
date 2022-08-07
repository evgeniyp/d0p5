import { chromium } from "playwright";
import { config } from "./config/config";

console.log(config.GREETING);

const main = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://example.com");
  await page.screenshot({ path: "screenshot.png" });
  await browser.close();
  console.log("done");
};

main();
