import type { ArtistType, TrackType, SearchMeta } from '@typings/index.js';

export declare interface GeoGetTopArtistsType {
  search: SearchMeta & {
    country: string;
  };
  artists: Array<
    ArtistType & {
      mbid: string;
      listeners: number;
    }
  >;
}

export declare interface GeoGetTopTracksType {
  search: SearchMeta & {
    country: string;
  };
  tracks: Array<
    TrackType & {
      rank: number;
      mbid: string;
      duration?: number;
      listeners: number;
      artist: {
        mbid: string;
      };
    }
  >;
}
