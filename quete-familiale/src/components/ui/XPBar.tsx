"use client";

interface XPBarProps {
  xp: number;
  xpMax: number;
  niveau: number;
}

export default function XPBar({ xp, xpMax, niveau }: XPBarProps) {
  const pct = niveau >= 10 ? 100 : Math.min(100, Math.round((xp / xpMax) * 100));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-app-text">
          {niveau >= 10 ? "Niveau MAX !" : `${xp} / ${xpMax} XP`}
        </span>
        <span className="text-xs text-gray-400">{pct}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #4A90E2, #9B59B6)",
          }}
        />
      </div>
    </div>
  );
}
