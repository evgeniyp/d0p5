import { pino } from "pino";

const transport = pino.transport({
  targets: [
    {
      level: "trace",
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname",
        translateTime: "SYS:standard",
      },
    },
    {
      level: "warn",
      target: "pino/file",
      options: {
        destination: "logs/app.log",
        mkdir: true,
      },
    },
  ],
});

export const abstractLogger = pino(transport);
