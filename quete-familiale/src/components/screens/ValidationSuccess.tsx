"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Marble {
  id: number;
  startX: number;
  endX: number;
  delay: number;
}

interface ValidationSuccessProps {
  xpGagne: number;
  creditsGagnes: number;
  onComplete: () => void;
}

export default function ValidationSuccess({ xpGagne, creditsGagnes, onComplete }: ValidationSuccessProps) {
  const [marbles, setMarbles] = useState<Marble[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      startX: (Math.random() - 0.5) * 300,
      endX: (Math.random() - 0.5) * 60,
      delay: Math.random() * 0.4,
    }));
    setMarbles(generated);

    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-mobile h-full flex flex-col items-center justify-center overflow-hidden">
        {/* Marbles */}
        {marbles.map((m) => (
          <motion.div
            key={m.id}
            initial={{ y: -200, x: m.startX, opacity: 1, scale: 1.2 }}
            animate={{ y: 150, x: m.endX, opacity: 0, scale: 0.3 }}
            transition={{ duration: 1.2, delay: m.delay, ease: "easeIn" }}
            className="absolute top-1/3 w-7 h-7 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #FFE566, #FFD700, #B8960C)",
              boxShadow: "0 0 12px rgba(255, 215, 0, 0.6)",
            }}
          />
        ))}

        {/* Text */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
          className="bg-white rounded-3xl px-8 py-6 shadow-2xl text-center"
        >
          <div className="text-5xl mb-3">✅</div>
          <h2 className="text-2xl font-extrabold text-success mb-2">Validé !</h2>
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-1 text-primary font-bold text-lg">
              +{xpGagne} <span className="text-sm">XP</span>
            </div>
            {creditsGagnes > 0 && (
              <div className="flex items-center gap-1 text-gold font-bold text-lg">
                +{creditsGagnes} <span className="text-sm">C</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
