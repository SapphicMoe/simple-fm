import type { ImageType } from '~/index.js';

export declare interface ArtistGetInfoType {
  name: string;
  description?: string;
  onTour: boolean;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats: {
    userPlayCount?: number | null;
  };
  url: string;
}

export declare interface ArtistGetSimilarType {
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

export declare interface ArtistGetTopAlbumsType {
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
    image: ImageType[] | null;
  }>;
}

export declare interface ArtistGetTopTagsType {
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

export declare interface ArtistGetTopTracksType {
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
