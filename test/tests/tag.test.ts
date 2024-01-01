import { describe, expect, it } from 'vitest';

import simpleFM from '../../src/index.js';
import { env } from '../env.js';
import {
  TagGetInfoSchema,
  TagGetTopAlbumsSchema,
  TagGetTopArtistsSchema,
  TagGetTopTracksSchema,
  TagGetWeeklyChartListSchema,
} from '../schemas/tag.schema.js';

const client = new simpleFM(env.LASTFM_TOKEN);

describe('Tag', () => {
  describe('getInfo', () => {
    it('Should return info for a tag', async () => {
      const data = await client.tag.getInfo({ tag: 'metal' });

      expect(() => TagGetInfoSchema.parse(data)).not.toThrow();
    });
  });

  describe('getTopAlbums', () => {
    it('Should return top albums for a tag', async () => {
      const data = await client.tag.getTopAlbums({ tag: 'pop punk' });

      expect(() => TagGetTopAlbumsSchema.parse(data.albums)).not.toThrow();
    });
  });

  describe('getTopArtists', () => {
    it('Should return top artists for a tag', async () => {
      const data = await client.tag.getTopArtists({ tag: 'progressive house' });

      expect(() => TagGetTopArtistsSchema.parse(data.artists)).not.toThrow();
    });
  });

  describe('getTopTracks', () => {
    it('Should return top tracks for a tag', async () => {
      const data = await client.tag.getTopTracks({ tag: 'emo' });

      expect(() => TagGetTopTracksSchema.parse(data.tracks)).not.toThrow();
    });
  });

  describe('getWeeklyChartList', () => {
    it("Should return a tag's weekly chart list", async () => {
      const data = await client.tag.getWeeklyChartList({ tag: 'rock' });

      expect(() => TagGetWeeklyChartListSchema.parse(data.positions)).not.toThrow();
    });
  });
});
