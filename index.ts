import express from "express";
import config from "./Config";
import logger from "./Loaders/logger";
import expressLoader from "./Loaders/express";
import mongoLoader from "./Loaders/mongo";
import agendaLoader from "./Loaders/agenda";

async function startServer() {
  const app = express();

  let db = await mongoLoader();
  logger.info("✌️ DB loaded and connected!");

  agendaLoader(db);
  logger.info("✌️ Agenda loaded successfully!");

  await expressLoader({ app: app });
  logger.info("✌️ Express loaded successfully!");

  await app
    .listen(config.port, () => {
      logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      logger.error(err);
      process.exit(1);
    });
}

startServer();
