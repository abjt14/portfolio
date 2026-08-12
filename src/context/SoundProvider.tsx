"use client";

import React from "react";

type SoundContextValue = {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const SoundContext = React.createContext<SoundContextValue | null>(null);

export function useSoundSettings(): SoundContextValue {
  const context = React.useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundSettings must be used within a <SoundProvider>");
  }
  return context;
}

export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
}
