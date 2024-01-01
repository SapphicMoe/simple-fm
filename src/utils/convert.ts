import type { ImageResponse } from '@responses/index.js';
import type { ImageType } from '@typings/index.js';

const ImageSize = ['extralarge', 'large', 'medium', 'small'];

export const convertImageSizes = (images?: ImageResponse[]) => {
  if (!images) return undefined;

  const data = images
    .filter((image) => image['#text'] && ImageSize.includes(image.size))
    .map(
      (image): ImageType => ({
        size: image.size,
        url: image['#text'],
      })
    );

  return data;
};

const convertURL = (url?: string) => encodeURIComponent(url ?? '').replaceAll(/%20/g, '+');

type LastFmURLType = 'album' | 'artist' | 'tag' | 'track';

export const createLastFmURL = <T extends LastFmURLType>(
  type: T,
  value: string,
  track?: T extends 'album' | 'track' ? string : never
) => {
  switch (type) {
    case 'album':
    case 'track':
      return `https://www.last.fm/music/${convertURL(value)}/_/${convertURL(track)}`;
    case 'artist':
      return `https://www.last.fm/music/${convertURL(value)}`;
    case 'tag':
      return `https://www.last.fm/tag/${convertURL(value)}`;
    default:
      return undefined;
  }
};
