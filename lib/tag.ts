import type { TagType, TagGetInfoResponse, TagGetTopTracksResponse, TagTrackType } from './types';

import { request } from './request.js';

class Tag {
  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');
    this.token = token;
  }

  /**
   * Fetches and returns metadata information on a tag.
   * @param tagName - The name of the tag.
   * */
  public async fetch(tagName: string): Promise<TagType> {
    const { tag } = await request<TagGetInfoResponse>({
      method: 'tag.getinfo',
      tag: tagName,
      api_key: this.token,
      format: 'json',
      limit: 1,
    });

    return {
      name: tag.name,
      description: tag.wiki.summary,
      userReach: tag.reach,
      totalReach: tag.total,
    };
  }

  /**
   * Fetches and returns popular tracks for a tag.
   * @param tagName - The name of the tag.
   * */
  public async fetchTracks(tagName: string): Promise<TagTrackType[]> {
    const {
      tracks: { track },
    } = await request<TagGetTopTracksResponse>({
      method: 'tag.getTopTracks',
      tag: tagName,
      api_key: this.token,
      format: 'json',
    });

    return track.map((track) => {
      return {
        rank: track['@attr'].rank,
        name: track.name,
        duration: track.duration,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: track.image.find((i) => i.size == 'large')?.['#text'],
      };
    });
  }
}

export default Tag;
