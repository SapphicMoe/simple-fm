import type {
  AlbumResponse,
  ArtistResponse,
  AttrResponse,
  OpenSearchResponse,
  TagResponse,
  TrackResponse,
} from '@responses/index.js';

export declare interface ArtistGetInfoResponse {
  artist: ArtistResponse & {
    mbid: string;
    stats: {
      listeners: string;
      playcount: string;
      userplaycount?: string;
    };
    ontour: string;
    bio: { summary: string };
  };
}

export declare interface ArtistGetSimilarResponse {
  similarartists: {
    artist: Array<
      ArtistResponse & {
        mbid: string;
        match: string;
      }
    >;
    '@attr': {
      artist: string;
    };
  };
}

export declare interface ArtistGetTopAlbumsResponse {
  topalbums: {
    album: Array<
      AlbumResponse & {
        playcount: number;
        artist: ArtistResponse;
      }
    >;
    '@attr': AttrResponse & { artist: string };
  };
}

export declare interface ArtistGetTopTagsResponse {
  toptags: {
    tag: Array<
      TagResponse & {
        url: string;
        count: number;
      }
    >;
    '@attr': {
      artist: string;
    };
  };
}

export declare interface ArtistGetTopTracksResponse {
  toptracks: {
    track: Array<
      TrackResponse & {
        listeners: string;
        playcount: string;
        artist: ArtistResponse;
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrResponse & { artist: string };
  };
}

export declare interface ArtistSearchResponse {
  results: OpenSearchResponse & {
    'opensearch:Query': {
      searchTerms: string;
    };
    artistmatches: {
      artist: Array<
        ArtistResponse & {
          mbid: string;
          listeners: string;
        }
      >;
    };
  };
}
