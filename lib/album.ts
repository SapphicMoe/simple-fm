import type { AlbumType } from './types';

import { request } from './request.js';

class Album {
  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');
    this.token = token;
  }

  public async fetch(albumName: string) {
    const {
      results: { albummatches },
    } = await request({
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
      image: album.image[3]['#text'],
    } as AlbumType;
  }
}

export default Album;
