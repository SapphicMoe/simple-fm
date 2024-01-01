import { describe, expect, it } from 'vitest';

import simpleFM from '../../src/index.js';
import { env } from '../env.js';
import { ChartGetTopArtistsSchema, ChartGetTopTagsSchema, ChartGetTopTracksSchema } from '../schemas/chart.schema.js';

const client = new simpleFM(env.LASTFM_TOKEN);

describe('Chart', () => {
  describe('getTopArtists', () => {
    it('Should return top artists', async () => {
      const data = await client.chart.getTopArtists();

      expect(() => ChartGetTopArtistsSchema.parse(data.artists)).not.toThrow();
    });
  });

  describe('getTopTags', () => {
    it('Should return top tags', async () => {
      const data = await client.chart.getTopTags();
      expect(() => ChartGetTopTagsSchema.parse(data.tags)).not.toThrow();
    });
  });

  describe('getTopTracks', () => {
    it('Should return top tracks', async () => {
      const data = await client.chart.getTopTracks();

      expect(() => ChartGetTopTracksSchema.parse(data.tracks)).not.toThrow();
    });
  });
});
