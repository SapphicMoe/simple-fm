import { describe, expect, it } from 'vitest';

import simpleFM from '../src';

import { AlbumGetInfoSchema, AlbumGetTopTagsSchema, AlbumSearchSchema } from './schemas/album.schema';

const client = new simpleFM(process.env.LASTFM_TOKEN!);

describe('Album', () => {
  describe('getInfo', () => {
    it('Should return info for an album', async () => {
      const data = await client.album.fetch('Nirvana', 'Nevermind');

      expect(() => AlbumGetInfoSchema.parse(data)).not.toThrow();
    });

    it("Should error when the album doesn't exist", async () => {
      try {
        const data = await client.album.fetch('rj-9wugh', '102edgreth');

        expect(() => AlbumGetInfoSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('Album not found');
      }
    });
  });

  describe('getTopTags', () => {
    it("Should return an album's top tags", async () => {
      const data = await client.album.fetchTopTags('Fall Out Boy', 'Save Rock and Roll');

      expect(() => AlbumGetTopTagsSchema.parse(data.tags)).not.toThrow();
    });
  });

  describe('search', () => {
    it('Should search and return albums from a query', async () => {
      const data = await client.album.search('RIOT!');

      expect(() => AlbumSearchSchema.parse(data.albums)).not.toThrow();
    });
  });
});
