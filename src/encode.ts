import { ALPHABET } from "./alphabet";
import { isWord } from "./dictionary";

/** Mod op that has a reasonable behavior for negative values. */
const mod = (a: number, modulus: number): number =>
  ((a % modulus) + modulus) % modulus;

/** Given a letter and its position, get its encoded/decoded variant. */
const alterLetter = (c: string, i: number, op: "encode" | "decode"): string => {
  const gap = i * 7 + 3;
  const index = ALPHABET.indexOf(c);
  const opIndex = op === "encode" ? index + gap : index - gap;
  return ALPHABET[mod(opIndex, ALPHABET.length)];
};

/**
 * Decode a secret that was shared.
 *
 * Takes nonsense like POQIZ and turns it back to KITTY.
 */
export const decodeSecret = (encoded: string): string =>
  encoded
    .split("")
    .map((c, i) => alterLetter(c, i, "decode"))
    .join("");

/**
 * Decode a secret that was shared.
 *
 * In addition, validate the decoded secret against our dictionary;
 * return undefined if the secret is invalid.
 */
export const decodeSecretAndValidate = (
  encoded: string
): string | undefined => {
  const decoded = decodeSecret(encoded);
  return isWord(decoded) ? decoded : undefined;
};

/**
 * Encode a secret so it can be shared.
 *
 * Takes a word like KITTY and turns it into nonsense
 * like POQIZ. This ain't cryptogrphy; we can always
 * turn it back again!
 */
export const encodeSecret = (secret: string): string =>
  secret
    .split("")
    .map((c, i) => alterLetter(c, i, "encode"))
    .join("");

/** Get secret from the URL, if any, and decode it. */
export const getSecretFromURL = (): string | undefined => {
  const searchParams = new URLSearchParams(window.location.search);
  const secret = searchParams.get("w");
  return secret ? decodeSecretAndValidate(secret) : undefined;
};

/** Encode secret into the current URL and return the updated URL. */
export const getURLFromSecret = (secret: string): string => {
  const url = new URL(window.location.href);
  // clear extant query param, if any.
  url.searchParams.delete("w");
  url.searchParams.append("w", encodeSecret(secret));
  return url.toString();
};
