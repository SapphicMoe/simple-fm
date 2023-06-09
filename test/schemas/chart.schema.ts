import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import { ChartTopArtistsType, ChartTopTagsType, ChartTopTracksType } from '../../src/types';

export const ChartTopArtistsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ChartTopArtistsType>
);

export const ChartTopTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ChartTopTagsType>
);

export const ChartTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ChartTopTracksType>
);
