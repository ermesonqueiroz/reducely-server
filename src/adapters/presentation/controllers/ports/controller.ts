import { HttpRequest, HttpResponseUtils } from './http';

export type ControllerResponse = () => void;
export interface Controller {
  handle(httpRequest: HttpRequest, httpResponseUtils: HttpResponseUtils): Promise<ControllerResponse>;
}
