import { request } from '../request.js';

import type {
  ChartGetTopArtistsResponse,
  ChartGetTopTagsResponse,
  ChartGetTopTracksResponse,
  ChartTopArtistsType,
  ChartTopTagsType,
  ChartTopTracksType,
} from '../types';

class Chart {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns the most popular artists.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopArtists(limit = 30, page = 1): Promise<ChartTopArtistsType[]> {
    const {
      artists: { artist },
    } = await request<ChartGetTopArtistsResponse>('chart.getTopArtists', {
      api_key: this.token,
      limit,
      page,
    });

    return artist.map((artist) => {
      return {
        name: artist.name,
        stats: {
          scrobbles: Number(artist.playcount),
          listeners: Number(artist.listeners),
        },
        url: artist.url,
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }

  /**
   * Fetches and returns the most popular tags for tracks.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTags(limit = 30, page = 1): Promise<ChartTopTagsType[]> {
    const {
      tags: { tag },
    } = await request<ChartGetTopTagsResponse>('chart.getTopTags', {
      api_key: this.token,
      limit,
      page,
    });

    return tag.map((tag) => {
      return {
        name: tag.name,
        stats: {
          count: Number(tag.taggings),
          reach: Number(tag.reach),
        },
        url: tag.url,
      };
    });
  }

  /**
   * Fetches and returns the most popular tracks.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(limit = 30, page = 1): Promise<ChartTopTracksType[]> {
    const {
      tracks: { track },
    } = await request<ChartGetTopTracksResponse>('chart.getTopTracks', {
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      return {
        name: track.name,
        stats: {
          scrobbles: Number(track.playcount),
          listeners: Number(track.listeners),
        },
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: track.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }
}

export default Chart;
