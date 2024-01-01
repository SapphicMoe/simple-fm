import type { ArtistType, TagType, TrackType, SearchMeta } from '@typings/index.js';

export declare interface ChartGetTopArtistsType {
  search: SearchMeta;
  artists: Array<
    ArtistType & {
      mbid: string;
      stats: {
        scrobbles: number;
        listeners: number;
      };
    }
  >;
}

export declare interface ChartGetTopTagsType {
  search: SearchMeta;
  tags: Array<
    TagType & {
      stats: {
        count: number;
        reach: number;
      };
    }
  >;
}

export declare interface ChartGetTopTracksType {
  search: SearchMeta;
  tracks: Array<
    TrackType & {
      mbid: string;
      stats: {
        scrobbles: number;
        listeners: number;
      };
    }
  >;
}
