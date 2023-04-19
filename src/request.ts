import { $fetch, FetchError, SearchParameters } from 'ofetch';

import { RequestMethods } from './types/index.js';
import LastFMError from './utils/error.js';

export async function request<T = unknown, M = RequestMethods>(method: M, params: SearchParameters): Promise<T> {
  const baseURL = 'https://ws.audioscrobbler.com/2.0';

  const data = await $fetch<T>(baseURL, {
    params: {
      method,
      ...params,
      format: 'json',
    },
    headers: {
      'User-Agent': 'simple-fm, a simple Last.fm wrapper in TypeScript (https://github.com/solelychloe/simple-fm)',
    },
  }).catch((err) => {
    if (err instanceof FetchError && !err.response?.ok) throw new LastFMError(err.data);
  });

  return data as Promise<Awaited<T>>;
}
