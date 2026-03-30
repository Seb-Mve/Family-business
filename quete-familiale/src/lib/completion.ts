import type { CompletionTache } from "@/store/types";

export const getTodayDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isDoubleValidation = (
  completions: CompletionTache[],
  enfantId: string,
  tacheId: string
): boolean => {
  const today = getTodayDate();
  return completions.some(
    (c) =>
      c.enfantId === enfantId &&
      c.tacheId === tacheId &&
      c.date === today &&
      c.statut === "complete"
  );
};
