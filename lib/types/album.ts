import type { Image } from '.';

export interface AlbumSearchResponse {
  results: {
    albummatches: {
      album: Array<{
        name: string;
        artist: string;
        url: string;
        image: Image[];
      }>;
    };
  };
}

export interface AlbumType {
  name: string;
  artist: string;
  url: string;
  image?: string;
}
