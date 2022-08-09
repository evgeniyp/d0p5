import { bootstrap } from "./bootstrap/bootstrap";
import { getBot } from "./bot/bot";
import { abstractLogger } from "./logger/logger";

bootstrap();
const logger = abstractLogger.child({ name: "app" });
logger.info("App started");

getBot().launch();
