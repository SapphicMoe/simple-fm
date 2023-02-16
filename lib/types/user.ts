import { APITrack, Image } from '.';

export interface UserGetInfoResponse {
  user: {
    name: string;
    realname: string;
    country: string;
    url: string;
    registered: {
      unixtime: string;
      '#text': number;
    };
    image: Image[];
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
  country: string;
  registered: Date;
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
