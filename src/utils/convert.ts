import type { Image, ImageType } from '~/index.js';
import { ImageSizes } from '~/index.js';

export const convertImageSizes = (image: Image[]) => {
  const data = image
    .filter((i) => ImageSizes.includes(i.size))
    .map((i) => {
      return {
        size: i.size,
        url: i['#text'],
      } as ImageType;
    });

  return data;
};

export const convertURL = (url: string) => {
  return encodeURIComponent(url).replaceAll('%20', '+');
};
