import { $fetch, SearchParameters } from 'ofetch';

export class APIRequest {
  public async fetch(params: SearchParameters) {
    try {
      const baseURL = 'https://ws.audioscrobbler.com/2.0';

      const data = await $fetch(baseURL, {
        params,
        headers: {
          'User-Agent': 'simple-fm, a simple Last.fm wrapper in TypeScript (https://github.com/solelychloe/simple-fm)',
        },
      });

      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
