import Logger from "../Loaders/logger";
import FormulaService from "../Services/formula";
import Twelvedata from "../Common/twelvedata";

export default async function FormulaExecutionHandler(job: any): Promise<void> {
  Logger.debug("✌️ Formula Execution Job is triggered!");
  console.log(job.attrs);

  try {
    let service = new FormulaService();
    const DTO = await service.getIndicators();

    if (!DTO.isSucess) {
      Logger.error(
        "🔥 Error with Formula Execution Job: Could not fetch indicators."
      );

      return;
    }

    for (let key in DTO.data.entries) {
      let response = await Twelvedata.requestFinancialData()
        .technicalAnalysis(key)
        .batchRequest(DTO.data.get(key) || [])
        .interval("1min")
        .request();
    }
  } catch (e) {
    Logger.error("🔥 Error with Formula Execution Job: %o", e);
  }
}
