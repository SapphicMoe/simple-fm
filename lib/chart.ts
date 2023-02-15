import { request } from './request.js';

import type { ChartGetTopArtistsResponse, ChartArtistType } from './types.js';

class Chart {
  constructor(private readonly token: string) {}
  /**
   * Fetches and returns the most popular artists.
   *
   * @param country - The name of the country.
   * */
  async fetchTopArtists(country: string): Promise<ChartArtistType[]> {
    const {
      artists: { artist },
    } = await request<ChartGetTopArtistsResponse>({
      method: 'geo.getTopArtists',
      country,
      api_key: this.token,
    });

    return artist.map((artist) => {
      return {
        name: artist.name,
        stats: {
          playcount: Number(artist.playcount),
          listeners: Number(artist.listeners),
        },
        url: artist.url,
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'],
      };
    });
  }
}

export default Chart;
