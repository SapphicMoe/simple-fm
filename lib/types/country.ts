import { Artist, APITrack } from '.';

export interface GeoGetTopArtistsResponse {
  topartists: {
    artist: Array<
      Artist & {
        listeners: string;
      }
    >;
  };
}

export interface GeoGetTopTracksResponse {
  tracks: {
    track: Array<
      APITrack & {
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

export interface GeoArtistType {
  name: string;
  stats: {
    listeners: number;
  };
  url: string;
  image?: string;
}

export interface GeoTrackType {
  rank: number;
  name: string;
  stats: {
    duration: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}
