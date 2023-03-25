import Album from './classes/Album.js';
import Artist from './classes/Artist.js';
import Chart from './classes/Chart.js';
import Geo from './classes/Geo.js';
import Tag from './classes/Tag.js';
import Track from './classes/Track.js';
import User from './classes/User.js';

// eslint-disable-next-line import/no-useless-path-segments
export * from './types/index.js';

export default class LastFMClient {
  readonly album: Album;
  readonly artist: Artist;
  readonly chart: Chart;
  readonly geo: Geo;
  readonly tag: Tag;
  readonly track: Track;
  readonly user: User;

  constructor(private readonly token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');

    this.album = new Album(token);
    this.artist = new Artist(token);
    this.chart = new Chart(token);
    this.geo = new Geo(token);
    this.tag = new Tag(token);
    this.track = new Track(token);
    this.user = new User(token);
  }
}
