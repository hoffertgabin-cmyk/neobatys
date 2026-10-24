"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Visuels dessinés en SVG qui tiennent lieu de photos dans les mini-sites :
 * pièces en perspective, façades, chantiers, véhicule. Tous partagent le même
 * cadre 480 × 300 et remplissent leur conteneur (recadrage centré).
 * Pour passer à de vraies photos, remplacer <Scene> par une <Image> au même endroit.
 */

const W = 480;
const H = 300;
/** Mur du fond et point de fuite des pièces en perspective. */
const BACK = { x1: 130, x2: 350, y1: 60, y2: 215 };
const VP = { x: 240, y: 140 };

function useUid() {
  return useId().replace(/[^a-zA-Z0-9]/g, "");
}

function Frame({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("block size-full", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

/** Lumière douce et vignettage communs, pour un rendu « photo ». */
function Light({
  id,
  from = "#fff",
  x = "30%",
  y = "10%",
}: {
  id: string;
  from?: string;
  x?: string;
  y?: string;
}) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-l`} cx={x} cy={y} r="75%">
          <stop offset="0" stopColor={from} stopOpacity="0.35" />
          <stop offset="1" stopColor={from} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-v`} cx="50%" cy="50%" r="75%">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-l)`} />
      <rect width={W} height={H} fill={`url(#${id}-v)`} />
    </>
  );
}

/* --------------------------------------------------------- Pièce type */

/** x d'un point du sol, à la profondeur z (1 = pied du mur du fond). */
const floorX = (xBack: number, y: number) =>
  VP.x + (xBack - VP.x) * ((y - VP.y) / (BACK.y2 - VP.y));

function Room({
  id,
  back,
  left,
  right,
  ceiling = "#f3f1ee",
  floor,
  floorKind = "tile",
  floorLine = "rgba(255,255,255,0.35)",
  backTiles,
  window: win = "right",
}: {
  id: string;
  back: string;
  left: string;
  right: string;
  ceiling?: string;
  floor: string;
  floorKind?: "tile" | "wood" | "plain";
  floorLine?: string;
  /** Carrelage sur le mur du fond : [largeur, hauteur, couleur des joints]. */
  backTiles?: [number, number, string];
  window?: "left" | "right" | "none";
}) {
  const { x1, x2, y1, y2 } = BACK;
  const depths = [1, 0.83, 0.69, 0.57, 0.47, 0.39];
  const cols = floorKind === "wood" ? 12 : 7;
  return (
    <>
      <defs>
        <clipPath id={`${id}-floor`}>
          <polygon points={`0,${H} ${W},${H} ${x2},${y2} ${x1},${y2}`} />
        </clipPath>
        <linearGradient id={`${id}-fl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.08" />
        </linearGradient>
        {backTiles && (
          <pattern
            id={`${id}-bt`}
            width={backTiles[0]}
            height={backTiles[1]}
            patternUnits="userSpaceOnUse"
            x={x1}
            y={y1}
          >
            <path
              d={`M0 0.5H${backTiles[0]}M0.5 0V${backTiles[1]}`}
              stroke={backTiles[2]}
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        )}
      </defs>
      <polygon points={`0,0 ${W},0 ${x2},${y1} ${x1},${y1}`} fill={ceiling} />
      <polygon points={`0,0 ${x1},${y1} ${x1},${y2} 0,${H}`} fill={left} />
      <polygon points={`${W},0 ${x2},${y1} ${x2},${y2} ${W},${H}`} fill={right} />
      <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill={back} />
      {backTiles && <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill={`url(#${id}-bt)`} />}
      <polygon points={`0,${H} ${W},${H} ${x2},${y2} ${x1},${y2}`} fill={floor} />
      {floorKind !== "plain" && (
        <g clipPath={`url(#${id}-floor)`} stroke={floorLine} strokeWidth="1">
          {Array.from({ length: cols + 1 }).map((_, i) => {
            const xb = x1 + ((x2 - x1) / cols) * i;
            return <line key={i} x1={xb} y1={y2} x2={floorX(xb, H)} y2={H} />;
          })}
          {floorKind === "tile" &&
            depths.map((z) => {
              const y = VP.y + (y2 - VP.y) / z;
              return <line key={z} x1={0} y1={y} x2={W} y2={y} />;
            })}
        </g>
      )}
      <polygon points={`0,${H} ${W},${H} ${x2},${y2} ${x1},${y2}`} fill={`url(#${id}-fl)`} />
      {/* Arêtes */}
      <g stroke="#000" strokeOpacity="0.07">
        <line x1={x1} y1={y1} x2={x1} y2={y2} />
        <line x1={x2} y1={y1} x2={x2} y2={y2} />
      </g>
      {win === "right" && (
        <>
          <polygon points="388,62 452,32 452,196 388,184" fill="#dbeafe" />
          <polygon
            points="388,62 452,32 452,196 388,184"
            fill="none"
            stroke="#fff"
            strokeWidth="5"
          />
          <line x1="420" y1="47" x2="420" y2="190" stroke="#fff" strokeWidth="3" />
          <polygon points="300,215 350,215 470,300 340,300" fill="#fff" opacity="0.12" />
        </>
      )}
      {win === "left" && (
        <>
          <polygon points="92,62 28,32 28,196 92,184" fill="#dbeafe" />
          <polygon points="92,62 28,32 28,196 92,184" fill="none" stroke="#fff" strokeWidth="5" />
          <line x1="60" y1="47" x2="60" y2="190" stroke="#fff" strokeWidth="3" />
          <polygon points="130,215 180,215 140,300 10,300" fill="#fff" opacity="0.12" />
        </>
      )}
    </>
  );
}

function Plant({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C-14 -20 -26 -26 -34 -52 C-18 -40 -8 -30 0 -8Z" fill="#3f6b45" />
      <path d="M0 0 C10 -26 22 -36 30 -64 C34 -40 20 -20 4 -4Z" fill="#4d7f52" />
      <path d="M0 -2 C-4 -30 -2 -50 6 -74 C12 -50 8 -26 2 -2Z" fill="#5b9160" />
      <path d="M0 0 C-20 -8 -34 -6 -46 -22 C-28 -22 -14 -14 -2 -4Z" fill="#355c3a" />
      <path d="M-16 0 H16 L12 26 H-12Z" fill="#e7e2da" />
      <path d="M-16 0 H16 L15.4 5 H-15.4Z" fill="#d6cfc4" />
    </g>
  );
}

/* ------------------------------------------------------------ Scènes */

export function LivingScene({
  className,
  wall = "#a7b8a3",
  oldWall,
  spots = false,
  ladder = false,
}: {
  className?: string;
  /** Couleur du mur du fond. */
  wall?: string;
  /** Ancienne couleur : le mur est à moitié repeint. */
  oldWall?: string;
  /** Spots allumés au plafond. */
  spots?: boolean;
  /** Escabeau et rouleau du peintre. */
  ladder?: boolean;
}) {
  const id = useUid();
  return (
    <Frame className={className} label="Salon fraîchement rénové">
      <defs>
        <radialGradient id={`${id}-spot`} cx="50%" cy="0%" r="100%">
          <stop offset="0" stopColor="#fff2c6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff2c6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Room
        id={id}
        back={wall}
        left="#ebe6df"
        right="#f4f1ec"
        floor="#b08a62"
        floorKind="wood"
        floorLine="rgba(60,35,10,0.18)"
      />
      {oldWall && (
        <>
          <rect x={BACK.x1} y={BACK.y1} width="88" height={BACK.y2 - BACK.y1} fill={oldWall} />
          <path
            d={`M${BACK.x1 + 88} ${BACK.y1} q6 30 -2 60 q8 30 0 95`}
            fill={oldWall}
            stroke={oldWall}
            strokeWidth="6"
          />
        </>
      )}
      {/* Tableau */}
      <rect x="250" y="82" width="64" height="44" fill="#fff" stroke="#2b2b2b" strokeWidth="2" />
      <rect x="256" y="88" width="52" height="32" fill="#e9dccb" />
      <path d="M256 120 L274 100 L286 112 L296 104 L308 120Z" fill="#c28a5b" />
      <circle cx="298" cy="96" r="4" fill="#f2c46d" />
      {/* Canapé */}
      <rect x="196" y="160" width="150" height="26" rx="6" fill="#d9d3cb" />
      <rect x="190" y="178" width="162" height="26" rx="6" fill="#cfc8bf" />
      <rect x="186" y="170" width="14" height="36" rx="5" fill="#d9d3cb" />
      <rect x="342" y="170" width="14" height="36" rx="5" fill="#d9d3cb" />
      <rect x="214" y="164" width="28" height="18" rx="4" fill="#e0b25b" />
      <rect x="292" y="164" width="28" height="18" rx="4" fill="#6e8a8f" />
      <rect x="196" y="204" width="3" height="8" fill="#3b2b1c" />
      <rect x="344" y="204" width="3" height="8" fill="#3b2b1c" />
      {/* Tapis + table basse */}
      <ellipse cx="270" cy="250" rx="120" ry="20" fill="#e7dfd3" opacity="0.9" />
      <ellipse cx="270" cy="236" rx="38" ry="7" fill="#3b2b1c" />
      <rect x="266" y="236" width="8" height="16" fill="#3b2b1c" />
      {/* Lampadaire */}
      <line x1="370" y1="214" x2="370" y2="120" stroke="#2b2b2b" strokeWidth="1.6" />
      <path d="M358 120 L382 120 L376 104 L364 104Z" fill="#efe4cf" />
      <Plant x={160} y={214} s={0.75} />
      {spots &&
        [170, 240, 310].map((x) => (
          <g key={x}>
            <polygon
              points={`${x - 6},${42 + (x === 240 ? 6 : 0)} ${x + 6},${42 + (x === 240 ? 6 : 0)} ${x + 46},215 ${x - 46},215`}
              fill={`url(#${id}-spot)`}
            />
            <ellipse cx={x} cy={40 + (x === 240 ? 6 : 0)} rx="7" ry="2" fill="#fffbe8" />
          </g>
        ))}
      {ladder && (
        <g>
          <line x1="60" y1="298" x2="92" y2="130" stroke="#c9ced3" strokeWidth="5" />
          <line x1="124" y1="298" x2="92" y2="130" stroke="#aeb4ba" strokeWidth="5" />
          {[160, 195, 230, 265].map((y) => {
            const t = (298 - y) / 168;
            return (
              <line
                key={y}
                x1={60 + 32 * t}
                y1={y}
                x2={124 - 32 * t}
                y2={y}
                stroke="#c9ced3"
                strokeWidth="3.5"
              />
            );
          })}
          <rect x="74" y="122" width="34" height="9" rx="2" fill="#9aa1a8" />
          <path d="M80 122 V108 H100 V122" fill="#fff" stroke="#9aa1a8" strokeWidth="1.5" />
          <rect x="81" y="108" width="18" height="6" fill={wall} />
          {/* Rouleau sur perche, posé contre le mur */}
          <line x1="150" y1="290" x2="214" y2="120" stroke="#8b5a2b" strokeWidth="3" />
          <rect
            x="200"
            y="106"
            width="34"
            height="13"
            rx="6"
            fill={wall}
            stroke="#fff"
            strokeWidth="1.2"
            transform="rotate(20 217 112)"
          />
        </g>
      )}
      <Light id={id} />
    </Frame>
  );
}

export function HouseScene({
  className,
  facade = "#efe6d8",
  roof = "#8b4a35",
  joinery = "#374151",
  heatPump = false,
  timber = false,
  scaffold = false,
  cracked = false,
  stoneWall = false,
  terrace,
  sky = "day",
}: {
  className?: string;
  facade?: string;
  roof?: string;
  joinery?: string;
  /** Pompe à chaleur au pied de la façade. */
  heatPump?: boolean;
  /** Extension à ossature et bardage bois. */
  timber?: boolean;
  /** Échafaudage sur la façade. */
  scaffold?: boolean;
  /** Façade abîmée (avant travaux). */
  cracked?: boolean;
  /** Muret en pierre au premier plan. */
  stoneWall?: boolean;
  /** Terrasse carrelée au premier plan, de la couleur donnée. */
  terrace?: string;
  sky?: "day" | "evening";
}) {
  const id = useUid();
  const skyTop = sky === "evening" ? "#f3b27a" : "#9cc8ec";
  const skyBottom = sky === "evening" ? "#fde6c8" : "#e4f1fb";
  return (
    <Frame className={className} label="Maison rénovée">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} />
          <stop offset="1" stopColor={skyBottom} />
        </linearGradient>
        <pattern id={`${id}-tiles`} width="12" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 7.5H12M6 0V8" stroke="#000" strokeOpacity="0.18" />
        </pattern>
        <pattern id={`${id}-clad`} width="7" height="10" patternUnits="userSpaceOnUse">
          <path d="M.5 0V10" stroke="#000" strokeOpacity="0.2" />
        </pattern>
        <pattern id={`${id}-stone`} width="34" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 .5H34M.5 0V8M17.5 8V16M0 8.5H34" stroke="#fff" strokeOpacity="0.5" />
        </pattern>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <g fill="#fff" opacity="0.75">
        <ellipse cx="80" cy="48" rx="34" ry="9" />
        <ellipse cx="104" cy="42" rx="22" ry="9" />
        <ellipse cx="390" cy="34" rx="30" ry="7" />
      </g>
      {/* Arbres au loin */}
      <g fill="#7fa37a">
        <circle cx="30" cy="200" r="34" />
        <circle cx="70" cy="190" r="28" />
        <circle cx="440" cy="196" r="36" />
        <circle cx="470" cy="210" r="26" />
      </g>
      <rect y="232" width={W} height="68" fill="#8fb36a" />
      <rect y="232" width={W} height="6" fill="#7aa058" />
      {/* Corps principal */}
      <rect x="120" y="110" width="210" height="126" fill={facade} />
      <rect x="120" y="110" width="210" height="126" fill={`url(#${id}-shade)`} />
      <polygon points="104,114 225,48 346,114" fill={roof} />
      <polygon points="104,114 225,48 346,114" fill={`url(#${id}-tiles)`} />
      <polygon points="104,114 346,114 340,120 110,120" fill="#000" opacity="0.18" />
      <rect x="270" y="58" width="16" height="34" fill="#a8a29e" />
      <rect x="268" y="56" width="20" height="5" fill="#78716c" />
      {/* Ouvertures */}
      {[
        [142, 136],
        [205, 136],
        [268, 136],
        [142, 186],
        [268, 186],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="40" height="34" fill="#cfe3f3" />
          <rect x={x} y={y} width="40" height="34" fill="none" stroke={joinery} strokeWidth="3" />
          <line x1={x + 20} y1={y} x2={x + 20} y2={y + 34} stroke={joinery} strokeWidth="2" />
          <polygon
            points={`${x + 3},${y + 3} ${x + 14},${y + 3} ${x + 3},${y + 18}`}
            fill="#fff"
            opacity="0.5"
          />
          <rect x={x - 3} y={y + 34} width="46" height="3" fill="#d6d3d1" />
        </g>
      ))}
      <rect x="208" y="186" width="34" height="50" fill={joinery} />
      <rect x="213" y="192" width="24" height="18" fill="#cfe3f3" opacity="0.6" />
      <circle cx="236" cy="214" r="1.6" fill="#e5e7eb" />
      <rect x="200" y="234" width="50" height="4" fill="#d6d3d1" />
      {cracked && (
        <g stroke="#6b5f55" strokeWidth="1.6" fill="none" opacity="0.8">
          <path d="M130 120 L140 150 L134 175 L146 210" />
          <path d="M300 112 L292 130 L306 150" />
          <path d="M250 175 L262 200 L256 230" />
          <rect x="122" y="196" width="18" height="14" fill="#cbbfae" stroke="none" />
          <rect x="300" y="214" width="26" height="14" fill="#cbbfae" stroke="none" />
          <path d="M120 232 H330" stroke="#5b8a3a" strokeWidth="5" opacity="0.5" />
        </g>
      )}
      {timber && (
        <g>
          <rect x="330" y="150" width="110" height="86" fill="#b98552" />
          <rect x="330" y="150" width="110" height="86" fill={`url(#${id}-clad)`} />
          <polygon points="324,152 446,152 446,144 324,140" fill="#3f3f46" />
          <rect x="352" y="174" width="66" height="62" fill="#cfe3f3" />
          <rect
            x="352"
            y="174"
            width="66"
            height="62"
            fill="none"
            stroke="#27272a"
            strokeWidth="3"
          />
          <line x1="385" y1="174" x2="385" y2="236" stroke="#27272a" strokeWidth="2" />
        </g>
      )}
      {heatPump && (
        <g>
          <rect x="336" y="196" width="62" height="42" rx="3" fill="#f4f4f5" stroke="#d4d4d8" />
          <circle cx="358" cy="217" r="15" fill="#e4e4e7" stroke="#a1a1aa" />
          {[0, 60, 120].map((a) => (
            <ellipse
              key={a}
              cx="358"
              cy="217"
              rx="12"
              ry="3.5"
              fill="#a1a1aa"
              transform={`rotate(${a} 358 217)`}
            />
          ))}
          <circle cx="358" cy="217" r="2.5" fill="#52525b" />
          {[204, 210, 216, 222, 228].map((y) => (
            <line key={y} x1="380" y1={y} x2="392" y2={y} stroke="#a1a1aa" />
          ))}
          <rect x="340" y="238" width="6" height="4" fill="#71717a" />
          <rect x="388" y="238" width="6" height="4" fill="#71717a" />
        </g>
      )}
      {scaffold && (
        <g stroke="#9ca3af" strokeWidth="2.5">
          {[112, 175, 238, 301, 338].map((x) => (
            <line key={x} x1={x} y1="96" x2={x} y2="238" />
          ))}
          {[130, 180, 228].map((y) => (
            <line key={y} x1="108" y1={y} x2="342" y2={y} strokeWidth="4" stroke="#e5a00d" />
          ))}
          <line x1="112" y1="180" x2="175" y2="130" strokeWidth="1.5" />
          <line x1="238" y1="228" x2="301" y2="180" strokeWidth="1.5" />
        </g>
      )}
      {terrace && (
        <g>
          <polygon points="60,300 420,300 360,238 120,238" fill={terrace} />
          <g stroke="#fff" strokeOpacity="0.45">
            {[150, 180, 210, 240, 270, 300, 330].map((x) => (
              <line key={x} x1={x} y1="238" x2={240 + (x - 240) * 1.6} y2="300" />
            ))}
            <line x1="104" y1="255" x2="376" y2="255" />
            <line x1="84" y1="277" x2="396" y2="277" />
          </g>
          <rect x="300" y="250" width="40" height="4" rx="2" fill="#3f3f46" />
          <rect x="304" y="254" width="3" height="18" fill="#3f3f46" />
          <rect x="333" y="254" width="3" height="18" fill="#3f3f46" />
          <Plant x={104} y={262} s={0.6} />
        </g>
      )}
      {stoneWall && (
        <g>
          <rect x="0" y="252" width={W} height="30" fill="#c8b79c" />
          <rect x="0" y="252" width={W} height="30" fill={`url(#${id}-stone)`} />
          <rect x="0" y="248" width={W} height="6" fill="#ddd2bf" />
        </g>
      )}
      <Light id={id} x="70%" y="0%" from={sky === "evening" ? "#ffe4c2" : "#fff"} />
    </Frame>
  );
}

export function VanScene({
  className,
  brand,
  phone,
  baseline,
}: {
  className?: string;
  brand: string;
  phone: string;
  baseline: string;
}) {
  const id = useUid();
  return (
    <Frame className={className} label={`Véhicule ${brand}`}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="#d5d9dd" />
      <rect y="0" width={W} height="170" fill="#c3c8cd" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={i * 56} y="0" width="54" height="170" fill="#cdd2d6" />
      ))}
      <rect y="230" width={W} height="70" fill="#6b7075" />
      <rect y="228" width={W} height="4" fill="#9ca3af" />
      {/* Utilitaire */}
      <path
        d="M70 230 V110 Q70 92 90 92 H310 Q330 92 344 108 L388 160 Q404 166 408 182 V230Z"
        fill={`url(#${id}-body)`}
        stroke="#cbd5e1"
      />
      <path d="M318 104 L360 152 H318Z" fill="#1f2937" opacity="0.85" />
      <path d="M70 196 H408 V214 H70Z" fill="var(--p)" />
      <path d="M70 214 H408 V222 H70Z" fill="var(--d)" />
      <text
        x="96"
        y="140"
        fontSize="22"
        fontWeight="800"
        fill="var(--d)"
        fontFamily="var(--font-display), sans-serif"
      >
        {brand}
      </text>
      <text x="97" y="157" fontSize="9" fontWeight="600" fill="#475569" letterSpacing="1.5">
        {baseline.toUpperCase()}
      </text>
      <text x="97" y="184" fontSize="14" fontWeight="700" fill="var(--d)">
        {phone}
      </text>
      <line x1="300" y1="100" x2="300" y2="228" stroke="#cbd5e1" />
      <rect x="378" y="176" width="22" height="7" rx="2" fill="#fde68a" />
      {[130, 340].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="232" r="24" fill="#1f2328" />
          <circle cx={cx} cy="232" r="11" fill="#9ca3af" />
          <circle cx={cx} cy="232" r="4" fill="#4b5563" />
        </g>
      ))}
      <ellipse cx="240" cy="258" rx="190" ry="6" fill="#000" opacity="0.15" />
      <Light id={id} x="30%" y="0%" />
    </Frame>
  );
}

/** Mosaïque de carrelage en gros plan (motif droit, chevron ou cabochon). */
export function TileCloseUp({
  className,
  color = "#d9d4cb",
  joint = "#f7f5f1",
  motif = "droit",
}: {
  className?: string;
  color?: string;
  joint?: string;
  motif?: "droit" | "diagonale" | "chevron" | "hexagone";
}) {
  const id = useUid();
  return (
    <Frame className={className}>
      <defs>
        {(motif === "droit" || motif === "diagonale") && (
          <pattern
            id={`${id}-p`}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform={motif === "diagonale" ? "rotate(45)" : undefined}
          >
            <rect width="60" height="60" fill={color} />
            <path d="M0 1H60M1 0V60" stroke={joint} strokeWidth="2" />
          </pattern>
        )}
        {motif === "chevron" && (
          <pattern id={`${id}-p`} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={color} />
            <path
              d="M0 20 L20 0 L40 20 M0 40 L20 20 L40 40 M20 0 V0"
              stroke={joint}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M10 10 L20 20 M30 10 L20 20 M10 30 L20 40 M30 30 L20 40"
              stroke={joint}
              strokeWidth="1.5"
            />
          </pattern>
        )}
        {motif === "hexagone" && (
          <pattern id={`${id}-p`} width="36" height="62" patternUnits="userSpaceOnUse">
            <rect width="36" height="62" fill={joint} />
            <polygon points="18,1 35,11 35,30 18,40 1,30 1,11" fill={color} />
            <polygon points="0,32 17,42 17,61 0,71" fill={color} />
            <polygon points="36,32 19,42 19,61 36,71" fill={color} />
          </pattern>
        )}
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#000" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-p)`} />
      <rect width={W} height={H} fill={`url(#${id}-g)`} />
    </Frame>
  );
}
