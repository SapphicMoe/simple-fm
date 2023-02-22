import Album from './Album.js';
import Artist from './Artist.js';
import Chart from './Chart.js';
import Country from './Country.js';
import Tag from './Tag.js';
import Track from './Track.js';
import User from './User.js';

// eslint-disable-next-line import/no-useless-path-segments
export * from './types/index.js';

export default class LastFMClient {
  readonly album: Album;
  readonly artist: Artist;
  readonly chart: Chart;
  readonly country: Country;
  readonly tag: Tag;
  readonly track: Track;
  readonly user: User;

  constructor(private readonly token: string) {
    if (!token) throw new Error('You have not specified a Last.fm API key.');

    this.album = new Album(token);
    this.artist = new Artist(token);
    this.chart = new Chart(token);
    this.country = new Country(token);
    this.tag = new Tag(token);
    this.track = new Track(token);
    this.user = new User(token);
  }
}
