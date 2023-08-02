import Base from '~/base.js';

import type { ChartGetTopArtistParams, ChartGetTopTagsParams, ChartGetTopTracksParams } from '@params/chart.params.js';
import type {
  ChartGetTopArtistsResponse,
  ChartGetTopTagsResponse,
  ChartGetTopTracksResponse,
} from '@responses/index.js';
import type { ChartGetTopArtistsType, ChartGetTopTagsType, ChartGetTopTracksType } from '@typings/index.js';

export default class Chart extends Base {
  /**
   * Returns the most popular artists.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopArtists(params?: ChartGetTopArtistParams): Promise<ChartGetTopArtistsType> {
    const {
      artists: { artist, '@attr': attr },
    } = await this.sendRequest<ChartGetTopArtistsResponse>({
      method: 'chart.getTopArtists',
      limit: params?.limit ?? 30,
      page: params?.page ?? 1,
    });

    return {
      search: {
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      artists: artist.map((a) => ({
        name: a.name,
        mbid: a.mbid,
        stats: {
          scrobbles: Number(a.playcount),
          listeners: Number(a.listeners),
        },
        url: a.url,
      })),
    };
  }

  /**
   * Returns the most popular tags for tracks.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopTags(params?: ChartGetTopTagsParams): Promise<ChartGetTopTagsType> {
    const {
      tags: { tag, '@attr': attr },
    } = await this.sendRequest<ChartGetTopTagsResponse>({
      method: 'chart.getTopTags',
      limit: params?.limit ?? 30,
      page: params?.page ?? 1,
    });

    return {
      search: {
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tags: tag.map((t) => ({
        name: t.name,
        stats: {
          count: Number(t.taggings),
          reach: Number(t.reach),
        },
        url: t.url,
      })),
    };
  }

  /**
   * Returns the most popular tracks.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopTracks(params?: ChartGetTopTracksParams): Promise<ChartGetTopTracksType> {
    const {
      tracks: { track, '@attr': attr },
    } = await this.sendRequest<ChartGetTopTracksResponse>({
      method: 'chart.getTopTracks',
      limit: params?.limit ?? 30,
      page: params?.page ?? 1,
    });

    return {
      search: {
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: track.map((t) => ({
        name: t.name,
        mbid: t.mbid,
        stats: {
          scrobbles: Number(t.playcount),
          listeners: Number(t.listeners),
        },
        artist: {
          name: t.artist.name,
          url: t.artist.url,
        },
        url: t.url,
      })),
    };
  }
}
