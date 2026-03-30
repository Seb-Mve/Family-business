"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import MobileFrame from "@/components/ui/MobileFrame";
import AvatarCircle from "@/components/ui/AvatarCircle";
import XPBar from "@/components/ui/XPBar";
import TrophyBadge from "@/components/ui/TrophyBadge";
import { getTitreNiveau, getTropheesAvecProgression } from "@/store/selectors";
import { TITRES_NIVEAU } from "@/data/progression";

export default function ProfilPage() {
  const router = useRouter();
  const famille = useStore((s) => s.famille);
  const activeEnfantId = useStore((s) => s.activeEnfantId);
  const completions = useStore((s) => s.completions);
  const rachats = useStore((s) => s.rachats);

  const enfant = famille?.enfants.find((e) => e.id === activeEnfantId);

  useEffect(() => {
    if (!enfant) router.replace("/famille");
  }, [enfant, router]);

  if (!enfant) return null;

  const titre = getTitreNiveau(enfant);
  const trophees = getTropheesAvecProgression({ completions, rachats }, enfant);
  const niveaux = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <MobileFrame>
      <div
        className="px-5 pt-10 pb-6"
        style={{ background: "linear-gradient(135deg, #9B59B6, #4A90E2)" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <AvatarCircle avatarId={enfant.avatarId} niveau={enfant.niveau} size="md" />
          <div>
            <p className="text-white font-extrabold text-xl">{enfant.prenom}</p>
            <p className="text-white/80 text-sm">{titre}</p>
          </div>
        </div>
        <XPBar xp={enfant.xp} xpMax={enfant.xpPourProchainNiveau} niveau={enfant.niveau} />
      </div>

      <div className="flex-1 px-5 py-5 flex flex-col gap-6">
        {/* Timeline niveaux */}
        <div>
          <h2 className="text-base font-extrabold text-app-text mb-3">⚔️ Progression</h2>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2" style={{ width: "max-content" }}>
              {niveaux.map((n) => {
                const isComplete = enfant.niveau > n;
                const isCurrent = enfant.niveau === n;
                const isLocked = enfant.niveau < n;
                const titreN = TITRES_NIVEAU[enfant.genre][n] ?? "???";

                return (
                  <div
                    key={n}
                    className={`flex flex-col items-center gap-1 w-16 p-2 rounded-2xl border-2 shrink-0 ${
                      isComplete
                        ? "bg-success/10 border-success/30"
                        : isCurrent
                        ? "bg-prestige/10 border-prestige"
                        : "bg-gray-50 border-gray-100 opacity-50"
                    }`}
                  >
                    <span className="text-xl">
                      {isComplete ? "✅" : isCurrent ? "⚡" : "🔒"}
                    </span>
                    <span
                      className={`text-lg font-extrabold ${
                        isComplete ? "text-success" : isCurrent ? "text-prestige" : "text-gray-300"
                      }`}
                    >
                      {n}
                    </span>
                    <span
                      className="text-center leading-tight"
                      style={{ fontSize: "9px", color: isLocked ? "#d1d5db" : "#6b7280" }}
                    >
                      {isLocked ? "???" : titreN}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trophées */}
        <div>
          <h2 className="text-base font-extrabold text-app-text mb-3">🏆 Trophées</h2>
          <div className="grid grid-cols-3 gap-2">
            {trophees.map((t) => (
              <TrophyBadge key={t.id} trophee={t} />
            ))}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
}
