import Logger from "../Loaders/logger";
import FormulaService from "../Services/formula";
import Twelvedata from "../Common/twelvedata";
import MemoryCache from "../Common/Cache/MemoryCache";
import ICache from "../Common/Cache/ICache";
import { delay } from "../Common/helpers";
export default async function FetchFormula(job: any): Promise<void> {
  Logger.debug("✌️ Formula Execution Job is triggered!");
  var cache: ICache = new MemoryCache();

  try {
    let service = new FormulaService();
    const DTO = await service.getIndicators();

    if (!DTO.isSucess) {
      Logger.error(
        "🔥 Error with Formula Execution Job: Could not fetch indicators."
      );

      return;
    }

    if (DTO.data.size > 8) {
      await sliceAndFetch(DTO.data);
    }

    for (let [key, value] of DTO.data) {
      await fetch(key, value);
    }
  } catch (e) {
    Logger.error("🔥 Error with Formula Execution Job: %o", e);
  }

  async function sliceAndFetch(indicators: Map<string, string[]>) {
    var keys = Array.from(indicators.keys());

    while (keys.length > 0) {
      var nextKeys = keys.splice(0, 7);

      for (let indicator of nextKeys) {
        await fetch(indicator, indicators.get(indicator)!);
      }

      await delay(2 * 1000);
    }
  }

  async function fetch(indicator: string, symbols: Array<string>) {
    let response = await Twelvedata.requestFinancialData()
      .technicalAnalysis(indicator)
      .batchRequest(symbols || [])
      .interval("1min")
      .output(3)
      .request();

    console.log(response.data.values);
    cache.set(indicator, response.data.values);
  }
}
