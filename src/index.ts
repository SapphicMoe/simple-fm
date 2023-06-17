import Album from '@classes/album.class.js';
import Artist from '@classes/artist.class.js';
import Chart from '@classes/chart.class.js';
import Geo from '@classes/geo.class.js';
import Tag from '@classes/tag.class.js';
import Track from '@classes/track.class.js';
import User from '@classes/user.class.js';
import LastFMError from '@utils/error.js';

export * from '~/types/index.js';

export default class SimpleFMClient {
  readonly album: Album;
  readonly artist: Artist;
  readonly chart: Chart;
  readonly geo: Geo;
  readonly tag: Tag;
  readonly track: Track;
  readonly user: User;

  constructor(private readonly key: string, options: { userAgent?: string } = {}) {
    if (!key)
      throw new LastFMError({
        message: 'You have not specified a Last.fm API key. Get one here: https://www.last.fm/api/account/create',
        error: 6,
      });

    options.userAgent ??= `simple-fm - a simple Last.fm wrapper written in TypeScript (GitHub: https://github.com/solelychloe/simple-fm)`;

    this.album = new Album(key, options.userAgent);
    this.artist = new Artist(key, options.userAgent);
    this.chart = new Chart(key, options.userAgent);
    this.geo = new Geo(key, options.userAgent);
    this.tag = new Tag(key, options.userAgent);
    this.track = new Track(key, options.userAgent);
    this.user = new User(key, options.userAgent);
  }
}
