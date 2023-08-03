import type { SearchMeta } from '@typings/index.js';

export declare interface GeoGetTopArtistsType {
  search: SearchMeta & {
    country: string;
  };
  artists: Array<{
    name: string;
    mbid: string;
    listeners: number;
    url: string;
  }>;
}

export declare interface GeoGetTopTracksType {
  search: SearchMeta & {
    country: string;
  };
  tracks: Array<{
    rank: number;
    name: string;
    mbid: string;
    duration?: number;
    listeners: number;
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    url: string;
  }>;
}
