"use client";

interface CreditJarProps {
  credits: number;
  size?: "sm" | "md" | "lg";
}

export default function CreditJar({ credits, size = "md" }: CreditJarProps) {
  const sizeClass = size === "lg" ? "text-4xl" : size === "sm" ? "text-2xl" : "text-3xl";
  const textSize = size === "lg" ? "text-xl" : size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={sizeClass}>🏺</div>
      <div className={`font-bold text-gold ${textSize}`}>
        {credits} <span className="text-app-text opacity-60">C</span>
      </div>
    </div>
  );
}
