import type { Album, Artist, AttrMeta, Image, Tag, Track, User } from '~/index.js';

export declare interface UserGetInfoResponse {
  user: User;
}

export declare interface UserGetFriendsResponse {
  friends: {
    user: User[];
    '@attr': AttrMeta & { user: string };
  };
}

export declare interface UserGetLovedTracksResponse {
  lovedtracks: {
    track: Array<
      Track & {
        artist: Artist;
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
        name: string;
        artist: Artist;
        url: string;
        image: Image[];
      }>;
    };
    artists?: {
      artist: Artist[];
    };
    tracks?: {
      track: Track[];
    };
    '@attr': AttrMeta & { user: string; tag: string };
  };
}

export declare interface UserGetRecentTracksResponse {
  recenttracks: {
    track: Array<
      Track & {
        artist: { '#text': string };
        album: { '#text': string };
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
        artist: Artist;
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
        duration: string;
        artist: Artist;
        '@attr': {
          rank: string;
        };
        playcount: string;
      }
    >;
    '@attr': AttrMeta & { user: string };
  };
}
