import { convertImageSizes, createLastFmURL } from '@utils/convert.js';
import Base from '~/base.js';
import { toInt, toArray, convertSearch } from '~/utils/caster.js';

import type { AlbumGetInfoParams, AlbumGetTopTagsParams, AlbumSearchParams } from '@params/index.js';
import type { AlbumGetInfoResponse, AlbumGetTopTagsResponse, AlbumSearchResponse } from '@responses/index.js';
import type { AlbumGetInfoType, AlbumGetTopTagsType, AlbumSearchType } from '@typings/index.js';

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

    return {
      name: album.name,
      mbid: album.mbid === '' ? undefined : album.mbid,
      artist: {
        name: album.artist,
        url: createLastFmURL({ type: 'artist', value: album.artist }),
      },
      stats: {
        scrobbles: toInt(album.playcount),
        listeners: toInt(album.listeners),
      },
      userStats: {
        userPlayCount: album.userplaycount,
      },
      tags: toArray(tagMatches).map((tag) => ({
        name: tag.name,
        url: tag.url,
      })),
      tracks: toArray(trackMatches).map((track) => ({
        rank: toInt(track['@attr'].rank),
        name: track.name,
        duration: toInt(track.duration),
        url: track.url,
      })),
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
        url: createLastFmURL({ type: 'artist', value: attr.artist }),
      },
      tags: toArray(tagMatches).map((tag) => ({
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
      search: convertSearch(results),
      albums: toArray(albumMatches).map((album) => ({
        name: album.name,
        mbid: album.mbid === '' ? undefined : album.mbid,
        artist: {
          name: album.artist,
          url: createLastFmURL({ type: 'artist', value: album.artist }),
        },
        url: album.url,
        image: convertImageSizes(album.image),
      })),
    };
  }
}
