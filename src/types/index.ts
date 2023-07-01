export const ImageSizes = ['extralarge', 'large', 'medium', 'small'];

export type PersonalTagTypes = 'album' | 'artist' | 'track';
export type RequestMethods =
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
  | 'user.getTopArtists'
  | 'user.getTopTags'
  | 'user.getTopTracks';

export interface AttrMeta {
  page: string;
  perPage: string;
  totalPages: string;
  total: string;
}

export interface OpenSearchMeta {
  'opensearch:Query': {
    startPage: string;
  };
  'opensearch:totalResults': string;
  'opensearch:itemsPerPage': string;
}

export interface Image {
  size: string;
  '#text': string;
}

export interface ImageType {
  size: string;
  url: string;
}

export interface Registered {
  '#text': number;
  unixtime: string;
}

export interface PersonalTagType {
  name: string;
  artist?: Artist;
  url: string;
  image?: Image[];
}

export interface Album {
  name: string;
  artist: Artist | string;
  url: string;
  image: Image[];
}

export interface Artist {
  name: string;
  url: string;
  image?: Image[];
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
  artist: Artist | string;
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

export type * from './album.type.js';
export type * from './artist.type.js';
export type * from './chart.type.js';
export type * from './geo.type.js';
export type * from './tag.type.js';
export type * from './track.type.js';
export type * from './user.type.js';

export * from '@responses/index.js';
