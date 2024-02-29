import { convertImageSizes, createLastFmURL } from '@utils/convert.js';
import Base from '~/base.js';
import { convertSearch, sanitizeBio, toArray, toBool, toFloat, toInt } from '~/utils/caster.js';

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
      mbid: artist.mbid === '' ? undefined : artist.mbid,
      onTour: toBool(artist.ontour),
      stats: {
        scrobbles: toInt(artist.stats.playcount),
        listeners: toInt(artist.stats.listeners),
      },
      userStats: {
        userPlayCount: Number.isNaN(toInt(artist.stats.userplaycount)) ? undefined : toInt(artist.stats.userplaycount),
      },
      tags: toArray(artist.tags.tag).map((tag) => ({
        name: tag.name,
        url: tag.url,
      })),
      bio: {
        summary: sanitizeBio(artist.bio.summary),
        extended: sanitizeBio(artist.bio.content),
        published: new Date(`${artist.bio.published} UTC`),
        url: artist.bio.links.link.href,
      },
      similarArtists: toArray(artist.similar.artist).map((artist) => ({
        name: artist.name,
        image: convertImageSizes(artist.image),
        url: artist.url,
      })),
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
      similarartists: { artist: artistMatches, '@attr': attr },
    } = await this.sendRequest<ArtistGetSimilarResponse>({
      method: 'artist.getSimilar',
      ...params,
      limit: params.limit ?? 30,
    });

    return {
      search: {
        artist: {
          name: attr.artist,
          url: createLastFmURL({ type: 'artist', value: attr.artist }),
        },
      },
      artists: toArray(artistMatches).map((artist) => ({
        match: toFloat(artist.match),
        name: artist.name,
        mbid: artist.mbid === '' ? undefined : artist.mbid,
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
      topalbums: { album: albumMatches, '@attr': attr },
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
          url: createLastFmURL({ type: 'artist', value: attr.artist }),
        },
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      albums: toArray(albumMatches).map((album) => ({
        name: album.name,
        scrobbles: toInt(album.playcount),
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
      toptags: { tag: tagMatches, '@attr': attr },
    } = await this.sendRequest<ArtistGetTopTagsResponse>({
      method: 'artist.getTopTags',
      ...params,
    });

    return {
      search: {
        artist: {
          name: attr.artist,
          url: createLastFmURL({ type: 'artist', value: attr.artist }),
        },
      },
      tags: toArray(tagMatches).map((tag) => ({
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
      toptracks: { track: trackMatches, '@attr': attr },
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
          url: createLastFmURL({ type: 'artist', value: attr.artist }),
        },
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      tracks: trackMatches.map((track) => ({
        rank: toInt(track['@attr'].rank),
        name: track.name,
        mbid: track.mbid === '' ? undefined : track.mbid,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        stats: {
          scrobbles: toInt(track.playcount),
          listeners: toInt(track.listeners),
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
        artistmatches: { artist: artistMatches },
      },
    } = await this.sendRequest<ArtistSearchResponse>({
      method: 'artist.search',
      ...params,
      limit: params.limit ?? 30,
      page: params.page ?? 1,
    });

    return {
      search: convertSearch(results),
      artists: toArray(artistMatches).map((artist) => ({
        name: artist.name,
        mbid: artist.mbid === '' ? undefined : artist.mbid,
        listeners: toInt(artist.listeners),
        url: artist.url,
      })),
    };
  }
}
