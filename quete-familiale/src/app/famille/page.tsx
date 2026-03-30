"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import MobileFrame from "@/components/ui/MobileFrame";
import AvatarCircle from "@/components/ui/AvatarCircle";
import { getTitreNiveau } from "@/store/selectors";

export default function FamillePage() {
  const router = useRouter();
  const famille = useStore((s) => s.famille);
  const setActiveEnfant = useStore((s) => s.setActiveEnfant);

  useEffect(() => {
    if (!famille) router.replace("/onboarding");
  }, [famille, router]);

  if (!famille) return null;

  return (
    <MobileFrame>
      {/* Header */}
      <div className="bg-primary px-5 pt-10 pb-6">
        <h1 className="text-2xl font-extrabold text-white">{famille.nom}</h1>
        <p className="text-white/70 text-sm mt-1">Choisissez un héros</p>
      </div>

      {/* Enfants */}
      <div className="flex-1 px-5 py-6">
        <div className="grid grid-cols-2 gap-4">
          {famille.enfants.map((enfant) => (
            <button
              key={enfant.id}
              onClick={() => { setActiveEnfant(enfant.id); router.push("/enfant"); }}
              className="bg-white rounded-3xl p-5 flex flex-col items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md active:scale-95 transition-all"
            >
              <AvatarCircle avatarId={enfant.avatarId} niveau={enfant.niveau} size="md" />
              <div className="text-center">
                <p className="font-bold text-app-text text-sm">{enfant.prenom}</p>
                <p className="text-xs text-gray-400 mt-0.5">{getTitreNiveau(enfant)}</p>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="text-primary font-semibold">{enfant.xp} XP</span>
                <span className="text-gold font-semibold">{enfant.credits} C</span>
              </div>
            </button>
          ))}

          {/* Ajouter un héros */}
          <button
            onClick={() => router.push("/onboarding/enfant")}
            className="bg-white rounded-3xl p-5 flex flex-col items-center justify-center gap-2 shadow-sm border-2 border-dashed border-gray-200 hover:border-primary hover:shadow-md active:scale-95 transition-all min-h-[160px]"
          >
            <span className="text-4xl text-gray-300">+</span>
            <span className="text-sm font-semibold text-gray-400">Ajouter un Héros</span>
          </button>
        </div>
      </div>
    </MobileFrame>
  );
}
