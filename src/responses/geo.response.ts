import type { Artist, AttrMeta, Track } from '@typings/index.js';

export declare interface GeoGetTopArtistsResponse {
  topartists: {
    artist: Array<
      Artist & {
        listeners: string;
      }
    >;
    '@attr': AttrMeta & { country: string };
  };
}

export declare interface GeoGetTopTracksResponse {
  tracks: {
    track: Array<
      Track & {
        duration: string;
        listeners: string;
        artist: Artist;
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrMeta & { country: string };
  };
}
