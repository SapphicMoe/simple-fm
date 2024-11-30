import { convertImageSizes, createLastFmURL } from '@utils/convert.js';
import Base from '~/base.js';
import { toArray, toBool, toInt } from '~/utils/caster.js';

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
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      friends: toArray(userMatches).map((user) => ({
        name: user.name,
        realName: user.realname || undefined,
        country: user.country === 'None' ? undefined : user.country,
        type: user.type,
        subscriber: toBool(user.subscriber),
        registered: new Date(toInt(user.registered.unixtime) * 1000),
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
      realName: user.realname || undefined,
      country: user.country === 'None' ? undefined : user.country,
      type: user.type,
      subscriber: toBool(user.subscriber),
      registered: new Date(user.registered['#text'] * 1000),
      stats: {
        albumCount: toInt(user.album_count),
        artistCount: toInt(user.artist_count),
        playCount: toInt(user.playcount),
        trackCount: toInt(user.track_count),
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
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      tracks: toArray(trackMatches).map((track) => ({
        name: track.name,
        mbid: track.mbid || undefined,
        date: new Date(toInt(track.date.uts) * 1000),
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
   * Returns a list of the user's personal tags.
   * @param username - The name of the user.
   * @param tag - The name of the tag.
   * @param tagType - The type of items which have been tagged.
   * */
  async getPersonalTags(params: UserGetPersonalTagsParams): Promise<UserGetPersonalTagsType> {
    const {
      taggings: {
        albums: { album: albumMatches } = { album: undefined },
        artists: { artist: artistMatches } = { artist: undefined },
        tracks: { track: trackMatches } = { track: undefined },
        '@attr': attr,
      },
    } = await this.sendRequest<UserGetPersonalTagsResponse>({
      method: 'user.getPersonalTags',
      ...params,
    });

    const responseTypes = {
      album: toArray(albumMatches).map((album) => ({
        name: album?.name,
        mbid: album?.mbid || undefined,
        artist: {
          name: album?.artist.name,
          mbid: album?.artist.mbid || undefined,
          url: album?.artist.url,
        },
        url: album?.url,
      })),

      artist: toArray(artistMatches).map((artist) => ({
        name: artist?.name,
        mbid: artist?.mbid || undefined,
        url: artist?.url,
      })),

      track: toArray(trackMatches).map((track) => ({
        name: track?.name,
        mbid: track?.mbid || undefined,
        artist: {
          name: track?.artist.name,
          mbid: track?.artist.mbid || undefined,
          url: track?.artist.url,
        },
        url: track?.url,
      })),
    };

    return {
      search: {
        user: attr.user,
        tag: attr.tag,
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      response: responseTypes[params.taggingtype],
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
        nowPlaying: !!toBool(trackMatches[0]['@attr']?.nowplaying),
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      tracks: toArray(trackMatches).map((track) => ({
        name: track.name,
        mbid: track.mbid || undefined,
        artist: {
          name: track.artist['#text'],
          mbid: track.artist.mbid || undefined,
          url: createLastFmURL({ type: 'artist', value: track.artist['#text'] }),
        },
        album: {
          name: track.album['#text'],
          mbid: track.album.mbid || undefined,
        },
        url: track.url || undefined,
        timestamp: track.date ? new Date(toInt(track.date.uts) * 1000) : undefined,
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
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      albums: toArray(albumMatches).map(
        (album) =>
          ({
            rank: toInt(album['@attr'].rank),
            name: album.name,
            mbid: album.mbid || undefined,
            playCount: toInt(album.playcount),
            artist: {
              name: album.artist.name,
              mbid: album.artist.mbid || undefined,
              url: album.artist.url,
            },
            url: album.url,
            image: convertImageSizes(album.image),
          }) satisfies UserGetTopAlbumsType['albums'][number]
      ),
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
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      artists: toArray(artistMatches).map(
        (artist) =>
          ({
            rank: toInt(artist['@attr'].rank),
            name: artist.name,
            mbid: artist.mbid || undefined,
            scrobbles: toInt(artist.playcount),
            url: artist.url,
          }) satisfies UserGetTopArtistsType['artists'][number]
      ),
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
      tags: toArray(tagMatches).map(
        (tag) =>
          ({
            count: toInt(tag.count),
            name: tag.name,
            url: tag.url,
          }) satisfies UserGetTopTagsType['tags'][number]
      ),
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
        page: toInt(attr.page),
        itemsPerPage: toInt(attr.perPage),
        totalPages: toInt(attr.totalPages),
        totalResults: toInt(attr.total),
      },
      tracks: toArray(trackMatches).map(
        (track) =>
          ({
            rank: toInt(track['@attr'].rank),
            name: track.name,
            mbid: track.mbid || undefined,
            stats: {
              duration: toInt(track.duration),
              userPlayCount: toInt(track.playcount),
            },
            artist: {
              name: track.artist.name,
              mbid: track.artist.mbid || undefined,
              url: track.artist.url,
            },
            url: track.url,
            image: convertImageSizes(track.image),
          }) satisfies UserGetTopTracksType['tracks'][number]
      ),
    };
  }
}
