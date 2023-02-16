import Album from './album.js';
import Artist from './artist.js';
import Chart from './chart.js';
import Country from './country.js';
import Tag from './tag.js';
import Track from './track.js';
import User from './user.js';

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
