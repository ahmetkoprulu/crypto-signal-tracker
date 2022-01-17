import ServiceReturn from "./ServiceReturn";

export default class ServiceBase {
  public Success<T>(data: T, message: string): ServiceReturn<T> {
    return new ServiceReturn(true, 200, message, data);
  }

  public Error<T = undefined>(data: T, message: string): ServiceReturn<T> {
    return new ServiceReturn(false, 500, message, data);
  }
}
