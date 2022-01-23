import ServiceReturn from "./ServiceReturn";

export default class ServiceBase {
  public Success<T>(data: T, message: string): ServiceReturn<T> {
    return new ServiceReturn(true, 200, message, data);
  }

  public NotFound(message: string): ServiceReturn<null> {
    return new ServiceReturn(false, 404, message, null);
  }

  public Error<T = undefined>(data: T, message: string): ServiceReturn<T> {
    return new ServiceReturn(false, 500, message, data);
  }
}
