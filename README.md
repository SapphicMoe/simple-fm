# simple-fm

A simple Last.fm wrapper in TypeScript.

Actual documentation coming soon! Project still WIP.

# Example

```ts
import { LastFMClient } from '@solely/simple-fm';

const client = new LastFMClient('your last.fm token here');

const tags = await client.fetchArtistTags('Waterparks');

console.log(tags);
```
