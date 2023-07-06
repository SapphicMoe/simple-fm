import { describe, expect, it } from 'vitest';

import { GeoGetTopArtistsSchema, GeoGetTopTracksSchema } from '../schemas/geo.schema.js';

import { ENV } from 'test/env.js';
import simpleFM from '~/index.js';

const client = new simpleFM(ENV.LASTFM_TOKEN);

describe('Geo', () => {
  describe('getTopArtists', () => {
    it('Should return top artists from a country', async () => {
      const data = await client.geo.getTopArtists({ country: 'Canada' });

      expect(() => GeoGetTopArtistsSchema.parse(data.artists)).not.toThrow();
    });

    it('Should error when the country is invalid', async () => {
      try {
        const data = await client.geo.getTopArtists({ country: 'Texas' });

        expect(() => GeoGetTopArtistsSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('country param invalid');
      }
    });
  });

  describe('getTopTracks', () => {
    it('Should return top tracks from a country', async () => {
      const data = await client.geo.getTopTracks({ country: 'New Zealand' });

      expect(() => GeoGetTopTracksSchema.parse(data.tracks)).not.toThrow();
    });

    it('Should error when the country is invalid', async () => {
      try {
        const data = await client.geo.getTopTracks({ country: 'Texas' });

        expect(() => GeoGetTopTracksSchema.parse(data)).toThrow();
      } catch (err) {
        if (err instanceof Error) expect(err.message).toEqual('country param required');
      }
    });
  });
});
