export interface AlbumGetInfoParams {
  artist: string;
  album: string;
  username?: string;
}

export interface AlbumGetTopTagsParams {
  artist: string;
  album: string;
}

export interface AlbumSearchParams {
  album: string;
  limit?: number;
  page?: number;
}
