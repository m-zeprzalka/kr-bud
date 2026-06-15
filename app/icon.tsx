import { ImageResponse } from "next/og";

import { loadSpaceGrotesk } from "./_og/fonts";

// Favicon „KR." — monogram marki: ciepły tusz jako tło, ciepła biel na
// literach, bursztynowa kropka. Te same kolory i font (Space Grotesk 700)
// co wordmark w nagłówku.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const [latin, latinExt] = await loadSpaceGrotesk();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#191715",
          borderRadius: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 19,
              lineHeight: 1,
              letterSpacing: -1,
              color: "#fefdfb",
            }}
          >
            KR
          </span>
          <div
            style={{
              width: 4,
              height: 4,
              marginLeft: 1.5,
              marginBottom: 3,
              borderRadius: 1,
              background: "#fa9805",
            }}
          />
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
