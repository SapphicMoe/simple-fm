import { Artist, APITrack, User } from '.';

export interface UserGetInfoResponse {
  user: User;
}

export interface UserGetFriendsResponse {
  friends: {
    user: User[];
  };
}

export interface UserGetArtistsResponse {
  artists: {
    artist: Array<
      Artist & {
        playcount: string;
      }
    >;
  };
}

export interface UserGetRecentTracksResponse {
  recenttracks: {
    track: Array<
      APITrack & {
        artist: { '#text': string };
        album: { '#text': string };
        '@attr'?: { nowplaying: string };
      }
    >;
  };
}

export interface UserType {
  name: string;
  realName: string | null;
  country: string | null;
  registered: Date;
  url: string;
  image?: string;
}

export interface UserArtistType {
  name: string;
  stats: {
    scrobbles: number;
  };
  url: string;
  image?: string;
}

export interface UserTrackType {
  currentlyPlaying: boolean;
  name: string;
  album: string;
  artist: string;
  url: string;
  image?: string;
}
