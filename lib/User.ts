import { request } from './request.js';

import type {
  UserGetArtistsResponse,
  UserGetInfoResponse,
  UserGetRecentTracksResponse,
  UserType,
  UserArtistType,
  UserTrackType,
  UserGetFriendsResponse,
} from './types';

class User {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns information about a user's profile.
   * @param userName - The name of the user.
   * */
  async fetch(userName: string): Promise<UserType> {
    const { user } = await request<UserGetInfoResponse>({
      method: 'user.getInfo',
      user: userName,
      api_key: this.token,
      limit: 1,
    });

    return {
      name: user.name,
      realName: user.realname || null,
      country: user.country,
      url: user.url,
      registered: new Date(user.registered['#text'] * 1000),
      image: user.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
    };
  }

  /**
   * Fetches and returns a list of all the artists in a user's library.
   * @param userName - The name of the user.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchArtists(userName: string, limit = 50, page = 1): Promise<UserArtistType[]> {
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
        stats: {
          scrobbles: Number(artist.playcount),
        },
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
  async fetchFriends(userName: string, limit = 50, page = 1): Promise<UserType[]> {
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
   * Fetches and returns the most recent track listened by the user.
   * @param userName - The name of the user.
   * */
  async fetchRecentTrack(userName: string): Promise<UserTrackType> {
    const { recenttracks } = await request<UserGetRecentTracksResponse>({
      method: 'user.getRecentTracks',
      user: userName,
      api_key: this.token,
    });

    const [track] = recenttracks.track;

    return {
      currentlyPlaying: track['@attr']?.nowplaying === 'true',
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      url: track.url,
      image: track.image[3]['#text'],
    };
  }
}

export default User;
