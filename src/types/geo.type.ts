export declare interface GeoArtistType {
  search: {
    country: string;
    page: number;
    itemsPerPage: number;
    totalPages: number;
    totalResults: number;
  };
  artists: Array<{
    name: string;
    listeners: number;
    url: string;
  }>;
}

export declare interface GeoTrackType {
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
    duration: number | null;
    listeners: number;
    artist: {
      name: string;
      url: string;
    };
    url: string;
  }>;
}
