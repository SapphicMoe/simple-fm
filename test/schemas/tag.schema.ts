import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import {
  TagGetInfoType,
  TagGetTopAlbumsType,
  TagGetTopArtistsType,
  TagGetTopTracksType,
  TagGetWeeklyChartListType,
} from '../../src/typings/tag.type.js';

export const TagGetInfoSchema = z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagGetInfoType>;

export const TagGetTopAlbumsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagGetTopAlbumsType>
);

export const TagGetTopArtistsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagGetTopArtistsType>
);

export const TagGetTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagGetTopTracksType>
);

export const TagGetWeeklyChartListSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TagGetWeeklyChartListType>
);
