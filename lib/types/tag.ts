import { APITrack } from '.';

export interface TagGetInfoResponse {
  tag: {
    name: string;
    total: number;
    reach: number;
    wiki: {
      summary: string;
      content: string;
    };
  };
}

export interface TagGetTopTracksResponse {
  tracks: {
    track: Array<
      APITrack & {
        duration: string;
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

export interface TagType {
  name: string;
  description: string;
  stats: {
    userReach: number;
    totalReach: number;
  };
}

export interface TagTrackType {
  rank: number;
  name: string;
  stats: {
    duration: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}
