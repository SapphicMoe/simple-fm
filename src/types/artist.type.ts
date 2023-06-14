import type { ImageType } from '~/index.js';

export declare interface ArtistGetInfoType {
  name: string;
  description?: string;
  onTour: boolean;
  stats: {
    scrobbles: number;
    listeners: number;
    userPlayCount?: number | null;
  };
  url: string;
}

export declare interface ArtistSearchType {
  search: {
    query: string;
    page: number;
    itemsPerPage: number;
    totalResults: number;
  };
  artists: Array<{
    name: string;
    listeners: number;
    url: string;
  }>;
}

export declare interface ArtistSimilarType {
  search: {
    artist: {
      name: string;
      url: string;
    };
  };
  artists: Array<{
    match: number;
    name: string;
    url: string;
  }>;
}

export declare interface ArtistTopAlbumsType {
  search: {
    artist: {
      name: string;
      url: string;
    };
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  albums: Array<{
    name: string;
    scrobbles: number;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image: ImageType[];
  }>;
}

export declare interface ArtistTopTracksType {
  search: {
    artist: {
      name: string;
      url: string;
    };
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  tracks: Array<{
    rank: number;
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
  }>;
}

export declare interface ArtistTopTagsType {
  artist: {
    name: string;
    url: string;
  };
  tags: Array<{
    name: string;
    count: number;
    url: string;
  }>;
}
