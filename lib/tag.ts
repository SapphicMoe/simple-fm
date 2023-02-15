import { request } from './request.js';

import type { TagType, TagGetInfoResponse, TagGetTopTracksResponse, TagTrackType } from './types';

class Tag {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information on a tag.
   * @param tagName - The name of the tag.
   * */
  async fetch(tagName: string): Promise<TagType> {
    const { tag } = await request<TagGetInfoResponse>({
      method: 'tag.getinfo',
      tag: tagName,
      api_key: this.token,
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
  async fetchTracks(tagName: string): Promise<TagTrackType[]> {
    const {
      tracks: { track },
    } = await request<TagGetTopTracksResponse>({
      method: 'tag.getTopTracks',
      tag: tagName,
      api_key: this.token,
    });

    return track.map((track) => {
      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        stats: {
          duration: Number(track.duration),
        },
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image: track.image.find((i) => i.size === 'extralarge')?.['#text'],
      };
    });
  }
}

export default Tag;
