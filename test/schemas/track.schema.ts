import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import { TrackGetInfoType, TrackSearchType, TrackSimilarType, TrackTopTagsType } from '../../src/index.js';

export const TrackGetInfoSchema = z.object({}) as ZodObject<
  ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny,
  TrackGetInfoType
>;

export const TrackSearchSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TrackSearchType>
);

export const TrackSimilarSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TrackSimilarType>
);

export const TrackTopTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TrackTopTagsType>
);
