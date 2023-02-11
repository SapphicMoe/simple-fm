export type AlbumType = {
  name: string;
  artist: string;
  url: string | URL;
  image?: object[];
};

export type ArtistType = {
  name: string;
  url: string | URL;
  bio?: string;
  scrobbles?: string | number;
  listeners?: string | number;
};

export type TagType = {
  name: string;
  url: string | URL;
  count?: string | number;
};

export type TrackType = {
  ['@attr']?: {
    rank: string | number;
  };
  name: string;
  artist: {
    name: string;
    url: string | URL;
  };
  image?: object[];
  url?: string | URL;
  playcount?: string | number;
  listeners?: string | number;
};

export type UserType = {
  name: string;
  realName?: string | null;
  country?: string;
  url: string | URL;
  registered: string | Date;
  image?: object[];
};
