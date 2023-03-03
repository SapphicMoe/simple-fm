export declare interface GeoArtistType {
  name: string;
  listeners: number;
  url: string;
  image?: string | null;
}

export declare interface GeoTrackType {
  rank: number;
  name: string;
  duration: number | null;
  listeners: number;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image?: string | null;
}
