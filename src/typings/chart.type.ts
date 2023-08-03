import type { SearchMeta } from '@typings/index.js';

export declare interface ChartGetTopArtistsType {
  search: SearchMeta;
  artists: Array<{
    name: string;
    mbid: string;
    stats: {
      scrobbles: number;
      listeners: number;
    };
    url: string;
  }>;
}

export declare interface ChartGetTopTagsType {
  search: SearchMeta;
  tags: Array<{
    name: string;
    stats: {
      count: number;
      reach: number;
    };
    url?: string;
  }>;
}

export declare interface ChartGetTopTracksType {
  search: SearchMeta;
  tracks: Array<{
    name: string;
    mbid: string;
    stats: {
      scrobbles: number;
      listeners: number;
    };
    artist: {
      name: string;
      url: string;
    };
    url: string;
  }>;
}
