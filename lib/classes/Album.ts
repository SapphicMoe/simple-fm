import { request } from '../request.js';

import type {
  AlbumGetInfoResponse,
  AlbumSearchResponse,
  AlbumGetTopTagsResponse,
  AlbumGetInfoType,
  AlbumGetTopTagsType,
  AlbumSearchType,
} from '../types';

export default class Album {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information for an artist.
   * @param artistName - The name of the artist.
   * @param albumName - The name of the album.
   * @param userName - The username for the context of the request.
   * If supplied, the user's playcount for this artist's album is included in the response.
   */
  async fetch(artistName: string, albumName: string, userName?: string): Promise<AlbumGetInfoType> {
    const {
      album,
      album: {
        tags: { tag },
      },
    } = await request<AlbumGetInfoResponse>('album.getInfo', {
      artist: artistName,
      album: albumName,
      username: userName,
      api_key: this.token,
    });

    const tracks = Array.isArray(album.tracks.track)
      ? album.tracks.track.map((track) => {
          return {
            rank: Number(track['@attr'].rank),
            name: track.name,
            duration: Number(track.duration) || null,
            url: track.url,
          };
        })
      : {
          rank: Number(album.tracks.track['@attr'].rank),
          name: album.tracks.track.name,
          duration: Number(album.tracks.track.duration) || null,
          url: album.tracks.track.url,
        };

    const tags = tag.map((tag) => {
      return {
        name: tag.name,
        url: tag.url,
      };
    });

    const image = album.image.map((i) => {
      return {
        size: i.size,
        url: i['#text'],
      };
    });

    const response = {
      name: album.name,
      artist: {
        name: album.artist,
        url: `https://www.last.fm/music/${encodeURIComponent(album.artist)}`,
      },
      tags,
      tracks,
      url: album.url,
      image,
    } as AlbumGetInfoType;

    if (userName) response.userPlayCount = Number(album.userplaycount);

    return response;
  }

  /**
   * Fetches and returns popular tags for an album.
   * @param artistName - The name of the artist.
   * @param albumName - The name of the album.
   */
  async fetchTopTags(artistName: string, albumName: string): Promise<AlbumGetTopTagsType> {
    const {
      toptags: { tag, '@attr': attr },
    } = await request<AlbumGetTopTagsResponse>('album.getTopTags', {
      artist: artistName,
      album: albumName,
      api_key: this.token,
    });

    const tags = tag.map((tag) => {
      return {
        count: tag.count,
        name: tag.name,
        url: tag.url,
      };
    });

    return {
      name: attr.album,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${encodeURIComponent(attr.artist)}`,
      },
      tags,
    } as AlbumGetTopTagsType;
  }

  /**
   * Search for an album by name.
   * @param albumName - The name of the album.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(albumName: string, limit = 30, page = 1): Promise<AlbumSearchType[]> {
    const {
      results: {
        albummatches: { album },
      },
    } = await request<AlbumSearchResponse>('album.search', {
      album: albumName,
      api_key: this.token,
      limit,
      page,
    });

    return album.map((album) => {
      const image = album.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        name: album.name,
        artist: {
          name: album.artist,
          url: `https://www.last.fm/music/${encodeURIComponent(album.artist)}`,
        },
        url: album.url,
        image,
      };
    });
  }
}
