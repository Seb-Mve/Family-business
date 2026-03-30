"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

export default function Home() {
  const router = useRouter();
  const famille = useStore((s) => s.famille);
  const setActiveEnfant = useStore((s) => s.setActiveEnfant);

  useEffect(() => {
    // Handle SPA redirect from 404.html (GitHub Pages)
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get("p");
    if (redirectPath) {
      window.history.replaceState(null, "", redirectPath);
      router.replace(redirectPath);
      return;
    }

    if (!famille) {
      router.replace("/onboarding");
    } else if (famille.enfants.length === 1) {
      setActiveEnfant(famille.enfants[0].id);
      router.replace("/enfant");
    } else {
      router.replace("/famille");
    }
  }, [famille, router]);

  return (
    <div className="min-h-screen bg-warm flex items-center justify-center">
      <div className="text-4xl animate-pulse">⚔️</div>
    </div>
  );
}
