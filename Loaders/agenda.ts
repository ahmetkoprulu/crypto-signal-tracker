import Agenda, { AgendaConfig } from "agenda";
import { Db } from "mongodb";
import config from "../Config";

export default (mongoConnection: Db) => {
  var agenda = new Agenda({
    mongo: mongoConnection,
    db: { collection: config.agenda.dbCollection },
    maxConcurrency: config.agenda.concurrency,
  } as AgendaConfig);

  agenda.on("start", (job) => {
    console.log(`Job <${job.attrs.name}> starting`);
  });
  agenda.on("success", (job) => {
    console.log(`Job <${job.attrs.name}> succeeded`);
  });
  agenda.on("fail", (error, job) => {
    console.log(`Job <${job.attrs.name}> failed:`, error);
  });

  agenda.processEvery("1 second");
  agenda.start();

  return agenda;
};
