import { request } from '../request.js';
import { sanitizeURL } from '../utils/links.js';

import type {
  PersonalTagTypes,
  UserGetArtistsResponse,
  UserGetFriendsResponse,
  UserGetInfoResponse,
  UserGetLovedTracksResponse,
  UserGetPersonalTagsResponse,
  UserGetRecentTracksResponse,
  UserGetTopAlbumsResponse,
  UserGetTopTagsResponse,
  UserGetTopTracksResponse,
  UserArtistsType,
  UserGetInfoType,
  UserLovedTracksType,
  UserPersonalTagsType,
  UserRecentTrackType,
  UserTopAlbumsType,
  UserTopTagsType,
  UserTopTracksType,
  UserFriendsType,
} from '../types/index.js';

export default class User {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns information about a user's profile.
   * @param userName - The name of the user.
   * */
  async fetch(userName: string): Promise<UserGetInfoType> {
    const { user } = await request<UserGetInfoResponse>('user.getInfo', {
      user: userName,
      api_key: this.token,
    });

    const image = user.image.map((i) => {
      return {
        size: i.size,
        url: i['#text'],
      };
    });

    return {
      name: user.name,
      realName: user.realname || null,
      country: user.country,
      registered: new Date(user.registered['#text'] * 1000),
      url: user.url,
      image,
    };
  }

  /**
   * Fetches and returns a list of popular artists in a user's library.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchAllArtists(userName: string, limit = 50, page = 1): Promise<UserArtistsType> {
    const {
      artists: { artist, '@attr': attr },
    } = await request<UserGetArtistsResponse>('library.getArtists', {
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    const artists = artist.map((artist) => {
      return {
        name: artist.name,
        scrobbles: Number(artist.playcount),
        url: artist.url,
      };
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      artists,
    } as UserArtistsType;
  }

  /**
   * Fetches and returns a list of the user's friends.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchFriends(userName: string, limit = 50, page = 1): Promise<UserFriendsType> {
    const {
      friends: { user, '@attr': attr },
    } = await request<UserGetFriendsResponse>('user.getFriends', {
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    const friends = user.map((user) => {
      const image = user.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        name: user.name,
        realName: user.realname || null,
        country: user.country,
        registered: new Date(Number(user.registered.unixtime) * 1000),
        url: user.url,
        image,
      };
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      friends,
    } as UserFriendsType;
  }

  /**
   * Fetches and returns the loved tracks as set by the user.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchLovedTracks(userName: string, limit = 50, page = 1): Promise<UserLovedTracksType> {
    const {
      lovedtracks: { track, '@attr': attr },
    } = await request<UserGetLovedTracksResponse>('user.getLovedTracks', {
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    const tracks = track.map((track) => {
      return {
        name: track.name,
        date: new Date(Number(track.date.uts) * 1000),
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
      };
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks,
    } as UserLovedTracksType;
  }

  /**
   * Fetches and returns a list of the user's personal tags.
   * @param userName - The name of the user.
   * @param tagName - The name of the tag.
   * @param tagType - The type of items which have been tagged.
   * */
  async fetchPersonalTags(userName: string, tagName: string, tagType: PersonalTagTypes): Promise<UserPersonalTagsType> {
    const {
      taggings,
      taggings: { '@attr': attr },
    } = await request<UserGetPersonalTagsResponse>('user.getPersonalTags', {
      user: userName,
      tag: tagName,
      taggingtype: tagType,
      api_key: this.token,
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!tagType) throw new Error('No method was selected.');

    const responseTypes = {
      album: taggings.albums?.album.map((album) => {
        return {
          name: album.name,
          artist: {
            name: album.artist.name,
            url: album.artist.url,
          },
          url: album.url,
        };
      }),

      artist: taggings.artists?.artist.map((artist) => {
        return {
          name: artist.name,
          url: artist.url,
        };
      }),

      track: taggings.tracks?.track.map((track) => {
        return {
          name: track.name,
          artist: {
            name: track.artist.name,
            url: track.artist.url,
          },
          url: track.url,
        };
      }),
    };

    const response = responseTypes[tagType];

    return {
      search: {
        user: attr.user,
        tag: attr.tag,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      response,
    } as UserPersonalTagsType;
  }

  /**
   * Fetches and returns the most recent tracks listened by the user.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50. Maximum is 200.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchRecentTracks(userName: string, limit = 50, page = 1): Promise<UserRecentTrackType> {
    const {
      recenttracks: { track, '@attr': attr },
    } = await request<UserGetRecentTracksResponse>('user.getRecentTracks', {
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    const tracks = track.map((track) => {
      const image = track.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        name: track.name,
        artist: {
          name: track.artist['#text'],
          url: `https://www.last.fm/music/${sanitizeURL(track.artist['#text'])}`,
        },
        album: track.album['#text'] || null,
        url: track.url,
        image,
      };
    });

    const response = {
      search: {
        user: attr.user,
        nowPlaying: track[0]['@attr']?.nowplaying === 'true',
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },

      tracks,
    };

    return response as UserRecentTrackType;
  }

  /**
   * Fetches and returns a list of popular albums in a user's library.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopAlbums(userName: string, limit = 50, page = 1): Promise<UserTopAlbumsType> {
    const {
      topalbums: { album, '@attr': attr },
    } = await request<UserGetTopAlbumsResponse>('user.getTopAlbums', {
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    const albums = album.map((album) => {
      const image = album.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        rank: Number(album['@attr'].rank),
        name: album.name,
        playCount: Number(album.playcount),
        artist: {
          name: album.artist.name,
          url: album.artist.url,
        },
        url: album.url,
        image,
      };
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      albums,
    } as UserTopAlbumsType;
  }

  /**
   * Fetches and returns a list of all the tags used by the user.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * */
  async fetchTopTags(userName: string, limit = 50): Promise<UserTopTagsType> {
    const {
      toptags: { tag, '@attr': attr },
    } = await request<UserGetTopTagsResponse>('user.getTopTags', {
      user: userName,
      api_key: this.token,
      limit,
    });

    const tags = tag.map((tag) => {
      return {
        count: Number(tag.count),
        name: tag.name,
        url: tag.url,
      };
    });

    return {
      search: {
        user: attr.user,
      },
      tags,
    } as UserTopTagsType;
  }

  /**
   * Fetches and returns a list of popular tracks in a user's library.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(userName: string, limit = 50, page = 1): Promise<UserTopTracksType> {
    const {
      toptracks: { track, '@attr': attr },
    } = await request<UserGetTopTracksResponse>('user.getTopTracks', {
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    const tracks = track.map((track) => {
      const image = track.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        stats: {
          duration: Number(track.duration) || null,
          userPlayCount: Number(track.playcount),
        },
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image,
      };
    });

    return {
      search: {
        user: attr.user,
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks,
    } as UserTopTracksType;
  }
}
