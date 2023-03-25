export type PersonalTagTypes = 'album' | 'artist' | 'track';

export type requestMethods =
  | 'album.getInfo'
  | 'album.getTopTags'
  | 'album.search'
  | 'artist.getInfo'
  | 'artist.getSimilar'
  | 'artist.getTopAlbums'
  | 'artist.getTopTags'
  | 'artist.getTopTracks'
  | 'artist.search'
  | 'chart.getTopArtists'
  | 'chart.getTopTags'
  | 'chart.getTopTracks'
  | 'geo.getTopArtists'
  | 'geo.getTopTracks'
  | 'library.getArtists'
  | 'tag.getInfo'
  | 'tag.getTopAlbums'
  | 'tag.getTopArtists'
  | 'tag.getTopTags'
  | 'tag.getTopTracks'
  | 'tag.getWeeklyChartList'
  | 'track.getInfo'
  | 'track.getSimilar'
  | 'track.getTopTags'
  | 'track.search'
  | 'user.getFriends'
  | 'user.getInfo'
  | 'user.getLovedTracks'
  | 'user.getPersonalTags'
  | 'user.getRecentTracks'
  | 'user.getTopAlbums'
  | 'user.getTopTags'
  | 'user.getTopTracks';

export interface Image {
  '#text': string;
  size: 'extralarge' | 'large' | 'medium' | 'small';
}

export interface Registered {
  '#text': number;
  unixtime: string;
}

export interface PersonalTagType {
  name: string;
  artist?: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}

export interface Album {
  name: string;
  artist: object | string;
  url: string;
  image: Image[];
}

export interface Artist {
  name: string;
  url: string;
  image: Image[];
}

export interface Tag {
  name: string;
  url?: string;
  count?: number;
  total?: number;
  reach?: number;
}

export interface Track {
  name: string;
  artist: object | string;
  url: string;
  image: Image[];
}

export interface User {
  name: string;
  realname: string | null;
  country: string | null;
  registered: Registered;
  url: string;
  image: Image[];
}

export * from './AlbumType.js';
export * from './ArtistType.js';
export * from './ChartType.js';
export * from './GeoType.js';
export * from './TagType.js';
export * from './TrackType.js';
export * from './UserType.js';

// eslint-disable-next-line import/no-useless-path-segments
export * from './responses/index.js';
