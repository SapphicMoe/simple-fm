import type { Album, Artist, Track, Tag } from '..';

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
        artist: {
          name: string;
          url: string;
        };
        '@attr': {
          rank: number;
        };
      }
    >;
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
  };
}

export declare interface TagGetTopTagsResponse {
  toptags: {
    tag: Tag[];
  };
}

export declare interface TagGetTopTracksResponse {
  tracks: {
    track: Array<
      Track & {
        duration: string;
        artist: {
          name: string;
          url: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
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
