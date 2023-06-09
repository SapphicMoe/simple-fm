import type { ImageType, PersonalTagType } from './index.js';

export declare interface UserArtistsType {
  search: {
    user: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  artists: Array<{
    name: string;
    scrobbles: number;
    url: string;
  }>;
}

export declare interface UserFriendsType {
  search: {
    user: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  friends: Array<{
    name: string;
    realName: string | null;
    country: string | null;
    registered: Date;
    url: string;
    image: ImageType[];
  }>;
}

export declare interface UserGetInfoType {
  name: string;
  realName: string | null;
  country: string | null;
  registered: Date;
  url: string;
  image: ImageType[];
}

export declare interface UserLovedTracksType {
  search: {
    user: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  tracks: Array<{
    name: string;
    date: Date;
    artist: {
      name: string;
      url: string;
    };
    url: string;
  }>;
}

export declare interface UserPersonalTagsType {
  search: {
    user: string;
    tag: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  response: PersonalTagType[];
}

export declare interface UserRecentTrackType {
  search: {
    user: string;
    nowPlaying: boolean;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  tracks: Array<{
    name: string;
    album: string;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image: ImageType[];
  }>;
}

export declare interface UserTopAlbumsType {
  search: {
    user: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  albums: Array<{
    rank: number;
    name: string;
    playCount: number;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image: ImageType[];
  }>;
}

export declare interface UserTopTagsType {
  search: {
    user: string;
  };
  tags: Array<{
    count: number;
    name: string;
    url?: string;
  }>;
}

export declare interface UserTopTracksType {
  search: {
    user: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  tracks: Array<{
    rank: number;
    name: string;
    stats: {
      duration: number | null;
      userPlayCount: number;
    };
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image: ImageType[];
  }>;
}
