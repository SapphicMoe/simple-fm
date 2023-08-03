import type { Album, Artist, Image, ObjectArray, OpenSearchMeta, Tag, Track } from '@typings/index.js';

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
    mbid: string;
    listeners: string;
    playcount: string;
    userplaycount?: number;
    tracks: {
      track: ObjectArray<
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
    image?: Image[];
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
          mbid: string;
        }
      >;
    };
  };
}
