import { request } from '../request.js';

import type {
  ChartGetTopArtistsResponse,
  ChartGetTopTagsResponse,
  ChartGetTopTracksResponse,
  ChartTopArtistsType,
  ChartTopTagsType,
  ChartTopTracksType,
} from '../types/index.js';

export default class Chart {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns the most popular artists.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopArtists(limit = 30, page = 1): Promise<ChartTopArtistsType> {
    const {
      artists: { artist, '@attr': attr },
    } = await request<ChartGetTopArtistsResponse>('chart.getTopArtists', {
      api_key: this.token,
      limit,
      page,
    });

    const artists = artist.map((artist) => {
      return {
        name: artist.name,
        stats: {
          scrobbles: Number(artist.playcount),
          listeners: Number(artist.listeners),
        },
        url: artist.url,
      };
    });

    return {
      search: {
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      artists,
    } as ChartTopArtistsType;
  }

  /**
   * Fetches and returns the most popular tags for tracks.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTags(limit = 30, page = 1): Promise<ChartTopTagsType> {
    const {
      tags: { tag, '@attr': attr },
    } = await request<ChartGetTopTagsResponse>('chart.getTopTags', {
      api_key: this.token,
      limit,
      page,
    });

    const tags = tag.map((tag) => {
      return {
        name: tag.name,
        stats: {
          count: Number(tag.taggings),
          reach: Number(tag.reach),
        },
        url: tag.url,
      };
    });

    return {
      search: {
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tags,
    } as ChartTopTagsType;
  }

  /**
   * Fetches and returns the most popular tracks.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(limit = 30, page = 1): Promise<ChartTopTracksType> {
    const {
      tracks: { track, '@attr': attr },
    } = await request<ChartGetTopTracksResponse>('chart.getTopTracks', {
      api_key: this.token,
      limit,
      page,
    });

    const tracks = track.map((track) => {
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
      };
    });

    return {
      search: {
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks,
    } as ChartTopTracksType;
  }
}