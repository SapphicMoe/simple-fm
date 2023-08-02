import type { Album, Artist, AttrMeta, Track, Tag } from '@typings/index.js';

export declare interface TagGetInfoResponse {
  tag: Tag & {
    total: number;
    wiki: {
      summary: string;
      content: string;
    };
  };
}

export declare interface TagGetTopAlbumsResponse {
  albums: {
    album: Array<
      Album & {
        mbid: string;
        artist: Artist & {
          mbid: string;
        };
        '@attr': {
          rank: number;
        };
      }
    >;
    '@attr': AttrMeta & { tag: string };
  };
}

export declare interface TagGetTopArtistsResponse {
  topartists: {
    artist: Array<
      Artist & {
        mbid: string;
        '@attr': {
          rank: number;
        };
      }
    >;
    '@attr': AttrMeta & { tag: string };
  };
}

export declare interface TagGetTopTracksResponse {
  tracks: {
    track: Array<
      Track & {
        mbid: string;
        duration: string;
        artist: Artist & {
          mbid: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrMeta & { tag: string };
  };
}

export declare interface TagGetWeeklyChartListResponse {
  weeklychartlist: {
    chart: Array<{
      from: string;
      to: string;
    }>;
    '@attr': {
      tag: string;
    };
  };
}
