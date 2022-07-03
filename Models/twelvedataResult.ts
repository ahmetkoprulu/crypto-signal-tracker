export default class twelvedataResult {
  meta: IndicatorMeta | null = null;
  values: Array<any> = new Array<any>();
}

export class IndicatorMeta {
  symbol: string = "";
  interval: string = "1h";
  currency_base: string = "";
  currency_quote: string = "";
  exchange: string = "";
  type: string = "";
}
