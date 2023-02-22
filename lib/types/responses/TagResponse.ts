import { Track, Tag } from '..';

export declare interface TagGetInfoResponse {
  tag: Tag & {
    total: number;
    wiki: {
      summary: string;
      content: string;
    };
  };
}

export declare interface TagGetTopTracksResponse {
  tracks: {
    track: Array<
      Track & {
        duration: string;
        artist: {
          name: string;
          mbid: string;
          url: string;
        };
        '@attr': {
          rank: string;
        };
      }
    >;
  };
}
