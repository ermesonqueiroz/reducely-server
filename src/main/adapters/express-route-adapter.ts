import { Request, Response } from 'express';
import { Controller } from '../../adapters/presentation/controllers/ports/controller';
import { HttpRequest } from '../../adapters/presentation/controllers/ports/http';

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
