import config from '../config';
import LastFM from '../src';

import { ChartTopArtistsSchema, ChartTopTagsSchema, ChartTopTracksSchema } from './schemas/chart.schema.js';

const client = new LastFM(config.token);

describe('Chart', () => {
  it('Should return top artists', async () => {
    const data = await client.chart.fetchTopArtists();

    expect(() => ChartTopArtistsSchema.parse(data)).not.toThrow();
  });

  it('Should return top tags', async () => {
    const data = await client.chart.fetchTopTags();
    expect(() => ChartTopTagsSchema.parse(data)).not.toThrow();
  });

  it('Should return top tracks', async () => {
    const data = await client.chart.fetchTopTracks();

    expect(() => ChartTopTracksSchema.parse(data)).not.toThrow();
  });
});
