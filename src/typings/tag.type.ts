import type { AlbumType, ArtistType, ImageType, SearchMeta, TagType, TrackType } from '@typings/index.js';

export declare interface TagGetInfoType extends TagType {
  description?: string;
  stats: {
    count?: number;
    reach?: number;
  };
}

export declare interface TagGetTopAlbumsType {
  search: SearchMeta & {
    tag: string;
  };
  albums: Array<
    AlbumType & {
      rank: number;
      mbid?: string;
      artist: {
        mbid: string;
      };
      image?: ImageType[];
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
      mbid: string;
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
      mbid: string;
      duration?: number;
      artist: {
        mbid: string;
      };
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
