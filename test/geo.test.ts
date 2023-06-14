import { describe, expect, it } from 'vitest';

import simpleFM from '../src';

import { GeoArtistSchema, GeoTrackSchema } from './schemas/geo.schema';

const client = new simpleFM(process.env.LASTFM_TOKEN!);

describe('Geo', () => {
  describe('getTopArtists', () => {
    it('Should return top artists from a country', async () => {
      const data = await client.geo.fetchTopArtists('Canada');

      expect(() => GeoArtistSchema.parse(data.artists)).not.toThrow();
    });
  });

  describe('getTopTracks', () => {
    it('Should return top tracks from a country', async () => {
      const data = await client.geo.fetchTopTracks('New Zealand');

      expect(() => GeoTrackSchema.parse(data.tracks)).not.toThrow();
    });
  });
});
