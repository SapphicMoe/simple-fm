# simple-fm [![npm-image]][npm-link] [![downloads-image]][npm-link]

A simple, asynchronous Last.fm wrapper in TypeScript.

Actual documentation coming soon! Project still WIP.

# Installation

- npm: `npm i @solely/simple-fm`
- yarn: `yarn add @solely/simple-fm`
- pnpm: `pnpm i @solely/simple-fm`

# Example usage

```ts
import simpleFM from '@solely/simple-fm';

// Replace the token with your Last.fm token.
const client = new simpleFM('last.fm token');

// Fetch tags from the artist "Waterparks".
const tags = await client.artist.fetchTags('Waterparks');

// Log it.
console.log(tags);
```

# License

This package is licensed under the [zlib][license] license.

© 2023 Chloe Arciniega.

[license]: /LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@solely/simple-fm.svg
[npm-image]: https://img.shields.io/npm/v/@solely/simple-fm.svg
[npm-link]: https://npmjs.org/package/@solely/simple-fm
