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
  artist?: {
    name: string;
    url: string | URL;
  };
  url?: string | URL;
  playcount?: string | number;
  listeners?: string | number;
};
