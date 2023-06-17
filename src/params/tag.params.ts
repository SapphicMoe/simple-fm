export interface TagGetInfoParams {
  tag: string;
}

export interface TagGetTopAlbumsParams {
  tag: string;
  limit?: number;
  page?: number;
}

export interface TagGetTopArtistsParams {
  tag: string;
  limit?: number;
  page?: number;
}

export interface TagGetTopTracksParams {
  tag: string;
  limit?: number;
  page?: number;
}

export interface TagGetWeeklyChartListParams {
  tag: string;
}
