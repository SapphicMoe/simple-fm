import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import {
  TagGetInfoType,
  TagTopAlbumsType,
  TagTopArtistsType,
  TagTopTracksType,
  TagWeeklyChartListType,
} from '../../src/index.js';

export const TagGetInfoSchema = z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagGetInfoType>;

export const TagTopAlbumsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagTopAlbumsType>
);

export const TagTopArtistsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagTopArtistsType>
);

export const TagTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagTopTracksType>
);

export const TagWeeklyChartListSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagWeeklyChartListType>
);
