"use client";

import type { TropheeAvecProgression } from "@/store/types";

interface TrophyBadgeProps {
  trophee: TropheeAvecProgression;
}

export default function TrophyBadge({ trophee }: TrophyBadgeProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border text-center ${
        trophee.debloque
          ? "bg-prestige/10 border-prestige/30"
          : "bg-gray-50 border-gray-100 opacity-50"
      }`}
    >
      <span className={`text-3xl ${!trophee.debloque && "grayscale"}`}>
        {trophee.debloque ? trophee.icone : "🔮"}
      </span>
      <p className={`text-xs font-bold leading-tight ${trophee.debloque ? "text-prestige" : "text-gray-400"}`}>
        {trophee.debloque ? trophee.titre : "???"}
      </p>
      {!trophee.debloque && (
        <p className="text-xs text-gray-400">
          {trophee.progressionActuelle}/{trophee.progressionMax}
        </p>
      )}
    </div>
  );
}
