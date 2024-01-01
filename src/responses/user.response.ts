import type {
  ArtistResponse,
  AlbumResponse,
  AttrResponse,
  ImageResponse,
  TagResponse,
  TrackResponse,
  UserResponse,
} from '@responses/index.js';

export declare interface UserGetFriendsResponse {
  friends: {
    user: UserResponse[];
    '@attr': AttrResponse & { user: string };
  };
}

export declare interface UserGetInfoResponse {
  user: UserResponse & {
    album_count: string;
    artist_count: string;
    playcount: string;
    track_count: string;
  };
}

export declare interface UserGetLovedTracksResponse {
  lovedtracks: {
    track: Array<
      TrackResponse & {
        artist: ArtistResponse & {
          mbid: string;
        };
        date: {
          uts: string;
          '#text': string;
        };
      }
    >;
    '@attr': AttrResponse & { user: string };
  };
}

export declare interface UserGetPersonalTagsResponse {
  taggings: {
    albums?: {
      album: Array<{
        name: string;
        artist: ArtistResponse & {
          mbid: string;
        };
        url: string;
        image: ImageResponse[];
      }>;
    };
    artists?: {
      artist: Array<
        ArtistResponse & {
          mbid: string;
        }
      >;
    };
    tracks?: {
      track: Array<
        TrackResponse & {
          artist: ArtistResponse & {
            mbid: string;
          };
        }
      >;
    };
    '@attr': AttrResponse & { user: string; tag: string };
  };
}

export declare interface UserGetRecentTracksResponse {
  recenttracks: {
    track: Array<
      TrackResponse & {
        artist: {
          mbid: string;
          '#text': string;
        };
        album: {
          mbid: string;
          '#text': string;
        };
        date:
          | {
              uts: string;
              '#text': string;
            }
          | undefined;
        '@attr'?: { nowplaying: string };
      }
    >;
    '@attr': AttrResponse & { user: string };
  };
}

export declare interface UserGetTopAlbumsResponse {
  topalbums: {
    album: Array<
      AlbumResponse & {
        artist: ArtistResponse & {
          mbid: string;
        };
        playcount: string;
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrResponse & { user: string };
  };
}

export declare interface UserGetTopArtistsResponse {
  topartists: {
    artist: Array<
      ArtistResponse & {
        mbid: string;
        playcount: string;
        '@attr': {
          rank: number;
        };
      }
    >;
    '@attr': AttrResponse & { user: string };
  };
}

export declare interface UserGetTopTagsResponse {
  toptags: {
    tag: Array<
      TagResponse & {
        count: number;
        url: string;
      }
    >;
    '@attr': {
      user: string;
    };
  };
}

export declare interface UserGetTopTracksResponse {
  toptracks: {
    track: Array<
      TrackResponse & {
        duration: string;
        artist: ArtistResponse & {
          mbid: string;
        };
        '@attr': {
          rank: string;
        };
        playcount: string;
      }
    >;
    '@attr': AttrResponse & { user: string };
  };
}
