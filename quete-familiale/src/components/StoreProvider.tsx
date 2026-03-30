"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { isLocalStorageAvailable } from "@/lib/storage";

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const [storageOk, setStorageOk] = useState(true);

  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      setStorageOk(false);
      return;
    }
    useStore.persist.rehydrate();
  }, []);

  if (!storageOk) {
    return (
      <div className="min-h-screen bg-warm flex items-center justify-center p-8 font-nunito">
        <div className="max-w-mobile w-full bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-app-text mb-3">Stockage désactivé</h1>
          <p className="text-sm text-gray-500">
            Le stockage local est désactivé. Activez-le dans les paramètres de votre navigateur pour utiliser La Quête Familiale.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
