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

export interface APITrack {
  name: string;
  url: string;
  streamable: object | string;
  image: Image[];
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
  reach: number;
}

export interface User {
  name: string;
  realname: string;
  country: string | null;
  url: string;
  registered: {
    unixtime: string;
    '#text': number;
  };
  image: Image[];
}

export * from './album.js';
export * from './artist.js';
export * from './chart.js';
export * from './country.js';
export * from './tag.js';
export * from './track.js';
export * from './user.js';
