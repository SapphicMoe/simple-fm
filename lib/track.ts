import type { TrackType } from './types';

import { request } from './request.js';

class Track {
  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');
    this.token = token;
  }

  public async fetch(trackName: string) {
    const {
      results: { trackmatches },
    } = await request({
      method: 'track.search',
      track: trackName,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    const [track] = trackmatches.track;

    return {
      name: track.name || null,
      artist: track.artist || null,
      url: track.url || null,
      listeners: track.listeners || null,
      image: track.image[3]['#text'] || null,
    } as TrackType;
  }
}

export default Track;
