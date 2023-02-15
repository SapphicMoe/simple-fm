import { request } from './request.js';

import type {
  ArtistGetInfoResponse,
  ArtistGetSimilarResponse,
  ArtistGetTopTagsResponse,
  ArtistGetTopTracksResponse,
  ArtistSearchResponse,
  ArtistSimilarType,
  ArtistTrackType,
  ArtistType,
  ArtistTagType,
} from './types';

class Artist {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information for an artist.
   * @param artistName - The name of the artist.
   * @param username - The username for the context of the request. If supplied, the user's playcount for this artist is included in the response.
   * */
  async fetch(artistName: string, username?: string): Promise<ArtistType> {
    const { artist } = await request<ArtistGetInfoResponse>({
      method: 'artist.getinfo',
      artist: artistName,
      username,
      api_key: this.token,
    });

    return {
      name: artist.name,
      url: artist.url,
      bio: artist.bio.summary,
      stats: {
        scrobbles: Number(artist.stats.playcount),
        listeners: Number(artist.stats.listeners),
        userPlayCount: Number(artist.stats.userplaycount) || null,
      },
    };
  }

  /**
   * Fetches and returns similar artists to this artist.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * */
  async fetchSimilar(artistName: string, limit = 30): Promise<ArtistSimilarType[]> {
    const {
      similarartists: { artist },
    } = await request<ArtistGetSimilarResponse>({
      method: 'artist.getSimilar',
      artist: artistName,
      api_key: this.token,
      limit,
    });

    return artist.map((artist) => {
      return {
        name: artist.name,
        match: Number(artist.match),
        url: artist.url,
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'],
      };
    });
  }

  /**
   * Fetches and returns popular tags for an artist.
   * @param artistName - The name of the artist.
   * */
  async fetchTags(artistName: string): Promise<ArtistTagType[]> {
    const {
      toptags: { tag },
    } = await request<ArtistGetTopTagsResponse>({
      method: 'artist.getTopTags',
      artist: artistName,
      api_key: this.token,
    });

    return tag.map((tag) => {
      return {
        name: tag.name,
        url: tag.url,
        timesRanked: tag.count,
      };
    });
  }

  /**
   * Fetches and returns popular tracks for an artist.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTracks(artistName: string, limit = 50, page = 1): Promise<ArtistTrackType[]> {
    const {
      toptracks: { track },
    } = await request<ArtistGetTopTracksResponse>({
      method: 'artist.getTopTracks',
      artist: artistName,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        stats: {
          scrobbles: Number(track.playcount),
          listeners: Number(track.listeners),
        },
      };
    });
  }

  /**
   * Search for an artist by name.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(artistName: string, limit = 30, page = 1): Promise<ArtistType[]> {
    const {
      results: { artistmatches },
    } = await request<ArtistSearchResponse>({
      method: 'artist.search',
      artist: artistName,
      api_key: this.token,
      limit,
      page,
    });

    const { artist } = artistmatches;

    return artist.map((artist) => {
      return {
        name: artist.name,
        url: artist.url,
        stats: {
          listeners: Number(artist.listeners),
        },
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }
}

export default Artist;
