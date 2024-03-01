import { IMAGE_SIZES } from '~/constants.js';

import type { ImageResponse } from '@responses/index.js';
import type { ImageType } from '@typings/index.js';

const convertURL = (url?: string) => encodeURIComponent(url ?? '').replaceAll(/%20/g, '+');

type LastFmURLType = 'album' | 'artist' | 'tag' | 'track';

interface LastFmURLParams<T> {
  type: T;
  value: string;
  track?: T extends 'track' ? string : never;
  album?: T extends 'album' ? string : never;
}

export const convertImageSizes = (images?: ImageResponse[]) => {
  if (!images) return undefined;

  const data = images
    .filter((image) => image['#text'] && IMAGE_SIZES.includes(image.size))
    .map(
      (image): ImageType => ({
        size: image.size,
        url: image['#text'],
      })
    );

  return data;
};

export const createLastFmURL = <T extends LastFmURLType>(params: LastFmURLParams<T>) => {
  switch (params.type) {
    case 'album':
      return `https://www.last.fm/music/${convertURL(params.value)}/_/${convertURL(params.album)}`;
    case 'artist':
      return `https://www.last.fm/music/${convertURL(params.value)}`;
    case 'track':
      return `https://www.last.fm/music/${convertURL(params.value)}/_/${convertURL(params.track)}`;
    case 'tag':
      return `https://www.last.fm/tag/${convertURL(params.value)}`;
    default:
      return undefined;
  }
};
