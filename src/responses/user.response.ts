import type { Album, Artist, Image, Tag, Track, User } from '~/index.js';

export declare interface UserGetInfoResponse {
  user: User;
}

export declare interface UserGetFriendsResponse {
  friends: {
    user: User[];
    '@attr': {
      user: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
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
    '@attr': {
      user: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
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
    '@attr': {
      user: string;
      tag: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
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
    '@attr': {
      user: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
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
    '@attr': {
      user: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
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
    '@attr': {
      user: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export declare interface UserGetTopTagsResponse {
  toptags: {
    tag: Tag[];
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
    '@attr': {
      user: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}
