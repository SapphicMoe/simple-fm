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

interface Artist {
  name: string;
  mbid: string;
  url: string;
  streamable?: string;
  image: Image[];
}

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

export interface ChartGetTopArtistsResponse {
  artists: {
    artist: Array<
      Artist & {
        playcount: string;
        listeners: string;
      }
    >;
  };
}

export interface ChartGetTopTagsResponse {
  tags: {
    tag: Array<{
      name: string;
      url: string;
      reach: string;
      taggings: string;
    }>;
  };
}

export interface ChartGetTopTracksResponse {
  tracks: {
    track: Array<
      APITrack & {
        playcount: string;
        listeners: string;
        artist: {
          name: string;
          url: string;
        };
        image: Image[];
      }
    >;
  };
}

export interface GeoGetTopArtistsResponse {
  topartists: {
    artist: Array<
      Artist & {
        listeners: string;
      }
    >;
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
      track: Array<
        APITrack & {
          artist: string;
          listeners: string;
        }
      >;
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
    track: Array<
      APITrack & {
        artist: { '#text': string };
        album: { '#text': string };
        '@attr'?: { nowplaying: string };
      }
    >;
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
  bio?: string;
  stats?: {
    scrobbles?: number;
    listeners: number;
    userPlayCount?: number | null;
  };
  url: string;
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

export interface ChartArtistType {
  name: string;
  stats: {
    playCount: number;
    listeners: number;
  };
  url: string;
  image?: string;
}

export interface ChartTagsType {
  name: string;
  url: string;
  stats: {
    taggings: number;
    totalReach: number;
  };
}

export interface ChartTrackType {
  name: string;
  stats: {
    playCount: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}

export interface GeoArtistType {
  name: string;
  stats: {
    listeners: number;
  };
  url: string;
  image?: string;
}

export interface GeoTrackType {
  rank: number;
  name: string;
  stats: {
    duration: number;
    listeners: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}

export interface TagType {
  name: string;
  description: string;
  stats: {
    userReach: number;
    totalReach: number;
  };
}

export interface TagTrackType {
  rank: number;
  name: string;
  stats: {
    duration: number;
  };
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}

export interface TrackType {
  name: string;
  stats: {
    listeners: string;
  };
  artist: string;
  url: string;
  image?: string;
}

export interface UserType {
  name: string;
  realName: string | null;
  country: string;
  registered: Date;
  url: string;
  image?: string;
}

export interface UserTrackType {
  currentlyPlaying: boolean;
  name: string;
  album: string;
  artist: string;
  url: string;
  image?: string;
}
