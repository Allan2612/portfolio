import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Share image in the site's colours: paper ground, ink type, the brass label as the one filled shape. */
export function ogImage({ title, text, label, footer }: { title: string; text: string; label: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "#e8e8e3",
          color: "#181715",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 34, lineHeight: 1.3, maxWidth: 940 }}>{text}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex", background: "#bfb21a", padding: "10px 22px" }}>{label}</div>
          <div style={{ display: "flex", color: "#63625c" }}>{footer}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
