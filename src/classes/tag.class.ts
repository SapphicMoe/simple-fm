import { request } from '../request.js';

import type {
  TagGetInfoResponse,
  TagGetTopAlbumsResponse,
  TagGetTopArtistsResponse,
  TagGetTopTracksResponse,
  TagGetWeeklyChartListResponse,
  TagGetInfoType,
  TagTopAlbumsType,
  TagTopArtistsType,
  TagTopTracksType,
  TagWeeklyChartListType,
} from '../types/index.js';

export default class Tag {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information on a tag.
   * @param tagName - The name of the tag.
   * */
  async fetch(tagName: string): Promise<TagGetInfoType> {
    const { tag } = await request<TagGetInfoResponse>('tag.getInfo', {
      tag: tagName,
      api_key: this.token,
    });

    return {
      name: tag.name,
      description: tag.wiki.summary,
      stats: {
        count: tag.total,
        reach: tag.reach,
      },
      url: `https://www.last.fm/tag/${encodeURIComponent(tag.name)}`,
    };
  }

  /**
   * Fetches and returns popular albums that are tagged by a tag name.
   * @param tagName - The name of the tag.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopAlbums(tagName: string, limit = 50, page = 1): Promise<TagTopAlbumsType[]> {
    const {
      albums: { album },
    } = await request<TagGetTopAlbumsResponse>('tag.getTopAlbums', {
      tag: tagName,
      api_key: this.token,
      limit,
      page,
    });

    return album.map((album) => {
      const image = album.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        rank: Number(album['@attr'].rank),
        name: album.name,
        artist: {
          name: album.artist.name,
          url: album.artist.url,
        },
        url: `https://www.last.fm/music/${encodeURIComponent(album.artist.name)}/${encodeURIComponent(album.name)}`,
        image,
      };
    });
  }

  /**
   * Fetches and returns popular artists that are tagged by a tag name.
   * @param tagName - The name of the tag.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopArtists(tagName: string, limit = 50, page = 1): Promise<TagTopArtistsType[]> {
    const {
      topartists: { artist },
    } = await request<TagGetTopArtistsResponse>('tag.getTopArtists', {
      tag: tagName,
      api_key: this.token,
      limit,
      page,
    });

    return artist.map((artist) => {
      const image = artist.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        rank: Number(artist['@attr'].rank),
        name: artist.name,
        url: artist.url,
        image,
      };
    });
  }

  /**
   * Fetches and returns popular tracks that are tagged by a tag name.
   * @param tagName - The name of the tag.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(tagName: string, limit = 50, page = 1): Promise<TagTopTracksType[]> {
    const {
      tracks: { track },
    } = await request<TagGetTopTracksResponse>('tag.getTopTracks', {
      tag: tagName,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      const image = track.image.map((i) => {
        return {
          size: i.size,
          url: i['#text'],
        };
      });

      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        duration: Number(track.duration) || null,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        url: track.url,
        image,
      };
    });
  }

  /**
   * Fetches and returns a list of available charts for a tag.
   * @param tagName - The name of the tag.
   * */
  async fetchWeeklyChartList(tagName: string): Promise<TagWeeklyChartListType> {
    const {
      weeklychartlist: { chart, '@attr': attr },
    } = await request<TagGetWeeklyChartListResponse>('tag.getWeeklyChartList', {
      tag: tagName,
      api_key: this.token,
    });

    const positions = chart.map((chart) => {
      return {
        from: new Date(Number(chart.from) * 1000),
        to: new Date(Number(chart.to) * 1000),
      };
    });

    const response = {
      name: attr.tag,
      positions,
    };

    return response as TagWeeklyChartListType;
  }
}
