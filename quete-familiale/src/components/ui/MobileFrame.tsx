"use client";

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function MobileFrame({ children, className = "" }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div
        className={`w-full max-w-mobile min-h-screen bg-warm font-nunito flex flex-col relative overflow-x-hidden ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
