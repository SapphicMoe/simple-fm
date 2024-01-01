import type { ArtistType, AlbumType, ImageType, SearchMeta, TagType, TrackType } from '@typings/index.js';

export declare interface ArtistGetInfoType extends ArtistType {
  mbid: string;
  description?: string;
  onTour: boolean;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats: {
    userPlayCount?: number;
  };
}

export declare interface ArtistGetSimilarType {
  search: {
    artist: ArtistType;
  };
  artists: Array<
    ArtistType & {
      match: number;
      mbid: string;
    }
  >;
}

export declare interface ArtistGetTopAlbumsType {
  search: SearchMeta & {
    artist: ArtistType;
  };
  albums: Array<
    AlbumType & {
      scrobbles: number;
      image?: ImageType[];
    }
  >;
}

export declare interface ArtistGetTopTagsType {
  artist: ArtistType;
  tags: Array<
    TagType & {
      count: number;
    }
  >;
}

export declare interface ArtistGetTopTracksType {
  search: SearchMeta & {
    artist: ArtistType;
  };
  tracks: Array<
    TrackType & {
      rank: number;
      mbid: string;
      stats: {
        scrobbles: number;
        listeners: number;
      };
    }
  >;
}

export declare interface ArtistSearchType {
  search: SearchMeta & {
    query: string;
  };
  artists: Array<
    ArtistType & {
      mbid: string;
      listeners: number;
    }
  >;
}
