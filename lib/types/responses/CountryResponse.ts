import { Artist, Track } from '..';

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
          mbid: string;
          url: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
  };
}
