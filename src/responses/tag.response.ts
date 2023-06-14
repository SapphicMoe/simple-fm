import type { Album, Artist, Track, Tag } from '~/index.js';

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
    '@attr': {
      tag: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
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
    '@attr': {
      tag: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
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
    '@attr': {
      tag: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
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
