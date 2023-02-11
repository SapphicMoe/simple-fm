import type { UserType } from './types';

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
}

export default User;
