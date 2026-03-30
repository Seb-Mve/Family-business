"use client";

import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import TabBar, { type ActiveTab } from "@/components/ui/TabBar";

function getActiveTab(pathname: string): ActiveTab {
  if (pathname.includes("/catalogue")) return "catalogue";
  if (pathname.includes("/profil")) return "profil";
  return "home";
}

export default function EnfantLayout({ children }: { children: React.ReactNode }) {
  const activeEnfantId = useStore((s) => s.activeEnfantId);
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  return (
    <div className="pb-20">
      {children}
      {activeEnfantId && <TabBar activeTab={activeTab} enfantId={activeEnfantId} />}
    </div>
  );
}
