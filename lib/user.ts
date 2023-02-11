import type { TrackType, UserType } from './types';

import { APIRequest } from './request.js';
const request = new APIRequest();

class User {
  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');
    this.token = token;
  }

  public async fetch(userName: string) {
    const { user } = await request.fetch({
      method: 'user.getInfo',
      user: userName,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    return {
      name: user.name || null,
      realName: user.realname || null,
      country: user.country || null,
      url: user.url || null,
      registered: new Date(user.registered['#text'] * 1000) || null,
      image: user.image[3]['#text'] || null,
    } as UserType;
  }

  public async fetchRecentTrack(userName: string) {
    const { recenttracks } = await request.fetch({
      method: 'user.getRecentTracks',
      user: userName,
      api_key: this.token,
      format: 'json',
    });

    const [track] = recenttracks.track;

    return {
      currentlyPlaying: JSON.parse(track['@attr'].nowplaying),
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      url: track.url,
      image: track.image[3]['#text'],
    } as TrackType;
  }
}

export default User;
