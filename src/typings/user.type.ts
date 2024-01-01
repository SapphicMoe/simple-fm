import type {
  AlbumType,
  ArtistType,
  ImageType,
  PersonalTag,
  SearchMeta,
  TagType,
  TrackType,
  UserType,
} from '@typings/index.js';

export declare interface UserGetFriendsType {
  search: SearchMeta & {
    user: string;
  };
  friends: Array<
    UserType & {
      realName?: string;
      country?: string;
      image?: ImageType[];
    }
  >;
}

export declare interface UserGetInfoType extends UserType {
  realName?: string;
  country?: string;
  stats: {
    albumCount: number;
    artistCount: number;
    playCount: number;
    trackCount: number;
  };
  image?: ImageType[];
}

export declare interface UserGetLovedTracksType {
  search: SearchMeta & {
    user: string;
  };
  tracks: Array<
    TrackType & {
      mbid: string;
      date: Date;
      artist: {
        mbid: string;
      };
    }
  >;
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
  tracks: Array<
    TrackType & {
      dateAdded: Date;
      mbid?: string;
      album: {
        mbid: string;
      };
      image?: ImageType[];
    }
  >;
}

export declare interface UserGetTopAlbumsType {
  search: SearchMeta & {
    user: string;
  };
  albums: Array<
    AlbumType & {
      rank: number;
      mbid?: string;
      playCount: number;
      artist: {
        mbid: string;
      };
      image?: ImageType[];
    }
  >;
}

export declare interface UserGetTopArtistsType {
  search: SearchMeta & {
    user: string;
  };
  artists: Array<
    ArtistType & {
      rank: number;
      mbid: string;
      scrobbles: number;
    }
  >;
}

export declare interface UserGetTopTagsType {
  search: {
    user: string;
  };
  tags: Array<
    TagType & {
      count: number;
      url: string;
    }
  >;
}

export declare interface UserGetTopTracksType {
  search: SearchMeta & {
    user: string;
  };
  tracks: Array<
    TrackType & {
      rank: number;
      mbid: string;
      stats: {
        duration?: number;
        userPlayCount: number;
      };
      artist: {
        mbid: string;
      };
      image?: ImageType[];
    }
  >;
}
