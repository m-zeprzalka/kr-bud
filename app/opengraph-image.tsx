import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { loadSpaceGrotesk } from "./_og/fonts";

// Karta OpenGraph 1200×630 — realne zdjęcie wnętrza (5995) jako tło,
// ciepły scrim po lewej pod tekst, wordmark + nagłówek + lokalizacja.
// Next automatycznie podpina ją jako og:image i twitter:image.
export const alt =
  "KR-BUD — wykończenia wnętrz i brukarstwo w Puławach i okolicy, z pełną pisemną gwarancją";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [latin, latinExt] = await loadSpaceGrotesk();
  const photo = await readFile(join(process.cwd(), "public/5995.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%" }}>
        {/* Zdjęcie tła (1200×805) wykadrowane do środka — bez polegania na object-fit.
            Dekoracyjne w obrębie generowanego obrazka; alt całej karty jest w `export const alt`. */}
        <img
          alt=""
          src={src}
          width={1200}
          height={805}
          style={{ position: "absolute", left: 0, top: -88, width: 1200, height: 805 }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            backgroundImage:
              "linear-gradient(105deg, rgba(20,18,16,0.94) 0%, rgba(20,18,16,0.80) 40%, rgba(20,18,16,0.32) 72%, rgba(20,18,16,0.10) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: 72,
            color: "#fefdfb",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 40, letterSpacing: -1 }}>
              KR-BUD
            </span>
            <span style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 40, color: "#fa9805" }}>
              .
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 64, height: 5, background: "#fa9805", marginBottom: 28 }} />
            <div
              style={{
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 76,
                lineHeight: 1.02,
                letterSpacing: -2,
                maxWidth: 900,
              }}
            >
              Wykończenia wnętrz i brukarstwo
            </div>
            <div
              style={{
                marginTop: 24,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: 1,
                color: "rgba(254,253,251,0.82)",
              }}
            >
              Puławy + 100 km · pełna pisemna gwarancja
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: latin, weight: 700, style: "normal" },
        { name: "Space Grotesk", data: latinExt, weight: 700, style: "normal" },
      ],
    },
  );
}
