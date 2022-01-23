import Logger from "../Loaders/logger";

export default async function FormulaExecutionHandler(job: any): Promise<void> {
  try {
    Logger.debug("✌️ Formula Execution Job is triggered!");
    console.log(job.attrs);
  } catch (e) {
    Logger.error("🔥 Error with Formula Execution Job: %o", e);
  }
}
