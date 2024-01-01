import { convertImageSizes, createLastFmURL } from '@utils/convert.js';
import Base from '~/base.js';

import type {
  TagGetInfoParams,
  TagGetTopAlbumsParams,
  TagGetTopArtistsParams,
  TagGetTopTracksParams,
  TagGetWeeklyChartListParams,
} from '@params/index.js';
import type {
  TagGetInfoResponse,
  TagGetTopAlbumsResponse,
  TagGetTopArtistsResponse,
  TagGetTopTracksResponse,
  TagGetWeeklyChartListResponse,
} from '@responses/index.js';
import type {
  TagGetInfoType,
  TagGetTopAlbumsType,
  TagGetTopArtistsType,
  TagGetTopTracksType,
  TagGetWeeklyChartListType,
} from '@typings/index.js';

export default class Tag extends Base {
  /**
   * Returns metadata information on a tag.
   * @param tag - The name of the tag.
   * */
  async getInfo(params: TagGetInfoParams): Promise<TagGetInfoType> {
    const { tag } = await this.sendRequest<TagGetInfoResponse>({
      method: 'tag.getInfo',
      tag: params.tag,
    });

    return {
      name: tag.name,
      description: tag.wiki.summary,
      stats: {
        count: tag.total,
        reach: tag.reach,
      },
      url: `https://www.last.fm/tag/${convertURL(tag.name)}`,
    };
  }

  /**
   * Returns popular albums that are tagged by a tag name.
   * @param tag - The name of the tag.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopAlbums(params: TagGetTopAlbumsParams): Promise<TagGetTopAlbumsType> {
    const {
      albums: { album, '@attr': attr },
    } = await this.sendRequest<TagGetTopAlbumsResponse>({
      method: 'tag.getTopAlbums',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        tag: attr.tag,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      albums: album.map((a) => ({
        rank: Number(a['@attr'].rank),
        name: a.name,
        mbid: a.mbid,
        artist: {
          name: a.artist.name,
          mbid: a.artist.mbid,
          url: a.artist.url,
        },
        url: `https://www.last.fm/music/${convertURL(a.artist.name)}/${convertURL(a.name)}`,
        image: convertImageSizes(a.image),
      })),
    };
  }

  /**
   * Returns popular artists that are tagged by a tag name.
   * @param tag - The name of the tag.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopArtists(params: TagGetTopArtistsParams): Promise<TagGetTopArtistsType> {
    const {
      topartists: { artist, '@attr': attr },
    } = await this.sendRequest<TagGetTopArtistsResponse>({
      method: 'tag.getTopArtists',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        tag: attr.tag,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      artists: artist.map((a) => ({
        rank: Number(a['@attr'].rank),
        name: a.name,
        mbid: a.mbid,
        url: a.url,
      })),
    };
  }

  /**
   * Returns popular tracks that are tagged by a tag name.
   * @param tag - The name of the tag.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopTracks(params: TagGetTopTracksParams): Promise<TagGetTopTracksType> {
    const {
      tracks: { track, '@attr': attr },
    } = await this.sendRequest<TagGetTopTracksResponse>({
      method: 'tag.getTopTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        tag: attr.tag,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: track.map((t) => ({
        rank: Number(t['@attr'].rank),
        name: t.name,
        mbid: t.mbid,
        duration: Number(t.duration),
        artist: {
          name: t.artist.name,
          mbid: t.artist.mbid,
          url: t.artist.url,
        },
        url: t.url,
      })),
    };
  }

  /**
   * Returns a list of available charts for a tag.
   * @param tag - The name of the tag.
   * */
  async getWeeklyChartList(params: TagGetWeeklyChartListParams): Promise<TagGetWeeklyChartListType> {
    const {
      weeklychartlist: { chart, '@attr': attr },
    } = await this.sendRequest<TagGetWeeklyChartListResponse>({
      method: 'tag.getWeeklyChartList',
      ...params,
    });

    return {
      search: {
        tag: attr.tag,
      },
      positions: chart.map((c) => ({
        from: new Date(Number(c.from) * 1000),
        to: new Date(Number(c.to) * 1000),
      })),
    };
  }
}
