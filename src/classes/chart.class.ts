import Base from '~/base.js';
import { toArray, toInt } from '~/utils/caster.js';

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
      artists: { artist: artistMatches, '@attr': attr },
    } = await this.sendRequest<ChartGetTopArtistsResponse>({
      method: 'chart.getTopArtists',
      limit: params?.limit ?? 30,
      page: params?.page ?? 1,
    });

    return {
      search: {
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      artists: toArray(artistMatches).map((artist) => ({
        name: artist.name,
        mbid: artist.mbid || undefined,
        stats: {
          scrobbles: toInt(artist.playcount),
          listeners: toInt(artist.listeners),
        },
        url: artist.url,
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
      tags: { tag: tagMatches, '@attr': attr },
    } = await this.sendRequest<ChartGetTopTagsResponse>({
      method: 'chart.getTopTags',
      limit: params?.limit ?? 30,
      page: params?.page ?? 1,
    });

    return {
      search: {
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      tags: toArray(tagMatches).map((tag) => ({
        name: tag.name,
        stats: {
          count: toInt(tag.taggings),
          reach: toInt(tag.reach),
        },
        url: tag.url,
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
      tracks: { track: trackMatches, '@attr': attr },
    } = await this.sendRequest<ChartGetTopTracksResponse>({
      method: 'chart.getTopTracks',
      limit: params?.limit ?? 30,
      page: params?.page ?? 1,
    });

    return {
      search: {
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      tracks: toArray(trackMatches).map((track) => ({
        name: track.name,
        mbid: track.mbid || undefined,
        stats: {
          scrobbles: toInt(track.playcount),
          listeners: toInt(track.listeners),
        },
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
      })),
    };
  }
}
