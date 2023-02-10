import { $fetch, SearchParameters } from 'ofetch';
import type { Tag, Track } from './types';

export class LastFMClient {
  constructor(private token: string) {
    this.token = token;
  }

  private async request(params: SearchParameters) {
    const baseURL = 'https://ws.audioscrobbler.com/2.0';
    const data = await $fetch(baseURL, { params });

    return data;
  }

  public async fetchTrack(name: string) {
    const {
      results: { trackmatches },
    } = await this.request({ method: 'track.search', track: name, api_key: this.token, format: 'json', limit: 1 });

    const [track] = trackmatches.track;

    return {
      name: track.name,
      artist: track.artist,
      url: track.url,
      listeners: track.listeners,
      image: track.image[3]['#text'],
    };
  }

  public async fetchAlbum(name: string) {
    const {
      results: { albummatches },
    } = await this.request({ method: 'album.search', album: name, api_key: this.token, format: 'json', limit: 1 });

    const [album] = albummatches.album;

    return {
      name: album.name,
      artist: album.artist,
      url: album.url,
      image: album.image[3]['#text'],
    };
  }

  public async fetchArtist(name: string) {
    const { artist } = await this.request({
      method: 'artist.getinfo',
      artist: name,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    return {
      name: artist.name,
      url: artist.url || null,
      bio: artist.bio.summary || null,
      scrobbles: artist.stats.playcount || null,
      listeners: artist.stats.listeners || null,
    };
  }

  public async fetchArtistTags(name: string) {
    const {
      toptags: { tag },
    } = await this.request({
      method: 'artist.getTopTags',
      artist: name,
      api_key: this.token,
      format: 'json',
    });

    return tag.map((tag: Tag) => {
      return {
        name: tag.name,
        link: tag?.url,
        timesRanked: tag?.count,
      };
    });
  }

  public async fetchArtistTracks(name: string) {
    const {
      toptracks: { track },
    } = await this.request({
      method: 'artist.getTopTracks',
      artist: name,
      api_key: this.token,
      format: 'json',
    });

    return track.map((track: Track) => {
      return {
        rank: track['@attr']?.rank,
        name: track.name,
        artist: {
          name: track?.artist?.name,
          url: track?.artist?.url,
        },
        url: track?.url,
        scrobbles: track?.playcount,
        listeners: track?.listeners,
      };
    });
  }

  public async fetchUser(name: string) {
    const { user } = await this.request({
      method: 'user.getInfo',
      user: name,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    return {
      name: user.name || null,
      realName: user.realname || null,
      country: user.country || null,
      url: user.url || null,
      image: user.image[3]['#text'] || null,
    };
  }
}
