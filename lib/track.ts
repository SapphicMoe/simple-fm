import type { TrackSearchResponse, TrackType } from './types';

import { request } from './request.js';

class Track {
  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');
    this.token = token;
  }

  public async fetch(trackName: string): Promise<TrackType> {
    const {
      results: { trackmatches },
    } = await request<TrackSearchResponse>({
      method: 'track.search',
      track: trackName,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    const [track] = trackmatches.track;

    return {
      name: track.name,
      artist: track.artist,
      url: track.url,
      listeners: track.listeners,
      image: track.image.find((i) => i.size == 'large')?.['#text'],
    };
  }
}

export default Track;
