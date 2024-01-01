import { convertImageSizes, createLastFmURL } from '@utils/convert.js';
import Base from '~/base.js';

import type {
  UserGetFriendsParams,
  UserGetInfoParams,
  UserGetLovedTracksParams,
  UserGetPersonalTagsParams,
  UserGetRecentTracksParams,
  UserGetTopAlbumsParams,
  UserGetTopArtistsParams,
  UserGetTopTagsParams,
  UserGetTopTracksParams,
} from '@params/index.js';
import type {
  UserGetFriendsResponse,
  UserGetInfoResponse,
  UserGetLovedTracksResponse,
  UserGetPersonalTagsResponse,
  UserGetRecentTracksResponse,
  UserGetTopAlbumsResponse,
  UserGetTopArtistsResponse,
  UserGetTopTagsResponse,
  UserGetTopTracksResponse,
} from '@responses/index.js';
import type {
  UserGetInfoType,
  UserGetLovedTracksType,
  UserGetPersonalTagsType,
  UserGetRecentTracksType,
  UserGetTopAlbumsType,
  UserGetTopArtistsType,
  UserGetTopTagsType,
  UserGetTopTracksType,
  UserGetFriendsType,
} from '@typings/index.js';

export default class User extends Base {
  /**
   * Returns a list of the user's friends.
   * @param username - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getFriends(params: UserGetFriendsParams): Promise<UserGetFriendsType> {
    const {
      friends: { user: userMatches, '@attr': attr },
    } = await this.sendRequest<UserGetFriendsResponse>({
      method: 'user.getFriends',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      friends: userMatches.map((user) => ({
        name: user.name,
        realName: user.realname === '' ? undefined : user.realname,
        country: user.country === 'None' ? undefined : user.country,
        registered: new Date(Number(user.registered.unixtime) * 1000),
        url: user.url,
        image: convertImageSizes(user.image),
      })),
    };
  }

  /**
   * Returns information about a user's profile.
   * @param username - The name of the user.
   * */
  async getInfo(params: UserGetInfoParams): Promise<UserGetInfoType> {
    const { user } = await this.sendRequest<UserGetInfoResponse>({
      method: 'user.getInfo',
      ...params,
    });

    return {
      name: user.name,
      realName: user.realname === '' ? undefined : user.realname,
      country: user.country === 'None' ? undefined : user.country,
      registered: new Date(user.registered['#text'] * 1000),
      stats: {
        albumCount: Number(user.album_count),
        artistCount: Number(user.artist_count),
        playCount: Number(user.playcount),
        trackCount: Number(user.track_count),
      },
      url: user.url,
      image: convertImageSizes(user.image),
    };
  }

  /**
   * Returns the loved tracks as set by the user.
   * @param username - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getLovedTracks(params: UserGetLovedTracksParams): Promise<UserGetLovedTracksType> {
    const {
      lovedtracks: { track: trackMatches, '@attr': attr },
    } = await this.sendRequest<UserGetLovedTracksResponse>({
      method: 'user.getLovedTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: trackMatches.map((track) => ({
        name: track.name,
        mbid: track.mbid,
        date: new Date(Number(track.date.uts) * 1000),
        artist: {
          name: track.artist.name,
          mbid: track.artist.mbid,
          url: track.artist.url,
        },
        url: track.url,
      })),
    };
  }

  /**
   * Returns a list of the user's personal tags.
   * @param username - The name of the user.
   * @param tag - The name of the tag.
   * @param tagType - The type of items which have been tagged.
   * */
  async getPersonalTags(params: UserGetPersonalTagsParams): Promise<UserGetPersonalTagsType> {
    const {
      taggings: { albums, artists, tracks, '@attr': attr },
    } = await this.sendRequest<UserGetPersonalTagsResponse>({
      method: 'user.getPersonalTags',
      ...params,
    });

    const responseTypes = {
      album: albums?.album.map((album) => ({
        name: album.name,
        artist: {
          name: album.artist.name,
          url: album.artist.url,
        },
        url: album.url,
      })),

      artist: artists?.artist.map((artist) => ({
        name: artist.name,
        url: artist.url,
      })),

      track: tracks?.track.map((track) => ({
        name: track.name,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
      })),
    };

    return {
      search: {
        user: attr.user,
        tag: attr.tag,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      response: responseTypes[params.tagType] || undefined,
    };
  }

  /**
   * Returns the most recent tracks listened by the user.
   * @param username - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50. Maximum is 200.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getRecentTracks(params: UserGetRecentTracksParams): Promise<UserGetRecentTracksType> {
    const {
      recenttracks: { track: trackMatches, '@attr': attr },
    } = await this.sendRequest<UserGetRecentTracksResponse>({
      method: 'user.getRecentTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        user: attr.user,
        nowPlaying: trackMatches[0]['@attr']?.nowplaying === 'true',
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: trackMatches.map((track) => ({
        dateAdded: new Date(Number(track.date.uts) * 1000),
        name: track.name,
        mbid: track.mbid === '' ? undefined : track.mbid,
        artist: {
          name: track.artist['#text'],
          url: createLastFmURL('artist', track.artist['#text']),
        },
        album: {
          name: track.album['#text'],
          mbid: track.album.mbid,
        },
        url: track.url,
        image: convertImageSizes(track.image),
      })),
    };
  }

  /**
   * Returns a list of popular albums in a user's library.
   * @param username - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopAlbums(params: UserGetTopAlbumsParams): Promise<UserGetTopAlbumsType> {
    const {
      topalbums: { album: albumMatches, '@attr': attr },
    } = await this.sendRequest<UserGetTopAlbumsResponse>({
      method: 'user.getTopAlbums',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      albums: albumMatches.map((album) => ({
        rank: Number(album['@attr'].rank),
        name: album.name,
        mbid: album.mbid,
        playCount: Number(album.playcount),
        artist: {
          name: album.artist.name,
          mbid: album.artist.mbid,
          url: album.artist.url,
        },
        url: album.url,
        image: convertImageSizes(album.image),
      })),
    };
  }

  /**
   * Returns a list of popular artists in a user's library.
   * @param username - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopArtists(params: UserGetTopArtistsParams): Promise<UserGetTopArtistsType> {
    const {
      topartists: { artist: artistMatches, '@attr': attr },
    } = await this.sendRequest<UserGetTopArtistsResponse>({
      method: 'user.getTopArtists',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      artists: artistMatches.map((artist) => ({
        rank: Number(artist['@attr'].rank),
        name: artist.name,
        mbid: artist.mbid,
        scrobbles: Number(artist.playcount),
        url: artist.url,
      })),
    };
  }

  /**
   * Returns a list of all the tags used by the user.
   * @param username - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * */
  async getTopTags(params: UserGetTopTagsParams): Promise<UserGetTopTagsType> {
    const {
      toptags: { tag: tagMatches, '@attr': attr },
    } = await this.sendRequest<UserGetTopTagsResponse>({
      method: 'user.getTopTags',
      ...params,
      limit: params.limit ?? 50,
    });

    return {
      search: {
        user: attr.user,
      },
      tags: tagMatches.map((tag) => ({
        count: Number(tag.count),
        name: tag.name,
        url: tag.url,
      })),
    };
  }

  /**
   * Returns a list of popular tracks in a user's library.
   * @param username - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async getTopTracks(params: UserGetTopTracksParams): Promise<UserGetTopTracksType> {
    const {
      toptracks: { track: trackMatches, '@attr': attr },
    } = await this.sendRequest<UserGetTopTracksResponse>({
      method: 'user.getTopTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: trackMatches.map((track) => ({
        rank: Number(track['@attr'].rank),
        name: track.name,
        mbid: track.mbid,
        stats: {
          duration: Number(track.duration),
          userPlayCount: Number(track.playcount),
        },
        artist: {
          name: track.artist.name,
          mbid: track.artist.mbid,
          url: track.artist.url,
        },
        url: track.url,
        image: convertImageSizes(track.image),
      })),
    };
  }
}
