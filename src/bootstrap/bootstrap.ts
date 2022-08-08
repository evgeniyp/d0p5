import { abstractLogger } from "../logger/logger";

const logger = abstractLogger.child({ name: "root" });

export const bootstrap = () => {
  process
  .on("unhandledRejection", (reason, p) => {
    logger.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    logger.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

}