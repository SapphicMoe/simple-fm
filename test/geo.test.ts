import config from '../config';
import LastFM from '../src';

import { GeoArtistSchema, GeoTrackSchema } from './schemas/geo.schema.js';

const client = new LastFM(config.token);

describe('Geo', () => {
  it('Should return top artists from a country', async () => {
    const data = await client.geo.fetchTopArtists('Canada');

    expect(() => GeoArtistSchema.parse(data)).not.toThrow();
  });

  it('Should return top tracks from a country', async () => {
    const data = await client.geo.fetchTopTracks('New Zealand');

    expect(() => GeoTrackSchema.parse(data)).not.toThrow();
  });
});
