import { describe, expect, it } from 'vitest';

import { ENV } from '../env.js';
import { ChartGetTopArtistsSchema, ChartGetTopTagsSchema, ChartGetTopTracksSchema } from '../schemas/chart.schema.js';

import simpleFM from '~/index.js';

const client = new simpleFM(ENV.LASTFM_TOKEN);

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
