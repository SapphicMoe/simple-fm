export declare interface ChartTopArtistsType {
  name: string;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  url: string;
  image?: string | null;
}

export declare interface ChartTopTagsType {
  name: string;
  stats: {
    taggings: number;
    reach: number;
  };
  url?: string;
}

export declare interface ChartTopTracksType {
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
  image?: string | null;
}
