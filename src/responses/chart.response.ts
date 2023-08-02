import type { Artist, AttrMeta, Track, Tag } from '@typings/index.js';

export declare interface ChartGetTopArtistsResponse {
  artists: {
    artist: Array<
      Artist & {
        mbid: string;
        playcount: string;
        listeners: string;
      }
    >;
    '@attr': AttrMeta;
  };
}

export declare interface ChartGetTopTagsResponse {
  tags: {
    tag: Array<
      Tag & {
        taggings: string;
        url: string;
      }
    >;
    '@attr': AttrMeta;
  };
}

export declare interface ChartGetTopTracksResponse {
  tracks: {
    track: Array<
      Track & {
        mbid: string;
        playcount: string;
        listeners: string;
        artist: Artist & {
          mbid: string;
        };
      }
    >;
    '@attr': AttrMeta;
  };
}
