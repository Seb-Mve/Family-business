"use client";

import { motion } from "framer-motion";

interface LevelUpOverlayProps {
  nouveauNiveau: number;
  titreNiveau: string;
  onContinuer: () => void;
}

export default function LevelUpOverlay({ nouveauNiveau, titreNiveau, onContinuer }: LevelUpOverlayProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-prestige to-primary flex items-center justify-center z-50 p-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-3xl p-8 shadow-2xl text-center w-full max-w-xs"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-7xl mb-4"
        >
          🏆
        </motion.div>
        <div className="bg-prestige/10 rounded-2xl px-4 py-2 inline-block mb-3">
          <p className="text-xs font-bold text-prestige uppercase tracking-wide">Niveau</p>
          <p className="text-4xl font-extrabold text-prestige">{nouveauNiveau}</p>
        </div>
        <h2 className="text-xl font-extrabold text-app-text mb-1">Niveau supérieur !</h2>
        <p className="text-sm text-prestige font-semibold mb-6">{titreNiveau}</p>
        <button
          onClick={onContinuer}
          className="w-full py-4 rounded-2xl bg-prestige text-white font-bold text-lg hover:bg-prestige/90 active:scale-95 transition-all"
        >
          Continuer →
        </button>
      </motion.div>
    </div>
  );
}
