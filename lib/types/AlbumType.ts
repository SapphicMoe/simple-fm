export declare interface AlbumType {
  name: string;
  artist: string;
  url: string;
  image?: string | null;
}

export declare interface AlbumGetInfoType {
  name: string;
  artist: string;
  userPlayCount?: number;
  tags: Array<{
    name: string;
    url: string;
  }>;
  tracks: Array<{
    rank: number;
    name: string;
    duration: number;
    url: string;
  }>;
}
