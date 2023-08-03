import type { ImageType, SearchMeta } from '@typings/index.js';

export declare interface TrackGetInfoType {
  name: string;
  mbid: string;
  duration?: number;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats: {
    userPlayCount?: number;
    userLoved?: boolean;
  };
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  album: {
    position?: number;
    name?: string;
    mbid?: string;
    image?: ImageType[];
    url?: string;
  };
  tags?: object[];
  url: string;
}

export declare interface TrackGetSimilarType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  tracks: Array<{
    match: number;
    name: string;
    duration?: number;
    scrobbles: number;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image?: ImageType[];
  }>;
}

export declare interface TrackGetTopTagsType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  tags: Array<{
    count: number;
    name: string;
    url: string;
  }>;
}

export declare interface TrackSearchType {
  search: SearchMeta & {
    query: string;
  };
  tracks: Array<{
    name: string;
    mbid: string;
    listeners: number;
    artist: {
      name: string;
      url: string;
    };
    url: string;
  }>;
}
