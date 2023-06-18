import { convertImageSizes, convertURL } from '@utils/convert.js';
import Base from '~/base.js';
import type {
  AlbumGetInfoResponse,
  AlbumGetTopTagsResponse,
  AlbumSearchResponse,
  AlbumGetInfoType,
  AlbumGetTopTagsType,
  AlbumSearchType,
} from '~/types/index.js';

import type { AlbumGetInfoParams, AlbumGetTopTagsParams, AlbumSearchParams } from '@params/album.params.js';

export default class Album extends Base {
  /**
   * Returns metadata information for an artist.
   * @param artist - The name of the artist.
   * @param album - The name of the album.
   * @param username - The username for the context of the request. If supplied, the user's playcount for this artist's album is included in the response.
   */
  async getInfo(params: AlbumGetInfoParams): Promise<AlbumGetInfoType> {
    const {
      album,
      album: {
        tracks: { track },
        tags: { tag },
      },
    } = await this.sendRequest<AlbumGetInfoResponse>({
      method: 'album.getInfo',
      artist: params.artist,
      album: params.album,
      username: params.username,
    });

    const response = {
      name: album.name,
      artist: {
        name: album.artist,
        url: `https://www.last.fm/music/${convertURL(album.artist)}`,
      },
      stats: {
        scrobbles: Number(album.playcount),
        listeners: Number(album.listeners),
      },
      tags: tag.map((tag) => ({
        name: tag.name,
        url: tag.url,
      })),
      tracks: Array.isArray(track)
        ? track.map((track) => ({
            rank: Number(track['@attr'].rank),
            name: track.name,
            duration: Number(track.duration) || null,
            url: track.url,
          }))
        : {
            rank: Number(track['@attr'].rank),
            name: track.name,
            duration: Number(track.duration) || null,
            url: track.url,
          },
      url: album.url,
      image: convertImageSizes(album.image),
    } as AlbumGetInfoType;

    if (params.username) response.stats.userPlayCount = Number(album.userplaycount);

    return response;
  }

  /**
   * Returns popular tags for an album.
   * @param artist - The name of the artist.
   * @param album - The name of the album.
   */
  async getTopTags(params: AlbumGetTopTagsParams): Promise<AlbumGetTopTagsType> {
    const {
      toptags: { tag, '@attr': attr },
    } = await this.sendRequest<AlbumGetTopTagsResponse>({
      method: 'album.getTopTags',
      artist: params.artist,
      album: params.album,
    });

    return {
      name: attr.album,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      tags: tag.map((tag) => ({
        count: tag.count,
        name: tag.name,
        url: tag.url,
      })),
    } as AlbumGetTopTagsType;
  }

  /**
   * Search for an album by name.
   * @param album - The name of the album.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(params: AlbumSearchParams): Promise<AlbumSearchType> {
    const {
      results,
      results: {
        albummatches: { album },
      },
    } = await this.sendRequest<AlbumSearchResponse>({
      method: 'album.search',
      album: params.album,
      limit: params.limit ?? 30,
      page: params.page ?? 1,
    });

    return {
      search: {
        query: results['opensearch:Query'].searchTerms,
        page: Number(results['opensearch:Query'].startPage),
        itemsPerPage: Number(results['opensearch:itemsPerPage']),
        totalResults: Number(results['opensearch:totalResults']),
      },
      albums: album.map((album) => ({
        name: album.name,
        artist: {
          name: album.artist,
          url: `https://www.last.fm/music/${convertURL(album.artist)}`,
        },
        url: album.url,
        image: convertImageSizes(album.image),
      })),
    } as AlbumSearchType;
  }
}
