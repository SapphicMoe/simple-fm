export declare interface GeoGetTopArtistsType {
  search: {
    country: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  artists: Array<{
    name: string;
    mbid: string;
    listeners: number;
    url: string;
  }>;
}

export declare interface GeoGetTopTracksType {
  search: {
    country: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  tracks: Array<{
    rank: number;
    name: string;
    mbid: string;
    duration?: number;
    listeners: number;
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    url: string;
  }>;
}
