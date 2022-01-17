export default class ServiceReturn<T> {
  isSucess: Boolean;
  code: number;
  title: string = "";
  message: string;
  data: T;

  constructor(isSuccess: boolean, code: number, message: string = "", data: T) {
    this.isSucess = isSuccess;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
