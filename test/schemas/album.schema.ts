import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import { AlbumGetInfoType, AlbumGetTopTagsType, AlbumSearchType } from '../../src/index.js';

export const AlbumGetInfoSchema = z.object({}) as ZodObject<
  ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny,
  AlbumGetInfoType
>;

export const AlbumGetTopTagsSchema = z.object({}) as ZodObject<
  ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny,
  AlbumGetTopTagsType
>;

export const AlbumSearchSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, AlbumSearchType>
);
