import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import config from '@backend/config';
import { logger, db, handleRequestError } from '@backend/services';
import Next from 'next';
import campaignRouter from './routers/campaign.router';

async function init() {
    logger.info("Launching node app");

    await db.connect();

    const app = express();

    app.use(bodyParser.json());
    app.use('/api/campaigns', campaignRouter.createRouter());

    const isDev = process.env.NODE_ENV !== 'production';
    const nextApp = Next({ dir: './frontend/src', dev: isDev });
    logger.info(`Starting with next `);

    await nextApp.prepare();

    const nextAppHandler = nextApp.getRequestHandler();

    app.get('*', async (req, res) => {
        res.setHeader('Cache-Control', 'no-cache');
        await nextAppHandler(req, res);
    });

    app.post('*', async (req, res) => {
        res.setHeader('Cache-Control', 'no-cache');
        await nextAppHandler(req, res);
    });

    const server = app.listen(config.port, () => {
        logger.info(`Server is listening at ${config.host}:${config.port}`);
    });

    app.use(handleRequestError);

    // graceful shutdown
    process.on('SIGINT', () => {
        logger.info('Stopping server');

        server.close(() => {
            logger.info('Server stopped');
            process.exit(1);
        });
    });
}

export default init;
