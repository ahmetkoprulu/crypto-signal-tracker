import axios, { Method, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.twelvedata.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class RequestBuilder {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  // TODO: implement complex data.
  technicalAnalysis(indicator: string | Array<string>): RequestEndPoint {
    return new RequestEndPoint(this.key, `/${indicator}`, "get");
  }

  static requestFinancialData() {
    let key = process.env.TWELVEDATA_SECRET_KEY;
    if (!key) throw new Error("Missing key");

    return new RequestBuilder(key);
  }
}

class RequestEndPoint implements IRequestBase {
  url: string;
  method: Method;
  params: any;

  constructor(key: string, url: string, method: Method) {
    this.url = url;
    this.method = method;
    this.params = { apikey: key };
  }

  symbol(symbol: string): RequestEndPoint {
    this.params.symbol = symbol;

    return this;
  }

  interval(interval: string): RequestEndPoint {
    this.params.interval = interval;

    return this;
  }

  batchRequest(symbols: Array<string>): RequestEndPoint {
    this.params.symbol = symbols.join(",");

    return this;
  }

  output(size: number) {
    this.params.outputsize = size;

    return this;
  }

  async request(): Promise<AxiosResponse<any, any>> {
    console.log(this.url, this.method);
    return axios.request({
      url: this.url,
      method: this.method,
      params: this.params,
    });
  }
}

interface IRequestBase {
  url: string;
  method: string;

  request(): any;
}
