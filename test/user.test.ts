import { describe, expect, it } from 'vitest';

import simpleFM from '../src';

import {
  UserArtistsSchema,
  UserFriendsSchema,
  UserGetInfoSchema,
  UserLovedTracksSchema,
  UserPersonalTagsSchema,
  UserRecentTrackSchema,
  UserTopAlbumsSchema,
  UserTopTagsSchema,
  UserTopTracksSchema,
} from './schemas/user.schema';

const client = new simpleFM(process.env.LASTFM_TOKEN!);

describe('User', () => {
  describe('getInfo', () => {
    it('Should return info about a user', async () => {
      const data = await client.user.fetch('solelychloe');

      expect(() => UserGetInfoSchema.parse(data)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetch('102edgreth');

        expect(() => UserGetInfoSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('getFriends', () => {
    it('Should return a list of friends for a user', async () => {
      const data = await client.user.fetchFriends('megumin');

      expect(() => UserFriendsSchema.parse(data.friends)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetchFriends('102edgreth');

        expect(() => UserFriendsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('getLovedTracks', () => {
    it("Should return a user's loved tracks", async () => {
      const data = await client.user.fetchLovedTracks('Ovyerus');

      expect(() => UserLovedTracksSchema.parse(data.tracks)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetchLovedTracks('102edgreth');

        expect(() => UserLovedTracksSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('getPersonalTags', () => {
    it("Should return a user's personal tags", async () => {
      const data = await client.user.fetchPersonalTags('rj', 'rock', 'artist');

      expect(() => UserPersonalTagsSchema.parse(data.response)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetchPersonalTags('102edgreth', 'mrrow', 'album');

        expect(() => UserPersonalTagsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('getRecentTracks', () => {
    it('Should return a list of recent tracks listened by this user', async () => {
      const data = await client.user.fetchRecentTracks('kanb');

      expect(() => UserRecentTrackSchema.parse(data.tracks)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetchRecentTracks('102edgreth');

        expect(() => UserRecentTrackSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('getTopAlbums', () => {
    it('Should return a list of the top listened albums for this user', async () => {
      const data = await client.user.fetchTopAlbums('kotdev');

      expect(() => UserTopAlbumsSchema.parse(data.albums)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetchTopAlbums('102edgreth');

        expect(() => UserTopAlbumsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('getArtists', () => {
    it('Should return a list of the top listened artists by this user', async () => {
      const data = await client.user.fetchTopArtists('lewisakura');

      expect(() => UserArtistsSchema.parse(data.artists)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetchTopArtists('102edgreth');

        expect(() => UserArtistsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('getTopTags', () => {
    it('Should return a list of the top listened tracks/albums by tags for this user', async () => {
      const data = await client.user.fetchTopTags('rj');

      expect(() => UserTopTagsSchema.parse(data.tags)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetchTopTags('102edgreth');

        expect(() => UserTopTagsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });

  describe('getTopTracks', () => {
    it('Should return a list of the top listened tracks for this user', async () => {
      const data = await client.user.fetchTopTracks('Vininator');

      expect(() => UserTopTracksSchema.parse(data.tracks)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.fetchTopTracks('102edgreth');

        expect(() => UserTopTracksSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('User not found');
      }
    });
  });
});
