import { Request, Response } from 'express';
import { Controller } from '../../adapters/presentation/controllers/ports/controller';
import { HttpRequest, HttpResponseUtils } from '../../adapters/presentation/controllers/ports/http';
import { adaptResponseUtils } from './express-response-utils-adapter';

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
    };
    const httpResponseUtils: HttpResponseUtils = adaptResponseUtils(res);
    const response = await controller.handle(httpRequest, httpResponseUtils);
    
    return response();
  };
}
