import { Response } from 'express';
import { ServerError } from '../../adapters/presentation/controllers/errors';
import { HttpResponseUtils } from '../../adapters/presentation/controllers/ports/http';

export const adaptResponseUtils = (res: Response): HttpResponseUtils => ({
  redirect(url: string) {
    return () => res.redirect(url);
  },
  ok(data: any) {
    return () => res.status(200).json(data);
  },
  badRequest(error: Error) {
    return () => res.status(400).json({ error: error.message });
  },
  serverError(reason: string) {
    return () => res.status(500).json(new ServerError(reason));
  },
});
