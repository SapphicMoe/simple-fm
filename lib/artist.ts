import { request } from './request.js';

import type {
  ArtistGetInfoResponse,
  ArtistGetTopTagsResponse,
  ArtistGetTopTracksResponse,
  ArtistTrackType,
  ArtistType,
  ArtistTagType,
} from './types';

class Artist {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information on an artist.
   * @param artistName - The name of the artist.
   * */
  async fetch(artistName: string): Promise<ArtistType> {
    const { artist } = await request<ArtistGetInfoResponse>({
      method: 'artist.getinfo',
      artist: artistName,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    return {
      name: artist.name,
      url: artist.url,
      bio: artist.bio.summary,
      scrobbles: artist.stats.playcount,
      listeners: artist.stats.listeners,
    };
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
      format: 'json',
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
   * */
  async fetchTracks(artistName: string): Promise<ArtistTrackType[]> {
    const {
      toptracks: { track },
    } = await request<ArtistGetTopTracksResponse>({
      method: 'artist.getTopTracks',
      artist: artistName,
      api_key: this.token,
      format: 'json',
    });

    return track.map((track) => {
      return {
        rank: track['@attr'].rank,
        name: track.name,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        scrobbles: track.playcount,
        listeners: track.listeners,
      };
    });
  }
}

export default Artist;
