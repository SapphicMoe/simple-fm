import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import {
  ArtistGetInfoType,
  ArtistSimilarType,
  ArtistTopAlbumsType,
  ArtistTopTagsType,
  ArtistTopTracksType,
} from '../../src/types';

export const ArtistGetInfoSchema = z.object({}) as ZodObject<
  ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny,
  ArtistGetInfoType
>;

export const ArtistSimilarSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ArtistSimilarType>
);

export const ArtistTopAlbumsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ArtistTopAlbumsType>
);

export const ArtistTopTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ArtistTopTagsType>
);

export const ArtistTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ArtistTopTracksType>
);
