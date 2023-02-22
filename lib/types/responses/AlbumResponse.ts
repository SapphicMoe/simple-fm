import type { Album, Tag, Track } from '..';

export declare interface AlbumGetInfoResponse {
  album: Album & {
    tags: {
      tag: Array<
        Tag & {
          url: string;
          name: string;
        }
      >;
    };
    artist: string;
    listeners: string;
    playcount: string;
    tracks: {
      track: Array<
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
