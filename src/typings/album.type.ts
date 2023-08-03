import type { ImageType, ObjectArray, SearchMeta } from '@typings/index.js';

export declare interface AlbumGetInfoType {
  name: string;
  mbid: string;
  artist: {
    name: string;
    url: string;
  };
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats?: {
    userPlayCount?: number;
  };
  tags: Array<{
    name: string;
    url: string;
  }>;
  tracks: ObjectArray<{
    rank: number;
    name: string;
    duration?: number;
    url: string;
  }>;
  url: string;
  image?: ImageType[];
}

export declare interface AlbumGetTopTagsType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  tags: Array<{
    count: number;
    name: string;
    url: string;
  }>;
}

export declare interface AlbumSearchType {
  search: SearchMeta & {
    query: string;
  };
  albums: Array<{
    name: string;
    mbid: string;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image?: ImageType[];
  }>;
}
