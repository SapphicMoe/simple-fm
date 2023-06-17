export interface TrackGetInfoParams {
  artist: string;
  track: string;
  username?: string;
}

export interface TrackGetSimilarParams {
  artist: string;
  track: string;
  limit?: number;
}

export interface TrackGetTopTagsParams {
  artist: string;
  track: string;
}

export interface TrackSearchParams {
  track: string;
  limit?: number;
  page?: number;
}
