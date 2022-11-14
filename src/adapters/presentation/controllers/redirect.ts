import { FindLink } from '../../../usecases/find-link';
import { MissingParamError } from './errors';
import { ControllerResponse } from './ports/controller';
import { HttpRequest, HttpResponseUtils } from './ports/http';

export class RedirectController {
  constructor(private readonly findLink: FindLink) {}

  public async handle(httpRequest: HttpRequest, httpResponseUtils: HttpResponseUtils): Promise<ControllerResponse> {
    try {
      if (!httpRequest.params.id)
        return httpResponseUtils.badRequest(new MissingParamError('id'));

      const findLinkResponse = await this.findLink.execute({ id: httpRequest.params.id });
      if (findLinkResponse.isLeft()) return httpResponseUtils.badRequest(findLinkResponse.value);

      return httpResponseUtils.redirect(findLinkResponse.value.target);
    } catch (error) {
      console.log(error);
      return httpResponseUtils.serverError('internal');
    }
  }
}
