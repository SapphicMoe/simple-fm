import { request } from './request.js';

import type { TrackSearchResponse, TrackType } from './types';

class Track {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns information on a track.
   * @param trackName - The name of the track.
   * */
  async fetch(trackName: string): Promise<TrackType> {
    const {
      results: { trackmatches },
    } = await request<TrackSearchResponse>({
      method: 'track.search',
      track: trackName,
      api_key: this.token,
      limit: 1,
    });

    const [track] = trackmatches.track;

    return {
      name: track.name,
      artist: track.artist,
      url: track.url,
      stats: {
        listeners: track.listeners,
      },
      image: track.image.find((i) => i.size === 'large')?.['#text'],
    };
  }
}

export default Track;
