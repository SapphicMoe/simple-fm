import { convertImageSizes, convertURL } from '@utils/convert.js';
import Base from '~/base.js';

import type {
  TrackGetInfoParams,
  TrackGetSimilarParams,
  TrackGetTopTagsParams,
  TrackSearchParams,
} from '@params/index.js';
import type {
  TrackGetInfoResponse,
  TrackGetSimilarResponse,
  TrackGetTopTagsResponse,
  TrackSearchResponse,
} from '@responses/index.js';
import type { TrackGetInfoType, TrackGetSimilarType, TrackGetTopTagsType, TrackSearchType } from '@typings/index.js';

export default class Track extends Base {
  /**
   * Returns metadata information for a track.
   * @param artist - The name of the artist.
   * @param track - The name of the track.
   * @param username - The username for the context of the request. If supplied, the user's playcount for this track and whether they have loved the track is included in the response.
   */
  async getInfo(params: TrackGetInfoParams): Promise<TrackGetInfoType> {
    const {
      track,
      track: {
        album,
        toptags: { tag: tagMatches },
      },
    } = await this.sendRequest<TrackGetInfoResponse>({
      method: 'track.getInfo',
      ...params,
    });

    return {
      name: track.name,
      mbid: track.mbid,
      duration: Number(track.duration),
      stats: {
        scrobbles: Number(track.playcount),
        listeners: Number(track.listeners),
      },
      userStats: {
        userLoved: Boolean(Number(track.userloved)).valueOf(),
        userPlayCount: Number(track.userplaycount),
      },
      artist: {
        name: track.artist.name,
        mbid: track.artist.mbid,
        url: track.artist.url,
      },
      album: {
        position: Number(album?.['@attr']?.position),
        name: album?.title,
        mbid: album?.mbid,
        image: convertImageSizes(album?.image),
        url: album?.url,
      },
      tags: tagMatches.map((tag) => ({
        name: tag.name,
        url: tag.url,
      })),
      url: track.url,
    };
  }

  /**
   * Returns similar tracks for this track.
   * @param artist - The name of the artist.
   * @param track - The name of the track.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   */
  async getSimilar(params: TrackGetSimilarParams): Promise<TrackGetSimilarType> {
    const {
      similartracks: { track: trackMatches, '@attr': attr },
    } = await this.sendRequest<TrackGetSimilarResponse>({
      method: 'track.getSimilar',
      ...params,
      limit: params.limit ?? 30,
    });

    return {
      name: params.track,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      url: `https://www.last.fm/music/${convertURL(attr.artist)}/_/${convertURL(params.track)}`,
      tracks: trackMatches.map((track) => ({
        match: Number(track.match),
        name: track.name,
        duration: Number(track.duration),
        scrobbles: Number(track.playcount),
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: convertImageSizes(track.image),
      })),
    };
  }

  /**
   * Returns popular tags for a track.
   * @param artist - The name of the artist.
   * @param track - The name of the track.
   */
  async getTopTags(params: TrackGetTopTagsParams): Promise<TrackGetTopTagsType> {
    const {
      toptags: { tag: tagMatches, '@attr': attr },
    } = await this.sendRequest<TrackGetTopTagsResponse>({
      method: 'track.getTopTags',
      ...params,
    });

    return {
      name: attr.track,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      url: `https://www.last.fm/music/${convertURL(attr.artist)}/_/${convertURL(attr.track)}`,
      tags: tagMatches.map((tag) => ({
        count: Number(tag.count),
        name: tag.name,
        url: tag.url,
      })),
    };
  }

  /**
   * Search for a track by name.
   * @param track - The name of the track.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(params: TrackSearchParams): Promise<TrackSearchType> {
    const {
      results,
      results: {
        trackmatches: { track: trackMatches },
      },
    } = await this.sendRequest<TrackSearchResponse>({
      method: 'track.search',
      ...params,
      limit: params.limit ?? 30,
      page: params.page ?? 1,
    });

    return {
      search: {
        query: params.track,
        page: Number(results['opensearch:Query'].startPage),
        itemsPerPage: Number(results['opensearch:itemsPerPage']),
        totalResults: Number(results['opensearch:totalResults']),
      },
      tracks: trackMatches.map((track) => ({
        name: track.name,
        mbid: track.mbid,
        listeners: Number(track.listeners),
        artist: {
          name: track.artist,
          url: `https://www.last.fm/music/${convertURL(t.artist)}`,
        },
        url: track.url,
      })),
    };
  }
}
