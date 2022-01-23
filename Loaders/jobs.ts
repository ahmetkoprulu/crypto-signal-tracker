import config from "../Config";
// import FormulaExecutionJob from "../Jobs/executeFormulas";
import FetchIndicatorsJob from "../Jobs/fetchIndicators";
import Agenda, { JobPriority } from "agenda";

export default async ({ agenda }: { agenda: Agenda }) => {
  // agenda.define(
  //   "execute-formulas",
  //   { priority: 10, concurrency: config.agenda.concurrency },
  //   FormulaExecutionJob
  // );

  agenda.define(
    "fetch-indicators",
    { priority: 10, concurrency: config.agenda.concurrency },
    FetchIndicatorsJob
  );

  await agenda.every("1 minute", "execute-formulas");
};
