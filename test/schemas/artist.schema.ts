import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import {
  ArtistGetInfoType,
  ArtistGetSimilarType,
  ArtistGetTopAlbumsType,
  ArtistGetTopTagsType,
  ArtistGetTopTracksType,
} from '../../src/typings/artist.type.js';

export const ArtistGetInfoSchema = z.object({}) as ZodObject<
  ZodRawShape,
  UnknownKeysParam,
  ZodTypeAny,
  ArtistGetInfoType
>;

export const ArtistGetSimilarSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ArtistGetSimilarType>
);

export const ArtistGetTopAlbumsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ArtistGetTopAlbumsType>
);

export const ArtistGetTopTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ArtistGetTopTagsType>
);

export const ArtistGetTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, ArtistGetTopTracksType>
);
