import Album from './album.js';
import Artist from './artist.js';
import Tag from './tag.js';
import Track from './track.js';
import User from './user.js';

export * from './types.js';

export default class LastFMClient {
  readonly album: Album;
  readonly artist: Artist;
  readonly tag: Tag;
  readonly track: Track;
  readonly user: User;

  constructor(private readonly token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');

    this.album = new Album(token);
    this.artist = new Artist(token);
    this.tag = new Tag(token);
    this.track = new Track(token);
    this.user = new User(token);
  }
}
