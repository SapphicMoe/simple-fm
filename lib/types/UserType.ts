export declare interface UserType {
  name: string;
  realName: string | null;
  country: string | null;
  registered: Date;
  url: string;
  image?: string | null;
}

export declare interface UserArtistType {
  name: string;
  scrobbles: number;
  url: string;
  image?: string | null;
}

export declare interface UserTrackType {
  currentlyPlaying: boolean;
  name: string;
  album: string;
  artist: string;
  url: string;
  image?: string | null;
}
