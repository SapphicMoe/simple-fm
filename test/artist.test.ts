import { describe, expect, it } from 'vitest';

import simpleFM from '../src';

import {
  ArtistGetInfoSchema,
  ArtistSimilarSchema,
  ArtistTopAlbumsSchema,
  ArtistTopTagsSchema,
  ArtistTopTracksSchema,
} from './schemas/artist.schema';

const client = new simpleFM(process.env.LASTFM_TOKEN!);

describe('Artist', () => {
  describe('getInfo', () => {
    it('Should return info about an artist', async () => {
      const data = await client.artist.fetch('Nirvana');

      expect(() => ArtistGetInfoSchema.parse(data)).not.toThrow();
    });

    it("Should error when the artist doesn't exist", async () => {
      try {
        const data = await client.artist.fetch('rj-9wugh');

        expect(() => ArtistGetInfoSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('The artist you supplied could not be found');
      }
    });
  });

  describe('getSimilar', () => {
    it('Should return similar artists from a query', async () => {
      const data = await client.artist.fetchSimilar('Paramore');

      expect(() => ArtistSimilarSchema.parse(data.artists)).not.toThrow();
    });
  });

  describe('getTopAlbums', () => {
    it("Should return an artist's top albums", async () => {
      const data = await client.artist.fetchTopAlbums('blink-182');

      expect(() => ArtistTopAlbumsSchema.parse(data.albums)).not.toThrow();
    });
  });

  describe('getTopTags', () => {
    it("Should return an artist's top tags", async () => {
      const data = await client.artist.fetchTopTags('Porter Robinson');

      expect(() => ArtistTopTagsSchema.parse(data.tags)).not.toThrow();
    });
  });

  describe('getTopTracks', () => {
    it("Should return an artist's top tracks", async () => {
      const data = await client.artist.fetchTopTracks('Muse');

      expect(() => ArtistTopTracksSchema.parse(data.tracks)).not.toThrow();
    });
  });
});
