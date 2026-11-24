import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS needs an opaque square, so the tab icon's "A" (app/icon.svg, ink by default) sits on the paper colour.
export default function AppleIcon() {
  const svg = readFileSync(join(process.cwd(), "app", "icon.svg"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#e8e8e3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by next/og, not by the browser */}
        <img src={`data:image/svg+xml;base64,${svg.toString("base64")}`} width={120} height={120} alt="" />
      </div>
    ),
    size,
  );
}
