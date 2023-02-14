import { request } from './request.js';

import type { GeoArtistType, GeoTrackType, GeoGetTopArtistsResponse, GeoGetTopTracksResponse } from './types.js';

class Geo {
  constructor(private readonly token: string) {}
  /**
   * Fetches and returns the most popular artists by country.
   *
   * Ordered by relevance.
   * @param country - The name of the country.
   * */
  async fetchTopArtists(country: string): Promise<GeoArtistType[]> {
    const {
      topartists: { artist },
    } = await request<GeoGetTopArtistsResponse>({
      method: 'geo.getTopArtists',
      country,
      api_key: this.token,
    });

    return artist.map((artist) => {
      return {
        name: artist.name,
        stats: {
          listeners: Number(artist.listeners),
        },
        url: artist.url,
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'],
      };
    });
  }

  /**
   * Fetches and returns the most popular tracks by country
   *
   * Ordered by relevance.
   * @param country - The name of the country.
   * */
  async fetchTopTracks(country: string): Promise<GeoTrackType[]> {
    const {
      tracks: { track },
    } = await request<GeoGetTopTracksResponse>({
      method: 'geo.getTopTracks',
      country,
      api_key: this.token,
    });

    return track.map((track) => {
      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        stats: {
          duration: Number(track.duration),
          listeners: Number(track.listeners),
        },
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: track.image.find((i) => i.size === 'large')?.['#text'],
      };
    });
  }
}

export default Geo;
