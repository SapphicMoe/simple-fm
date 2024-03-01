import { USER_AGENT } from './constants.js';

import Album from '@classes/album.class.js';
import Artist from '@classes/artist.class.js';
import Chart from '@classes/chart.class.js';
import Geo from '@classes/geo.class.js';
import Tag from '@classes/tag.class.js';
import Track from '@classes/track.class.js';
import User from '@classes/user.class.js';
import LastFMError from '@utils/error.js';

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
    private readonly options: {
      userAgent?: string;
    } = {}
  ) {
    this.validateApiKey();

    options.userAgent ??= USER_AGENT;

    this.album = this.createService(Album);
    this.artist = this.createService(Artist);
    this.chart = this.createService(Chart);
    this.geo = this.createService(Geo);
    this.tag = this.createService(Tag);
    this.track = this.createService(Track);
    this.user = this.createService(User);
  }

  private createService<T>(ServiceClass: new (key: string, userAgent?: string) => T): T {
    return new ServiceClass(this.key, this.options.userAgent);
  }

  private validateApiKey() {
    if (!this.key)
      throw new LastFMError({
        message: 'A Last.fm API key is required. Get one here: https://www.last.fm/api/account/create',
        error: 6,
      });
  }
}
