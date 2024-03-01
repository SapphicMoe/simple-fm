import { USER_AGENT } from './constants.js';

import { LastFMRequest, LastFMArgument } from '~/request.js';

export default class Base {
  protected key: string;
  protected userAgent: string;

  constructor(key: string, userAgent?: string) {
    this.key = key;
    this.userAgent = userAgent ?? USER_AGENT;
  }

  protected async sendRequest<T>(params: LastFMArgument): Promise<T> {
    const response = await new LastFMRequest(this.key, this.userAgent, params).execute();

    return response as Promise<T>;
  }
}
