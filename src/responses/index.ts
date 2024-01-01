export type ObjectArray<T> = T | T[];

export interface AttrResponse {
  page: string;
  perPage: string;
  totalPages: string;
  total: string;
}

export interface OpenSearchResponse {
  'opensearch:Query': {
    startPage: string;
  };
  'opensearch:totalResults': string;
  'opensearch:itemsPerPage': string;
}

export interface ImageResponse {
  size: string;
  '#text': string;
}

export interface Registered {
  '#text': number;
  unixtime: string;
}

export interface AlbumResponse {
  name: string;
  mbid?: string;
  artist: ArtistResponse | string;
  url: string;
  image: ImageResponse[];
}

export interface ArtistResponse {
  name: string;
  mbid?: string;
  url: string;
  image?: ImageResponse[];
}

export interface TagResponse {
  name: string;
  url?: string;
  count?: number;
  total?: number;
  reach?: number;
}

export interface TrackResponse {
  name: string;
  mbid: string;
  artist: ArtistResponse | string;
  url: string;
  image: ImageResponse[];
}

export interface UserResponse {
  name: string;
  realname?: string;
  country?: string;
  registered: Registered;
  url: string;
  image?: ImageResponse[];
}

export * from '@responses/album.response.js';
export * from '@responses/artist.response.js';
export * from '@responses/chart.response.js';
export * from '@responses/geo.response.js';
export * from '@responses/tag.response.js';
export * from '@responses/track.response.js';
export * from '@responses/user.response.js';
