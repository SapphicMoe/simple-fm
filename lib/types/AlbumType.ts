import type { ImageType } from '.';

export declare interface AlbumGetInfoType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  userPlayCount?: number;
  tags: Array<{
    name: string;
    url: string;
  }>;
  tracks: Array<{
    rank: number;
    name: string;
    duration: number | null;
    url: string;
  }>;
  url: string;
  image?: ImageType[] | null;
}

export declare interface AlbumSearchType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: ImageType[] | null;
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
