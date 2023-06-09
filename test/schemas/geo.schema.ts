import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import { GeoArtistType, GeoTrackType } from '../../src/types';

export const GeoArtistSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, GeoArtistType>
);

export const GeoTrackSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, GeoTrackType>
);
