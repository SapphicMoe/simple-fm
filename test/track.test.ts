import config from '../config';
import LastFM from '../src';

import {
  TrackGetInfoSchema,
  TrackSearchSchema,
  TrackSimilarSchema,
  TrackTopTagsSchema,
} from './schemas/track.schema.js';

const client = new LastFM(config.token);

describe('Track', () => {
  describe('getInfo', () => {
    it('Should return info for a track', async () => {
      const data = await client.track.fetch('Lyn', 'Take Over');

      expect(() => TrackGetInfoSchema.parse(data)).not.toThrow();
    });
  });

  describe('getSimilar', () => {
    it('Should return similar tracks from a query', async () => {
      const data = await client.track.fetchSimilar('Metallica', 'Sad But True');

      expect(() => TrackTopTagsSchema.parse(data.tracks)).not.toThrow();
    });
  });

  describe('getTopTags', () => {
    it("Should return a track's top tags", async () => {
      const data = await client.track.fetchTopTags('Taylor Swift', 'New Romantics');

      expect(() => TrackSimilarSchema.parse(data.tags)).not.toThrow();
    });
  });

  describe('search', () => {
    it('Should search and return tracks for a query', async () => {
      const data = await client.track.search("Ain't It Fun");

      expect(() => TrackSearchSchema.parse(data.tracks)).not.toThrow();
    });
  });
});
