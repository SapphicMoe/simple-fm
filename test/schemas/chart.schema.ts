import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import { ChartGetTopArtistsType, ChartGetTopTagsType, ChartGetTopTracksType } from '@typings/chart.type.js';

export const ChartGetTopArtistsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ChartGetTopArtistsType>
);

export const ChartGetTopTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ChartGetTopTagsType>
);

export const ChartGetTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ChartGetTopTracksType>
);
