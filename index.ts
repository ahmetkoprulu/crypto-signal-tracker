import express from "express";
import config from "./Config";
import logger from "./Loaders/logger";
import expressLoader from "./Loaders/express";
import mongoLoader from "./Loaders/mongo";
import agendaLoader from "./Loaders/agenda";
import jobsLoader from "./Loaders/jobs";
import Twelvedata from "./Common/twelvedata";
import TwelvedataResult from "./Models/twelvedataResult";

async function startServer() {
  const app = express();

  let db = await mongoLoader();
  logger.info("✌️ DB loaded and connected!");

  var agenda = agendaLoader(db);
  logger.info("✌️ Agenda loaded successfully!");

  await jobsLoader({ agenda });
  logger.info("✌️ Jobs loaded");

  await expressLoader({ app: app });
  logger.info("✌️ Express loaded successfully!");

  let response = await Twelvedata.requestFinancialData()
    .technicalAnalysis("macd")
    .batchRequest(["BTC/ETH", "ETH/BTC"])
    .interval("1min")
    .output(3)
    .request<Map<string, TwelvedataResult>>();

  console.log(response.data);

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
