import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import {
  UserArtistsType,
  UserGetInfoType,
  UserLovedTracksType,
  UserPersonalTagsType,
  UserRecentTrackType,
  UserTopAlbumsType,
  UserTopTagsType,
  UserTopTracksType,
} from '../../src/index.js';

export const UserArtistsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserArtistsType>
);

export const UserFriendsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetInfoType>
);

export const UserGetInfoSchema = z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetInfoType>;

export const UserLovedTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserLovedTracksType>
);

export const UserPersonalTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserPersonalTagsType>
);

export const UserRecentTrackSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserRecentTrackType>
);

export const UserTopAlbumsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserTopAlbumsType>
);

export const UserTopTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserTopTagsType>
);

export const UserTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserTopTracksType>
);
