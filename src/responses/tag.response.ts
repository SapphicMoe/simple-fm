import type { Album, Artist, AttrMeta, Track, Tag } from '~/index.js';

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
        artist: Artist;
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
        duration: string;
        artist: Artist;
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
