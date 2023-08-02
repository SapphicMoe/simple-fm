export declare interface ChartGetTopArtistsType {
  search: {
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  artists: Array<{
    name: string;
    mbid: string;
    stats: {
      scrobbles: number;
      listeners: number;
    };
    url: string;
  }>;
}

export declare interface ChartGetTopTagsType {
  search: {
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  tags: Array<{
    name: string;
    stats: {
      count: number;
      reach: number;
    };
    url?: string;
  }>;
}

export declare interface ChartGetTopTracksType {
  search: {
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  tracks: Array<{
    name: string;
    mbid: string;
    stats: {
      scrobbles: number;
      listeners: number;
    };
    artist: {
      name: string;
      url: string;
    };
    url: string;
  }>;
}
