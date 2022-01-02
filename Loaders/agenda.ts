import Agenda, { AgendaConfig } from "agenda";
import { Db } from "mongodb";
import config from "../Config";

export default (mongoConnection: Db) => {
  return new Agenda({
    mongo: mongoConnection,
    db: { collection: config.agenda.dbCollection },
    processEvery: config.agenda.pooltime,
    maxConcurrency: config.agenda.concurrency,
  } as AgendaConfig);
  /**
   * This voodoo magic is proper from agenda.js so I'm not gonna explain too much here.
   * https://github.com/agenda/agenda#mongomongoclientinstance
   */
};
