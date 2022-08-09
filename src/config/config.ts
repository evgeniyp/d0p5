import dotenv from "dotenv";
import { number, object, string } from "yup";

const rawConfig = dotenv.config().parsed;

const configSchema = object({
  BOT_TOKEN: string().required(),
  BOT_FAVORITE_USER_ID: number().required(),
});

export const getConfig = () => configSchema.validateSync(rawConfig);
