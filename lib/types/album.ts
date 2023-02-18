import type { Album } from '.';

export interface AlbumSearchResponse {
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

export interface AlbumType {
  name: string;
  artist: string;
  url: string;
  image?: string;
}
