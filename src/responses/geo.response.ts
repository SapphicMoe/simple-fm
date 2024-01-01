import type { ArtistResponse, AttrResponse, TrackResponse } from '@responses/index.js';

export declare interface GeoGetTopArtistsResponse {
  topartists: {
    artist: Array<
      ArtistResponse & {
        mbid: string;
        listeners: string;
      }
    >;
    '@attr': AttrResponse & { country: string };
  };
}

export declare interface GeoGetTopTracksResponse {
  tracks: {
    track: Array<
      TrackResponse & {
        duration: string;
        listeners: string;
        artist: ArtistResponse & {
          mbid: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrResponse & { country: string };
  };
}
