import { Artist, Track } from '../index.js';

export declare interface GeoGetTopArtistsResponse {
  topartists: {
    artist: Array<
      Artist & {
        listeners: string;
      }
    >;
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
  };
}
