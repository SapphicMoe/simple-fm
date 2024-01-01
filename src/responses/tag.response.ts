import type { AlbumResponse, ArtistResponse, AttrResponse, TagResponse, TrackResponse } from '@responses/index.js';

export declare interface TagGetInfoResponse {
  tag: TagResponse & {
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
      AlbumResponse & {
        artist: ArtistResponse & {
          mbid: string;
        };
        '@attr': {
          rank: number;
        };
      }
    >;
    '@attr': AttrResponse & { tag: string };
  };
}

export declare interface TagGetTopArtistsResponse {
  topartists: {
    artist: Array<
      ArtistResponse & {
        mbid: string;
        '@attr': {
          rank: number;
        };
      }
    >;
    '@attr': AttrResponse & { tag: string };
  };
}

export declare interface TagGetTopTracksResponse {
  tracks: {
    track: Array<
      TrackResponse & {
        duration: string;
        artist: ArtistResponse & {
          mbid: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrResponse & { tag: string };
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
