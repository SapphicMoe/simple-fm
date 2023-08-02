import type { Album, Artist, Image, OpenSearchMeta, Tag, Track } from '@typings/index.js';

type ObjArray<T> = T | T[];

export declare interface AlbumGetInfoResponse {
  album: Album & {
    tags: {
      tag: Array<
        Tag & {
          url: string;
        }
      >;
    };
    artist: string;
    listeners: string;
    playcount: string;
    userplaycount?: number;
    tracks: {
      track: ObjArray<
        Track & {
          duration: string;
          '@attr': {
            rank: number;
          };
          artist: Artist;
        }
      >;
    };
    url: string;
    image: Image[] | null;
  };
}

export declare interface AlbumGetTopTagsResponse {
  toptags: {
    tag: Array<
      Tag & {
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
  results: OpenSearchMeta & {
    'opensearch:Query': {
      searchTerms: string;
    };
    albummatches: {
      album: Array<
        Album & {
          artist: string;
        }
      >;
    };
  };
}
