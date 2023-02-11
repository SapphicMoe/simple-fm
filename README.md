# simple-fm

A simple, asynchronous Last.fm wrapper in TypeScript.

Actual documentation coming soon! Project still WIP.

# Example

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
