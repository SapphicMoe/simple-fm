import { Track } from '..';

export declare interface TrackSearchResponse {
  results: {
    trackmatches: {
      track: Array<
        Track & {
          artist: string;
          listeners: string;
        }
      >;
    };
  };
}
