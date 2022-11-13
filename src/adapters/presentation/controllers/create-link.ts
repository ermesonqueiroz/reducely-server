import { CreateLink } from '../../../usecases/create-link';
import { MissingParamError } from './errors';
import { badRequest, ok, serverError } from './helpers/http-helper';
import { Controller } from './ports/controller';
import { HttpRequest, HttpResponse } from './ports/http';

export class CreateLinkController implements Controller {
  constructor(private readonly createLink: CreateLink) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.target)
        return badRequest(new MissingParamError('target'));
      
      const linkData = { target: httpRequest.body.target };
      const createLinkResponse = await this.createLink.execute(linkData);
      if (createLinkResponse.isLeft())
        return badRequest(createLinkResponse.value); 

      return ok(createLinkResponse.value);
    } catch (error) {
      return serverError('internal');
    }
  }
}
