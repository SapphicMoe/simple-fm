import { $fetch, SearchParameters } from 'ofetch';

import { requestMethods } from './types';

export async function request<T = unknown, M = requestMethods>(method: M, params: SearchParameters): Promise<T> {
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
  });

  return data;
}
