import { convertImageSizes, convertURL } from '@utils/convert.js';
import Base from '~/base.js';
import type {
  ArtistGetInfoResponse,
  ArtistGetSimilarResponse,
  ArtistGetTopAlbumsResponse,
  ArtistGetTopTagsResponse,
  ArtistGetTopTracksResponse,
  ArtistSearchResponse,
  ArtistGetInfoType,
  ArtistSearchType,
  ArtistGetSimilarType,
  ArtistGetTopAlbumsType,
  ArtistGetTopTagsType,
  ArtistGetTopTracksType,
} from '~/types/index.js';

import type {
  ArtistGetInfoParams,
  ArtistGetSimilarParams,
  ArtistGetTopAlbumsParams,
  ArtistGetTopTagsParams,
  ArtistGetTopTracksParams,
  ArtistSearchParams,
} from '@params/artist.params.js';

export default class Artist extends Base {
  /**
   * Returns metadata information for an artist.
   * @param artist - The name of the artist.
   * @param username - The username for the context of the request. If supplied, the user's playcount for this artist is included in the response.
   * */
  async getInfo(params: ArtistGetInfoParams): Promise<ArtistGetInfoType> {
    const { artist } = await this.sendRequest<ArtistGetInfoResponse>({
      method: 'artist.getInfo',
      artist: params.artist,
      username: params.username,
    });

    return {
      name: artist.name,
      description: artist.bio.summary,
      onTour: Boolean(Number(artist.ontour)).valueOf(),
      stats: {
        scrobbles: Number(artist.stats.playcount),
        listeners: Number(artist.stats.listeners),
      },
      userStats: {
        userPlayCount: (params.username && Number(artist.stats.userplaycount)) || null,
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
      artist: params.artist,
      limit: params.limit ?? 30,
    });

    return {
      search: {
        artist: {
          name: attr.artist,
          url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
        },
      },
      artists: artist.map((artist) => ({
        match: Number(artist.match),
        name: artist.name,
        url: artist.url,
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
      artist: params.artist,
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
      albums: album.map((album) => ({
        name: album.name,
        scrobbles: Number(album.playcount),
        artist: {
          name: album.artist.name,
          url: album.artist.url,
        },
        url: album.url,
        image: convertImageSizes(album.image),
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
      artist: params.artist,
    });

    return {
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${convertURL(attr.artist)}`,
      },
      tags: tag.map((tag) => ({
        count: tag.count,
        name: tag.name,
        url: tag.url,
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
      artist: params.artist,
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
      tracks: track.map((track) => ({
        rank: Number(track['@attr'].rank),
        name: track.name,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        stats: {
          scrobbles: Number(track.playcount),
          listeners: Number(track.listeners),
        },
        url: track.url,
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
      artist: params.artist,
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
      artists: artist.map((artist) => ({
        name: artist.name,
        listeners: Number(artist.listeners),
        url: artist.url,
      })),
    };
  }
}
