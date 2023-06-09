import { describe, expect, it } from 'vitest';

import config from '../config';
import LastFM from '../src';

import { ChartTopArtistsSchema, ChartTopTagsSchema, ChartTopTracksSchema } from './schemas/chart.schema';

const client = new LastFM(config.token);

describe('Chart', () => {
  describe('getTopArtists', () => {
    it('Should return top artists', async () => {
      const data = await client.chart.fetchTopArtists();

      expect(() => ChartTopArtistsSchema.parse(data.artists)).not.toThrow();
    });
  });

  describe('getTopTags', () => {
    it('Should return top tags', async () => {
      const data = await client.chart.fetchTopTags();
      expect(() => ChartTopTagsSchema.parse(data.tags)).not.toThrow();
    });
  });

  describe('getTopTracks', () => {
    it('Should return top tracks', async () => {
      const data = await client.chart.fetchTopTracks();

      expect(() => ChartTopTracksSchema.parse(data.tracks)).not.toThrow();
    });
  });
});
