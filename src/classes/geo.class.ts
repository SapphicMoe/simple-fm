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
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      artists: artistMatches.map((artist) => ({
        name: artist.name,
        mbid: artist.mbid,
        listeners: Number(artist.listeners),
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
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: trackMatches.map((track) => ({
        rank: Number(track['@attr'].rank),
        name: track.name,
        mbid: track.mbid,
        duration: Number(track.duration),
        listeners: Number(track.listeners),
        artist: {
          name: track.artist.name,
          mbid: track.artist.mbid,
          url: track.artist.url,
        },
        url: track.url,
      })),
    };
  }
}
