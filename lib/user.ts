import type { UserGetInfoResponse, UserGetRecentTracksResponse, UserTrackType, UserType } from './types';

import { request } from './request.js';

class User {
  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');
    this.token = token;
  }

  /**
   * Fetches and returns information about a user's profile.
   * @param userName - The name of the user.
   * */
  public async fetch(userName: string): Promise<UserType> {
    const { user } = await request<UserGetInfoResponse>({
      method: 'user.getInfo',
      user: userName,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    return {
      name: user.name,
      realName: user.realname || null,
      country: user.country,
      url: user.url,
      registered: new Date(user.registered['#text'] * 1000),
      image: user.image.find((i) => i.size == 'large')?.['#text'],
    };
  }

  /**
   * Fetches and returns the most recent track listened by the user.
   * @param userName - The name of the user.
   * */
  public async fetchRecentTrack(userName: string): Promise<UserTrackType> {
    const { recenttracks } = await request<UserGetRecentTracksResponse>({
      method: 'user.getRecentTracks',
      user: userName,
      api_key: this.token,
      format: 'json',
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
