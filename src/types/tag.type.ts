import type { ImageType } from '~/index.js';

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
  search: {
    tag: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  albums: Array<{
    rank: number;
    name: string;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image: ImageType[];
  }>;
}

export declare interface TagGetTopArtistsType {
  search: {
    tag: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  artists: Array<{
    rank: number;
    name: string;
    url: string;
  }>;
}

export declare interface TagGetTopTracksType {
  search: {
    tag: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  tracks: Array<{
    rank: number;
    name: string;
    duration: number | null;
    artist: {
      name: string;
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
