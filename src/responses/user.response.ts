import type { Album, Artist, AttrMeta, Image, Tag, Track, User } from '@typings/index.js';

export declare interface UserGetFriendsResponse {
  friends: {
    user: User[];
    '@attr': AttrMeta & { user: string };
  };
}

export declare interface UserGetInfoResponse {
  user: User & {
    album_count: string;
    artist_count: string;
    playcount: string;
    track_count: string;
  };
}

export declare interface UserGetLovedTracksResponse {
  lovedtracks: {
    track: Array<
      Track & {
        mbid: string;
        artist: Artist & {
          mbid: string;
        };
        date: {
          uts: string;
          '#text': string;
        };
      }
    >;
    '@attr': AttrMeta & { user: string };
  };
}

export declare interface UserGetPersonalTagsResponse {
  taggings: {
    albums?: {
      album: Array<{
        mbid: string;
        name: string;
        artist: Artist & {
          mbid: string;
        };
        url: string;
        image: Image[];
      }>;
    };
    artists?: {
      artist: Array<
        Artist & {
          mbid: string;
        }
      >;
    };
    tracks?: {
      track: Array<
        Track & {
          mbid: string;
          artist: Artist & {
            mbid: string;
          };
        }
      >;
    };
    '@attr': AttrMeta & { user: string; tag: string };
  };
}

export declare interface UserGetRecentTracksResponse {
  recenttracks: {
    track: Array<
      Track & {
        mbid: string;
        artist: {
          mbid: string;
          '#text': string;
        };
        album: {
          mbid: string;
          '#text': string;
        };
        date: {
          uts: string;
          '#text': string;
        };
        '@attr'?: { nowplaying: string };
      }
    >;
    '@attr': AttrMeta & { user: string };
  };
}

export declare interface UserGetTopAlbumsResponse {
  topalbums: {
    album: Array<
      Album & {
        mbid: string;
        artist: Artist & {
          mbid: string;
        };
        playcount: string;
        '@attr': {
          rank: string;
        };
      }
    >;
    '@attr': AttrMeta & { user: string };
  };
}

export declare interface UserGetTopArtistsResponse {
  topartists: {
    artist: Array<
      Artist & {
        mbid: string;
        playcount: string;
        '@attr': {
          rank: number;
        };
      }
    >;
    '@attr': AttrMeta & { user: string };
  };
}

export declare interface UserGetTopTagsResponse {
  toptags: {
    tag: Array<
      Tag & {
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
      Track & {
        mbid: string;
        duration: string;
        artist: Artist & {
          mbid: string;
        };
        '@attr': {
          rank: string;
        };
        playcount: string;
      }
    >;
    '@attr': AttrMeta & { user: string };
  };
}
