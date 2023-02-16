import { APITrack } from '.';

export interface TrackSearchResponse {
  results: {
    trackmatches: {
      track: Array<
        APITrack & {
          artist: string;
          listeners: string;
        }
      >;
    };
  };
}

export interface TrackType {
  name: string;
  stats: {
    listeners: string;
  };
  artist: string;
  url: string;
  image?: string;
}
