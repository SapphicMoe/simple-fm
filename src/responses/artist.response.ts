import type { Album, Artist, AttrMeta, OpenSearchMeta, Track, Tag } from '@typings/index.js';

export declare interface ArtistGetInfoResponse {
  artist: Artist & {
    mbid: string;
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
        mbid: string;
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
    '@attr': AttrMeta & { artist: string };
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
        mbid: string;
        listeners: string;
        playcount: string;
        artist: Artist;
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrMeta & { artist: string };
  };
}

export declare interface ArtistSearchResponse {
  results: OpenSearchMeta & {
    'opensearch:Query': {
      searchTerms: string;
    };
    artistmatches: {
      artist: Array<
        Artist & {
          mbid: string;
          listeners: string;
        }
      >;
    };
  };
}
