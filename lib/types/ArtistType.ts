export declare interface ArtistType {
  name: string;
  bio?: string;
  stats: {
    scrobbles?: number;
    listeners: number;
    userPlayCount?: number | null;
  };
  url: string;
}

export declare interface ArtistAlbumType {
  name: string;
  stats?: {
    scrobbles: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}

export declare interface ArtistSimilarType {
  name: string;
  match: number;
  url: string;
  image?: string | null;
}

export declare interface ArtistTrackType {
  rank: number;
  name: string;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
}

export declare interface ArtistTagType {
  name: string;
  stats: {
    timesRanked: number;
  };
  url: string;
}
