import type { ArtistResponse, AttrResponse, TagResponse, TrackResponse } from '@responses/index.js';

export declare interface ChartGetTopArtistsResponse {
  artists: {
    artist: Array<
      ArtistResponse & {
        mbid: string;
        playcount: string;
        listeners: string;
      }
    >;
    '@attr': AttrResponse;
  };
}

export declare interface ChartGetTopTagsResponse {
  tags: {
    tag: Array<
      TagResponse & {
        taggings: string;
        url: string;
      }
    >;
    '@attr': AttrResponse;
  };
}

export declare interface ChartGetTopTracksResponse {
  tracks: {
    track: Array<
      TrackResponse & {
        playcount: string;
        listeners: string;
        artist: ArtistResponse & {
          mbid: string;
        };
      }
    >;
    '@attr': AttrResponse;
  };
}
