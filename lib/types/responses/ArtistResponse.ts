import { Album, Artist, Track, Tag } from '..';

export declare interface ArtistGetInfoResponse {
  artist: Artist & {
    stats: {
      listeners: string;
      playcount: string;
      userplaycount?: string;
    };
    bio: { summary: string };
  };
}

export declare interface ArtistGetSimilarResponse {
  similarartists: {
    artist: Array<
      Artist & {
        match: string;
      }
    >;
  };
}

export declare interface ArtistGetTopAlbumsResponse {
  topalbums: {
    album: Array<
      Album & {
        playcount: number;
        artist: {
          name: string;
          url: string;
        };
      }
    >;
  };
}

export declare interface ArtistGetTopTagsResponse {
  toptags: {
    tag: Array<
      Tag & {
        url: string;
        count: number;
      }
    >;
  };
}

export declare interface ArtistGetTopTracksResponse {
  toptracks: {
    track: Array<
      Track & {
        listeners: string;
        playcount: string;
        artist: {
          name: string;
          url: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
  };
}

export declare interface ArtistSearchResponse {
  results: {
    artistmatches: {
      artist: Array<
        Artist & {
          listeners: string;
        }
      >;
    };
  };
}
