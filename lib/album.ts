import { request } from './request.js';

import type { AlbumSearchResponse, AlbumType } from './types';

class Album {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns information on an album.
   * @param albumName - The name of the album.
   * */
  async fetch(albumName: string): Promise<AlbumType> {
    const {
      results: { albummatches },
    } = await request<AlbumSearchResponse>({
      method: 'album.search',
      album: albumName,
      api_key: this.token,
      limit: 1,
    });

    const [album] = albummatches.album;

    return {
      name: album.name,
      artist: album.artist,
      url: album.url,
      // Just in case it's possible for it to not exist?
      image: album.image.find((i) => i.size === 'large')?.['#text'],
    };
  }
}

export default Album;
