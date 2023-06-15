import { request } from '~/request.js';
import type { GeoGetTopArtistsResponse, GeoGetTopTracksResponse, GeoArtistType, GeoTrackType } from '~/types/index.js';

export default class Geo {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns the most popular artists by country.
   * @param country - The name of the country.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopArtists(country: string, limit = 50, page = 1): Promise<GeoArtistType> {
    const {
      topartists: { artist, '@attr': attr },
    } = await request<GeoGetTopArtistsResponse>('geo.getTopArtists', {
      country,
      api_key: this.token,
      limit,
      page,
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
    } as GeoArtistType;
  }

  /**
   * Fetches and returns the most popular tracks by country.
   * @param country - The name of the country.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(country: string, limit = 50, page = 1): Promise<GeoTrackType> {
    const {
      tracks: { track, '@attr': attr },
    } = await request<GeoGetTopTracksResponse>('geo.getTopTracks', {
      country,
      api_key: this.token,
      limit,
      page,
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
    } as GeoTrackType;
  }
}
