export declare interface TrackGetInfoType {
  name: string;
  duration: number | null;
  stats: {
    scrobbles: number;
    listeners: number;
    userPlayCount: number | null;
    userLoved: boolean;
  };
  artist: {
    name: string;
    url: string;
  };
  album: {
    position: number;
    name: string;
    url: string;
  };
  tags?: object[];
  url: string;
  image?: string | null;
}

export declare interface TrackSearchType {
  name: string;
  listeners: number;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}

export declare interface TrackSimilarType {
  name: string;
  match: number;
  duration: number | null;
  scrobbles: number;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}

export declare interface TrackTopTagsType {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  tags: Array<{
    count: number;
    name: string;
    url: string;
  }>;
}
