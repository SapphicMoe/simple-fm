import { request } from './request.js';

import type { AlbumGetInfoResponse, AlbumGetInfoType, AlbumSearchResponse, AlbumType } from './types';

class Album {
  constructor(private readonly token: string) {}

  async fetch(artistName: string, albumName: string): Promise<AlbumGetInfoType> {
    const { album } = await request<AlbumGetInfoResponse>({
      method: 'album.getInfo',
      artist: artistName,
      album: albumName,
      api_key: this.token,
    });

    const tags = album.tags.tag.map((tag) => {
      return {
        name: tag.name,
        url: tag.url,
      };
    });

    const tracks = album.tracks.track.map((track) => {
      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        stats: {
          duration: Number(track.duration),
        },
        url: track.url,
      };
    });

    return {
      name: album.name,
      artist: album.artist,
      tags,
      tracks,
    };
  }

  /**
   * Search for an album by name.
   * @param albumName - The name of the album.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(albumName: string, limit = 30, page = 1): Promise<AlbumType[]> {
    const {
      results: {
        albummatches: { album },
      },
    } = await request<AlbumSearchResponse>({
      method: 'album.search',
      album: albumName,
      api_key: this.token,
      limit,
      page,
    });

    return album.map((album) => {
      return {
        name: album.name,
        artist: album.artist,
        url: album.url,
        image: album.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }
}

export default Album;
