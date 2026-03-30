"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import MobileFrame from "@/components/ui/MobileFrame";
import type { Genre, AvatarId } from "@/store/types";

const AVATARS_GARCON: { id: AvatarId; label: string; emoji: string }[] = [
  { id: 1, label: "Chevalier", emoji: "🛡️" },
  { id: 2, label: "Mage", emoji: "🧙" },
  { id: 3, label: "Ninja", emoji: "🥷" },
  { id: 4, label: "Archer", emoji: "🏹" },
];

const AVATARS_FILLE: { id: AvatarId; label: string; emoji: string }[] = [
  { id: 5, label: "Fée", emoji: "🧚" },
  { id: 6, label: "Enchanteresse", emoji: "🔮" },
  { id: 7, label: "Elfe Guerrière", emoji: "🧝" },
  { id: 8, label: "Exploratrice", emoji: "🏴‍☠️" },
];

export default function CreerEnfantPage() {
  const router = useRouter();
  const creerEnfant = useStore((s) => s.creerEnfant);
  const famille = useStore((s) => s.famille);

  const [genre, setGenre] = useState<Genre | null>(null);
  const [avatarId, setAvatarId] = useState<AvatarId | null>(null);
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState(7);

  const avatars = genre === "garcon" ? AVATARS_GARCON : genre === "fille" ? AVATARS_FILLE : [];

  const handleGenreChange = (g: Genre) => {
    setGenre(g);
    setAvatarId(null);
  };

  const handleCreateHero = () => {
    if (!genre || !avatarId || !prenom.trim()) return;
    creerEnfant({ prenom: prenom.trim(), genre, age, avatarId });
    router.push("/famille");
  };

  const canCreate = genre && avatarId && prenom.trim().length > 0;

  return (
    <MobileFrame>
      <div className="flex-1 flex flex-col px-5 py-6 pb-10 gap-5 overflow-y-auto">
        <div className="text-center">
          <div className="text-4xl mb-2">🦸</div>
          <h2 className="text-2xl font-extrabold text-app-text">Créer un Héros</h2>
          {famille && (
            <p className="text-sm text-gray-400 mt-1">{famille.nom}</p>
          )}
        </div>

        {/* Genre */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-app-text">Genre</label>
          <div className="flex gap-3">
            <button
              onClick={() => handleGenreChange("garcon")}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                genre === "garcon"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              ⚔️ Garçon
            </button>
            <button
              onClick={() => handleGenreChange("fille")}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                genre === "fille"
                  ? "bg-prestige text-white border-prestige"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              ✨ Fille
            </button>
          </div>
        </div>

        {/* Avatars */}
        {genre && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-app-text">Avatar</label>
            <div className="grid grid-cols-4 gap-2">
              {avatars.map((av) => (
                <button
                  key={av.id}
                  onClick={() => setAvatarId(av.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${
                    avatarId === av.id
                      ? "border-primary bg-primary/10"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <span className="text-3xl">{av.emoji}</span>
                  <span className="text-xs font-semibold text-gray-600 leading-tight text-center">
                    {av.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Prénom */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-app-text">Prénom du héros</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="ex. Hugo"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary outline-none text-app-text font-semibold bg-white text-base"
          />
        </div>

        {/* Âge */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-app-text">Âge</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAge((a) => Math.max(4, a - 1))}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-xl font-bold text-app-text flex items-center justify-center hover:border-primary transition-all"
            >
              −
            </button>
            <span className="text-3xl font-extrabold text-app-text w-16 text-center">{age}</span>
            <button
              onClick={() => setAge((a) => Math.min(15, a + 1))}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 text-xl font-bold text-app-text flex items-center justify-center hover:border-primary transition-all"
            >
              +
            </button>
            <span className="text-sm text-gray-400">ans</span>
          </div>
        </div>

        {/* Bouton */}
        <button
          onClick={handleCreateHero}
          disabled={!canCreate}
          className="w-full py-4 rounded-2xl bg-success text-white font-bold text-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-success/90 active:scale-95 transition-all mt-2"
        >
          ⚔️ Créer le Héros !
        </button>
      </div>
    </MobileFrame>
  );
}
