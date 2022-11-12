import { HttpResponse } from '../ports/http';
import { ServerError } from '../errors';

export const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200,
});

export const badRequest = (error: Error): HttpResponse => ({
  body: error.message,
  statusCode: 400,
});

export const serverError = (reason: string): HttpResponse => ({
  body: new ServerError(reason),
  statusCode: 500,
});
