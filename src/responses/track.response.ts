import type {
  ArtistResponse,
  AlbumResponse,
  OpenSearchResponse,
  TagResponse,
  TrackResponse,
} from '@responses/index.js';

export declare interface TrackGetInfoResponse {
  track: TrackResponse & {
    duration: string;
    listeners: string;
    playcount: string;
    artist: ArtistResponse & {
      mbid: string;
    };
    album?: AlbumResponse & {
      title: string;
      '@attr'?: { position: string };
    };
    toptags: {
      tag: Array<
        TagResponse & {
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
      TrackResponse & {
        playcount: number;
        match: number;
        duration: number;
        artist: ArtistResponse & {
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
      TagResponse & {
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
  results: OpenSearchResponse & {
    trackmatches: {
      track: Array<
        TrackResponse & {
          artist: string;
          listeners: string;
        }
      >;
    };
  };
}
