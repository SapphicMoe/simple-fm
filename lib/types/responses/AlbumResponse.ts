import type { Album, Image, Tag, Track } from '..';

type ObjArray<T> = T | T[];

export declare interface AlbumGetInfoResponse {
  album: Album & {
    tags: {
      tag: Tag[];
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
          artist: {
            url: string;
            name: string;
          };
        }
      >;
    };
    url: string;
    image: Image[];
  };
}

export declare interface AlbumGetTopTagsResponse {
  toptags: {
    tag: Tag[];
    '@attr': {
      artist: string;
      album: string;
    };
  };
}

export declare interface AlbumSearchResponse {
  results: {
    albummatches: {
      album: Array<
        Album & {
          artist: string;
        }
      >;
    };
  };
}
