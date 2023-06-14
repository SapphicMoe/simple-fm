import { describe, expect, it } from 'vitest';

import simpleFM from '../src';

import { TrackGetInfoSchema, TrackSearchSchema, TrackSimilarSchema, TrackTopTagsSchema } from './schemas/track.schema';

const client = new simpleFM(process.env.LASTFM_TOKEN!);

describe('Track', () => {
  describe('getInfo', () => {
    it('Should return info for a track', async () => {
      const data = await client.track.fetch('Lyn', 'Take Over');

      expect(() => TrackGetInfoSchema.parse(data)).not.toThrow();
    });

    it("Should error when the track doesn't exist", async () => {
      try {
        const data = await client.track.fetch('mrrowk[rpgk', '=-ks0-[hkt0phj');

        expect(() => TrackGetInfoSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('Track not found');
      }
    });
  });

  describe('getSimilar', () => {
    it('Should return similar tracks from a query', async () => {
      const data = await client.track.fetchSimilar('Metallica', 'Sad But True');

      expect(() => TrackSearchSchema.parse(data.tracks)).not.toThrow();
    });

    it("Should error when the track doesn't exist", async () => {
      try {
        const data = await client.track.fetchSimilar('mrrowk[rpgk', '=-ks0-[hkt0phj');

        expect(() => TrackSimilarSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('Track not found');
      }
    });
  });

  describe('getTopTags', () => {
    it("Should return a track's top tags", async () => {
      const data = await client.track.fetchTopTags('Taylor Swift', 'New Romantics');

      expect(() => TrackTopTagsSchema.parse(data.tags)).not.toThrow();
    });

    it("Should error when the track doesn't exist", async () => {
      try {
        const data = await client.track.fetchTopTags('mrrowk[rpgk', '=-ks0-[hkt0phj');

        expect(() => TrackTopTagsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('Track not found');
      }
    });
  });

  describe('search', () => {
    it('Should search and return tracks for a query', async () => {
      const data = await client.track.search("Ain't It Fun");

      expect(() => TrackSearchSchema.parse(data.tracks)).not.toThrow();
    });
  });
});
