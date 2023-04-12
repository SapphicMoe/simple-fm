import config from '../config';
import LastFM from '../src';

import { AlbumGetInfoSchema, AlbumGetTopTagsSchema, AlbumSearchSchema } from './schemas/album.schema.js';

const client = new LastFM(config.token);

describe('Album', () => {
  it('Should return info for an album', async () => {
    const data = await client.album.fetch('Nirvana', 'Nevermind');

    expect(() => AlbumGetInfoSchema.parse(data)).not.toThrow();
  });

  it("Should return an album's top tags", async () => {
    const data = await client.album.fetchTopTags('Fall Out Boy', 'Save Rock and Roll');

    expect(() => AlbumGetTopTagsSchema.parse(data.tags)).not.toThrow();
  });

  it('Should search and return albums from a query', async () => {
    const data = await client.album.search('RIOT!');

    expect(() => AlbumSearchSchema.parse(data.albums)).not.toThrow();
  });
});
