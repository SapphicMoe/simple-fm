export declare interface TrackType {
  name: string;
  artist: string;
  stats: {
    listeners: number;
  };
  url: string;
  image?: string | null;
}
