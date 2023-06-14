import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import {
  UserGetInfoType,
  UserLovedTracksType,
  UserPersonalTagsType,
  UserRecentTrackType,
  UserTopAlbumsType,
  UserTopArtistsType,
  UserTopTagsType,
  UserTopTracksType,
} from '../../src/types';

export const UserArtistsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserTopArtistsType>
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
