import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import { GeoGetTopArtistsType, GeoGetTopTracksType } from '../../src/typings/geo.type.js';

export const GeoGetTopArtistsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, GeoGetTopArtistsType>
);

export const GeoGetTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, GeoGetTopTracksType>
);
