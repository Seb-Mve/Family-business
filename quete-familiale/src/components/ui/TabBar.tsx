"use client";

import { useRouter } from "next/navigation";

export type ActiveTab = "home" | "quetes" | "catalogue" | "profil";

interface TabBarProps {
  activeTab: ActiveTab;
  enfantId: string;
}

const TABS = [
  { id: "home" as ActiveTab, label: "Accueil", icon: "🏠", path: "/enfant" },
  { id: "quetes" as ActiveTab, label: "Quêtes", icon: "⚔️", path: "/enfant" },
  { id: "catalogue" as ActiveTab, label: "Catalogue", icon: "🎁", path: "/enfant/catalogue" },
  { id: "profil" as ActiveTab, label: "Profil", icon: "👤", path: "/enfant/profil" },
];

export default function TabBar({ activeTab }: TabBarProps) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-gray-100 z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
