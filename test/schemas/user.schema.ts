import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from 'zod';

import {
  UserGetInfoType,
  UserGetLovedTracksType,
  UserGetPersonalTagsType,
  UserGetRecentTracksType,
  UserGetTopAlbumsType,
  UserGetTopArtistsType,
  UserGetTopTagsType,
  UserGetTopTracksType,
} from '~/types/user.type.js';

export const UserGetFriendsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetInfoType>
);

export const UserGetInfoSchema = z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetInfoType>;

export const UserGetLovedTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetLovedTracksType>
);

export const UserGetPersonalTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetPersonalTagsType>
);

export const UserGetRecentTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetRecentTracksType>
);

export const UserGetTopAlbumsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetTopAlbumsType>
);

export const UserGetTopArtistsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetTopArtistsType>
);

export const UserGetTopTagsSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetTopTagsType>
);

export const UserGetTopTracksSchema = z.array(
  z.object({}) as ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, UserGetTopTracksType>
);
