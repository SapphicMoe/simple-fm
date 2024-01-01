import { describe, expect, it } from 'vitest';

import simpleFM from '../../src/index.js';
import LastFMError from '../../src/utils/error.js';
import { env } from '../env.js';
import {
  UserGetFriendsSchema,
  UserGetInfoSchema,
  UserGetLovedTracksSchema,
  UserGetPersonalTagsSchema,
  UserGetRecentTracksSchema,
  UserGetTopAlbumsSchema,
  UserGetTopArtistsSchema,
  UserGetTopTagsSchema,
  UserGetTopTracksSchema,
} from '../schemas/user.schema.js';

const client = new simpleFM(env.LASTFM_TOKEN);

const errorMessage = 'User not found';

describe('User', () => {
  describe('getInfo', () => {
    it('Should return info about a user', async () => {
      const data = await client.user.getInfo({ username: 'solelychloe' });

      expect(() => UserGetInfoSchema.parse(data)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getInfo({ username: '102edgreth' });

        expect(() => UserGetInfoSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getFriends', () => {
    it('Should return a list of friends for a user', async () => {
      const data = await client.user.getFriends({ username: 'megumin' });

      expect(() => UserGetFriendsSchema.parse(data.friends)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getFriends({ username: '102edgreth' });

        expect(() => UserGetFriendsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getLovedTracks', () => {
    it("Should return a user's loved tracks", async () => {
      const data = await client.user.getLovedTracks({ username: 'Ovyerus' });

      expect(() => UserGetLovedTracksSchema.parse(data.tracks)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getLovedTracks({ username: '102edgreth' });

        expect(() => UserGetLovedTracksSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getPersonalTags', () => {
    it("Should return a user's personal tags", async () => {
      const data = await client.user.getPersonalTags({ username: 'rj', tag: 'rock', tagType: 'artist' });

      expect(() => UserGetPersonalTagsSchema.parse(data.response)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getPersonalTags({
          username: 'sawdesrtyuilk;jjhgf',
          tag: 'mrrow',
          tagType: 'album',
        });

        expect(() => UserGetPersonalTagsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getRecentTracks', () => {
    it('Should return a list of recent tracks listened by this user', async () => {
      const data = await client.user.getRecentTracks({ username: 'solelychloe' });

      expect(() => UserGetRecentTracksSchema.parse(data.tracks)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getRecentTracks({ username: '102edgreth' });

        expect(() => UserGetRecentTracksSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getTopAlbums', () => {
    it('Should return a list of the top listened albums for this user', async () => {
      const data = await client.user.getTopAlbums({ username: 'kotdev' });

      expect(() => UserGetTopAlbumsSchema.parse(data.albums)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getTopAlbums({ username: '102edgreth' });

        expect(() => UserGetTopAlbumsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getArtists', () => {
    it('Should return a list of the top listened artists by this user', async () => {
      const data = await client.user.getTopArtists({ username: 'lewisakura' });

      expect(() => UserGetTopArtistsSchema.parse(data.artists)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getTopArtists({ username: '102edgreth' });

        expect(() => UserGetTopArtistsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getTopTags', () => {
    it('Should return a list of the top listened tracks/albums by tags for this user', async () => {
      const data = await client.user.getTopTags({ username: 'rj' });

      expect(() => UserGetTopTagsSchema.parse(data.tags)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getTopTags({ username: '102edgreth' });

        expect(() => UserGetTopTagsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getTopTracks', () => {
    it('Should return a list of the top listened tracks for this user', async () => {
      const data = await client.user.getTopTracks({ username: 'Vininator' });

      expect(() => UserGetTopTracksSchema.parse(data.tracks)).not.toThrow();
    });

    it("Should error when the user doesn't exist", async () => {
      try {
        const data = await client.user.getTopTracks({ username: '102edgreth' });

        expect(() => UserGetTopTracksSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });
});
