import { request } from './request.js';

import type {
  ChartGetTopArtistsResponse,
  ChartGetTopTracksResponse,
  ChartArtistType,
  ChartTrackType,
} from './types.js';

class Chart {
  constructor(private readonly token: string) {}
  /**
   * Fetches and returns the most popular artists.
   *
   * @param country - The name of the country.
   * */
  async fetchTopArtists(limit = 30, page = 1): Promise<ChartArtistType[]> {
    const {
      artists: { artist },
    } = await request<ChartGetTopArtistsResponse>({
      method: 'chart.getTopArtists',
      api_key: this.token,
      limit,
      page,
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

  /**
   * Search for a track by name.
   * @param trackName - The name of the track.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(limit = 30, page = 1): Promise<ChartTrackType[]> {
    const {
      tracks: { track },
    } = await request<ChartGetTopTracksResponse>({
      method: 'chart.getTopTracks',
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      return {
        name: track.name,
        stats: {
          playcount: Number(track.playcount),
          listeners: Number(track.listeners),
        },
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: track.image.find((i) => i.size === 'extralarge')?.['#text'],
      };
    });
  }
}

export default Chart;
