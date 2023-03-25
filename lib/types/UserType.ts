import type { PersonalTagType } from '.';

export declare interface UserArtistsType {
  name: string;
  scrobbles: number;
  url: string;
  image?: string | null;
}

export declare interface UserGetInfoType {
  name: string;
  realName: string | null;
  country: string | null;
  registered: Date;
  url: string;
  image?: string | null;
}

export declare interface UserLovedTracksType {
  name: string;
  date: Date;
  artist: {
    name: string;
    url: string;
  };
  url: string;
}

export declare interface UserPersonalTagsType {
  album?: Array<
    PersonalTagType & {
      artist: {
        name: string;
        url: string;
      };
    }
  >;
  artist?: PersonalTagType[];
  track?: Array<
    PersonalTagType & {
      artist: {
        name: string;
        url: string;
      };
    }
  >;
}

export declare interface UserRecentTrackType {
  currentlyPlaying: boolean;
  user: string;
  url: string;
  tracks: Array<{
    name: string;
    album: string;
    artist: {
      name: string;
      url: string;
    };
    url: string;
    image?: string | null;
  }>;
}

export declare interface UserTopAlbumsType {
  rank: number;
  name: string;
  playCount: number;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}

export declare interface UserTopTagsType {
  count: number;
  name: string;
  url?: string;
}

export declare interface UserTopTracksType {
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
  image?: string | null;
}
