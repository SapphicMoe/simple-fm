import Base from '~/base.js';
import type {
  GeoGetTopArtistsResponse,
  GeoGetTopTracksResponse,
  GeoGetTopArtistsType,
  GeoGetTopTracksType,
} from '~/types/index.js';

import type { GeoGetTopArtistsParams, GeoGetTopTracksParams } from '@params/geo.params.js';

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
      country: params.country,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    const artists = artist.map((artist) => {
      return {
        name: artist.name,
        listeners: Number(artist.listeners),
        url: artist.url,
      };
    });

    return {
      search: {
        country: attr.country,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      artists,
    } as GeoGetTopArtistsType;
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
      country: params.country,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    const tracks = track.map((track) => {
      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        duration: Number(track.duration) || null,
        listeners: Number(track.listeners),
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
      };
    });

    return {
      search: {
        country: attr.country,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks,
    } as GeoGetTopTracksType;
  }
}
