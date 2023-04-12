import config from '../config';
import LastFM from '../src';

import {
  UserArtistsSchema,
  UserFriendsSchema,
  UserGetInfoSchema,
  UserLovedTracksSchema,
  UserPersonalTagsSchema,
  UserRecentTrackSchema,
  UserTopAlbumsSchema,
  UserTopTagsSchema,
  UserTopTracksSchema,
} from './schemas/user.schema.js';

const client = new LastFM(config.token);

describe('User', () => {
  it('Should return a list of all listened artists by this user', async () => {
    const data = await client.user.fetchAllArtists('lewisakura');

    expect(() => UserArtistsSchema.parse(data.artists)).not.toThrow();
  });

  it('Should return info about a user', async () => {
    const data = await client.user.fetch('solelychloe');

    expect(() => UserGetInfoSchema.parse(data)).not.toThrow();
  });

  it('Should return a list of friends for a user', async () => {
    const data = await client.user.fetchFriends('megumin');

    expect(() => UserFriendsSchema.parse(data.friends)).not.toThrow();
  });

  it("Should return a user's loved tracks", async () => {
    const data = await client.user.fetchLovedTracks('Ovyerus');

    expect(() => UserLovedTracksSchema.parse(data.tracks)).not.toThrow();
  });

  it("Should return a user's personal tags", async () => {
    const data = await client.user.fetchPersonalTags('rj', 'rock', 'artist');

    expect(() => UserPersonalTagsSchema.parse(data.response)).not.toThrow();
  });

  it('Should return a list of recent tracks listened by this user', async () => {
    const data = await client.user.fetchRecentTracks('kanb');

    expect(() => UserRecentTrackSchema.parse(data.tracks)).not.toThrow();
  });

  it('Should return a list of the top listened albums for this user', async () => {
    const data = await client.user.fetchTopAlbums('kotdev');

    expect(() => UserTopAlbumsSchema.parse(data.albums)).not.toThrow();
  });

  it('Should return a list of the top listened tracks/albums by tags for this user', async () => {
    const data = await client.user.fetchTopTags('rj');

    expect(() => UserTopTagsSchema.parse(data.tags)).not.toThrow();
  });

  it('Should return a list of the top listened tracks for this user', async () => {
    const data = await client.user.fetchTopTracks('Vininator');

    expect(() => UserTopTracksSchema.parse(data.tracks)).not.toThrow();
  });
});
