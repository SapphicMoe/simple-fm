import type { ImageType, SearchMeta } from '@typings/index.js';

export declare interface TagGetInfoType {
  name: string;
  description?: string;
  stats: {
    count?: number;
    reach?: number;
  };
  url: string;
}

export declare interface TagGetTopAlbumsType {
  search: SearchMeta & {
    tag: string;
  };
  albums: Array<{
    rank: number;
    name: string;
    mbid: string;
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    url: string;
    image?: ImageType[];
  }>;
}

export declare interface TagGetTopArtistsType {
  search: SearchMeta & {
    tag: string;
  };
  artists: Array<{
    rank: number;
    name: string;
    mbid: string;
    url: string;
  }>;
}

export declare interface TagGetTopTracksType {
  search: SearchMeta & {
    tag: string;
  };
  tracks: Array<{
    rank: number;
    name: string;
    mbid: string;
    duration?: number;
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    url: string;
  }>;
}

export declare interface TagGetWeeklyChartListType {
  search: {
    tag: string;
  };
  positions: Array<{
    from: Date;
    to: Date;
  }>;
}
