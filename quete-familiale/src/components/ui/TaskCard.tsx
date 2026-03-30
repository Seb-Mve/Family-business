"use client";

import type { Tache } from "@/store/types";

interface TaskCardProps {
  tache: Tache;
  complete: boolean;
  streak: number;
  onClick?: () => void;
}

export default function TaskCard({ tache, complete, streak, onClick }: TaskCardProps) {
  return (
    <button
      onClick={complete ? undefined : onClick}
      disabled={complete}
      className={`relative w-full rounded-2xl p-3 text-left transition-all shadow-sm border ${
        complete
          ? "bg-gray-50 border-gray-100 cursor-default opacity-75"
          : "bg-white border-gray-100 hover:shadow-md active:scale-95"
      }`}
    >
      {/* Complete overlay */}
      {complete && (
        <div className="absolute inset-0 rounded-2xl bg-success/10 flex items-center justify-end pr-3">
          <span className="text-success text-xl font-bold">✓</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span className="text-2xl">{tache.icone}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate ${complete ? "text-gray-400" : "text-app-text"}`}>
            {tache.titre}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-primary font-medium">+{tache.xpValeur} XP</span>
            {tache.creditsValeur > 0 && (
              <span className="text-xs text-gold font-medium">+{tache.creditsValeur} C</span>
            )}
          </div>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-0.5 shrink-0">
            <span className="text-energy text-sm">🔥</span>
            <span className="text-xs font-bold text-energy">{streak}</span>
          </div>
        )}
      </div>
    </button>
  );
}
