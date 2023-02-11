import type { ArtistType, TagType, TrackType } from './types';

import { request } from './request.js';

class Artist {
  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');
    this.token = token;
  }

  public async fetch(artistName: string) {
    const { artist } = await request({
      method: 'artist.getinfo',
      artist: artistName,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    return {
      name: artist.name || null,
      url: artist.url || null,
      bio: artist.bio.summary || null,
      scrobbles: artist.stats.playcount || null,
      listeners: artist.stats.listeners || null,
    } as ArtistType;
  }

  public async fetchTags(artistName: string) {
    const {
      toptags: { tag },
    } = await request({
      method: 'artist.getTopTags',
      artist: artistName,
      api_key: this.token,
      format: 'json',
    });

    return tag.map((tag: TagType) => {
      return {
        name: tag.name || null,
        link: tag.url || null,
        timesRanked: tag.count || null,
      };
    });
  }

  public async fetchTracks(artistName: string) {
    const {
      toptracks: { track },
    } = await request({
      method: 'artist.getTopTracks',
      artist: artistName,
      api_key: this.token,
      format: 'json',
    });

    return track.map((track: TrackType) => {
      return {
        rank: track['@attr']?.rank,
        name: track.name || null,
        artist: {
          name: track.artist.name || null,
          url: track.artist.url || null,
        },
        url: track.url || null,
        scrobbles: track.playcount || null,
        listeners: track.listeners || null,
      } as TrackType;
    });
  }
}

export default Artist;
