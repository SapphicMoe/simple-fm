export interface Image {
  '#text': string;
  size: 'extralarge' | 'large' | 'medium' | 'small';
}

export interface Album {
  name: string;
  artist: object | string;
  url: string;
  image: Image[];
  streamable?: string;
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
  streamable?: string;
  image: Image[];
}

export interface Tag {
  name: string;
  url?: string;
  reach?: number;
}

export interface Track {
  name: string;
  url: string;
  streamable: object | string;
  image: Image[];
}

export interface User {
  name: string;
  realname: string | null;
  country: string | null;
  url: string;
  registered: {
    unixtime: string;
    '#text': number;
  };
  image: Image[];
}

export * from './AlbumType.js';
export * from './ArtistType.js';
export * from './ChartType.js';
export * from './CountryType.js';
export * from './TagType.js';
export * from './TrackType.js';
export * from './UserType.js';

// eslint-disable-next-line import/no-useless-path-segments
export * from './responses/index.js';
