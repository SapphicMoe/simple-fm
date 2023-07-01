import { convertImageSizes, convertURL } from '@utils/convert.js';
import Base from '~/base.js';
import type {
  Album,
  Artist,
  TrackGetInfoResponse,
  TrackGetSimilarResponse,
  TrackGetTopTagsResponse,
  TrackSearchResponse,
  TrackGetInfoType,
  TrackGetSimilarType,
  TrackGetTopTagsType,
  TrackSearchType,
} from '~/types/index.js';

import type {
  TrackGetInfoParams,
  TrackGetSimilarParams,
  TrackGetTopTagsParams,
  TrackSearchParams,
} from '@params/track.params.js';

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
        toptags: { tag },
      },
    } = await this.sendRequest<TrackGetInfoResponse>({
      method: 'track.getInfo',
      artist: params.artist,
      track: params.track,
      username: params.username,
    });

    const response = {
      name: track.name,
      duration: Number(track.duration) || null,
      stats: {
        scrobbles: Number(track.playcount),
        listeners: Number(track.listeners),
      },
      artist: {
        name: track.artist.name,
        url: track.artist.url,
      },
      album: {
        position: Number(album?.['@attr']?.position) || null,
        name: album?.title || null,
        image: convertImageSizes((album as Album).image),
        url: album?.url || null,
      },
      tags: tag.map((tag) => ({
        name: tag.name,
        url: tag.url,
      })),
      url: track.url,
    };

    if (params.username) {
      response.stats.userPlayCount = Number(track.userplaycount);
      response.stats.userLoved = Boolean(Number(track.userloved)).valueOf();
    }

    return response;
  }

  /**
   * Returns similar tracks for this track.
   * @param artist - The name of the artist.
   * @param track - The name of the track.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   */
  async getSimilar(params: TrackGetSimilarParams): Promise<TrackGetSimilarType> {
    const {
      similartracks: { track, '@attr': attr },
    } = await this.sendRequest<TrackGetSimilarResponse>({
      method: 'track.getSimilar',
      artist: params.artist,
      track: params.track,
      limit: params.limit ?? 30,
    });

    return {
      name: params.track,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      url: `https://www.last.fm/music/${convertURL(attr.artist)}/_/${convertURL(params.track)}`,
      tracks: track.map((track) => ({
        match: Number(track.match),
        name: track.name,
        duration: Number(track.duration) || null,
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
  async getTopTags(parmas: TrackGetTopTagsParams): Promise<TrackGetTopTagsType> {
    const {
      toptags: { tag, '@attr': attr },
    } = await this.sendRequest<TrackGetTopTagsResponse>({
      method: 'track.getTopTags',
      artist: parmas.artist,
      track: parmas.track,
    });

    return {
      name: attr.track,
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      url: `https://www.last.fm/music/${convertURL(attr.artist)}/_/${convertURL(attr.track)}`,
      tags: tag.map((tag) => ({
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
        trackmatches: { track },
      },
    } = await this.sendRequest<TrackSearchResponse>({
      method: 'track.search',
      track: params.track,
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
      tracks: track.map((track) => ({
        name: track.name,
        listeners: Number(track.listeners),
        artist: {
          name: track.artist,
          url: `https://www.last.fm/music/${convertURL(track.artist)}`,
        },
        url: track.url,
      })),
    };
  }
}
