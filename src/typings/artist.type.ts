import type { ArtistType, AlbumType, ImageType, SearchMeta, TagType, TrackType } from '@typings/index.js';

export declare interface ArtistGetInfoType {
  name: string;
  mbid: string | undefined;
  onTour: boolean;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  userStats: {
    userPlayCount: number | undefined;
  };
  tags: Array<{
    name: string;
    url: string | undefined;
  }>;
  bio: {
    summary: string;
    extended: string;
    published: Date;
    url: string;
  };
  similarArtists: Array<{
    name: string;
    image: ImageType[] | undefined;
    url: string;
  }>;
  url: string;
}

export declare interface ArtistGetSimilarType {
  search: {
    artist: {
      name: string;
      url: string | undefined;
    };
  };
  artists: Array<
    ArtistType & {
      match: number;
      mbid: string | undefined;
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
    }
  >;
}

export declare interface ArtistGetTopTagsType {
  search: { artist: ArtistType };
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
      mbid: string | undefined;
      listeners: number;
    }
  >;
}
