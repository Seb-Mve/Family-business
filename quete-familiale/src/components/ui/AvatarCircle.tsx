"use client";

import type { AvatarId } from "@/store/types";
import Image from "next/image";

interface AvatarCircleProps {
  avatarId: AvatarId;
  niveau: number;
  size?: "sm" | "md" | "lg";
  prenom?: string;
}

const AVATAR_EMOJIS: Record<AvatarId, string> = {
  1: "🛡️",
  2: "🧙",
  3: "🥷",
  4: "🏹",
  5: "🧚",
  6: "🔮",
  7: "🧝",
  8: "🏴‍☠️",
};

const AVATAR_LABELS: Record<AvatarId, string> = {
  1: "Chevalier",
  2: "Mage",
  3: "Ninja",
  4: "Archer",
  5: "Fée",
  6: "Enchanteresse",
  7: "Elfe Guerrière",
  8: "Exploratrice",
};

export default function AvatarCircle({ avatarId, niveau, size = "md", prenom }: AvatarCircleProps) {
  const sizeMap = {
    sm: { container: "w-14 h-14", emoji: "text-3xl", badge: "text-xs px-1.5" },
    md: { container: "w-20 h-20", emoji: "text-4xl", badge: "text-xs px-1.5" },
    lg: { container: "w-28 h-28", emoji: "text-6xl", badge: "text-sm px-2" },
  };
  const s = sizeMap[size];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`relative ${s.container}`}>
        <div
          className={`${s.container} rounded-full bg-white border-2 border-primary/30 shadow-md flex items-center justify-center`}
        >
          <span className={s.emoji}>{AVATAR_EMOJIS[avatarId]}</span>
        </div>
        <div
          className={`absolute -bottom-1 -right-1 bg-prestige text-white rounded-full font-bold ${s.badge}`}
        >
          {niveau}
        </div>
      </div>
      {prenom && (
        <p className="text-sm font-bold text-app-text text-center">{prenom}</p>
      )}
    </div>
  );
}
