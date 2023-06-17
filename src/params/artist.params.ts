export interface ArtistGetInfoParams {
  artist: string;
  username?: string;
}

export interface ArtistGetSimilarParams {
  artist: string;
  limit?: number;
}

export interface ArtistGetTopAlbumsParams {
  artist: string;
  limit?: number;
  page?: number;
}

export interface ArtistGetTopTagsParams {
  artist: string;
}

export interface ArtistGetTopTracksParams {
  artist: string;
  limit?: number;
  page?: number;
}

export interface ArtistSearchParams {
  artist: string;
  limit?: number;
  page?: number;
}
