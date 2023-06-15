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

`simple-fm` requires you to have a Last.fm API token.

To obtain a Last.fm API token, click [here to register an API account][last-fm-api].

# Example usage

```ts
// Import the simple-fm package.
import simpleFM from '@solely/simple-fm'; // ESM
const simpleFM = require('@solely/simple-fm'); // CommonJS

// Replace the token with your Last.fm token.
const client = new simpleFM('last.fm token');

// Fetch the recent track from a user.
const json = await client.user.fetchRecentTracks('solelychloe');

console.log(json);
// => { search: { user: 'solelychloe', nowPlaying: true, ... }, tracks: [...] }
```

If you're using [Deno][deno-repo], you can import `simple-fm` via a CDN:

```ts
import simpleFM from 'https://esm.sh/@solely/simple-fm';
```

# Documentation

## album

### album.fetch(artistName, albumName, userName?)

_Fetches and returns metadata information for an album._

- #### `artistName` (string): The name of the artist.
- #### `albumName` (string): The name of the album.
- #### `userName?` (string): The username for the context of the request. If supplied, the user's playcount for this artist's album is included in the response.

### album.fetchTopTags(artistName, albumName)

_Fetches and returns popular tags for an album._

- #### `artistName` (string): The name of the artist.
- #### `albumName` (string): The name of the album.

### album.search(albumName, limit?, page?)

_Search for an album by name._

- #### `albumName` (string): The name of the album.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## artist

### artist.fetch(artistName, userName?)

_Fetches and returns metadata information for an artist._

- #### `artistName` (string): The artist's name.
- #### `userName?` (string): The username for the context of the request. If supplied, the user's playcount for this artist is included in the response.

### artist.fetchSimilar(artistName, limit?)

_Fetches and returns similar artists to this artist._

- #### `artistName` (string): The artist's name.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.

### artist.fetchTopAlbums(artistName, limit?, page?)

_Fetches and returns popular albums for an artist._

- #### `artistName` (string): The artist's name.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### artist.fetchTopTags(artistName)

_Fetches and returns popular tags for an artist._

- #### `artistName` (string): The artist's name.

### artist.fetchTopTracks(artistName, limit?, page?)

_Fetches and returns popular tracks for an artist._

- #### `artistName` (string): The artist's name.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### artist.search(artistName, limit?, page?)

_Search for an artist by name._

- #### `artistName` (string): The artist's name.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## chart

### chart.fetchTopArtists(limit?, page?)

_Fetches and returns the most popular artists._

- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### chart.fetchTopTags(limit?, page?)

_Fetches and returns the most popular tags for tracks._

- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### chart.fetchTopTracks(limit?, page?)

_Fetches and returns the most popular tracks._

- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## geo

### geo.fetchTopArtists(country, limit?, page?)

_Fetches and returns the most popular artists by country._

- #### `country` (string): The name of the country.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### geo.fetchTopTracks(country, limit?, page?)

_Fetches and returns the most popular tracks by country._

- #### `country` (string): The name of the country.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## tag

### tag.fetch(tagName)

_Fetches and returns metadata information on a tag._

- #### `tagName` (string): The name of the tag.

### tag.fetchTopAlbums(tagName, limit?, page?)

- #### `tagName` (string): The name of the tag.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### tag.fetchTopArtists(tagName, limit?, page?)

- #### `tagName` (string): The name of the tag.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### tag.fetchTopTracks(tagName, limit?, page?)

_Fetches and returns popular tracks for a tag._

- #### `tagName` (string): The name of the tag.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### tag.fetchWeeklyChartList(tagName)

_Fetches and returns a list of available charts for a tag._

- #### `tagName` (string): The name of the tag.

## track

### track.fetch(artistName, trackName, userName?)

_Fetches and returns metadata information for a track._

- #### `artistName` (string): The name of the artist.
- #### `trackName` (string): The name of the track.

### track.fetchSimilar(artistName, trackName, limit?)

_Fetches and returns similar tracks for this track._

- #### `artistName` (string): The name of the artist.
- #### `trackName` (string): The name of the track.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.

### track.fetchTopTags(artistName, trackName)

_Fetches and returns popular tags for a track._

- #### `artistName` (string): The name of the artist.
- #### `trackName` (string): The name of the track.

### track.search(trackName, limit?, page?)

_Search for a track by name._

- #### `trackName` (string): The name of the track.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 30.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

## user

### user.fetch(userName)

_Fetches and returns information about a user's profile._

- #### `userName` (string): The name of the user.

### user.fetchAllArtists(userName, limit?, page?)

_Fetches and returns a list of all the artists in a user's library._

- #### `userName` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.fetchFriends(userName, limit?, page?)

_Fetches and returns a list of the user's friends._

- #### `userName` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.fetchLovedTracks(userName, limit?, page?)

_Fetches and returns the loved tracks as set by the user._

- #### `userName` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.fetchPersonalTags(userName, tagName, tagType)

_Fetches and returns a list of the user's personal tags._

- #### `userName` (string): The name of the user.
- #### `tagName` (string): The name of the tag.
- #### `tagType` (album, artist, track): The type of items which have been tagged.

### user.fetchRecentTracks(userName, limit?, page?)

_Fetches and returns the most recent track listened by the user._

- #### `userName` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50. Maximum is 200.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.fetchTopAlbums

_Fetches and returns a list of popular albums in a user's library._

- #### `userName` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

### user.fetchTopTags(userName, limit?)

- #### `userName` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.

### user.fetchTopTracks(userName, limit?, page?)

_Fetches and returns a list of popular tracks in a user's library._

- #### `userName` (string): The name of the user.
- #### `limit?` (number): The number of results to fetch per page. Defaults to 50.
- #### `page?` (number): The page number to fetch. Defaults to the first page.

# License

This package is licensed under the [zlib][license] license.

© 2023 Chloe Arciniega.

[actions-image]:
  https://img.shields.io/github/actions/workflow/status/solelychloe/simple-fm/push.yaml?colorA=18181B&colorB=de3931
[actions-link]: https://github.com/solelychloe/simple-fm/actions/workflows/push.yaml
[deno-repo]: https://github.com/denoland/deno
[logo]: /public/logo.png 'The Twitter headphone emoji with musical notes in it.'
[license]: /LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[last-fm-api]: https://www.last.fm/api/account/create
[license-image]: https://img.shields.io/npm/l/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[npm-image]: https://img.shields.io/npm/v/@solely/simple-fm.svg?style=flat&colorA=18181B&colorB=de3931
[npm-link]: https://npmjs.org/package/@solely/simple-fm
