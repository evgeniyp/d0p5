import dotenv from 'dotenv'
import { object, string } from 'yup';

const rawConfig = dotenv.config().parsed;

const configSchema = object({
  GREETING: string().required()
})

export const config = configSchema.validateSync(rawConfig);
