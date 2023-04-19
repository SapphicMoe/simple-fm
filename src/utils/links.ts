export const sanitizeURL = (url: string) => {
  return encodeURIComponent(url).replaceAll('%20', '+');
};
