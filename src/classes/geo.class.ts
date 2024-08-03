import Base from '~/base.js';
import { toArray, toInt } from '~/utils/caster.js';

import type { GeoGetTopArtistsParams, GeoGetTopTracksParams } from '@params/geo.params.js';
import type { GeoGetTopArtistsResponse, GeoGetTopTracksResponse } from '@responses/index.js';
import type { GeoGetTopArtistsType, GeoGetTopTracksType } from '@typings/index.js';

export default class Geo extends Base {
  /**
   * Returns the most popular artists by country.
   * @param country - The name of the country.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopArtists(params: GeoGetTopArtistsParams): Promise<GeoGetTopArtistsType> {
    const {
      topartists: { artist: artistMatches, '@attr': attr },
    } = await this.sendRequest<GeoGetTopArtistsResponse>({
      method: 'geo.getTopArtists',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        country: attr.country,
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      artists: artistMatches.map((artist) => ({
        name: artist.name,
        mbid: artist.mbid || undefined,
        listeners: toInt(artist.listeners),
        url: artist.url,
      })),
    };
  }

  /**
   * Returns the most popular tracks by country.
   * @param country - The name of the country.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopTracks(params: GeoGetTopTracksParams): Promise<GeoGetTopTracksType> {
    const {
      tracks: { track: trackMatches, '@attr': attr },
    } = await this.sendRequest<GeoGetTopTracksResponse>({
      method: 'geo.getTopTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        country: attr.country,
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      tracks: toArray(trackMatches).map((track) => ({
        rank: toInt(track['@attr'].rank),
        name: track.name,
        mbid: track.mbid || undefined,
        duration: toInt(track.duration),
        listeners: toInt(track.listeners),
        artist: {
          name: track.artist.name,
          mbid: track.artist.mbid || undefined,
          url: track.artist.url,
        },
        url: track.url,
      })),
    };
  }
}
