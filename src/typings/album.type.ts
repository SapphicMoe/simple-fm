import type { ObjectArray } from '@responses/index.js';
import type { AlbumType, ImageType, SearchMeta, TagType, TrackType } from '@typings/index.js';

export declare interface AlbumGetInfoType {
  name: string;
  artist: {
    name: string;
    url: string | undefined;
  };
  mbid: string | undefined;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats: {
    userPlayCount: number | undefined;
  };
  tags: ObjectArray<TagType>;
  tracks: ObjectArray<
    Omit<TrackType, 'artist' | 'mbid'> & {
      rank: number;
      duration: number;
    }
  >;
  url: string;
  image: ImageType[] | undefined;
}

export declare interface AlbumGetTopTagsType extends Omit<AlbumType, 'image' | 'url'> {
  artist: {
    name: string;
    url: string | undefined;
  };
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
      mbid: string | undefined;
    }
  >;
}
