import { Artist, Track } from '../';

export declare interface GeoGetTopArtistsResponse {
  topartists: {
    artist: Array<
      Artist & {
        listeners: string;
      }
    >;
    '@attr': {
      country: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export declare interface GeoGetTopTracksResponse {
  tracks: {
    track: Array<
      Track & {
        duration: string;
        listeners: string;
        artist: {
          name: string;
          url: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': {
      country: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}
