import type { ImageType, SearchMeta } from '@typings/index.js';

export declare interface ArtistGetInfoType {
  name: string;
  mbid: string;
  description?: string;
  onTour: boolean;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats: {
    userPlayCount?: number;
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
    mbid: string;
    url: string;
  }>;
}

export declare interface ArtistGetTopAlbumsType {
  search: SearchMeta & {
    artist: {
      name: string;
      url: string;
    };
  };
  albums: Array<{
    name: string;
    scrobbles: number;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image?: ImageType[];
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
  search: SearchMeta & {
    artist: {
      name: string;
      url: string;
    };
  };
  tracks: Array<{
    rank: number;
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

export declare interface ArtistSearchType {
  search: SearchMeta & {
    query: string;
  };
  artists: Array<{
    name: string;
    mbid: string;
    listeners: number;
    url: string;
  }>;
}
