import config from '../config';
import LastFM from '../src';

import {
  TagGetInfoSchema,
  TagTopAlbumsSchema,
  TagTopArtistsSchema,
  TagTopTracksSchema,
  TagWeeklyChartListSchema,
} from './schemas/tag.schema.js';

const client = new LastFM(config.token);

describe('Tag', () => {
  describe('getInfo', () => {
    it('Should return info for a tag', async () => {
      const data = await client.tag.fetch('metal');

      expect(() => TagGetInfoSchema.parse(data)).not.toThrow();
    });
  });

  describe('getTopAlbums', () => {
    it('Should return top albums for a tag', async () => {
      const data = await client.tag.fetchTopAlbums('pop punk');

      expect(() => TagTopAlbumsSchema.parse(data.albums)).not.toThrow();
    });
  });

  describe('getTopArtists', () => {
    it('Should return top artists for a tag', async () => {
      const data = await client.tag.fetchTopArtists('progressive house');

      expect(() => TagTopArtistsSchema.parse(data.artists)).not.toThrow();
    });
  });

  describe('getTopTracks', () => {
    it('Should return top tracks for a tag', async () => {
      const data = await client.tag.fetchTopTracks('emo');

      expect(() => TagTopTracksSchema.parse(data.tracks)).not.toThrow();
    });
  });

  describe('getWeeklyChartList', () => {
    it("Should return a tag's weekly chart list", async () => {
      const data = await client.tag.fetchWeeklyChartList('rock');

      expect(() => TagWeeklyChartListSchema.parse(data.positions)).not.toThrow();
    });
  });
});
