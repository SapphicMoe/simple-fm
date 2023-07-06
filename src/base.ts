import { LastFMRequest, LastFMArgument } from '~/request.js';

export default class Base {
  protected key: string;
  protected userAgent: string;

  constructor(
    key: string,
    userAgent = `simple-fm - a simple Last.fm wrapper written in TypeScript (GitHub: https://github.com/solelychloe/simple-fm)`
  ) {
    this.key = key;
    this.userAgent = userAgent;
  }

  protected async sendRequest<T = unknown>(params: LastFMArgument): Promise<T> {
    const response = await new LastFMRequest(this.key, this.userAgent, params).get();

    return response as Promise<T>;
  }
}
