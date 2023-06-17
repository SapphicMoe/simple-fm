import { $fetch, FetchError } from 'ofetch';

import LastFMError from '@utils/error.js';
import { RequestMethods } from '~/types/index.js';

export interface LastFMArgument {
  method: RequestMethods;

  album?: string;
  artist?: string;
  country?: string;
  tag?: string;
  track?: string;
  user?: string;

  lang?: string;
  location?: string;
  username?: string;

  page?: number;
  limit?: number;

  mbid?: string;

  taggingtype?: string;
  autocorrect?: boolean | number;
  recenttracks?: boolean | number;
}

export class LastFMRequest {
  private readonly key: string;
  private readonly params: LastFMArgument;
  private readonly userAgent: string;

  constructor(key: string, userAgent: string, params: LastFMArgument) {
    this.key = key;
    this.params = params;
    this.userAgent = userAgent;
  }

  async get<T = unknown>(): Promise<T> {
    const baseURL = 'https://ws.audioscrobbler.com/2.0';

    const params = {
      api_key: this.key,
      format: 'json',
      ...this.params,
    };

    const data: any = await $fetch<T>(baseURL, {
      params,
      headers: {
        'User-Agent': this.userAgent,
      },
    }).catch((err) => {
      if (err instanceof FetchError && !err.response?.ok) throw new LastFMError(err.data);
    });

    if (data.error === 6) throw new LastFMError(data);

    return data as Promise<Awaited<T>>;
  }
}
