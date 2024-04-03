import config from "@backend/config";
import { db, handleRequestError, logger } from "@backend/services";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Server } from "http";
import campaignRouter from "./routers/campaign.router";

export interface App {
  serve(port: number): Promise<Server>;
}

export function createApp(): App {
  logger.info("Launching node app");

  const app = express();

  app.use(bodyParser.json());
  app.use(cors({ origin: config.corsOrigin }));
  app.use("/api/campaigns", campaignRouter.createRouter());
  app.use(handleRequestError);

  return {
    serve: async (port: number) => {
      await db.connect();
      return app.listen(port, () => {
        logger.info(`Server is listening at ${config.host}:${port}`);
      });
    },
  } satisfies App;
}
