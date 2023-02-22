export declare interface ChartArtistType {
  name: string;
  stats: {
    playCount: number;
    listeners: number;
  };
  url: string;
  image?: string | null;
}

export declare interface ChartTagsType {
  name: string;
  stats: {
    taggings: number;
    totalReach: number;
  };
  url: string;
}

export declare interface ChartTrackType {
  name: string;
  stats: {
    playCount: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}
