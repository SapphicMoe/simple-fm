import Album from './classes/album.class.js';
import Artist from './classes/artist.class.js';
import Chart from './classes/chart.class.js';
import Geo from './classes/geo.class.js';
import Tag from './classes/tag.class.js';
import Track from './classes/track.class.js';
import User from './classes/user.class.js';

export * from './types/index.js';

export default class SimpleFMClient {
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
