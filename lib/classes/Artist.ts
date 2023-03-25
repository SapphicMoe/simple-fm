import { request } from '../request.js';

import type {
  ArtistGetInfoResponse,
  ArtistGetSimilarResponse,
  ArtistGetTopAlbumsResponse,
  ArtistGetTopTagsResponse,
  ArtistGetTopTracksResponse,
  ArtistSearchResponse,
  ArtistGetInfoType,
  ArtistSimilarType,
  ArtistTopAlbumsType,
  ArtistTopTagsType,
  ArtistTopTracksType,
} from '../types';

class Artist {
  constructor(private readonly token: string) {}

  /**
   * Fetches and returns metadata information for an artist.
   * @param artistName - The name of the artist.
   * @param userName - The username for the context of the request.
   * If supplied, the user's playcount for this artist is included in the response.
   * */
  async fetch(artistName: string, userName?: string): Promise<ArtistGetInfoType> {
    const { artist } = await request<ArtistGetInfoResponse>('artist.getInfo', {
      artist: artistName,
      username: userName,
      api_key: this.token,
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!artist) throw new Error('This artist could not be found.');

    const response = {
      name: artist.name,
      description: artist.bio.summary,
      stats: {
        scrobbles: Number(artist.stats.playcount),
        listeners: Number(artist.stats.listeners),
      },
      url: artist.url,
    } as ArtistGetInfoType;

    if (userName) response.stats.userPlayCount = Number(artist.stats.userplaycount);

    return response;
  }

  /**
   * Fetches and returns similar artists to this artist.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * */
  async fetchSimilar(artistName: string, limit = 30): Promise<ArtistSimilarType[]> {
    const {
      similarartists: { artist },
    } = await request<ArtistGetSimilarResponse>('artist.getSimilar', {
      artist: artistName,
      api_key: this.token,
      limit,
    });

    return artist.map((artist) => {
      return {
        match: Number(artist.match),
        name: artist.name,
        url: artist.url,
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }

  /**
   * Fetches and returns popular albums for an artist.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopAlbums(artistName: string, limit = 50, page = 1): Promise<ArtistTopAlbumsType[]> {
    const {
      topalbums: { album },
    } = await request<ArtistGetTopAlbumsResponse>('artist.getTopAlbums', {
      artist: artistName,
      api_key: this.token,
      limit,
      page,
    });

    return album.map((album) => {
      return {
        name: album.name,
        scrobbles: Number(album.playcount),
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
   * Fetches and returns popular tags for an artist.
   * @param artistName - The name of the artist.
   * */
  async fetchTopTags(artistName: string): Promise<ArtistTopTagsType[]> {
    const {
      toptags: { tag },
    } = await request<ArtistGetTopTagsResponse>('artist.getTopTags', {
      artist: artistName,
      api_key: this.token,
    });

    return tag.map((tag) => {
      return {
        count: tag.count,
        name: tag.name,
        url: tag.url,
      };
    });
  }

  /**
   * Fetches and returns popular tracks for an artist.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(artistName: string, limit = 50, page = 1): Promise<ArtistTopTracksType[]> {
    const {
      toptracks: { track },
    } = await request<ArtistGetTopTracksResponse>('artist.getTopTracks', {
      artist: artistName,
      api_key: this.token,
      limit,
      page,
    });

    return track.map((track) => {
      return {
        rank: Number(track['@attr'].rank),
        name: track.name,
        artist: {
          name: track.artist.name,
          url: track.artist.url,
        },
        stats: {
          scrobbles: Number(track.playcount),
          listeners: Number(track.listeners),
        },
        url: track.url,
      };
    });
  }

  /**
   * Search for an artist by name.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(artistName: string, limit = 30, page = 1): Promise<ArtistGetInfoType[]> {
    const {
      results: {
        artistmatches: { artist },
      },
    } = await request<ArtistSearchResponse>('artist.search', {
      artist: artistName,
      api_key: this.token,
      limit,
      page,
    });

    return artist.map((artist) => {
      return {
        name: artist.name,
        stats: {
          listeners: Number(artist.listeners),
        },
        url: artist.url,
        image: artist.image.find((i) => i.size === 'extralarge')?.['#text'] || null,
      };
    });
  }
}

export default Artist;
