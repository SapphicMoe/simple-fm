import Base from '~/base.js';

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
      topartists: { artist, '@attr': attr },
    } = await this.sendRequest<GeoGetTopArtistsResponse>({
      method: 'geo.getTopArtists',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        country: attr.country,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      artists: artist.map((a) => ({
        name: a.name,
        mbid: a.mbid,
        listeners: Number(a.listeners),
        url: a.url,
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
      tracks: { track, '@attr': attr },
    } = await this.sendRequest<GeoGetTopTracksResponse>({
      method: 'geo.getTopTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        country: attr.country,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: track.map((t) => ({
        rank: Number(t['@attr'].rank),
        name: t.name,
        mbid: t.mbid,
        duration: Number(t.duration),
        listeners: Number(t.listeners),
        artist: {
          name: t.artist.name,
          mbid: t.artist.mbid,
          url: t.artist.url,
        },
        url: t.url,
      })),
    };
  }
}
