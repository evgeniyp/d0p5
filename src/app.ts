import { bootstrap } from "./bootstrap/bootstrap";
import { abstractLogger } from "./logger/logger";
import { playwright } from "./playwright/playwright";

bootstrap();

const logger = abstractLogger.child({ name: "app" });

logger.warn("Starting app");
playwright();