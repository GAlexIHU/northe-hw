import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import config from '@backend/config';
import { logger, db, handleRequestError } from '@backend/services';
import campaignRouter from './routers/campaign.router';
import { Server } from 'http';

export interface App {
  serve(port: number): Promise<Server>;
}

export function createApp(): App {
  logger.info('Launching node app');

  const app = express();

  app.use(bodyParser.json());
  app.use('/api/campaigns', campaignRouter.createRouter());
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
