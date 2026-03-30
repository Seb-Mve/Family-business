"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import MobileFrame from "@/components/ui/MobileFrame";
import AvatarCircle from "@/components/ui/AvatarCircle";
import XPBar from "@/components/ui/XPBar";
import CreditJar from "@/components/ui/CreditJar";
import TaskCard from "@/components/ui/TaskCard";
import { getTitreNiveau, isTacheCompleteAujourdhui } from "@/store/selectors";
import { TACHES } from "@/data/taches";

export default function DashboardEnfantPage() {
  const router = useRouter();
  const famille = useStore((s) => s.famille);
  const activeEnfantId = useStore((s) => s.activeEnfantId);
  const completions = useStore((s) => s.completions);
  const setActiveTache = useStore((s) => s.setActiveTache);

  const enfant = famille?.enfants.find((e) => e.id === activeEnfantId);

  useEffect(() => {
    if (!activeEnfantId || !enfant) router.replace("/famille");
  }, [activeEnfantId, enfant, router]);

  if (!enfant) return null;

  const titre = getTitreNiveau(enfant);

  const handleTacheClick = (tacheId: string) => {
    setActiveTache(tacheId);
    router.push("/enfant/validation");
  };

  return (
    <MobileFrame>
      {/* Header hero */}
      <div
        className="px-5 pt-10 pb-6"
        style={{ background: "linear-gradient(135deg, #4A90E2, #9B59B6)" }}
      >
        <div className="flex items-center gap-4">
          <AvatarCircle avatarId={enfant.avatarId} niveau={enfant.niveau} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="text-white font-extrabold text-xl">{enfant.prenom}</p>
            <p className="text-white/80 text-sm font-medium">{titre}</p>
            <p className="text-white/60 text-xs mt-0.5">Niveau {enfant.niveau}</p>
          </div>
        </div>
        <div className="mt-4">
          <XPBar xp={enfant.xp} xpMax={enfant.xpPourProchainNiveau} niveau={enfant.niveau} />
        </div>
      </div>

      {/* Crédits */}
      <div className="mx-5 -mt-4 bg-white rounded-2xl p-4 shadow-md flex items-center justify-between border border-gold/20">
        <div>
          <p className="text-xs text-gray-400 font-semibold">Crédits disponibles</p>
          <p className="text-2xl font-extrabold text-gold">{enfant.credits} C</p>
        </div>
        <CreditJar credits={enfant.credits} size="md" />
      </div>

      {/* Quêtes du jour */}
      <div className="flex-1 px-5 pt-5 pb-4">
        <h2 className="text-lg font-extrabold text-app-text mb-3">⚔️ Quêtes du jour</h2>
        <div className="flex flex-col gap-2">
          {TACHES.map((tache) => {
            const complete = isTacheCompleteAujourdhui({ completions }, enfant.id, tache.id);
            const streak = enfant.streaks[tache.id] ?? 0;
            return (
              <TaskCard
                key={tache.id}
                tache={tache}
                complete={complete}
                streak={streak}
                onClick={() => handleTacheClick(tache.id)}
              />
            );
          })}
        </div>
      </div>
    </MobileFrame>
  );
}
