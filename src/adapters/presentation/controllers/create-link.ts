import { CreateLink } from '../../../usecases/create-link';
import { MissingParamError } from './errors';
import { Controller, ControllerResponse } from './ports/controller';
import { HttpRequest, HttpResponseUtils } from './ports/http';

export class CreateLinkController implements Controller {
  constructor(private readonly createLink: CreateLink) {}

  public async handle(httpRequest: HttpRequest, httpResponseUtils: HttpResponseUtils): Promise<ControllerResponse> {
    try {
      if (!httpRequest.body.target)
        return httpResponseUtils.badRequest(new MissingParamError('target'));
      
      const linkData = { target: httpRequest.body.target };
      const createLinkResponse = await this.createLink.execute(linkData);
      if (createLinkResponse.isLeft())
        return httpResponseUtils.badRequest(createLinkResponse.value); 

      return httpResponseUtils.ok(createLinkResponse.value);
    } catch (error) {
      return httpResponseUtils.serverError('internal');
    }
  }
}
