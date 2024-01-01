import { convertImageSizes, convertURL } from '@utils/convert.js';
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
      friends: { user, '@attr': attr },
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
      friends: user.map((u) => ({
        name: u.name,
        realName: u.realname === '' ? undefined : u.realname,
        country: u.country === 'None' ? undefined : u.country,
        registered: new Date(Number(u.registered.unixtime) * 1000),
        url: u.url,
        image: convertImageSizes(u.image),
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
      lovedtracks: { track, '@attr': attr },
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
      tracks: track.map((t) => ({
        name: t.name,
        mbid: t.mbid,
        date: new Date(Number(t.date.uts) * 1000),
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
      album: albums?.album.map((a) => ({
        name: a.name,
        artist: {
          name: a.artist.name,
          url: a.artist.url,
        },
        url: a.url,
      })),

      artist: artists?.artist.map((a) => ({
        name: a.name,
        url: a.url,
      })),

      track: tracks?.track.map((t) => ({
        name: t.name,
        artist: {
          name: t.artist.name,
          url: t.artist.url,
        },
        url: t.url,
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
      recenttracks: { track, '@attr': attr },
    } = await this.sendRequest<UserGetRecentTracksResponse>({
      method: 'user.getRecentTracks',
      ...params,
      limit: params.limit ?? 50,
      page: params.page ?? 1,
    });

    return {
      search: {
        user: attr.user,
        nowPlaying: track[0]['@attr']?.nowplaying === 'true',
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks: track.map((t) => ({
        dateAdded: new Date(Number(t.date.uts) * 1000),
        name: t.name,
        mbid: t.mbid,
        artist: {
          name: t.artist['#text'],
          url: `https://www.last.fm/music/${convertURL(t.artist['#text'])}`,
        },
        album: {
          name: t.album['#text'],
          mbid: t.album.mbid,
        },
        url: t.url,
        image: convertImageSizes(t.image),
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
      topalbums: { album, '@attr': attr },
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
      albums: album.map((a) => ({
        rank: Number(a['@attr'].rank),
        name: a.name,
        mbid: a.mbid,
        playCount: Number(a.playcount),
        artist: {
          name: a.artist.name,
          mbid: a.artist.mbid,
          url: a.artist.url,
        },
        url: a.url,
        image: convertImageSizes(a.image),
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
      topartists: { artist, '@attr': attr },
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
      artists: artist.map((a) => ({
        rank: Number(a['@attr'].rank),
        name: a.name,
        mbid: a.mbid,
        scrobbles: Number(a.playcount),
        url: a.url,
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
      toptags: { tag, '@attr': attr },
    } = await this.sendRequest<UserGetTopTagsResponse>({
      method: 'user.getTopTags',
      ...params,
      limit: params.limit ?? 50,
    });

    return {
      search: {
        user: attr.user,
      },
      tags: tag.map((t) => ({
        count: Number(t.count),
        name: t.name,
        url: t.url,
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
      toptracks: { track, '@attr': attr },
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
      tracks: track.map((t) => ({
        rank: Number(t['@attr'].rank),
        name: t.name,
        mbid: t.mbid,
        stats: {
          duration: Number(t.duration),
          userPlayCount: Number(t.playcount),
        },
        artist: {
          name: t.artist.name,
          mbid: t.artist.mbid,
          url: t.artist.url,
        },
        url: t.url,
        image: convertImageSizes(t.image),
      })),
    };
  }
}
