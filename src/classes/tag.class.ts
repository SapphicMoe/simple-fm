import { convertImageSizes, createLastFmURL } from '@utils/convert.js';
import Base from '~/base.js';
import { toArray, toInt } from '~/utils/caster.js';

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
      url: createLastFmURL({ type: 'tag', value: tag.name }),
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
      albums: { album: albumMatches, '@attr': attr },
    } = await this.sendRequest<TagGetTopAlbumsResponse>({
      method: 'tag.getTopAlbums',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        tag: attr.tag,
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      albums: toArray(albumMatches).map((album) => ({
        rank: toInt(album['@attr'].rank),
        name: album.name,
        mbid: album.mbid || undefined,
        artist: {
          name: album.artist.name,
          mbid: album.artist.mbid || undefined,
          url: album.artist.url,
        },
        url: createLastFmURL({ type: 'album', value: album.artist.name, album: album.name }),
        image: convertImageSizes(album.image),
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
      topartists: { artist: artistMatches, '@attr': attr },
    } = await this.sendRequest<TagGetTopArtistsResponse>({
      method: 'tag.getTopArtists',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        tag: attr.tag,
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      artists: toArray(artistMatches).map((artist) => ({
        rank: Number(artist['@attr'].rank),
        name: artist.name,
        mbid: artist.mbid || undefined,
        url: artist.url,
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
      tracks: { track: trackMatches, '@attr': attr },
    } = await this.sendRequest<TagGetTopTracksResponse>({
      method: 'tag.getTopTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        tag: attr.tag,
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      tracks: toArray(trackMatches).map((track) => ({
        rank: toInt(track['@attr'].rank),
        name: track.name,
        mbid: track.mbid || undefined,
        duration: toInt(track.duration),
        artist: {
          name: track.artist.name,
          mbid: track.artist.mbid || undefined,
          url: track.artist.url,
        },
        url: track.url,
      })),
    };
  }

  /**
   * Returns a list of available charts for a tag.
   * @param tag - The name of the tag.
   * */
  async getWeeklyChartList(params: TagGetWeeklyChartListParams): Promise<TagGetWeeklyChartListType> {
    const {
      weeklychartlist: { chart: chartMatches, '@attr': attr },
    } = await this.sendRequest<TagGetWeeklyChartListResponse>({
      method: 'tag.getWeeklyChartList',
      ...params,
    });

    return {
      search: {
        tag: attr.tag,
      },
      positions: toArray(chartMatches).map((chart) => ({
        from: new Date(toInt(chart.from) * 1000),
        to: new Date(toInt(chart.to) * 1000),
      })),
    };
  }
}
