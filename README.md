<div align="center">

![The Twitter headphone emoji with musical notes in it.][logo]

## simple-fm

_A simple, asynchronous Last.fm wrapper in TypeScript._

Search for what someone has been listening to lately, what tracks are trending in a country, an artist's top tracks, and
a lot more.

[![CI][actions-image]][actions-link] [![npm-image]][npm-link] [![downloads-image]][npm-link] [![license-image]][license]

</div>

# Install

**Node.js 16+** and **TypeScript v5+** is recommended for this package.

- npm: `npm i @solely/simple-fm`
- pnpm: `pnpm i @solely/simple-fm`
- yarn: `yarn add @solely/simple-fm`

# Notice

`simple-fm` requires you to have a Last.fm API key.

To obtain a Last.fm API key, click [here to register an API account][last-fm-api].

# Example usage

```ts
// Import the simple-fm package.
import SimpleFM from '@solely/simple-fm'; // ESM
const SimpleFM = require('@solely/simple-fm'); // CommonJS

// Replace the token with your Last.fm API key.
const client = new SimpleFM('Last.fm API key');

// Fetch the recent track from a user.
const json = await client.user.getRecentTracks({ user: 'solelychloe' });

console.log(json);
// => { search: { user: 'solelychloe', nowPlaying: true, ... }, tracks: [...] }
```

If you're using [Deno][deno-repo], you can import `simple-fm` via a CDN:

```ts
import simpleFM from 'https://esm.sh/@solely/simple-fm';
```

# Documentation

## album

### album.getInfo({ artist, album, username? })

_Returns metadata information for an album._

- #### `artist` (string): The name of the artist.
- #### `album` (string): The name of the album.
- #### `username?` (string): The username for the context of the request. If supplied, the user's playcount for this artist's album is included in the response.

### album.getTopTags({ artist, album })

_Returns popular tags for an album._

- #### `artist` (string): The name of the artist.
- #### `album` (string): The name of the album.

### album.search({ album, limit?, page? })

_Search for an album by name._

- #### `album` (string): The name of the album.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## artist

### artist.getInfo({ artist, username? })

_Returns metadata information for an artist._

- #### `artist` (string): The artist's name.
- #### `username?` (string): The username for the context of the request. If supplied, the user's playcount for this artist is included in the response.

### artist.getSimilar({ artist, limit? })

_Returns similar artists to this artist._

- #### `artist` (string): The artist's name.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.

### artist.getTopAlbums({ artist, limit?, page? })

_Returns popular albums for an artist._

- #### `artist` (string): The artist's name.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### artist.getTopTags({ artist })

_Returns popular tags for an artist._

- #### `artist` (string): The artist's name.

### artist.getTopTracks({ artist, limit?, page? })

_Returns popular tracks for an artist._

- #### `artist` (string): The artist's name.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### artist.search({ artist, limit?, page? })

_Search for an artist by name._

- #### `artist` (string): The artist's name.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## chart

### chart.getTopArtists({ limit?, page? })

_Returns the most popular artists._

- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### chart.getTopTags({ limit?, page? })

_Returns the most popular tags for tracks._

- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### chart.getTopTracks({ limit?, page? })

_Returns the most popular tracks._

- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## geo

### geo.getTopArtists({ country, limit?, page? })

_Returns the most popular artists by country._

- #### `country` (string): The name of the country.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### geo.getTopTracks({ country, limit?, page? })

_Returns the most popular tracks by country._

- #### `country` (string): The name of the country.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## tag

### tag.getInfo({ tag })

_Returns metadata information on a tag._

- #### `tag` (string): The name of the tag.

### tag.getTopAlbums({ tag, limit?, page? })

- #### `tag` (string): The name of the tag.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### tag.getTopArtists({ tag, limit?, page? })

- #### `tag` (string): The name of the tag.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### tag.getTopTracks({ tag, limit?, page? })

_Returns popular tracks for a tag._

- #### `tag` (string): The name of the tag.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### tag.getWeeklyChartList({ tag })

_Returns a list of available charts for a tag._

- #### `tag` (string): The name of the tag.

## track

### track.getInfo({ artist, track, username? })

_Returns metadata information for a track._

- #### `artist` (string): The name of the artist.
- #### `track` (string): The name of the track.

### track.getSimilar({ artist, track, limit? })

_Returns similar tracks for this track._

- #### `artist` (string): The name of the artist.
- #### `track` (string): The name of the track.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.

### track.getTopTags({ artist, track })

_Returns popular tags for a track._

- #### `artist` (string): The name of the artist.
- #### `track` (string): The name of the track.

### track.search({ track, limit?, page? })

_Search for a track by name._

- #### `track` (string): The name of the track.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## user

### user.getInfo({ username })

_Returns information about a user's profile._

- #### `username` (string): The name of the user.

### user.getTopArtists({ username, limit?, page? })

_Returns a list of popular artists in a user's library._

- #### `username` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.getFriends({ username, limit?, page? })

_Returns a list of the user's friends._

- #### `username` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.getLovedTracks({ username, limit?, page? })

_Returns the loved tracks as set by the user._

- #### `username` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.getPersonalTags({ username, tag, tagType })

_Returns a list of the user's personal tags._

- #### `username` (string): The name of the user.
- #### `tag` (string): The name of the tag.
- #### `tagType` (album, artist, track): The type of items which have been tagged.

### user.getRecentTracks({ username, limit?, page? })

_Returns the most recent track listened by the user._

- #### `username` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50. Maximum is 200.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.getTopAlbums({ username, limit?, page? })

_Returns a list of popular albums in a user's library._

- #### `username` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.getTopTags({ username, limit? })

- #### `username` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.

### user.getTopTracks({ username, limit?, page? })

_Returns a list of popular tracks in a user's library._

- #### `username` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

# License

This package is licensed under the [zlib][license] license.

© 2023 Chloe Arciniega.

[actions-image]:
  https://img.shields.io/github/actions/workflow/status/solelychloe/simple-fm/push.yml?colorA=18181B&colorB=de3931
[actions-link]: https://github.com/solelychloe/simple-fm/actions/workflows/push.yml
[deno-repo]: https://github.com/denoland/deno
[logo]: /public/logo.png 'The Twitter headphone emoji with musical notes in it.'
[license]: /LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[last-fm-api]: https://www.last.fm/api/account/create
[license-image]: https://img.shields.io/npm/l/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[npm-image]: https://img.shields.io/npm/v/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[npm-link]: https://npmjs.org/package/@solely/simple-fm
