import type { AlbumSearchResponse, AlbumType } from './types';

import { request } from './request.js';

class Album {
  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');
    this.token = token;
  }

  /**
   * Fetches and returns information on an album.
   * @param albumName - The name of the album.
   * */
  public async fetch(albumName: string): Promise<AlbumType> {
    const {
      results: { albummatches },
    } = await request<AlbumSearchResponse>({
      method: 'album.search',
      album: albumName,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    const [album] = albummatches.album;

    return {
      name: album.name,
      artist: album.artist,
      url: album.url,
      // Just in case it's possible for it to not exist?
      image: album.image.find((i) => i.size == 'large')?.['#text'],
    };
  }
}

export default Album;
