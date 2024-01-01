import { convertImageSizes, convertURL } from '@utils/convert.js';
import Base from '~/base.js';

import type { AlbumGetInfoParams, AlbumGetTopTagsParams, AlbumSearchParams } from '@params/index.js';
import type { AlbumGetInfoResponse, AlbumGetTopTagsResponse, AlbumSearchResponse } from '@responses/index.js';
import type { AlbumGetInfoType, AlbumGetTopTagsType, AlbumSearchType, TrackReturnType } from '@typings/index.js';

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
        tracks: { track: trackMatches },
        tags: { tag: tagMatches },
      },
    } = await this.sendRequest<AlbumGetInfoResponse>({
      method: 'album.getInfo',
      ...params,
    });

    const createTrackObject = (track: TrackReturnType) =>
      ({
        rank: Number(track['@attr'].rank),
        name: track.name,
        duration: Number(track.duration),
        url: track.url,
      }) satisfies AlbumGetInfoType['tracks'];

    return {
      name: album.name,
      mbid: album.mbid,
      artist: {
        name: album.artist,
        url: `https://www.last.fm/music/${convertURL(album.artist)}`,
      },
      stats: {
        scrobbles: Number(album.playcount),
        listeners: Number(album.listeners),
      },
      userStats: {
        userPlayCount: album.userplaycount,
      },
      tags: tagMatches.map((tag) => ({ name: tag.name, url: tag.url })),
      tracks: Array.isArray(trackMatches)
        ? trackMatches.map((track) => createTrackObject(track))
        : createTrackObject(trackMatches),
      url: album.url,
      image: convertImageSizes(album.image),
    };
  }

  /**
   * Returns popular tags for an album.
   * @param artist - The name of the artist.
   * @param album - The name of the album.
   */
  async getTopTags(params: AlbumGetTopTagsParams): Promise<AlbumGetTopTagsType> {
    const {
      toptags: { tag: tagMatches, '@attr': attr },
    } = await this.sendRequest<AlbumGetTopTagsResponse>({
      method: 'album.getTopTags',
      ...params,
    });

    return {
      name: attr.album,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      tags: tagMatches.map((tag) => ({
        count: tag.count,
        name: tag.name,
        url: tag.url,
      })),
    };
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
        albummatches: { album: albumMatches },
      },
    } = await this.sendRequest<AlbumSearchResponse>({
      method: 'album.search',
      ...params,
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
      albums: albumMatches.map((album) => ({
        name: album.name,
        mbid: album.mbid === '' ? undefined : album.mbid,
        artist: {
          name: album.artist,
          url: `https://www.last.fm/music/${convertURL(album.artist)}`,
        },
        url: album.url,
        image: convertImageSizes(album.image),
      })),
    };
  }
}
