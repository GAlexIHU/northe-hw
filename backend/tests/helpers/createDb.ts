// import { campaignsInit, vouchersInit } from './fixtures';
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import config from "../../src/config";

async function createDb() {
  const { host, port, password, user: username, name: database } = config.db;

  const options = {
    type: "postgres",
    host,
    port,
    username,
    password,
    database: "postgres",
    synchronize: config.isDev || config.env === "test",
    logging: config.isDev,
    entities: [path.join(__dirname, "../../src/db/entities/*.entity{.js,.ts}")],
    migrations: [],
  };
  const tmpDB = new DataSource(options as DataSourceOptions);
  await tmpDB.initialize();
  const foundDBs = await tmpDB.query(
    `SELECT * FROM pg_database WHERE datname = '${database}'`,
  );

  if (foundDBs.length) {
    await tmpDB.destroy();
    return;
  }

  await tmpDB.query(`CREATE DATABASE ${database}`);

  const db = new DataSource({ ...options, database } as DataSourceOptions);
  await db.initialize();

  // await db.query([...campaignsInit, ...vouchersInit].join('\n'))

  await tmpDB.destroy();
  await db.destroy();
}

export { createDb };
