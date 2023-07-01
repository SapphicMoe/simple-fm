import type { Artist, AttrMeta, Track, Tag } from '~/index.js';

export declare interface ChartGetTopArtistsResponse {
  artists: {
    artist: Array<
      Artist & {
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
      }
    >;
    '@attr': AttrMeta;
  };
}

export declare interface ChartGetTopTracksResponse {
  tracks: {
    track: Array<
      Track & {
        playcount: string;
        listeners: string;
        artist: Artist;
      }
    >;
    '@attr': AttrMeta;
  };
}
