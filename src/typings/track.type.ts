import type { AlbumType, SearchMeta, TagType, TrackType } from '@typings/index.js';

export declare interface TrackGetInfoType {
  name: string;
  mbid: string | undefined;
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
    mbid: string | undefined;
    url: string;
  };
  album:
    | Partial<
        AlbumType & {
          position: number;
          mbid: string | undefined;
        }
      >
    | undefined;
  tags?: object[];
  url: string;
}

export declare interface TrackGetSimilarType {
  name: string;
  artist: {
    name: string;
    url?: string;
  };
  url?: string;
  tracks: Array<
    TrackType & {
      match: number;
      duration: number;
      scrobbles: number;
    }
  >;
}

export declare interface TrackGetTopTagsType {
  name: string;
  artist: {
    name: string;
    url: string | undefined;
  };
  url: string | undefined;
  tags: Array<
    TagType & {
      count: number;
    }
  >;
}

export declare interface TrackSearchType {
  search: SearchMeta & {
    query: string;
  };
  tracks: Array<
    TrackType & {
      mbid: string | undefined;
      listeners: number;
    }
  >;
}
