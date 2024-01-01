import type { Image, ImageType } from '~/index.js';

const ImageSize = ['extralarge', 'large', 'medium', 'small'];

export const convertImageSizes = (image?: Image[]) => {
  const data = image
    ?.filter((i) => {
      if (!i['#text']) return undefined;

      return ImageSize.includes(i.size);
    })
    ?.map(
      (i): ImageType => ({
        size: i.size,
        url: i['#text'],
      })
    );

  return data;
};

export const convertURL = (url: string) => {
  return encodeURIComponent(url).replaceAll('%20', '+');
};

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
