import { ALPHABET } from "./alphabet";

/** Mod op that has a reasonable behavior for negative values. */
const mod = (a: number, modulus: number): number =>
  ((a % modulus) + modulus) % modulus;

/** Given a letter and its position, get its encoded/decoded variant. */
const alterLetter = (c: string, i: number, op: "encode" | "decode"): string => {
  const gap = i * 7 + 3;
  const index = ALPHABET.indexOf(c);
  let opIndex = op === "encode" ? index + gap : index - gap;
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
