import type { ImageType } from './index.js';

export declare interface TagGetInfoType {
  name: string;
  description?: string;
  stats: {
    count?: number;
    reach?: number;
  };
  url: string;
}

export declare interface TagTopAlbumsType {
  rank: number;
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: ImageType[] | null;
}

export declare interface TagTopArtistsType {
  rank: number;
  name: string;
  url: string;
  image?: ImageType[] | null;
}

export declare interface TagTopTracksType {
  rank: number;
  name: string;
  duration: number | null;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: ImageType[] | null;
}

export declare interface TagWeeklyChartListType {
  name: string;
  positions: Array<{
    from: Date;
    to: Date;
  }>;
}
