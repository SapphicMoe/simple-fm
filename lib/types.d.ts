export type Album = {
  name: string;
  artist: string;
  url: string | URL;
  image: object[];
};

export type Artist = {
  name: string;
  url: string | URL;
  bio: string;
  scrobbles: string | number;
  listeners: string | number;
};

export type Tag = {
  name: string;
  url: string | URL;
  count: string | number;
};

export type Track = {
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

export type User = {
  name: string;
  realName?: string | null;
  country?: string;
  url?: string | URL;
  registered?: string | Date;
  image?: object[];
};
