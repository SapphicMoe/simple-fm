import { convertImageSizes, convertURL } from '@utils/convert.js';
import Base from '~/base.js';

import type {
  ArtistGetInfoParams,
  ArtistGetSimilarParams,
  ArtistGetTopAlbumsParams,
  ArtistGetTopTagsParams,
  ArtistGetTopTracksParams,
  ArtistSearchParams,
} from '@params/index.js';
import type {
  ArtistGetInfoResponse,
  ArtistGetSimilarResponse,
  ArtistGetTopAlbumsResponse,
  ArtistGetTopTagsResponse,
  ArtistGetTopTracksResponse,
  ArtistSearchResponse,
} from '@responses/index.js';
import type {
  ArtistGetInfoType,
  ArtistSearchType,
  ArtistGetSimilarType,
  ArtistGetTopAlbumsType,
  ArtistGetTopTagsType,
  ArtistGetTopTracksType,
} from '@typings/index.js';

export default class Artist extends Base {
  /**
   * Returns metadata information for an artist.
   * @param artist - The name of the artist.
   * @param username - The username for the context of the request. If supplied, the user's playcount for this artist is included in the response.
   * */
  async getInfo(params: ArtistGetInfoParams): Promise<ArtistGetInfoType> {
    const { artist } = await this.sendRequest<ArtistGetInfoResponse>({
      method: 'artist.getInfo',
      ...params,
    });

    return {
      name: artist.name,
      mbid: artist.mbid,
      description: artist.bio.summary,
      onTour: Boolean(Number(artist.ontour)).valueOf(),
      stats: {
        scrobbles: Number(artist.stats.playcount),
        listeners: Number(artist.stats.listeners),
      },
      userStats: {
        userPlayCount: Number(artist.stats.userplaycount),
      },
      url: artist.url,
    };
  }

  /**
   * Returns similar artists to this artist.
   * @param artist - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * */
  async getSimilar(params: ArtistGetSimilarParams): Promise<ArtistGetSimilarType> {
    const {
      similarartists: { artist, '@attr': attr },
    } = await this.sendRequest<ArtistGetSimilarResponse>({
      method: 'artist.getSimilar',
      ...params,
      limit: params.limit ?? 30,
    });

    return {
      search: {
        artist: {
          name: attr.artist,
          url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
        },
      },
      artists: artist.map((a) => ({
        match: Number(a.match),
        name: a.name,
        mbid: a.mbid,
        url: a.url,
      })),
    };
  }

  /**
   * Returns popular albums for an artist.
   * @param artist - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopAlbums(params: ArtistGetTopAlbumsParams): Promise<ArtistGetTopAlbumsType> {
    const {
      topalbums: { album, '@attr': attr },
    } = await this.sendRequest<ArtistGetTopAlbumsResponse>({
      method: 'artist.getTopAlbums',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        artist: {
          name: attr.artist,
          url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
        },
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      albums: album.map((a) => ({
        name: a.name,
        scrobbles: Number(a.playcount),
        artist: {
          name: a.artist.name,
          url: a.artist.url,
        },
        url: a.url,
        image: convertImageSizes(a.image),
      })),
    };
  }

  /**
   * Returns popular tags for an artist.
   * @param artist - The name of the artist.
   * */
  async getTopTags(params: ArtistGetTopTagsParams): Promise<ArtistGetTopTagsType> {
    const {
      toptags: { tag, '@attr': attr },
    } = await this.sendRequest<ArtistGetTopTagsResponse>({
      method: 'artist.getTopTags',
      ...params,
    });

    return {
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      tags: tag.map((t) => ({
        count: t.count,
        name: t.name,
        url: t.url,
      })),
    };
  }

  /**
   * Returns popular tracks for an artist.
   * @param artist - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopTracks(params: ArtistGetTopTracksParams): Promise<ArtistGetTopTracksType> {
    const {
      toptracks: { track, '@attr': attr },
    } = await this.sendRequest<ArtistGetTopTracksResponse>({
      method: 'artist.getTopTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        artist: {
          name: attr.artist,
          url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
        },
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: track.map((t) => ({
        rank: Number(t['@attr'].rank),
        name: t.name,
        mbid: t.mbid,
        artist: {
          name: t.artist.name,
          url: t.artist.url,
        },
        stats: {
          scrobbles: Number(t.playcount),
          listeners: Number(t.listeners),
        },
        url: t.url,
      })),
    };
  }

  /**
   * Search for an artist by name.
   * @param artist - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(params: ArtistSearchParams): Promise<ArtistSearchType> {
    const {
      results,
      results: {
        artistmatches: { artist },
      },
    } = await this.sendRequest<ArtistSearchResponse>({
      method: 'artist.search',
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
      artists: artist.map((a) => ({
        name: a.name,
        mbid: a.mbid,
        listeners: Number(a.listeners),
        url: a.url,
      })),
    };
  }
}
