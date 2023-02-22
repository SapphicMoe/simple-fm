import { Artist, Track, User } from '..';

export declare interface UserGetInfoResponse {
  user: User;
}

export declare interface UserGetFriendsResponse {
  friends: {
    user: User[];
  };
}

export declare interface UserGetArtistsResponse {
  artists: {
    artist: Array<
      Artist & {
        playcount: string;
      }
    >;
  };
}

export declare interface UserGetRecentTracksResponse {
  recenttracks: {
    track: Array<
      Track & {
        artist: { '#text': string };
        album: { '#text': string };
        '@attr'?: { nowplaying: string };
      }
    >;
  };
}
