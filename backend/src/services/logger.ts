import { addColors, createLogger, format, transports } from "winston";

const { combine, errors, timestamp, colorize, printf } = format;

addColors({
  error: "red bold",
  warn: "yellow bold",
  info: "cyan",
  debug: "green bold",
});

const logger = createLogger({
  level: "debug",
  format: combine(
    errors({ stack: true }),
    colorize({
      all: true,
    }),
    timestamp(),
    printf((info) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { level, message, timestamp, stack } = info;
      const stackLog = stack ? "\n" + stack : "";
      return `[${timestamp}] ${level}: ${message} ${stackLog}`;
    }),
  ),
  defaultMeta: { service: "user-service" },
  transports: [new transports.Console()],
});

export default logger;
