import { request } from './request.js';

import type { AlbumSearchResponse, AlbumType } from './types';

class Album {
  constructor(private readonly token: string) {}

  /**
   * Search for an album by name.
   * @param albumName - The name of the album.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(albumName: string, limit = 30, page = 1): Promise<AlbumType[]> {
    const {
      results: { albummatches },
    } = await request<AlbumSearchResponse>({
      method: 'album.search',
      album: albumName,
      api_key: this.token,
      limit,
      page,
    });

    const { album } = albummatches;

    return album.map((album) => {
      return {
        name: album.name,
        artist: album.artist,
        url: album.url,
        image: album.image.find((i) => i.size === 'extralarge')?.['#text'],
      };
    });
  }
}

export default Album;
