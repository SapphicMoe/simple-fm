export declare interface TagType {
  name: string;
  description: string;
  stats: {
    userReach?: number;
    totalReach?: number;
  };
}

export declare interface TagTrackType {
  rank: number;
  name: string;
  duration: number;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}
