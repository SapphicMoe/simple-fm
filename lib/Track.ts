import { request } from './request.js';

import type { TrackSearchResponse, TrackType } from './types';

class Track {
  constructor(private readonly token: string) {}

  /**
   * Search for a track by name.
   * @param trackName - The name of the track.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(trackName: string, limit = 30, page = 1): Promise<TrackType[]> {
    const {
      results: {
        trackmatches: { track },
      },
    } = await request<TrackSearchResponse>({
      method: 'track.search',
      track: trackName,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      return {
        name: track.name,
        artist: track.artist,
        url: track.url,
        listeners: Number(track.listeners),
        image: track.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }
}

export default Track;
