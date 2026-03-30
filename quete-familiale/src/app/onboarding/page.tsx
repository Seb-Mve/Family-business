"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import MobileFrame from "@/components/ui/MobileFrame";

export default function OnboardingPage() {
  const router = useRouter();
  const creerFamille = useStore((s) => s.creerFamille);
  const [step, setStep] = useState<"splash" | "famille">("splash");
  const [nomFamille, setNomFamille] = useState("");

  const handleSuivant = () => {
    if (step === "splash") {
      setStep("famille");
    } else if (nomFamille.trim()) {
      creerFamille(nomFamille.trim());
      router.push("/onboarding/enfant");
    }
  };

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {step === "splash" ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="text-8xl animate-bounce">⚔️</div>
            <div>
              <h1 className="text-3xl font-extrabold text-app-text leading-tight">
                La Quête
                <br />
                <span className="text-primary">Familiale</span>
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Accomplis des quêtes, gagne des récompenses !
              </p>
            </div>
            <button
              onClick={handleSuivant}
              className="w-full max-w-xs py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
            >
              Commencer l&apos;aventure ✨
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-xs">
            <div className="text-center">
              <div className="text-5xl mb-3">🏰</div>
              <h2 className="text-2xl font-extrabold text-app-text">Votre famille</h2>
              <p className="text-sm text-gray-500 mt-1">Comment s&apos;appelle votre famille ?</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-app-text">Nom de famille</label>
              <input
                type="text"
                value={nomFamille}
                onChange={(e) => setNomFamille(e.target.value)}
                placeholder="ex. Famille Mauve"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary outline-none text-app-text font-semibold bg-white text-base"
                onKeyDown={(e) => e.key === "Enter" && handleSuivant()}
              />
            </div>

            <button
              onClick={handleSuivant}
              disabled={!nomFamille.trim()}
              className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}
