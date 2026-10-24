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

export function BathroomScene({
  className,
  wall = "#dcdfe2",
  floor = "#5f656b",
  wood = "#a7764a",
  tile = [44, 70],
}: {
  className?: string;
  wall?: string;
  floor?: string;
  wood?: string;
  tile?: [number, number];
}) {
  const id = useUid();
  return (
    <Frame className={className} label="Salle de bain rénovée avec douche à l'italienne">
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id={`${id}-mir`} cx="50%" cy="50%" r="50%">
          <stop offset="0.8" stopColor="#fff7e0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff7e0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Room
        id={id}
        back={wall}
        left="#c9cdd1"
        right="#e6e8ea"
        floor={floor}
        backTiles={[tile[0], tile[1], "rgba(255,255,255,0.7)"]}
        floorLine="rgba(255,255,255,0.18)"
      />
      {/* Douche à l'italienne */}
      <rect x="138" y="64" width="4" height="151" fill="#1f2328" />
      <path d="M150 68 V82 H178" stroke="#1f2328" strokeWidth="2.5" fill="none" />
      <ellipse cx="178" cy="84" rx="14" ry="3" fill="#1f2328" />
      <g stroke="#c7d2dc" strokeWidth="0.8" opacity="0.7">
        {[160, 168, 176, 184, 192].map((x) => (
          <line key={x} x1={x} y1="90" x2={x - 3} y2="150" strokeDasharray="2 5" />
        ))}
      </g>
      <rect x="148" y="132" width="34" height="12" fill="#b7bcc1" />
      <rect x="152" y="126" width="5" height="7" rx="1" fill="#f5f5f4" />
      <rect x="160" y="124" width="5" height="9" rx="1" fill="#e9d8c4" />
      <rect x="168" y="127" width="5" height="6" rx="1" fill="#2f3439" />
      <rect x="205" y="60" width="3" height="157" fill="#1f2328" />
      <rect x="140" y="62" width="68" height="153" fill={`url(#${id}-glass)`} />
      <rect x="140" y="212" width="68" height="3" fill="#4b5157" />
      {/* Miroir rond éclairé + applique */}
      <circle cx="292" cy="108" r="34" fill={`url(#${id}-mir)`} />
      <circle cx="292" cy="108" r="27" fill="#eef2f5" stroke="#1f2328" strokeWidth="2" />
      <path d="M276 94 L300 120" stroke="#fff" strokeWidth="5" opacity="0.6" />
      {/* Meuble vasque */}
      <rect x="248" y="160" width="88" height="5" rx="1.5" fill="#f4f3f1" />
      <ellipse cx="292" cy="160" rx="18" ry="3.5" fill="#fff" stroke="#d4d4d4" strokeWidth="0.6" />
      <path d="M292 147 V143 H302" stroke="#1f2328" strokeWidth="2.2" fill="none" />
      <rect x="250" y="165" width="84" height="30" fill={wood} />
      <line x1="292" y1="165" x2="292" y2="195" stroke="#000" strokeOpacity="0.18" />
      <rect x="262" y="170" width="20" height="1.6" rx="0.8" fill="#000" opacity="0.25" />
      <rect x="302" y="170" width="20" height="1.6" rx="0.8" fill="#000" opacity="0.25" />
      <rect x="250" y="195" width="84" height="20" fill="#000" opacity="0.06" />
      {/* Serviette et radiateur sèche-serviettes */}
      <g transform="translate(355 0)">
        {[100, 112, 124, 136, 148].map((y) => (
          <line key={y} x1="20" y1={y + 6} x2="52" y2={y - 4} stroke="#2a2e33" strokeWidth="2" />
        ))}
        <path d="M24 96 L48 88 L48 128 L24 136Z" fill="#f2ebe2" />
      </g>
      <Plant x={430} y={262} s={1.15} />
      <Light id={id} />
    </Frame>
  );
}

/** Sous l'évier : siphon, flexibles et clé à molette, pour le dépannage. */
export function PipesScene({
  className,
  accent = "#0369a1",
}: {
  className?: string;
  accent?: string;
}) {
  const id = useUid();
  return (
    <Frame className={className} label="Réparation d'une fuite sous évier">
      <rect width={W} height={H} fill="#e9e4dc" />
      <rect y="0" width={W} height="44" fill="#d8d1c6" />
      <rect y="40" width={W} height="10" fill="#f4f1ec" />
      {/* Caisson ouvert */}
      <rect x="40" y="50" width="400" height="230" fill="#f7f5f2" />
      <rect x="56" y="62" width="368" height="206" fill="#dcd6cc" />
      <rect x="56" y="250" width="368" height="18" fill="#cfc7bb" />
      {/* Portes ouvertes */}
      <polygon points="40,50 0,40 0,300 40,280" fill="#fff" />
      <polygon points="440,50 480,40 480,300 440,280" fill="#fff" />
      {/* Bonde, siphon, évacuation */}
      <rect x="226" y="62" width="28" height="16" fill="#9ca3af" />
      <path
        d="M240 78 V150 Q240 176 266 176 H296 Q312 176 312 160 V146"
        stroke="#e5e7eb"
        strokeWidth="16"
        fill="none"
      />
      <path
        d="M240 78 V150 Q240 176 266 176 H296 Q312 176 312 160 V146"
        stroke="#000"
        strokeOpacity="0.08"
        strokeWidth="16"
        fill="none"
      />
      <path d="M312 146 V120 H424" stroke="#e5e7eb" strokeWidth="14" fill="none" />
      <rect x="232" y="118" width="16" height="10" rx="2" fill="#cbd5e1" />
      {/* Flexibles et vannes */}
      <path
        d="M150 62 C150 120 120 150 120 200 V230"
        stroke="#9ca3af"
        strokeWidth="6"
        fill="none"
        strokeDasharray="2 2"
      />
      <path
        d="M180 62 C180 120 170 160 170 200 V230"
        stroke="#9ca3af"
        strokeWidth="6"
        fill="none"
        strokeDasharray="2 2"
      />
      <rect x="110" y="226" width="20" height="10" rx="2" fill="#2563eb" />
      <rect x="160" y="226" width="20" height="10" rx="2" fill="#dc2626" />
      <path d="M100 236 H136 M154 236 H190" stroke="#c47a3d" strokeWidth="7" />
      {/* Clé à molette + bassine */}
      <ellipse cx="300" cy="248" rx="54" ry="12" fill={accent} />
      <ellipse cx="300" cy="244" rx="48" ry="8" fill="#7dd3fc" opacity="0.7" />
      <g transform="rotate(-18 120 270)">
        <rect x="70" y="264" width="100" height="10" rx="5" fill="#4b5563" />
        <path d="M168 258 h22 v8 h-10 v4 h10 v8 h-22z" fill="#6b7280" />
      </g>
      <Light id={id} x="50%" y="0%" />
    </Frame>
  );
}

export function KitchenScene({
  className,
  wood = "#b98a5a",
  wall = "#efe9e1",
}: {
  className?: string;
  wood?: string;
  wall?: string;
}) {
  const id = useUid();
  return (
    <Frame className={className} label="Cuisine sur mesure en bois massif">
      <defs>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={wood} />
          <stop offset="0.5" stopColor={wood} stopOpacity="0.88" />
          <stop offset="1" stopColor={wood} />
        </linearGradient>
      </defs>
      <Room
        id={id}
        back={wall}
        left="#e2dbd1"
        right="#f3eee7"
        floor="#c9a77e"
        floorKind="wood"
        floorLine="rgba(80,50,20,0.18)"
        window="left"
      />
      {/* Meubles hauts */}
      <rect x="150" y="70" width="120" height="44" fill={`url(#${id}-wood)`} />
      {[150, 190, 230].map((x) => (
        <g key={x}>
          <rect
            x={x + 2}
            y="72"
            width="36"
            height="40"
            fill="none"
            stroke="#000"
            strokeOpacity="0.15"
          />
          <rect x={x + 30} y="96" width="1.6" height="10" fill="#2b2b2b" opacity="0.6" />
        </g>
      ))}
      {/* Étagères ouvertes */}
      <rect x="285" y="84" width="55" height="3" fill={wood} />
      <rect x="285" y="108" width="55" height="3" fill={wood} />
      <rect x="290" y="72" width="8" height="12" rx="1.5" fill="#f5f5f4" />
      <rect x="301" y="75" width="10" height="9" rx="1.5" fill="#d8cfc3" />
      <circle cx="326" cy="100" r="7" fill="#f5f5f4" />
      <rect x="292" y="96" width="14" height="12" rx="2" fill="#8a9a7b" />
      {/* Crédence + plan de travail */}
      <rect x="140" y="135" width="210" height="27" fill="#e8e2d8" />
      <rect x="138" y="160" width="214" height="6" fill="#f2efea" />
      <rect x="140" y="166" width="210" height="49" fill={`url(#${id}-wood)`} />
      {[140, 182, 224, 266, 308].map((x) => (
        <g key={x}>
          <rect
            x={x + 2}
            y="168"
            width="38"
            height="44"
            fill="none"
            stroke="#000"
            strokeOpacity="0.15"
          />
          <rect x={x + 8} y="172" width="26" height="1.6" fill="#2b2b2b" opacity="0.5" />
        </g>
      ))}
      <rect x="196" y="157" width="34" height="4" rx="1" fill="#9ca3af" />
      <path d="M213 157 V146 Q213 141 218 141 H222" stroke="#2b2b2b" strokeWidth="2" fill="none" />
      <rect x="270" y="158" width="40" height="2" fill="#1f1f1f" />
      {/* Îlot au premier plan */}
      <polygon points="96,226 384,226 362,212 118,212" fill="#f6f3ee" />
      <rect x="96" y="226" width="288" height="8" fill="#e7e2da" />
      <rect x="100" y="234" width="280" height="66" fill={`url(#${id}-wood)`} />
      {[100, 170, 240, 310].map((x) => (
        <rect
          key={x}
          x={x + 3}
          y="238"
          width="64"
          height="62"
          fill="none"
          stroke="#000"
          strokeOpacity="0.14"
        />
      ))}
      <ellipse cx="160" cy="216" rx="18" ry="4" fill="#cfc6b9" />
      <circle cx="152" cy="212" r="4" fill="#e3a74b" />
      <circle cx="161" cy="210" r="4" fill="#d98b3a" />
      <circle cx="169" cy="213" r="4" fill="#9bb36b" />
      {/* Suspensions */}
      {[180, 240, 300].map((x) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2="168" stroke="#1f1f1f" strokeWidth="0.8" />
          <path d={`M${x - 13} 186 Q${x} 160 ${x + 13} 186Z`} fill="#1f1f1f" />
          <ellipse cx={x} cy="188" rx="22" ry="6" fill="#fff4cf" opacity="0.5" />
        </g>
      ))}
      <Light id={id} x="20%" y="20%" from="#fff6e5" />
    </Frame>
  );
}

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

export function PanelScene({ className }: { className?: string }) {
  const id = useUid();
  const rows = [70, 128, 186];
  return (
    <Frame className={className} label="Tableau électrique neuf">
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9e7e2" />
          <stop offset="1" stopColor="#d6d3cc" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-wall)`} />
      {/* Gaines */}
      {[150, 172, 194, 216, 238].map((x, i) => (
        <path
          key={x}
          d={`M${x} 300 C${x} 280 ${x + 6} 270 ${x + 10} 258`}
          stroke={["#9ca3af", "#6b7280", "#9ca3af", "#4b5563", "#9ca3af"][i]}
          strokeWidth="7"
          fill="none"
        />
      ))}
      <rect x="100" y="34" width="280" height="226" rx="10" fill="#f8f8f6" />
      <rect
        x="100"
        y="34"
        width="280"
        height="226"
        rx="10"
        fill="none"
        stroke="#c9c7c1"
        strokeWidth="2"
      />
      <rect x="112" y="46" width="256" height="202" rx="5" fill="#eceae5" />
      {rows.map((y, r) => (
        <g key={y}>
          <rect x="118" y={y - 4} width="244" height="4" fill="#9ca3af" />
          {Array.from({ length: 13 }).map((_, i) => {
            const x = 120 + i * 18.6;
            const diff = (r === 0 && i < 2) || (r === 1 && i === 0) || (r === 2 && i === 0);
            const w = diff ? 18.6 * 2 - 2 : 16.6;
            if ((r === 0 && i === 1) || (r === 1 && i === 1) || (r === 2 && i === 1)) return null;
            return (
              <g key={i}>
                <rect x={x} y={y} width={w} height="44" rx="2" fill="#fff" stroke="#d4d2cc" />
                <rect
                  x={x + w / 2 - 3}
                  y={y + 12}
                  width="6"
                  height="12"
                  rx="1.5"
                  fill={diff ? "#1f2937" : "#374151"}
                />
                {diff && <rect x={x + 4} y={y + 30} width="6" height="5" rx="1" fill="#facc15" />}
                <rect x={x + 2} y={y + 37} width={w - 4} height="4" fill="#e5e7eb" />
              </g>
            );
          })}
        </g>
      ))}
      {/* Porte transparente entrouverte */}
      <polygon points="380,34 440,20 440,274 380,260" fill="#fff" opacity="0.35" />
      <polygon
        points="380,34 440,20 440,274 380,260"
        fill="none"
        stroke="#c9c7c1"
        strokeWidth="2"
      />
      <Light id={id} x="70%" y="0%" />
    </Frame>
  );
}

/** Garage avec borne de recharge murale et voiture branchée. */
export function ChargerScene({
  className,
  accent = "#facc15",
}: {
  className?: string;
  accent?: string;
}) {
  const id = useUid();
  return (
    <Frame className={className} label="Borne de recharge installée dans un garage">
      <rect width={W} height={H} fill="#d9dadc" />
      <rect y="220" width={W} height="80" fill="#9a9ea3" />
      <rect y="218" width={W} height="4" fill="#b8bcc0" />
      {/* Borne */}
      <rect x="64" y="96" width="54" height="80" rx="10" fill="#1f2937" />
      <rect x="72" y="106" width="38" height="20" rx="3" fill="#0f172a" />
      <rect x="76" y="110" width="20" height="4" rx="2" fill={accent} />
      <circle cx="91" cy="146" r="10" fill="none" stroke={accent} strokeWidth="3" />
      <path d="M118 150 C170 160 160 220 240 214" stroke="#111827" strokeWidth="5" fill="none" />
      {/* Voiture (avant) */}
      <path
        d="M200 228 Q196 186 232 176 L268 140 Q280 128 300 128 H420 Q450 128 470 160 L480 176 V228Z"
        fill="#f4f4f5"
      />
      <path d="M272 146 Q282 136 300 136 H390 L400 176 H252Z" fill="#334155" />
      <rect x="196" y="194" width="40" height="10" rx="4" fill={accent} opacity="0.85" />
      <circle cx="290" cy="232" r="26" fill="#111827" />
      <circle cx="290" cy="232" r="12" fill="#9ca3af" />
      <rect x="236" y="208" width="10" height="10" rx="2" fill="#1f2937" />
      {/* Tableau dédié */}
      <rect x="150" y="70" width="44" height="56" rx="4" fill="#f9fafb" stroke="#d1d5db" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={156 + i * 12}
          y="84"
          width="10"
          height="26"
          rx="1.5"
          fill="#e5e7eb"
          stroke="#cbd5e1"
        />
      ))}
      <Light id={id} x="20%" y="0%" />
    </Frame>
  );
}

export function BoilerScene({
  className,
  accent = "#dc2626",
}: {
  className?: string;
  accent?: string;
}) {
  const id = useUid();
  return (
    <Frame className={className} label="Chaudière murale entretenue">
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3f4f6" />
          <stop offset="0.6" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e5e7eb" />
        </linearGradient>
        <pattern id={`${id}-t`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 .5H40M.5 0V40" stroke="#fff" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="#d8dcdf" />
      <rect width={W} height={H} fill={`url(#${id}-t)`} />
      <rect y="250" width={W} height="50" fill="#8a8f94" />
      {/* Tuyaux cuivre */}
      {[198, 222, 246, 270].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x} 214 V${250 - i * 4} H${i < 2 ? 40 : 440}`}
            stroke="#c47a3d"
            strokeWidth="6"
            fill="none"
          />
          <rect
            x={x - 6}
            y="228"
            width="12"
            height="8"
            rx="2"
            fill={i === 1 ? "#2563eb" : accent}
          />
        </g>
      ))}
      {/* Vase d'expansion */}
      <rect x="320" y="150" width="44" height="70" rx="20" fill={accent} />
      <rect x="338" y="216" width="8" height="10" fill="#9ca3af" />
      {/* Chaudière */}
      <rect x="168" y="44" width="134" height="172" rx="10" fill={`url(#${id}-b)`} />
      <rect
        x="168"
        y="44"
        width="134"
        height="172"
        rx="10"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />
      <rect x="190" y="150" width="90" height="40" rx="6" fill="#111827" />
      <rect x="198" y="158" width="44" height="22" rx="3" fill="#0f766e" opacity="0.85" />
      <text
        x="220"
        y="174"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="#ecfeff"
        fontFamily="ui-monospace, monospace"
      >
        58°
      </text>
      <circle cx="260" cy="164" r="5" fill="#374151" />
      <circle cx="260" cy="178" r="3" fill="#22c55e" />
      <rect x="226" y="20" width="18" height="26" fill="#d1d5db" />
      {/* Thermostat */}
      <rect x="62" y="110" width="44" height="58" rx="8" fill="#fff" stroke="#d1d5db" />
      <circle
        cx="84"
        cy="134"
        r="14"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeDasharray="60 30"
      />
      <text x="84" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#111827">
        20,5
      </text>
      <Light id={id} x="40%" y="0%" />
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

export function TimberFrameScene({
  className,
  wood = "#c8935a",
}: {
  className?: string;
  wood?: string;
}) {
  const id = useUid();
  return (
    <Frame className={className} label="Charpente traditionnelle en cours de pose">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fb9de" />
          <stop offset="1" stopColor="#f3e3c7" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <g fill="#6f8f6b" opacity="0.8">
        <circle cx="20" cy="230" r="40" />
        <circle cx="460" cy="226" r="44" />
      </g>
      {/* Grue */}
      <g stroke="#e5a00d" strokeWidth="3" fill="none">
        <line x1="420" y1="250" x2="420" y2="22" />
        <line x1="300" y1="26" x2="470" y2="26" />
        <line x1="420" y1="22" x2="470" y2="26" strokeWidth="1.2" />
        <line x1="330" y1="26" x2="330" y2="70" stroke="#52525b" strokeWidth="1" />
      </g>
      {/* Murs ossature bois avec panneaux */}
      <rect x="90" y="160" width="300" height="90" fill="#e8d3ad" />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={92 + i * 19.5} y="160" width="5" height="90" fill={wood} />
      ))}
      <rect x="90" y="156" width="300" height="6" fill={wood} />
      <rect x="90" y="246" width="300" height="6" fill={wood} />
      <rect x="92" y="164" width="96" height="82" fill="#d4b483" opacity="0.95" />
      <rect x="92" y="164" width="96" height="82" fill="none" stroke="#b8925f" />
      <rect x="290" y="190" width="40" height="56" fill="#1f2937" opacity="0.15" />
      {/* Fermes de toit */}
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const off = k * 7;
        return (
          <g
            key={k}
            stroke={wood}
            strokeWidth={k === 0 ? 7 : 5}
            fill="none"
            opacity={1 - k * 0.12}
            transform={`translate(${off} ${-off * 0.6})`}
          >
            <path d="M80 158 L240 62 L400 158" />
            <line x1="80" y1="158" x2="400" y2="158" />
            <line x1="240" y1="62" x2="240" y2="158" />
            <line x1="160" y1="110" x2="240" y2="158" strokeWidth="3.5" />
            <line x1="320" y1="110" x2="240" y2="158" strokeWidth="3.5" />
          </g>
        );
      })}
      <rect y="250" width={W} height="50" fill="#a08a6a" />
      <rect y="250" width={W} height="5" fill="#8b765a" />
      {/* Pile de bois */}
      {[0, 1, 2].map((r) => (
        <rect
          key={r}
          x={30}
          y={268 - r * 8}
          width="90"
          height="7"
          fill={wood}
          stroke="#8a6238"
          strokeWidth="0.8"
        />
      ))}
      <Light id={id} x="80%" y="10%" from="#fff1d6" />
    </Frame>
  );
}

export function StairScene({ className, wood = "#a86b3c" }: { className?: string; wood?: string }) {
  const id = useUid();
  const steps = Array.from({ length: 11 });
  return (
    <Frame className={className} label="Escalier en chêne sur mesure">
      <rect width={W} height={H} fill="#eee8df" />
      <rect y="250" width={W} height="50" fill="#c9a77e" />
      <rect x="0" y="0" width="70" height="250" fill="#e3dbcf" />
      {steps.map((_, i) => {
        const x = 120 + i * 24;
        const y = 250 - (i + 1) * 20;
        return (
          <g key={i}>
            <rect x={x} y={y} width="28" height="6" fill={wood} />
            <rect x={x} y={y + 6} width="26" height="14" fill="#f6f2ec" />
          </g>
        );
      })}
      <polygon points="120,250 384,30 384,40 132,250" fill={wood} opacity="0.85" />
      {/* Garde-corps en verre */}
      <polygon points="128,214 392,-6 392,40 128,250" fill="#dbeafe" opacity="0.35" />
      <line x1="128" y1="214" x2="392" y2="-6" stroke="#1f2937" strokeWidth="3" />
      <Plant x={60} y={250} s={1} />
      <rect x="390" y="70" width="70" height="100" fill="#fff" stroke="#d6cfc4" strokeWidth="2" />
      <rect x="398" y="78" width="54" height="84" fill="#cfd8c6" />
      <Light id={id} x="80%" y="10%" />
    </Frame>
  );
}

export function WorkshopScene({
  className,
  wood = "#c08a55",
}: {
  className?: string;
  wood?: string;
}) {
  const id = useUid();
  return (
    <Frame className={className} label="Atelier de menuiserie">
      <rect width={W} height={H} fill="#d9d1c4" />
      <rect y="220" width={W} height="80" fill="#9b938a" />
      {/* Panneau à outils */}
      <rect x="60" y="40" width="200" height="110" fill="#c9a77e" />
      {[80, 104, 128, 152, 176, 200, 224].map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y={56 + (i % 2) * 8}
            width="6"
            height={52 - (i % 3) * 8}
            rx="2"
            fill={["#2f3439", "#b45309", "#6b7280"][i % 3]}
          />
          <rect x={x - 3} y={52 + (i % 2) * 8} width="12" height="6" rx="1" fill="#52525b" />
        </g>
      ))}
      <path d="M90 120 h60 v8 h-60z" fill="#3f3f46" />
      <path d="M170 116 l40 0 l-6 18 l-28 0z" fill="#b45309" />
      {/* Établi */}
      <rect x="40" y="180" width="300" height="14" fill={wood} />
      <rect x="54" y="194" width="12" height="60" fill="#8a6238" />
      <rect x="314" y="194" width="12" height="60" fill="#8a6238" />
      <rect x="54" y="232" width="272" height="8" fill="#8a6238" />
      <rect x="100" y="168" width="120" height="12" fill="#e2bd8b" />
      <path d="M232 170 l24 -6 l4 6 l-24 6z" fill="#6b7280" />
      {/* Planches */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={370 + i * 14}
          y={40 + i * 4}
          width="12"
          height={200 - i * 4}
          fill={i % 2 ? wood : "#d7a970"}
        />
      ))}
      <ellipse cx="160" cy="262" rx="40" ry="6" fill="#e9dfcf" opacity="0.8" />
      <Light id={id} x="30%" y="0%" from="#fff4dd" />
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

/** Toiture en gros plan : tuiles, faîtage, cheminée. */
export function RoofScene({ className, tile = "#9a4b33" }: { className?: string; tile?: string }) {
  const id = useUid();
  return (
    <Frame className={className} label="Toiture refaite à neuf">
      <defs>
        <pattern id={`${id}-t`} width="20" height="14" patternUnits="userSpaceOnUse">
          <rect width="20" height="14" fill={tile} />
          <path d="M0 13.5 H20" stroke="#000" strokeOpacity="0.28" />
          <path d="M10 0 V14" stroke="#000" strokeOpacity="0.12" />
          <path d="M0 0 Q10 6 20 0" fill="#fff" fillOpacity="0.08" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="#a9cdea" />
      <polygon points="-20,300 240,70 500,300" fill={`url(#${id}-t)`} />
      <polygon points="-20,300 240,70 500,300" fill="#000" opacity="0.06" />
      <polyline points="-20,300 240,70 500,300" fill="none" stroke="#6e3323" strokeWidth="8" />
      <rect x="310" y="96" width="34" height="80" fill="#b8a99a" />
      <rect x="306" y="90" width="42" height="8" fill="#8b7d70" />
      <Light id={id} x="80%" y="0%" />
    </Frame>
  );
}
