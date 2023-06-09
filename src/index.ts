import Album from '@classes/album.class';
import Artist from '@classes/artist.class';
import Chart from '@classes/chart.class';
import Geo from '@classes/geo.class';
import Tag from '@classes/tag.class';
import Track from '@classes/track.class';
import User from '@classes/user.class';

export * from '~/types';

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
