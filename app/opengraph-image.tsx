import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · Sites internet, logiciel et IA pour artisans`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage (réseaux sociaux), générée au build. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #FDE2EC 0%, #FFF3E8 45%, #D6E1FF 100%)",
        color: "#171717",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="64" height="64" viewBox="0 0 40 40">
          <rect width="40" height="40" rx="11" fill="#171717" />
          <path
            d="M9 21.5 20 11l11 10.5"
            fill="none"
            stroke="#F97316"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 20v9.5h13V20"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M18 29.5v-5h4v5" fill="#FFFFFF" />
        </svg>
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 4 }}>{site.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          {"Plus de clients. Moins de coûts."}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#C2410C",
          }}
        >
          {"L'IA s'occupe du reste."}
        </div>
      </div>
      <div style={{ fontSize: 30, color: "#4D585F" }}>
        {`Sites internet, logiciel et IA pour artisans du bâtiment · ${site.city}`}
      </div>
    </div>,
    size,
  );
}
