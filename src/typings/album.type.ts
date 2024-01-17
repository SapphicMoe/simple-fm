import type { ObjectArray } from '@responses/index.js';
import type { AlbumType, ImageType, SearchMeta, TagType, TrackType } from '@typings/index.js';

export declare interface AlbumGetInfoType extends AlbumType {
  mbid?: string;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats?: {
    userPlayCount?: number;
  };
  tags: ObjectArray<TagType>;
  tracks?: ObjectArray<
    TrackType & {
      rank: number;
      duration?: number;
    }
  >;
  url: string;
  image?: ImageType[];
}

export declare interface AlbumGetTopTagsType extends AlbumType {
  tags: Array<
    TagType & {
      count: number;
    }
  >;
}

export declare interface AlbumSearchType {
  search: SearchMeta & {
    query: string;
  };
  albums: Array<
    AlbumType & {
      mbid?: string;
      url: string;
      image?: ImageType[];
    }
  >;
}
