import type { Artist, Album, OpenSearchMeta, Tag, Track } from '@typings/index.js';

export declare interface TrackGetInfoResponse {
  track: Track & {
    duration: string;
    listeners: string;
    playcount: string;
    artist: Artist;
    toptags: {
      tag: Array<
        Tag & {
          url: string;
        }
      >;
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
        artist: Artist;
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
          artist: string;
          listeners: string;
        }
      >;
    };
  };
}
