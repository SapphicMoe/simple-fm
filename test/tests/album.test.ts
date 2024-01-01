import { describe, expect, it } from 'vitest';

import simpleFM from '../../src/index.js';
import LastFMError from '../../src/utils/error.js';
import { env } from '../env.js';
import { AlbumGetInfoSchema, AlbumGetTopTagsSchema, AlbumSearchSchema } from '../schemas/album.schema.js';

const client = new simpleFM(env.LASTFM_TOKEN);

const errorMessage = 'Album not found';

describe('Album', () => {
  describe('getInfo', () => {
    it('Should return info for an album', async () => {
      const data = await client.album.getInfo({ artist: 'Nirvana', album: 'Nevermind' });

      expect(() => AlbumGetInfoSchema.parse(data)).not.toThrow();
    });

    it("Should error when the album doesn't exist", async () => {
      try {
        const data = await client.album.getInfo({ artist: 'rj-9wugh', album: '102edgreth' });

        expect(() => AlbumGetInfoSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('getTopTags', () => {
    it("Should return an album's top tags", async () => {
      const data = await client.album.getTopTags({ artist: 'Fall Out Boy', album: 'Save Rock and Roll' });

      expect(() => AlbumGetTopTagsSchema.parse(data.tags)).not.toThrow();
    });

    it("Should error when the album doesn't exist", async () => {
      try {
        const data = await client.album.getTopTags({ artist: 'rj-9wugh', album: '102edgreth' });

        expect(() => AlbumGetTopTagsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof LastFMError) expect(err.message).toEqual(errorMessage);
      }
    });
  });

  describe('search', () => {
    it('Should search and return albums from a query', async () => {
      const data = await client.album.search({ album: 'RIOT!' });

      expect(() => AlbumSearchSchema.parse(data.albums)).not.toThrow();
    });
  });
});
