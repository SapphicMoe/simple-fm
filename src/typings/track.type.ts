import type { AlbumType, ImageType, SearchMeta, TagType, TrackType } from '@typings/index.js';

export declare interface TrackGetInfoType extends TrackType {
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
  album: AlbumType & {
    position: number;
    name?: string;
    mbid?: string;
    image?: ImageType[];
    url?: string;
  };
  tags?: object[];
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
      duration?: number;
      scrobbles: number;
      image?: ImageType[];
    }
  >;
}

export declare interface TrackGetTopTagsType {
  name: string;
  artist: {
    name: string;
    url?: string;
  };
  url?: string;
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
      mbid: string;
      listeners: number;
    }
  >;
}
