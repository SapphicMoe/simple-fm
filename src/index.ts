import Album from '@classes/album.class.js';
import Artist from '@classes/artist.class.js';
import Chart from '@classes/chart.class.js';
import Geo from '@classes/geo.class.js';
import Tag from '@classes/tag.class.js';
import Track from '@classes/track.class.js';
import User from '@classes/user.class.js';
import LastFMError from '@utils/error.js';
import { pkg } from '@utils/package.js';

export default class SimpleFMClient {
  readonly album: Album;
  readonly artist: Artist;
  readonly chart: Chart;
  readonly geo: Geo;
  readonly tag: Tag;
  readonly track: Track;
  readonly user: User;

  constructor(
    private readonly key: string,
    options: { userAgent?: string } = {}
  ) {
    this.validateApiKey();

    options.userAgent ??= `simple-fm v${pkg.version} - a simple Last.fm wrapper written in TypeScript (https://github.com/solelychloe/simple-fm)`;

    this.album = new Album(key, options.userAgent);
    this.artist = new Artist(key, options.userAgent);
    this.chart = new Chart(key, options.userAgent);
    this.geo = new Geo(key, options.userAgent);
    this.tag = new Tag(key, options.userAgent);
    this.track = new Track(key, options.userAgent);
    this.user = new User(key, options.userAgent);
  }

  private validateApiKey() {
    if (!this.key)
      throw new LastFMError({
        message: 'A Last.fm API key is required. Get one here: https://www.last.fm/api/account/create',
        error: 6,
      });
  }
}
