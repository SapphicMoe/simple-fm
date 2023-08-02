import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import { TrackGetInfoType, TrackGetSimilarType, TrackGetTopTagsType, TrackSearchType } from '@typings/track.type.js';

export const TrackGetInfoSchema = z.object({}) as ZodObject<
  ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny,
  TrackGetInfoType
>;

export const TrackGetSimilarSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TrackGetSimilarType>
);

export const TrackGetTopTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TrackGetTopTagsType>
);

export const TrackSearchSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, TrackSearchType>
);
