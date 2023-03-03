import { request } from './request.js';

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
} from './types';

class User {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns information about a user's profile.
   * @param userName - The name of the user.
   * */
  async fetch(userName: string): Promise<UserGetInfoType> {
    const { user } = await request<UserGetInfoResponse>({
      method: 'user.getInfo',
      user: userName,
      api_key: this.token,
    });

    return {
      name: user.name,
      realName: user.realname || null,
      country: user.country,
      registered: new Date(user.registered['#text'] * 1000),
      url: user.url,
      image: user.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
    };
  }

  /**
   * Fetches and returns a list of popular artists in a user's library.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchAllArtists(userName: string, limit = 50, page = 1): Promise<UserArtistsType[]> {
    const {
      artists: { artist },
    } = await request<UserGetArtistsResponse>({
      method: 'library.getArtists',
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    return artist.map((artist) => {
      return {
        name: artist.name,
        scrobbles: Number(artist.playcount),
        url: artist.url,
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }

  /**
   * Fetches and returns a list of the user's friends.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchFriends(userName: string, limit = 50, page = 1): Promise<UserGetInfoType[]> {
    const {
      friends: { user },
    } = await request<UserGetFriendsResponse>({
      method: 'user.getFriends',
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    return user.map((user) => {
      return {
        name: user.name,
        realName: user.realname || null,
        country: user.country,
        registered: new Date(Number(user.registered.unixtime) * 1000),
        url: user.url,
        image: user.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }

  /**
   * Fetches and returns the loved tracks as set by the user.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchLovedTracks(userName: string, limit = 50, page = 1): Promise<UserLovedTracksType[]> {
    const {
      lovedtracks: { track },
    } = await request<UserGetLovedTracksResponse>({
      method: 'user.getLovedTracks',
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
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
  }

  /**
   * Fetches and returns a list of the user's personal tags.
   * @param userName - The name of the user.
   * @param tagName - The name of the tag.
   * @param tagType - The type of items which have been tagged.
   * */
  async fetchPersonalTags(userName: string, tagName: string, tagType: PersonalTagTypes): Promise<UserPersonalTagsType> {
    const { taggings } = await request<UserGetPersonalTagsResponse>({
      method: 'user.getPersonalTags',
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
          image: album.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
        };
      }),

      artist: taggings.artists?.artist.map((artist) => {
        return {
          name: artist.name,
          url: artist.url,
          image: artist.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
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
          image: track.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
        };
      }),
    };

    const response = responseTypes[tagType];

    return response as UserPersonalTagsType;
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
    } = await request<UserGetRecentTracksResponse>({
      method: 'user.getRecentTracks',
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    const tracks = track.map((track) => {
      return {
        name: track.name,
        artist: {
          name: track.artist['#text'],
          url: `https://www.last.fm/music/${encodeURIComponent(track.artist['#text'])}`,
        },
        album: track.album['#text'] || null,
        url: track.url,
        image: track.image[3]['#text'] || null,
      };
    });

    const response = {
      currentlyPlaying: track[0]['@attr']?.nowplaying === 'true',
      user: attr.user,
      url: `https://www.last.fm/user/${encodeURIComponent(attr.user)}`,
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
  async fetchTopAlbums(userName: string, limit = 50, page = 1): Promise<UserTopAlbumsType[]> {
    const {
      topalbums: { album },
    } = await request<UserGetTopAlbumsResponse>({
      method: 'user.getTopAlbums',
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    return album.map((album) => {
      return {
        rank: Number(album['@attr'].rank),
        name: album.name,
        playCount: Number(album.playcount),
        artist: {
          name: album.artist.name,
          url: album.artist.url,
        },
        url: album.url,
        image: album.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }

  /**
   * Fetches and returns a list of all the tags used by the user.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * */
  async fetchTopTags(userName: string, limit = 50): Promise<UserTopTagsType[]> {
    const {
      toptags: { tag },
    } = await request<UserGetTopTagsResponse>({
      method: 'user.getTopTags',
      user: userName,
      api_key: this.token,
      limit,
    });

    return tag.map((tag) => {
      return {
        count: Number(tag.count),
        name: tag.name,
        url: tag.url,
      };
    });
  }

  /**
   * Fetches and returns a list of popular tracks in a user's library.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(userName: string, limit = 50, page = 1): Promise<UserTopTracksType[]> {
    const {
      toptracks: { track },
    } = await request<UserGetTopTracksResponse>({
      method: 'user.getTopTracks',
      user: userName,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        stats: {
          duration: Number(track.duration),
          userPlayCount: Number(track.playcount),
        },
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: track.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }
}

export default User;
