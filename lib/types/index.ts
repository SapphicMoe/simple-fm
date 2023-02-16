export interface Image {
  '#text': string;
  size: 'extralarge' | 'large' | 'medium' | 'small';
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

export * from './album.js';
export * from './artist.js';
export * from './chart.js';
export * from './country.js';
export * from './tag.js';
export * from './track.js';
export * from './user.js';
