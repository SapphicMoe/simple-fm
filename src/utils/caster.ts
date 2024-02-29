export const toInt = <T extends number | string>(value?: T): number => {
  if (typeof value === 'number') return value;
  else if (typeof value === 'string') return parseInt(value);
  else return NaN;
};

export const toFloat = <T extends number | string>(value?: T): number => {
  if (typeof value === 'number') return value;
  else if (typeof value === 'string') return parseFloat(value);
  else return NaN;
};

export const toArray = <T>(value: T | T[]): T[] => {
  if (Array.isArray(value)) return value;
  else if (!value) return [];
  else return [value];
};

export const toBool = (value: any): boolean => {
  return value !== 0 && value && value !== '0';
};

export const convertMeta = (meta: any) => {
  for (const k in ['from', 'perPage', 'page', 'to', 'total', 'totalPages'] as const)
    if (Object.hasOwn(meta, k)) meta[k] = toInt(meta[k]);

  return meta;
};

export const convertSearch = (res: any): any => {
  res.itemsPerPage = toInt(res['opensearch:itemsPerPage']);
  delete res['opensearch:itemsPerPage'];

  res.totalResults = toInt(res['opensearch:totalResults']);
  delete res['opensearch:totalResults'];

  return {
    query: res['opensearch:Query'].searchTerms,
    page: res['opensearch:Query'].startPage,
    itemsPerPage: res.itemsPerPage,
    totalResults: res.totalResults,
  };
};

export function convertEntryToInt(entry: any): any {
  for (const k of [
    'count',
    'duration',
    'listeners',
    'match',
    'playcount',
    'rank',
    'reach',
    'taggings',
    'userplaycount',
  ])
    if (Object.hasOwn(entry, k)) entry[k] = toInt(entry[k]);

  return entry;
}

export const sanitizeBio = (input: string) => {
  return input
    .replace(/<[^>]*>/g, '')
    .replace('Read more on Last.fm', '')
    .trim();
};
