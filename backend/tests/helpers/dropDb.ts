import { DataSource, DataSourceOptions } from "typeorm";
import config from "../../src/config";

async function dropDb() {
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
    entities: [__dirname + "/entities/*.entity{.js,.ts}"],
    migrations: [],
  };
  const tmpDB = new DataSource(options as DataSourceOptions);
  await tmpDB.initialize();
  const foundDBs = await tmpDB.query(
    `SELECT * FROM pg_database WHERE datname = '${database}'`,
  );

  if (foundDBs.length) {
    await tmpDB.query(`DROP DATABASE ${database} WITH (FORCE)`);
  }

  await tmpDB.destroy();
}

export { dropDb };
