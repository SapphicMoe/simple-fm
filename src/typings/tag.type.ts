import type { AlbumType, ArtistType, SearchMeta, TagType, TrackType } from '@typings/index.js';

export declare interface TagGetInfoType extends TagType {
  description: string;
  stats: {
    count: number;
    reach: number;
  };
}

export declare interface TagGetTopAlbumsType {
  search: SearchMeta & {
    tag: string;
  };
  albums: Array<
    AlbumType & {
      rank: number;
      mbid: string | undefined;
      artist: {
        mbid: string | undefined;
      };
    }
  >;
}

export declare interface TagGetTopArtistsType {
  search: SearchMeta & {
    tag: string;
  };
  artists: Array<
    ArtistType & {
      rank: number;
    }
  >;
}

export declare interface TagGetTopTracksType {
  search: SearchMeta & {
    tag: string;
  };
  tracks: Array<
    TrackType & {
      rank: number;
      duration: number;
    }
  >;
}

export declare interface TagGetWeeklyChartListType {
  search: {
    tag: string;
  };
  positions: Array<{
    from: Date;
    to: Date;
  }>;
}
