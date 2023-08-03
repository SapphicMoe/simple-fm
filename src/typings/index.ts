export type ObjectArray<T> = T | T[];

export type RequestMethod =
  | 'album.addTags'
  | 'album.getInfo'
  | 'album.getTopTags'
  | 'album.removeTag'
  | 'album.search'
  | 'artist.addTags'
  | 'artist.getCorrection'
  | 'artist.getInfo'
  | 'artist.getSimilar'
  | 'artist.getTopAlbums'
  | 'artist.getTopTags'
  | 'artist.getTopTracks'
  | 'artist.removeTag'
  | 'artist.search'
  | 'auth.getMobileSession'
  | 'auth.getSession'
  | 'auth.getToken'
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
  | 'track.addTags'
  | 'track.getCorrection'
  | 'track.getInfo'
  | 'track.getSimilar'
  | 'track.getTopTags'
  | 'track.love'
  | 'track.removeTag'
  | 'track.scrobble'
  | 'track.search'
  | 'track.unlove'
  | 'track.updateNowPlaying'
  | 'user.getFriends'
  | 'user.getInfo'
  | 'user.getLovedTracks'
  | 'user.getPersonalTags'
  | 'user.getRecentTracks'
  | 'user.getTopAlbums'
  | 'user.getTopArtists'
  | 'user.getTopTags'
  | 'user.getTopTracks'
  | 'user.getWeeklyAlbumChart'
  | 'user.getWeeklyArtistChart'
  | 'user.getWeeklyChartList'
  | 'user.getWeeklyTrackList';

export interface AttrMeta {
  page: string;
  perPage: string;
  totalPages: string;
  total: string;
}

export interface SearchMeta {
  page: number;
  itemsPerPage: number;
  totalPages?: number;
  totalResults: number;
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

export interface PersonalTag {
  name: string;
  artist?: Artist & {
    mbid: string;
  };
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
  mbid?: string;
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
  realname?: string;
  country?: string;
  registered: Registered;
  url: string;
  image?: Image[];
}

export * from '@typings/album.type.js';
export * from '@typings/artist.type.js';
export * from '@typings/chart.type.js';
export * from '@typings/geo.type.js';
export * from '@typings/tag.type.js';
export * from '@typings/track.type.js';
export * from '@typings/user.type.js';
