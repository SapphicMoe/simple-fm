import type { Artist, APITrack, Image, Tag } from '.';

export interface ChartGetTopArtistsResponse {
  artists: {
    artist: Array<
      Artist & {
        playcount: string;
        listeners: string;
      }
    >;
  };
}

export interface ChartGetTopTagsResponse {
  tags: {
    tag: Array<
      Tag & {
        url: string;
        taggings: string;
      }
    >;
  };
}

export interface ChartGetTopTracksResponse {
  tracks: {
    track: Array<
      APITrack & {
        playcount: string;
        listeners: string;
        artist: {
          name: string;
          url: string;
        };
        image: Image[];
      }
    >;
  };
}

export interface ChartArtistType {
  name: string;
  stats: {
    playCount: number;
    listeners: number;
  };
  url: string;
  image?: string;
}

export interface ChartTagsType {
  name: string;
  url: string;
  stats: {
    taggings: number;
    totalReach: number;
  };
}

export interface ChartTrackType {
  name: string;
  stats: {
    playCount: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}
