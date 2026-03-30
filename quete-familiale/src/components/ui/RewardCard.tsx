"use client";

import type { RecompenseAvecEtat } from "@/store/types";

interface RewardCardProps {
  recompense: RecompenseAvecEtat;
  onClick?: () => void;
}

export default function RewardCard({ recompense, onClick }: RewardCardProps) {
  return (
    <button
      onClick={recompense.accessible ? onClick : undefined}
      disabled={!recompense.accessible}
      className={`w-full rounded-2xl p-4 text-left transition-all shadow-sm border relative ${
        recompense.accessible
          ? "bg-white border-success/30 hover:shadow-md active:scale-95"
          : "bg-gray-50 border-gray-100 cursor-default opacity-60"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{recompense.icone}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate ${recompense.accessible ? "text-app-text" : "text-gray-400"}`}>
            {recompense.titre}
          </p>
          <p className={`text-xs font-bold mt-0.5 ${recompense.accessible ? "text-gold" : "text-gray-300"}`}>
            {recompense.cout} Crédits
          </p>
        </div>
        <div className="shrink-0 text-lg">
          {recompense.accessible ? (
            <span className="text-success">✓</span>
          ) : (
            <span className="text-gray-300">🔒</span>
          )}
        </div>
      </div>
    </button>
  );
}
