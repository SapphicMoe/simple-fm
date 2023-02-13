interface Image {
  '#text': string;
  size: 'extralarge' | 'large' | 'medium' | 'small';
}

interface APITrack {
  name: string;
  url: string;
  streamable: object | string;
  image: Image[];
}

// Expand these as necessary in the future
export interface AlbumSearchResponse {
  results: {
    albummatches: {
      album: Array<{
        name: string;
        artist: string;
        url: string;
        image: Image[];
      }>;
    };
  };
}

export interface ArtistGetInfoResponse {
  artist: {
    name: string;
    url: string;
    stats: {
      listeners: string;
      playcount: string;
    };
    bio: { summary: string };
  };
}

export interface ArtistGetSimilarResponse {
  similarartists: {
    artist: Array<{
      name: string;
      match: string;
      url: string;
      image: Image[];
    }>;
  };
}

export interface ArtistGetTopTagsResponse {
  toptags: {
    tag: Array<{
      name: string;
      url: string;
      count: number;
    }>;
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

export interface GeoGetTopArtistsResponse {
  topartists: {
    artist: Array<{
      name: string;
      listeners: string;
      mbid: string;
      url: string;
      streamable: string;
      image: Image[];
    }>;
  };
}

export interface GeoGetTopTracksResponse {
  tracks: {
    track: Array<
      APITrack & {
        duration: string;
        listeners: string;
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

export interface TagGetInfoResponse {
  tag: {
    name: string;
    total: number;
    reach: number;
    wiki: {
      summary: string;
      content: string;
    };
  };
}

export interface TagGetTopTracksResponse {
  tracks: {
    track: Array<
      APITrack & {
        duration: string;
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

export interface TrackSearchResponse {
  results: {
    trackmatches: {
      track: Array<{
        name: string;
        artist: string;
        url: string;
        streamable: string;
        listeners: string;
        image: Image[];
      }>;
    };
  };
}

export interface UserGetInfoResponse {
  user: {
    name: string;
    realname: string;
    country: string;
    url: string;
    registered: {
      unixtime: string;
      '#text': number;
    };
    image: Image[];
  };
}

export interface UserGetRecentTracksResponse {
  recenttracks: {
    track: Array<{
      artist: { '#text': string };
      streamable: string;
      image: Image[];
      album: { '#text': string };
      name: string;
      url: string;
      '@attr'?: { nowplaying: string };
    }>;
  };
}

export interface AlbumType {
  name: string;
  artist: string;
  url: string;
  image?: string;
}

export interface ArtistType {
  name: string;
  url: string;
  bio: string;
  scrobbles: string;
  listeners: string;
}

export interface ArtistSimilarType {
  name: string;
  match: string;
  url: string;
  image?: string;
}

export interface ArtistTrackType {
  rank: string;
  name: string;
  scrobbles: string;
  listeners: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
}

export interface ArtistTagType {
  name: string;
  url: string;
  timesRanked: number;
}

export interface GeoArtistType {
  name: string;
  listeners: string;
  url: string;
  image?: string;
}

export interface GeoTrackType {
  rank: string;
  name: string;
  duration: string;
  listeners: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}

export interface TagType {
  name: string;
  userReach: number;
  totalReach: number;
  description: string;
}

export interface TagTrackType {
  rank: string;
  name: string;
  duration: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}

export interface TrackType {
  name: string;
  listeners: string;
  artist: string;
  url: string;
  image?: string;
}

export interface UserType {
  name: string;
  realName: string | null;
  country: string;
  url: string;
  registered: Date;
  image?: string;
}

export interface UserTrackType {
  currentlyPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  url: string;
  image?: string;
}
