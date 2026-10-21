import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · Sites internet et logiciel de gestion pour artisans`;
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
        background: "linear-gradient(135deg, #0B1B2E 0%, #1E3A5F 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "linear-gradient(135deg, #F97316, #FB923C)",
          }}
        />
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 4 }}>{site.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
          {"Votre métier, c'est le chantier."}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#FB923C",
          }}
        >
          {"Le reste, on s'en occupe."}
        </div>
      </div>
      <div style={{ fontSize: 30, color: "#94A3B8" }}>
        {`Sites internet & logiciel de gestion pour artisans du bâtiment · ${site.city}`}
      </div>
    </div>,
    size,
  );
}
