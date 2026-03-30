"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import MobileFrame from "@/components/ui/MobileFrame";
import RewardCard from "@/components/ui/RewardCard";
import { getRecompensesAvecEtat } from "@/store/selectors";
import type { RecompenseAvecEtat } from "@/store/types";

export default function CataloguePage() {
  const router = useRouter();
  const famille = useStore((s) => s.famille);
  const activeEnfantId = useStore((s) => s.activeEnfantId);
  const rachatRecompense = useStore((s) => s.rachatRecompense);

  const [onglet, setOnglet] = useState<"privilege" | "butin">("privilege");
  const [confirm, setConfirm] = useState<RecompenseAvecEtat | null>(null);

  const enfant = famille?.enfants.find((e) => e.id === activeEnfantId);

  useEffect(() => {
    if (!enfant) router.replace("/famille");
  }, [enfant, router]);

  if (!enfant) return null;

  const recompenses = getRecompensesAvecEtat(enfant).filter((r) => r.categorie === onglet);

  const handleEchange = (r: RecompenseAvecEtat) => {
    if (!r.accessible) return;
    setConfirm(r);
  };

  const handleConfirm = () => {
    if (!confirm || !activeEnfantId) return;
    try {
      rachatRecompense(activeEnfantId, confirm.id);
    } catch {}
    setConfirm(null);
  };

  return (
    <>
      <MobileFrame>
        <div className="bg-prestige px-5 pt-10 pb-5">
          <h1 className="text-white font-extrabold text-xl">🎁 Catalogue</h1>
          <p className="text-white/70 text-sm mt-1">{enfant.credits} Crédits disponibles</p>
        </div>

        <div className="flex mx-5 mt-4 gap-2">
          {(["privilege", "butin"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setOnglet(tab)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                onglet === tab
                  ? "bg-prestige text-white shadow"
                  : "bg-white text-gray-400 border border-gray-100"
              }`}
            >
              {tab === "privilege" ? "🌟 Privilèges" : "🎒 Butins"}
            </button>
          ))}
        </div>

        <div className="flex-1 px-5 py-4 flex flex-col gap-2">
          {recompenses.map((r) => (
            <RewardCard key={r.id} recompense={r} onClick={() => handleEchange(r)} />
          ))}
        </div>
      </MobileFrame>

      {confirm && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 pb-8 px-5">
          <div className="bg-white rounded-3xl p-6 w-full max-w-mobile shadow-2xl">
            <div className="text-center mb-4">
              <span className="text-5xl">{confirm.icone}</span>
              <h3 className="text-xl font-extrabold text-app-text mt-2">{confirm.titre}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Échanger pour <span className="font-bold text-gold">{confirm.cout} Crédits</span> ?
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Solde restant : {enfant.credits - confirm.cout} C
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl bg-success text-white font-bold hover:bg-success/90 active:scale-95 transition-all"
              >
                Échanger !
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
