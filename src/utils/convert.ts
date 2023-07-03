import type { Image, ImageType } from '~/index.js';

const ImageSize = ['extralarge', 'large', 'medium', 'small'];

export const convertImageSizes = (image: Image[] | null) => {
  try {
    const data = image
      ?.filter((i) => ImageSize.includes(i.size))
      ?.map(
        (i): ImageType => ({
          size: i.size,
          url: i['#text'],
        })
      );

    return data;
  } catch (_) {
    return null;
  }
};

export const convertURL = (url: string) => {
  return encodeURIComponent(url).replaceAll('%20', '+');
};
