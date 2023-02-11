import Artist from './artist.js';
import Album from './album.js';
import User from './user.js';
import Track from './track.js';

export * from './types.js';

export default class LastFMClient {
  public readonly album: Album;
  public readonly artist: Artist;
  public readonly track: Track;
  public readonly user: User;

  constructor(private token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');

    this.album = new Album(token);
    this.artist = new Artist(token);
    this.track = new Track(token);
    this.user = new User(token);
  }
}
