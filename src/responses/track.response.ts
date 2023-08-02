import type { Artist, Album, OpenSearchMeta, Tag, Track } from '@typings/index.js';

export declare interface TrackGetInfoResponse {
  track: Track & {
    mbid: string;
    duration: string;
    listeners: string;
    playcount: string;
    artist: Artist & {
      mbid: string;
    };
    album?: Album & {
      mbid: string;
      title: string;
      '@attr'?: { position: string };
    };
    toptags: {
      tag: Array<
        Tag & {
          url: string;
        }
      >;
    };
    userplaycount?: string;
    userloved?: string;
  };
}

export declare interface TrackGetSimilarResponse {
  similartracks: {
    track: Array<
      Track & {
        mbid: string;
        playcount: number;
        match: number;
        duration: number;
        artist: Artist & {
          mbid: string;
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
    tag: Array<
      Tag & {
        count: number;
        url: string;
      }
    >;
    '@attr': {
      artist: string;
      track: string;
    };
  };
}

export declare interface TrackSearchResponse {
  results: OpenSearchMeta & {
    trackmatches: {
      track: Array<
        Track & {
          mbid: string;
          artist: string;
          listeners: string;
        }
      >;
    };
  };
}
