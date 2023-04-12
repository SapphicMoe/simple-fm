import config from '../config';
import LastFM from '../src';

import {
  ArtistGetInfoSchema,
  ArtistSimilarSchema,
  ArtistTopAlbumsSchema,
  ArtistTopTagsSchema,
  ArtistTopTracksSchema,
} from './schemas/artist.schema.js';

const client = new LastFM(config.token);

describe('Artist', () => {
  it('Should return info about an artist', async () => {
    const data = await client.artist.fetch('Nirvana');

    expect(() => ArtistGetInfoSchema.parse(data)).not.toThrow();
  });

  it('Should return similar artists from a query', async () => {
    const data = await client.artist.fetchSimilar('Paramore');

    expect(() => ArtistSimilarSchema.parse(data.artists)).not.toThrow();
  });

  it("Should return an artist's top albums", async () => {
    const data = await client.artist.fetchTopAlbums('blink-182');

    expect(() => ArtistTopAlbumsSchema.parse(data.albums)).not.toThrow();
  });

  it("Should return an artist's top tags", async () => {
    const data = await client.artist.fetchTopTags('Porter Robinson');

    expect(() => ArtistTopTagsSchema.parse(data.tags)).not.toThrow();
  });

  it("Should return an artist's top tracks", async () => {
    const data = await client.artist.fetchTopTracks('Muse');

    expect(() => ArtistTopTracksSchema.parse(data.tracks)).not.toThrow();
  });
});
