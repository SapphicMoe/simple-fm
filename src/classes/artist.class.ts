import { sanitizeURL } from '@utils/links.js';
import { request } from '~/request.js';
import { ImageSizes } from '~/types/index.js';
import type {
  ArtistGetInfoResponse,
  ArtistGetSimilarResponse,
  ArtistGetTopAlbumsResponse,
  ArtistGetTopTagsResponse,
  ArtistGetTopTracksResponse,
  ArtistSearchResponse,
  ArtistGetInfoType,
  ArtistSearchType,
  ArtistSimilarType,
  ArtistTopAlbumsType,
  ArtistTopTagsType,
  ArtistTopTracksType,
  ImageType,
} from '~/types/index.js';

export default class Artist {
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

    const response = {
      name: artist.name,
      description: artist.bio.summary,
      onTour: Boolean(Number(artist.ontour)).valueOf(),
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
  async fetchSimilar(artistName: string, limit = 30): Promise<ArtistSimilarType> {
    const {
      similarartists: { artist, '@attr': attr },
    } = await request<ArtistGetSimilarResponse>('artist.getSimilar', {
      artist: artistName,
      api_key: this.token,
      limit,
    });

    const artists = artist.map((artist) => {
      return {
        match: Number(artist.match),
        name: artist.name,
        url: artist.url,
      };
    });

    return {
      search: {
        artist: {
          name: attr.artist,
          url: `https://www.last.fm/music/${sanitizeURL(attr.artist)}`,
        },
      },
      artists,
    } as ArtistSimilarType;
  }

  /**
   * Fetches and returns popular albums for an artist.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopAlbums(artistName: string, limit = 50, page = 1): Promise<ArtistTopAlbumsType> {
    const {
      topalbums: { album, '@attr': attr },
    } = await request<ArtistGetTopAlbumsResponse>('artist.getTopAlbums', {
      artist: artistName,
      api_key: this.token,
      limit,
      page,
    });

    const albums = album.map((album) => {
      const image = album.image
        .filter((i) => ImageSizes.includes(i.size))
        .map((i) => {
          return {
            size: i.size,
            url: i['#text'],
          } as ImageType;
        });

      return {
        name: album.name,
        scrobbles: Number(album.playcount),
        artist: {
          name: album.artist.name,
          url: album.artist.url,
        },
        url: album.url,
        image,
      };
    });

    return {
      search: {
        artist: {
          name: attr.artist,
          url: `https://www.last.fm/music/${sanitizeURL(attr.artist)}`,
        },
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      albums,
    } as ArtistTopAlbumsType;
  }

  /**
   * Fetches and returns popular tags for an artist.
   * @param artistName - The name of the artist.
   * */
  async fetchTopTags(artistName: string): Promise<ArtistTopTagsType> {
    const {
      toptags: { tag, '@attr': attr },
    } = await request<ArtistGetTopTagsResponse>('artist.getTopTags', {
      artist: artistName,
      api_key: this.token,
    });

    const tags = tag.map((tag) => {
      return {
        count: tag.count,
        name: tag.name,
        url: tag.url,
      };
    });

    return {
      artist: {
        name: attr.artist,
        url: `https://www.last.fm/music/${sanitizeURL(attr.artist)}`,
      },
      tags,
    } as ArtistTopTagsType;
  }

  /**
   * Fetches and returns popular tracks for an artist.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 50.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async fetchTopTracks(artistName: string, limit = 50, page = 1): Promise<ArtistTopTracksType> {
    const {
      toptracks: { track, '@attr': attr },
    } = await request<ArtistGetTopTracksResponse>('artist.getTopTracks', {
      artist: artistName,
      api_key: this.token,
      limit,
      page,
    });

    const tracks = track.map((track) => {
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

    return {
      search: {
        artist: {
          name: attr.artist,
          url: `https://www.last.fm/music/${sanitizeURL(attr.artist)}`,
        },
        page: Number(attr.page),
        itemsPerPage: Number(attr.perPage),
        totalPages: Number(attr.totalPages),
        totalResults: Number(attr.total),
      },
      tracks,
    } as ArtistTopTracksType;
  }

  /**
   * Search for an artist by name.
   * @param artistName - The name of the artist.
   * @param limit - The number of results to fetch per page. Defaults to 30.
   * @param page - The page number to fetch. Defaults to the first page.
   * */
  async search(artistName: string, limit = 30, page = 1): Promise<ArtistSearchType> {
    const {
      results,
      results: {
        artistmatches: { artist },
      },
    } = await request<ArtistSearchResponse>('artist.search', {
      artist: artistName,
      api_key: this.token,
      limit,
      page,
    });

    const artists = artist.map((artist) => {
      return {
        name: artist.name,
        listeners: Number(artist.listeners),
        url: artist.url,
      };
    });

    return {
      search: {
        query: results['opensearch:Query'].searchTerms,
        page: Number(results['opensearch:Query'].startPage),
        itemsPerPage: Number(results['opensearch:itemsPerPage']),
        totalResults: Number(results['opensearch:totalResults']),
      },
      artists,
    } as ArtistSearchType;
  }
}
