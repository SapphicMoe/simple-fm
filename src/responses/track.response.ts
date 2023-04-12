import type { Album, Tag, Track } from '../index.js';

export declare interface TrackGetInfoResponse {
  track: Track & {
    duration: string;
    listeners: string;
    playcount: string;
    artist: {
      name: string;
      url: string;
    };
    toptags: {
      tag: Tag[];
    };
    album?: Album & { title: string; '@attr'?: { position: string } };
    userplaycount?: string;
    userloved?: string;
  };
}

export declare interface TrackGetSimilarResponse {
  similartracks: {
    track: Array<
      Track & {
        playcount: number;
        match: number;
        duration: number;
        artist: {
          name: string;
          url: string;
        };
      }
    >;
    '@attr': {
      artist: string;
    };
  };
}

export declare interface TrackGetTopTagsResponse {
  toptags: {
    tag: Tag[];
    '@attr': {
      artist: string;
      track: string;
    };
  };
}

export declare interface TrackSearchResponse {
  results: {
    'opensearch:Query': {
      startPage: string;
    };
    'opensearch:totalResults': string;
    'opensearch:itemsPerPage': string;
    trackmatches: {
      track: Array<
        Track & {
          artist: string;
          listeners: string;
        }
      >;
    };
  };
}
