export interface HttpResponse {
  body: any;
  statusCode: number;
}

export interface HttpRequest {
  body?: any;
  params?: any;
}

export interface HttpResponseUtils {
  redirect(url: string): () => void;
  ok(data: any): () => void;
  badRequest(error: Error): () => void;
  serverError(reason: string): () => void;
}
