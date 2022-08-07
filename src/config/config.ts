import dotenv from 'dotenv'
import { number, object, string } from 'yup';

const rawConfig = dotenv.config().parsed;

const configSchema = object({
  GREETING: string().required(),
  BOT_TOKEN: string().required(),
  USER_ID: number().required(),
  URL: string().required(),
  HEADERS: string().required(),
})

export const config = configSchema.validateSync(rawConfig);
