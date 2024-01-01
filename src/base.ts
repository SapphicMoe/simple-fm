import { pkg } from '@utils/package.js';
import { LastFMRequest, LastFMArgument } from '~/request.js';

export default class Base {
  protected key: string;
  protected userAgent: string;

  constructor(
    key: string,
    userAgent = `simple-fm v${pkg.version} - a simple Last.fm wrapper written in TypeScript (https://github.com/solelychloe/simple-fm)`
  ) {
    this.key = key;
    this.userAgent = userAgent;
  }

  protected async sendRequest<T>(params: LastFMArgument): Promise<T> {
    const response = await new LastFMRequest(this.key, this.userAgent, params).execute();

    return response as Promise<T>;
  }
}
