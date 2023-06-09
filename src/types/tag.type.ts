import type { ImageType } from './';

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

export declare interface TagTopArtistsType {
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

export declare interface TagTopTracksType {
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

export declare interface TagWeeklyChartListType {
  search: {
    tag: string;
  };
  positions: Array<{
    from: Date;
    to: Date;
  }>;
}
