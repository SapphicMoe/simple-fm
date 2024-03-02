# @solely/simple-fm

## 1.7.2

### Patch Changes

- 38d2200: Remove position from AlbumType
- 891cd60: Add back the name property to albums in user.getRecentTracks

## 1.7.1

### Patch Changes

- 65d0a7c: Use a constants file & make user agent version static. Should fix issues in environments like Cloudflare Workers.
- 0a05734: Clean up condition check for userPlayCount in artist.getInfo
- 6ecb4b9: Fix nowPlaying condition check

## 1.7.0

### Minor Changes

- aaee298: Use casters for type helpers & improve types

### Patch Changes

- 0513ddc: Make userAgent versioning optional behind an option
- 2ccf3e6: change node version requirement back to 18

## 1.6.4

### Patch Changes

- ffd2125: Use LastFMError for FetchError
- 439c491: Add type safety for package
- b131fc8: Create a separate function for initializing methods

## 1.6.3

### Patch Changes

- ffa9047: Use a synchronous call for readFile

## 1.6.2

### Patch Changes

- d27fb25: Fix behavior of dateAdded with a track that's currently playing.

## 1.6.1

### Patch Changes

- bce6394: Remove redundant "node:" module specifiers

## 1.6.0

### Minor Changes

- bbbee3d: Lots of internal changes made (types, etc). Fixed some annoying bugs with some methods.

## 1.5.5

### Patch Changes

- eee79df: Add stats property to user.getInfo
- 2d4a73e: Clean up import paths
- 31acc38: Update deps

## 1.5.4

### Patch Changes

- 968f34b: Add Changesets to handle versioning and changelogs
