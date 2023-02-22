import { request } from './request.js';

import type { AlbumGetInfoResponse, AlbumGetInfoType, AlbumSearchResponse, AlbumType } from './types';

class Album {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information for an artist.
   * @param artistName - The name of the artist.
   * @param albumName - The name of the album.
   * @param userName - The username for the context of the request. If supplied, the user's playcount for this artist's album is included in the response.
   */
  async fetch(artistName: string, albumName: string, userName?: string): Promise<AlbumGetInfoType> {
    const { album } = await request<AlbumGetInfoResponse>({
      method: 'album.getInfo',
      artist: artistName,
      album: albumName,
      username: userName,
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
        duration: Number(track.duration),
        url: track.url,
      };
    });

    const response = {
      name: album.name,
      artist: album.artist,
      tags,
      tracks,
    } as AlbumGetInfoType;

    if (userName) response.userPlayCount = Number(album.userplaycount);

    return response;
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
