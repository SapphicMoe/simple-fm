export declare interface TagGetInfoType {
  name: string;
  description?: string;
  stats: {
    count?: number;
    reach?: number;
  };
  url: string;
}

export declare interface TagTopAlbumsType {
  rank: number;
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}

export declare interface TagTopArtistsType {
  rank: number;
  name: string;
  url: string;
  image?: string | null;
}

export declare interface TagTopTagsType {
  name: string;
  stats: {
    count?: number;
    reach?: number;
  };
}

export declare interface TagTopTracksType {
  rank: number;
  name: string;
  duration: number | null;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}

export declare interface TagWeeklyChartListType {
  name: string;
  positions: Array<{
    from: Date;
    to: Date;
  }>;
}
