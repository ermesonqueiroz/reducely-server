import { FindLink } from '../../../usecases/find-link';
import { IncreaseLinkAccessCount } from '../../../usecases/increase-link-access-count';
import { MissingParamError } from './errors';
import { ControllerResponse } from './ports/controller';
import { HttpRequest, HttpResponseUtils } from './ports/http';

export class RedirectController {
  constructor(
    private readonly findLink: FindLink,
    private readonly increaseLinkAccessCount: IncreaseLinkAccessCount
  ) {}

  public async handle(httpRequest: HttpRequest, httpResponseUtils: HttpResponseUtils): Promise<ControllerResponse> {
    try {
      if (!httpRequest.params.id)
        return httpResponseUtils.badRequest(new MissingParamError('id'));

      const findLinkResponse = await this.findLink.execute({ id: httpRequest.params.id });
      if (findLinkResponse.isLeft()) return httpResponseUtils.badRequest(findLinkResponse.value);

      const increaseLinkAccessCountResponse = await this.increaseLinkAccessCount.execute({ linkId: httpRequest.params.id});
      if (increaseLinkAccessCountResponse.isLeft()) return httpResponseUtils.badRequest(increaseLinkAccessCountResponse.value);

      return httpResponseUtils.redirect(findLinkResponse.value.target);
    } catch (error) {
      console.log(error);
      return httpResponseUtils.serverError('internal');
    }
  }
}
