import { Album, Artist, Track, Tag } from '~/index.js';

export declare interface ArtistGetInfoResponse {
  artist: Artist & {
    stats: {
      listeners: string;
      playcount: string;
      userplaycount?: string;
    };
    ontour: string;
    bio: { summary: string };
  };
}

export declare interface ArtistGetSimilarResponse {
  similarartists: {
    artist: Array<
      Artist & {
        match: string;
      }
    >;
    '@attr': {
      artist: string;
    };
  };
}

export declare interface ArtistGetTopAlbumsResponse {
  topalbums: {
    album: Array<
      Album & {
        playcount: number;
        artist: Artist;
      }
    >;
    '@attr': {
      artist: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export declare interface ArtistGetTopTagsResponse {
  toptags: {
    tag: Array<
      Tag & {
        url: string;
        count: number;
      }
    >;
    '@attr': {
      artist: string;
    };
  };
}

export declare interface ArtistGetTopTracksResponse {
  toptracks: {
    track: Array<
      Track & {
        listeners: string;
        playcount: string;
        artist: Artist;
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': {
      artist: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export declare interface ArtistSearchResponse {
  results: {
    'opensearch:Query': {
      searchTerms: string;
      startPage: string;
    };
    'opensearch:totalResults': string;
    'opensearch:itemsPerPage': string;
    artistmatches: {
      artist: Array<
        Artist & {
          listeners: string;
        }
      >;
    };
  };
}
