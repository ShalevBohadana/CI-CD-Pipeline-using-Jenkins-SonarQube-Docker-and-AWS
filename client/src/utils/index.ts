/**
 * The function removes the last slash from a string if it exists.
 * @param {string} input - The `input` parameter is a string that represents the input value.
 * @returns The function `removeLastSlash` returns the input string with the last slash removed, if it
 * exists. If the input string does not end with a slash, it returns the input string as is.
 */
export const removeLastSlash = (input: string) => {
  if (typeof input !== 'string') throw new Error('Input must be a string.');

  if (input.endsWith('/')) return input.slice(0, -1);

  return input;
};

/**
 * The `kebabCasedUrl` function takes a string input and converts it to a URL-friendly format by
 * removing unwanted characters and replacing spaces with hyphens.
 * @param {string} input - The `input` parameter is a string that represents the input URL that needs
 * to be converted to kebab case.
 * @returns a string that has been converted to kebab case.
 */
export const kebabCasedUrl = (input: string): string => {
  // Remove unwanted characters and replace spaces with hyphens
  const urlFriendly = input
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-{2,}/g, '-'); // Replace consecutive hyphens with a single hyphen

  return urlFriendly;
};

export const tawkHmacSha256 = async (payload: string) => {
  // Convert the key to ArrayBuffer
  const keyBuffer = new TextEncoder().encode(import.meta.env.VITE_TAWK_JS_API_KEY);
  const userBuffer = new TextEncoder().encode(payload);

  // Import the key
  const importedKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Sign the data
  const signatureBuffer = await crypto.subtle.sign('HMAC', importedKey, userBuffer);

  // Convert the signature to a hex string
  const hexSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return hexSignature;
};

/**
 * The function getRandomHexString generates a random hexadecimal string of a specified size.
 * @param [size=10] - The `size` parameter determines the length of the random hexadecimal string that
 * will be generated. By default, if no value is provided for `size`, it will be set to 10.
 */
export const getRandomHexString = (size = 10) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 16).toString(16)).join('');

/**
 * The function `getYouTubeEmbedUrl` takes a YouTube video URL as input and returns the corresponding
 * embed URL for that video.
 * @param {string} url - The `url` parameter is a string that represents a YouTube video URL.
 * @returns a YouTube embed URL.
 */
export const getYouTubeEmbedUrl = (url: string) => {
  const result = url.split('/').pop()?.split('?').shift();

  if (result) {
    return `https://www.youtube.com/embed/${result}`;
  }
  throw new Error('Invalid URL');
};

/**
 * The function "numberToCompact" takes a number as input and returns a compact representation of the
 * number in lowercase.
 * @param {number} num - The `num` parameter is a number that you want to convert to a compact
 * representation.
 * @returns The function `numberToCompact` returns a string that represents the given number in a
 * compact format.
 */
export const numberToCompact = (num: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });

  return formatter.format(num).toLowerCase();
};
