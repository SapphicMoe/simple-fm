import type { ImageType } from './index.js';

export declare interface ChartTopArtistsType {
  name: string;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  url: string;
  image?: ImageType[] | null;
}

export declare interface ChartTopTagsType {
  name: string;
  stats: {
    count: number;
    reach: number;
  };
  url?: string;
}

export declare interface ChartTopTracksType {
  name: string;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: ImageType[] | null;
}
