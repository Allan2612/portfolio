import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** A JPEG under content/images/og as a data URI: the share image is drawn at build time and reads it from disk. */
export const ogShot = (file: string) =>
  `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "content", "images", "og", file)).toString("base64")}`;

/**
 * Share image in the site's colours: paper ground, ink type, the brass label as the one filled shape.
 * With a screenshot (`shot`), the text takes the left column and the picture the right one.
 */
export function ogImage({ title, text, label, footer, shot }: { title: string; text: string; label: string; footer: string; shot?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 48,
          padding: shot ? "64px 0 64px 72px" : "72px 84px",
          background: "#e8e8e3",
          color: "#181715",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: shot ? 22 : 28 }}>
            <div style={{ fontSize: shot ? 60 : 76, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
            <div style={{ fontSize: shot ? 27 : 34, lineHeight: 1.3, maxWidth: 940 }}>{text}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: shot ? 24 : 28 }}>
            <div style={{ display: "flex", background: "#bfb21a", padding: "10px 22px" }}>{label}</div>
            {!shot && <div style={{ display: "flex", color: "#63625c" }}>{footer}</div>}
          </div>
        </div>
        {shot && (
          // eslint-disable-next-line @next/next/no-img-element -- drawn by next/og, not by a browser
          <img src={shot} width={600} height={375} alt="" style={{ border: "1px solid #cfcfc8", boxShadow: "0 20px 50px rgba(24,23,21,0.18)" }} />
        )}
      </div>
    ),
    ogSize,
  );
}
