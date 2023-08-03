import type { ImageType, PersonalTag, SearchMeta } from '@typings/index.js';

export declare interface UserGetFriendsType {
  search: SearchMeta & {
    user: string;
  };
  friends: Array<{
    name: string;
    realName?: string;
    country?: string;
    registered: Date;
    url: string;
    image?: ImageType[];
  }>;
}

export declare interface UserGetInfoType {
  name: string;
  realName?: string;
  country?: string;
  registered: Date;
  url: string;
  image?: ImageType[];
}

export declare interface UserGetLovedTracksType {
  search: SearchMeta & {
    user: string;
  };
  tracks: Array<{
    name: string;
    mbid: string;
    date: Date;
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    url: string;
  }>;
}

export declare interface UserGetPersonalTagsType {
  search: SearchMeta & {
    user: string;
    tag: string;
  };
  response?: PersonalTag[];
}

export declare interface UserGetRecentTracksType {
  search: SearchMeta & {
    user: string;
    nowPlaying: boolean;
  };
  tracks: Array<{
    name: string;
    mbid: string;
    album: {
      name: string;
      mbid: string;
    };
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image?: ImageType[];
  }>;
}

export declare interface UserGetTopAlbumsType {
  search: SearchMeta & {
    user: string;
  };
  albums: Array<{
    rank: number;
    name: string;
    mbid: string;
    playCount: number;
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    url: string;
    image?: ImageType[];
  }>;
}

export declare interface UserGetTopArtistsType {
  search: SearchMeta & {
    user: string;
  };
  artists: Array<{
    rank: number;
    name: string;
    mbid: string;
    scrobbles: number;
    url: string;
  }>;
}

export declare interface UserGetTopTagsType {
  search: {
    user: string;
  };
  tags: Array<{
    count: number;
    name: string;
    url?: string;
  }>;
}

export declare interface UserGetTopTracksType {
  search: SearchMeta & {
    user: string;
  };
  tracks: Array<{
    rank: number;
    name: string;
    mbid: string;
    stats: {
      duration?: number;
      userPlayCount: number;
    };
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    url: string;
    image?: ImageType[];
  }>;
}
