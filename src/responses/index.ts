import type { Track } from '~/index.js';

export declare interface TrackResponse extends Track {
  duration: string;
  '@attr': {
    rank: number;
  };
}

export * from '@responses/album.response.js';
export * from '@responses/artist.response.js';
export * from '@responses/chart.response.js';
export * from '@responses/geo.response.js';
export * from '@responses/tag.response.js';
export * from '@responses/track.response.js';
export * from '@responses/user.response.js';
