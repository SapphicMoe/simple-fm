import { Album, Artist, APITrack, Tag } from '.';

export interface ArtistGetInfoResponse {
  artist: Artist & {
    stats: {
      listeners: string;
      playcount: string;
      userplaycount?: string;
    };
    bio: { summary: string };
  };
}

export interface ArtistGetSimilarResponse {
  similarartists: {
    artist: Array<
      Artist & {
        match: string;
      }
    >;
  };
}

export interface ArtistGetTopAlbumsResponse {
  topalbums: {
    album: Array<
      Album & {
        playcount: number;
        artist: {
          name: string;
          mbid: string;
          url: string;
        };
      }
    >;
  };
}

export interface ArtistGetTopTagsResponse {
  toptags: {
    tag: Array<
      Tag & {
        url: string;
        count: number;
      }
    >;
  };
}

export interface ArtistGetTopTracksResponse {
  toptracks: {
    track: Array<
      APITrack & {
        listeners: string;
        playcount: string;
        artist: {
          name: string;
          mbid: string;
          url: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
  };
}

export interface ArtistSearchResponse {
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

export interface ArtistType {
  name: string;
  bio?: string;
  stats: {
    scrobbles?: number;
    listeners: number;
    userPlayCount?: number | null;
  };
  url: string;
}

export interface ArtistAlbumType {
  name: string;
  stats?: {
    scrobbles: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}

export interface ArtistSimilarType {
  name: string;
  match: number;
  url: string;
  image?: string;
}

export interface ArtistTrackType {
  rank: number;
  name: string;
  stats: {
    scrobbles: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
}

export interface ArtistTagType {
  name: string;
  url: string;
  stats: {
    timesRanked: number;
  };
}
