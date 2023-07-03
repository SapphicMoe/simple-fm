import type { ImageType, PersonalTagType } from '~/index.js';

export declare interface UserGetFriendsType {
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
    image: ImageType[] | null;
  }>;
}

export declare interface UserGetInfoType {
  name: string;
  realName: string | null;
  country: string | null;
  registered: Date;
  url: string;
  image: ImageType[] | null;
}

export declare interface UserGetLovedTracksType {
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

export declare interface UserGetPersonalTagsType {
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

export declare interface UserGetRecentTracksType {
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
    image: ImageType[] | null;
  }>;
}

export declare interface UserGetTopAlbumsType {
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
    image: ImageType[] | null;
  }>;
}

export declare interface UserGetTopArtistsType {
  search: {
    user: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  artists: Array<{
    rank: number;
    name: string;
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
    image: ImageType[] | null;
  }>;
}
