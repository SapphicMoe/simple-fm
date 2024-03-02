import type { AlbumType, ArtistType, PersonalTag, SearchMeta, TagType, TrackType, UserType } from '@typings/index.js';

export declare interface UserGetFriendsType {
  search: SearchMeta & {
    user: string;
  };
  friends: UserType[];
}

export declare interface UserGetInfoType extends UserType {
  stats: {
    albumCount: number;
    artistCount: number;
    playCount: number;
    trackCount: number;
  };
}

export declare interface UserGetLovedTracksType {
  search: SearchMeta & {
    user: string;
  };
  tracks: Array<
    TrackType & {
      date: Date;
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
    Omit<TrackType, 'album'> & {
      dateAdded: Date | undefined;
      mbid: string | undefined;
      album: {
        name: string;
        mbid: string | undefined;
      };
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
      mbid: string | undefined;
      playCount: number;
      artist: {
        mbid: string | undefined;
      };
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
      mbid: string | undefined;
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
      mbid: string | undefined;
      stats: {
        duration?: number;
        userPlayCount: number;
      };
      artist: {
        mbid: string | undefined;
      };
    }
  >;
}
