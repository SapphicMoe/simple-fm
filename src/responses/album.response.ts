import type {
  AlbumResponse,
  ArtistResponse,
  ImageResponse,
  ObjectArray,
  OpenSearchResponse,
  TagResponse,
  TrackResponse,
} from '@responses/index.js';

export declare interface AlbumGetInfoResponse {
  album: AlbumResponse & {
    tags: {
      tag: ObjectArray<
        TagResponse & {
          url: string;
        }
      >;
    };
    artist: string;
    listeners: string;
    playcount: string;
    userplaycount?: number;
    tracks: {
      track: ObjectArray<
        TrackResponse & {
          duration: string;
          '@attr': {
            rank: number;
          };
          artist: ArtistResponse;
        }
      >;
    };
    url: string;
    image?: ImageResponse[];
  };
}

export declare interface AlbumGetTopTagsResponse {
  toptags: {
    tag: Array<
      TagResponse & {
        count: number;
        url: string;
      }
    >;
    '@attr': {
      artist: string;
      album: string;
    };
  };
}

export declare interface AlbumSearchResponse {
  results: OpenSearchResponse & {
    'opensearch:Query': {
      searchTerms: string;
    };
    albummatches: {
      album: Array<
        AlbumResponse & {
          artist: string;
        }
      >;
    };
  };
}
