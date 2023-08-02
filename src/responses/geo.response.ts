import type { Artist, AttrMeta, Track } from '@typings/index.js';

export declare interface GeoGetTopArtistsResponse {
  topartists: {
    artist: Array<
      Artist & {
        mbid: string;
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
        mbid: string;
        duration: string;
        listeners: string;
        artist: Artist & {
          mbid: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrMeta & { country: string };
  };
}
