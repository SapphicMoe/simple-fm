import { $fetch, FetchError } from 'ofetch';

import LastFMError from '@utils/error.js';

import type { RequestMethod } from '@typings/index.js';

export interface LastFMArgument {
  method: RequestMethod;

  album?: string;
  artist?: string;
  country?: string;
  tag?: string;
  track?: string;
  user?: string;

  lang?: string;
  location?: string;
  username?: string;

  sk?: string;
  token?: string;
  api_sig?: string;

  page?: number;
  limit?: number;

  mbid?: string;

  taggingtype?: string;
  autocorrect?: boolean | number;
  recenttracks?: boolean | number;
}

type Data<T> = T & {
  message: string;
  error: number;
};

export class LastFMRequest {
  private readonly key: string;
  private readonly params: LastFMArgument;
  private readonly userAgent: string;

  constructor(key: string, userAgent: string, params: LastFMArgument) {
    this.key = key;
    this.params = params;
    this.userAgent = userAgent;
  }

  // TODO: Implement post methods.
  private isPostRequest() {
    return Object.hasOwn(this.params, 'sk');
  }

  private post<T = unknown>(): Promise<T> {
    throw new Error('Method not implemented yet.');
  }

  private async get<T>(): Promise<T | undefined> {
    const baseURL = 'https://ws.audioscrobbler.com/2.0';

    const params = {
      api_key: this.key,
      format: 'json',
      ...this.params,
    };

    try {
      const data = await $fetch<Data<T>>(baseURL, {
        params,
        headers: {
          'User-Agent': this.userAgent,
        },
      });

      if (data.error === 6) throw new LastFMError(data);

      return data;
    } catch (err) {
      if (err instanceof FetchError) throw new LastFMError(err.data);
      if (err instanceof LastFMError) throw new LastFMError(err.response);
      console.error(err);
    }
  }

  execute() {
    if (this.isPostRequest()) return this.post();
    return this.get();
  }
}
