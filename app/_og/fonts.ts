import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Space Grotesk 700 (latin + latin-ext) jako bufory WOFF.
 * Współdzielone przez icon / apple-icon / opengraph-image — dzięki temu
 * favicon i karta OG mają tę samą typografię co logo w nagłówku.
 * latin-ext jest potrzebny dla polskich znaków (ł, ę, ń, ó…).
 *
 * Licencja fontu: SIL Open Font License 1.1 (Florian Karsten / Google Fonts).
 */
export async function loadSpaceGrotesk(): Promise<[Buffer, Buffer]> {
  const dir = join(process.cwd(), "app/_og");
  return Promise.all([
    readFile(join(dir, "sg-700-latin.woff")),
    readFile(join(dir, "sg-700-latinext.woff")),
  ]);
}
