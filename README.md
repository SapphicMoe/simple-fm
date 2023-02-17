# simple-fm

[![CI][actions-image]][actions-link] [![npm-image]][npm-link] [![downloads-image]][npm-link] [![license-image]][license]

_simple-fm is a simple, asynchronous Last.fm wrapper in TypeScript._

Search for what someone has been listening to lately, what tracks are trending in a country, an artist's top tracks, and
a lot more.

# Install

**Node.js 16+** is recommended for this package.

- npm: `npm i @solely/simple-fm`
- pnpm: `pnpm i @solely/simple-fm`
- yarn: `yarn add @solely/simple-fm`

# Notice

`simple-fm` requires you to have a Last.fm API token.

To obtain a Last.fm API token, click [here to register an API account][last-fm-api].

# Usage

```ts
// Import the simple-fm package.
import client from '@solely/simple-fm';

// Replace the token with your Last.fm token.
const lastFM = new client('last.fm token');

// Fetch the recent track from a user.
const json = await lastFM.user.fetchRecentTrack('solelychloe');

console.log(json);
// => { currentlyPlaying: true, name: 'Dark World', artist: 'Mikel', album: 'Zelda & Chill', ...}
```

If you're using [Deno][deno-repo], import `simple-fm` from a URL. For example, via a CDN:

```ts
import client from 'https://esm.sh/@solely/simple-fm';
```

# Documentation

## album

### album.search(albumName, limit?, page?)

_Search for an album by name._

- #### `albumName`: The name of the album.

- #### `limit?`: The number of results to fetch per page. Defaults to 30.

- #### `page?`: The page number to fetch. Defaults to the first page.

## artist

### artist.fetch(artistName, userName?)

_Fetches and returns metadata information for an artist._

- #### `artistName`: The artist's name.

- #### `userName?`: The username for the context of the request. If supplied, the user's playcount for this artist is included in the response.

### artist.fetchSimilar(artistName, limit?)

_Fetches and returns similar artists to this artist._

- #### `artistName`: The artist's name.

- #### `limit?`: The number of results to fetch per page. Defaults to 30.

### artist.fetchTags(artistName)

_Fetches and returns popular tags for an artist._

- #### `artistName`: The artist's name.

### artist.fetchTracks(artistName, limit?, page?)

_Fetches and returns popular tracks for an artist._

- #### `artistName`: The artist's name.

- #### `limit?`: The number of results to fetch per page. Defaults to 50.

- #### `page?`: The page number to fetch. Defaults to the first page.

### artist.search(artistName, limit?, page?)

_Search for an artist by name._

- #### `artistName`: The artist's name.

## chart

### chart.fetchTopArtists(limit?, page?)

_Fetches and returns the most popular artists._

- #### `limit?`: The number of results to fetch per page. Defaults to 30.
- #### `page?`: The page number to fetch. Defaults to the first page.

### chart.fetchTopTags(limit?, page?)

_Fetches and returns the most popular tags for tracks._

- #### `limit?`: The number of results to fetch per page. Defaults to 30.
- #### `page?`: The page number to fetch. Defaults to the first page.

### chart.fetchTopTracks(limit?, page?)

_Fetches and returns the most popular tracks._

- #### `limit?`: The number of results to fetch per page. Defaults to 30.
- #### `page?`: The page number to fetch. Defaults to the first page.

## country

### country.fetchTopArtists(country)

_Fetches and returns the most popular artists by country._

Ordered by relevance.

- #### `country`: The name of the country.

### country.fetchTopTracks(country)

_Fetches and returns the most popular tracks by country._

Ordered by relevance.

- #### `country`: The name of the country.

## tag

### tag.fetch(tagName)

_Fetches and returns metadata information on a tag._

- #### `tagName`: The name of the tag.

### tag.fetchTracks(tagName)

_Fetches and returns popular tracks for a tag._

- #### `tagName`: The name of the tag.

## track

### track.search(trackName, limit?, page?)

_Search for a track by name._

- #### `trackName`: The name of the track.

- #### `limit?`: The number of results to fetch per page. Defaults to 30.
- #### `page?`: The page number to fetch. Defaults to the first page.

## user

### user.fetch(userName)

_Fetches and returns information about a user's profile._

- #### `userName`: The name of the user.

# License

This package is licensed under the [zlib][license] license.

© 2023 Chloe Arciniega.

[actions-image]:
  https://img.shields.io/github/actions/workflow/status/solelychloe/simple-fm/push.yaml?colorA=18181B&colorB=de3931
[actions-link]: https://github.com/solelychloe/simple-fm/actions/workflows/push.yaml
[deno-repo]: https://github.com/denoland/deno
[license]: /LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[last-fm-api]: https://www.last.fm/api/account/create
[license-image]: https://img.shields.io/npm/l/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[npm-image]: https://img.shields.io/npm/v/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[npm-link]: https://npmjs.org/package/@solely/simple-fm
