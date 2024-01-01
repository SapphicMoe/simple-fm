import { describe, expect, it } from 'vitest';

import simpleFM from '../../src/index.js';
import LastFMError from '../../src/utils/error.js';
import { env } from '../env.js';
import {
  ArtistGetInfoSchema,
  ArtistGetSimilarSchema,
  ArtistGetTopAlbumsSchema,
  ArtistGetTopTagsSchema,
  ArtistGetTopTracksSchema,
} from '../schemas/artist.schema.js';

const client = new simpleFM(env.LASTFM_TOKEN);

const errorMessage = 'The artist you supplied could not be found';

describe('Artist', () => {
  describe('getInfo', () => {
    it('Should return info about an artist', async () => {
      const data = await client.artist.getInfo({ artist: 'Nirvana' });

      expect(() => ArtistGetInfoSchema.parse(data)).not.toThrow();
    });

    it("Should error when the artist doesn't exist", async () => {
      try {
        const data = await client.artist.getInfo({ artist: 'rj-9wugh' });

        expect(() => ArtistGetInfoSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getSimilar', () => {
    it('Should return similar artists from a query', async () => {
      const data = await client.artist.getSimilar({ artist: 'Paramore' });

      expect(() => ArtistGetSimilarSchema.parse(data.artists)).not.toThrow();
    });

    it("Should error when the artist doesn't exist", async () => {
      try {
        const data = await client.artist.getSimilar({ artist: 'rj-9wugh' });

        expect(() => ArtistGetSimilarSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getTopAlbums', () => {
    it("Should return an artist's top albums", async () => {
      const data = await client.artist.getTopAlbums({ artist: 'blink-182' });

      expect(() => ArtistGetTopAlbumsSchema.parse(data.albums)).not.toThrow();
    });

    it("Should error when the artist doesn't exist", async () => {
      try {
        const data = await client.artist.getTopAlbums({ artist: 'rj-9wugh' });

        expect(() => ArtistGetTopAlbumsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getTopTags', () => {
    it("Should return an artist's top tags", async () => {
      const data = await client.artist.getTopTags({ artist: 'Porter Robinson' });

      expect(() => ArtistGetTopTagsSchema.parse(data.tags)).not.toThrow();
    });

    it("Should error when the artist doesn't exist", async () => {
      try {
        const data = await client.artist.getTopTags({ artist: 'rj-9wugh' });

        expect(() => ArtistGetTopTagsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getTopTracks', () => {
    it("Should return an artist's top tracks", async () => {
      const data = await client.artist.getTopTracks({ artist: 'Muse' });

      expect(() => ArtistGetTopTracksSchema.parse(data.tracks)).not.toThrow();
    });
    it("Should error when the artist doesn't exist", async () => {
      try {
        const data = await client.artist.getTopTracks({ artist: 'rj-9wugh' });

        expect(() => ArtistGetTopTracksSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });
});
