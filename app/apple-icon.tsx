import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône PNG (écran d'accueil iPhone, logo des données structurées) : même dessin que icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    <svg width="180" height="180" viewBox="0 0 40 40">
      <rect width="40" height="40" fill="#171717" />
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
    </svg>,
    size,
  );
}
