import type { TrackResponse } from '@responses/index.js';

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

export interface SearchMeta {
  page: number;
  itemsPerPage: number;
  totalPages: number;
  totalResults: number;
}

export interface ImageType {
  size: string;
  url: string;
}

export interface PersonalTag {
  name?: string;
  artist?: Partial<ArtistType>;
  url?: string;
  image?: ImageType[];
}

export interface AlbumType {
  name: string;
  url: string | undefined;
  image: ImageType[] | undefined;
}

export interface ArtistType {
  name: string;
  url: string | undefined;
}

export interface TagType {
  name: string;
  url: string | undefined;
}

export interface TrackType {
  name: string;
  url: string | undefined;
}

export interface UserType {
  name: string;
  realName: string | undefined;
  country: string | undefined;
  subscriber: boolean;
  type: string;
  registered: Date;
  url: string | undefined;
  image: ImageType[] | undefined;
}

export interface TrackReturnType extends TrackResponse {
  duration: string;
  '@attr': {
    rank: number;
  };
}

export * from '@typings/album.type.js';
export * from '@typings/artist.type.js';
export * from '@typings/chart.type.js';
export * from '@typings/geo.type.js';
export * from '@typings/tag.type.js';
export * from '@typings/track.type.js';
export * from '@typings/user.type.js';
