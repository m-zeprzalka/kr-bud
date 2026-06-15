import { ImageResponse } from "next/og";

import { loadSpaceGrotesk } from "./_og/fonts";

// Apple touch icon 180×180 — ten sam monogram „KR." co favicon, w skali
// pozwalającej na ostry render na ekranach retina (ekran startowy iOS).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          borderRadius: 36,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: -5,
              color: "#fefdfb",
            }}
          >
            KR
          </span>
          <div
            style={{
              width: 20,
              height: 20,
              marginLeft: 8,
              marginBottom: 16,
              borderRadius: 4,
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
